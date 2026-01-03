export interface Sandbox {
  /** 激活沙箱 */
  active: () => void;
  /** 关闭沙箱 */
  inactive: () => void;
}

/**
 * 配置项
 */
export interface ProxySandboxOptions {
  /** 允许直接透传给真实 window 的属性 */
  whitelist?: string[];
  /** 被隐藏／拒绝访问的属性 */
  blacklist?: string[];
}

function createPristineGlobals() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  const pristineWindow = iframe.contentWindow;
  document.body.removeChild(iframe);
  return pristineWindow;
}

const GLOBALS_TO_ISOLATE = [
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Symbol', 'Date', 'Promise',
  'RegExp', 'Error', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect',
  'console', 'alert', 'confirm', 'prompt', 'fetch', 'Headers', 'Request', 'Response',
];

const BUILTIN_WHITELIST = ['location', 'navigator', 'history', 'performance'];
const ASYNC_APIS = ['setTimeout', 'setInterval', 'requestAnimationFrame', 'setImmediate'];

type PatchedEventListener = {
  target: EventTarget;
  type: string;
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
};

export class ProxySandbox implements Sandbox {
  private readonly fakeWindow: Record<string, any> = Object.create(null);
  private readonly proxy: WindowProxy;
  private running = false;
  private readonly whitelist: Set<string>;
  private readonly blacklist: Set<string>;
  private modifiedProps: Record<string, any> = {};
  private eventListeners: PatchedEventListener[] = [];

  constructor(options: ProxySandboxOptions = {}) {
    this.whitelist = new Set([...(options.whitelist || []), ...BUILTIN_WHITELIST]);
    this.blacklist = new Set(options.blacklist || []);

    const pristineGlobals = createPristineGlobals();
    if (pristineGlobals) {
      GLOBALS_TO_ISOLATE.forEach(prop => {
        if ((pristineGlobals as any)[prop]) {
          this.fakeWindow[prop] = (pristineGlobals as any)[prop];
        }
      });
    }

    this.proxy = new Proxy(this.fakeWindow, {
      set: (target: any, prop: string, value: any): boolean => {
        if (this.running) {
          if (this.whitelist.has(prop)) {
            (window as any)[prop] = value;
          } else {
            target[prop] = value;
          }
          this.modifiedProps[prop] = value;
        }
        return true;
      },

      get: (target: any, prop: string): any => {
        if (prop === Symbol.unscopables as any) return undefined;

        if (prop === 'window' || prop === 'self' || prop === 'globalThis') {
          return this.proxy;
        }

        // Hijack event listeners to track and clean them up
        if (prop === 'addEventListener' || prop === 'removeEventListener') {
          return this.patchEventListener(window, prop);
        }
        if (prop === 'document') {
          return new Proxy(document, {
            get: (docTarget, docProp) => {
              if (docProp === 'addEventListener' || docProp === 'removeEventListener') {
                return this.patchEventListener(document, docProp as string);
              }
              const value = (docTarget as any)[docProp];
              return typeof value === 'function' ? value.bind(document) : value;
            }
          });
        }

        // Hijack eval to execute code inside sandbox
        if (prop === 'eval') {
          return (code: string) => {
            if (typeof code !== 'string') return code; // native eval behaviour
            const wrapped = `(function(window){ with(window){ return eval(${JSON.stringify(code)}) } }).call(window, window);`;
            return (0, (pristineGlobals || window as any).Function)('window', wrapped)(this.proxy);
          };
        }
        // Hijack Function constructor so generated functions run in sandbox
        if (prop === 'Function') {
          const OriginalFunction = (pristineGlobals || window as any).Function;
          const sandbox = this;
          const BoundFunction = function (...args: string[]) {
            const functionBody = args.pop() || '';
            const newFn = OriginalFunction.apply(null, [...args, functionBody]);
            return function (this: any, ...fnArgs: any[]) {
              return newFn.apply(sandbox.proxy, fnArgs);
            };
          } as any;
          Object.setPrototypeOf(BoundFunction, OriginalFunction);
          return BoundFunction;
        }

        if (prop in target) {
          return target[prop];
        }

        if (this.blacklist.has(prop)) {
          return undefined;
        }

        const realValue = (window as any)[prop];
        if (typeof realValue === 'function') {
          if (ASYNC_APIS.includes(prop)) {
            return (...args: any[]) => {
              if (args.length > 0 && typeof args[0] === 'function') {
                const bound = args[0].bind(this.proxy);
                return (window as any)[prop](bound, ...args.slice(1));
              }
              return (window as any)[prop](...args);
            };
          }
          return realValue.bind(window);
        }
        return realValue;
      },

      has: (target: any, prop: string) => {
        if (this.blacklist.has(prop)) return false;
        return prop in target || prop in window;
      },

      deleteProperty: (target: any, prop: string): boolean => {
        if (prop in target) {
          return delete target[prop];
        }
        return true;
      },

      defineProperty: (target: any, prop: string, attributes: PropertyDescriptor): boolean => {
        if (this.running) {
          if (this.whitelist.has(prop)) {
            Object.defineProperty(window, prop, attributes);
          } else {
            Object.defineProperty(target, prop, attributes);
          }
          this.modifiedProps[prop] = attributes;
        }
        return true;
      },
    });
  }

  private patchEventListener(target: EventTarget, method: string) {
    return (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
      if (method === 'addEventListener') {
        this.eventListeners.push({ target, type, listener, options });
        return target.addEventListener(type, listener, options);
      } else {
        const index = this.eventListeners.findIndex(e => e.target === target && e.type === type && e.listener === listener);
        if (index > -1) {
          this.eventListeners.splice(index, 1);
        }
        return target.removeEventListener(type, listener, options);
      }
    };
  }

  active() {
    this.running = true;
  }

  inactive() {
    this.running = false;

    // Clean up event listeners
    this.eventListeners.forEach(({ target, type, listener, options }) => {
      target.removeEventListener(type, listener, options);
    });
    this.eventListeners = [];

    Object.keys(this.modifiedProps).forEach(prop => {
      if (this.whitelist.has(prop)) {
        try { delete (window as any)[prop]; } catch (e) {}
      }
    });
    this.modifiedProps = {};
  }

  getProxy() {
    return this.proxy;
  }

  /**
   * Executes a script as a module within the sandbox.
   * This is necessary for Vite's dev server which serves ES modules.
   */
  async execModule(code: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Create a temporary element to host a shadow root
        const host = document.createElement('div');
        host.style.display = 'none';
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: 'open' });

        // Create the module script
        const script = document.createElement('script');
        script.type = 'module';

        // Use 'with' to redirect global scope to the sandbox proxy
        // The script content is wrapped to be executed within the sandbox context.
        // We also add a 'done' callback to signal completion.
        const wrappedCode = `
          const done = () => window.__module_exec_done__();
          with(window) { 
            try {
              ${code}
            } catch(e) {
              window.__module_exec_error__(e);
            }
          }
          // If the module is synchronous and doesn't have top-level await, call done immediately.
          // For async modules, the user must call done() or it will timeout.
          if (typeof window.__module_exec_done__ === 'function') { done(); }
        `;

        script.textContent = wrappedCode;

        let timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error('Module execution timed out. Make sure to call done() if using top-level await.'));
        }, 5000); // 5-second timeout

        const cleanup = () => {
          clearTimeout(timeoutId);
          delete (this.proxy as any).__module_exec_done__;
          delete (this.proxy as any).__module_exec_error__;
          document.body.removeChild(host);
        };

        (this.proxy as any).__module_exec_done__ = () => {
          cleanup();
          resolve();
        };
        (this.proxy as any).__module_exec_error__ = (error: Error) => {
          cleanup();
          reject(error);
        };

        shadow.appendChild(script);

      } catch (error) {
        reject(error);
      }
    });
  }

  addWhitelist(...props: string[]) {
    props.forEach(p => this.whitelist.add(p));
  }

  addBlacklist(...props: string[]) {
    props.forEach(p => this.blacklist.add(p));
  }
}
