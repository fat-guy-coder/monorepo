import { ProxySandbox } from "./proxy-sandbox";
import { handleRouteChange } from "./router";
export { sharedState } from "./shared-state";
export { push, replace, go, back } from "./router";
// --- TYPE DEFINITIONS ---

export interface AppInfo {
  name: string; // Must match the name used to expose lifecycles on the window
  entry: string | { html?: string; scripts?: string[]; styles?: string[] };
  container: string;
  activeRule: string;
  cssIsolation?: "shadow" | "runtime"; // Defaults to 'runtime'
  preload?: boolean; // Whether to preload this app, defaults to true
  icon?: string; // Icon for the app, can be a URL or an emoji
  [index: string]: any;
}

export interface LifeCycles {
  bootstrap: (props: any) => Promise<void>;
  mount: (props: { container: HTMLElement | ShadowRoot }) => Promise<void>;
  unmount: (props: { container: HTMLElement | ShadowRoot }) => Promise<void>;
}

export interface GlobalLifeCycles {
  beforeLoad?: (app: AppInfo) => Promise<void>;
  beforeMount?: (app: AppInfo) => Promise<void>;
  afterMount?: (app: AppInfo) => Promise<void>;
  beforeUnmount?: (app: AppInfo) => Promise<void>;
  afterUnmount?: (app: AppInfo) => Promise<void>;
  onError?: (error: Error, app: AppInfo) => void;
}

export interface StartOptions {
  preload?: boolean; // Whether to preload apps, defaults to true
}

interface AppAssets {
  scripts: ScriptInfo[];
  styles: string[];
}

interface AppInstance {
  name: string;
  sandbox: ProxySandbox;
  styleElements?: HTMLStyleElement[]; // To hold styles for 'runtime' mode
  container: HTMLElement | ShadowRoot;
  status: 'MOUNTED' | 'UNMOUNTED';
}

// --- STATE & CACHES ---

const appAssetsCache = new Map<string, AppAssets>();
const appInstanceCache = new Map<string, AppInstance>();
export const apps: AppInfo[] = [];
let originalFavicon: string | null = null;
let globalLifeCycles: GlobalLifeCycles = {};

// --- INTERNAL HELPERS ---

const setFavicon = (url: string) => {
  let faviconLink = document.querySelector(
    "link[rel*='icon']"
  ) as HTMLLinkElement;
  if (!faviconLink) {
    faviconLink = document.createElement("link");
    faviconLink.rel = "icon";
    document.head.appendChild(faviconLink);
  }
  faviconLink.href = url;
};

const emojiToDataURL = (emoji: string): string => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  canvas.width = 64;
  canvas.height = 64;
  context.font = "56px serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(emoji, 32, 32);
  return canvas.toDataURL();
};

interface ScriptInfo {
  url: string;
  isESModule: boolean;
}

const parseAssets = async (
  app: AppInfo
): Promise<{ scripts: ScriptInfo[]; styles: string[] }> => {
  const entryKey = typeof app.entry === "string" ? app.entry : app.name;
  if (appAssetsCache.has(entryKey)) {
    return appAssetsCache.get(entryKey)!;
  }

  let scripts: ScriptInfo[] = [];
  let styles: string[] = [];
  let baseUrl = "";

  if (
    typeof app.entry === "string" ||
    (typeof app.entry === "object" && typeof app.entry.html === "string")
  ) {
    try {
      const entry = typeof app.entry === "string" ? app.entry : app.entry.html;
      if (!entry) {
        console.error(`Entry not found for app: ${app.name}`);
        return { scripts: [], styles: [] };
      }
      const response = await fetch(entry);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      baseUrl = new URL(entry as string).origin;

      doc.querySelectorAll("script").forEach((script) => {
        const src = script.getAttribute("src");
        if (src) {
          const isESModule = script.getAttribute("type") === "module";
          scripts.push({
            url: new URL(src, baseUrl).href,
            isESModule,
          });
        }
      });
      doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) styles.push(new URL(href, baseUrl).href);
      });
    } catch (error) {
      console.error(`Failed to parse assets for app: ${app.name}:`, error);
    }
  } else {
    scripts = (
      Array.isArray(app.entry.scripts)
        ? (app.entry.scripts as unknown as string[])
        : [app.entry.scripts as unknown as string]
    ).map((url) => ({
      url,
      isESModule: false, // 对象格式默认为普通JS
    }));
    styles = Array.isArray(app.entry.styles)
      ? (app.entry.styles as unknown as string[])
      : [app.entry.styles as unknown as string];
  }

  const assets = { scripts, styles };
  appAssetsCache.set(entryKey, assets);
  return assets;
};

const executeScripts = async (
  scripts: ScriptInfo[],
  sandbox: WindowProxy,
  appName: string
) => {
  for (const scriptInfo of scripts) {
    try {
      const { url: scriptUrl, isESModule } = scriptInfo;

      if (isESModule) {
        // ES module 应用 - 动态导入并检查生命周期函数
        console.log(`Loading ES Module for ${appName}:`, scriptUrl);
        const module = await import(/* @vite-ignore */ scriptUrl);
        console.log("ES Module loaded:", Object.keys(module));

        if (module.bootstrap && module.mount && module.unmount) {
          // 将生命周期函数挂载到沙箱中
          (sandbox as any)[`${appName}Lifecycles`] = {
            bootstrap: module.bootstrap,
            mount: module.mount,
            unmount: module.unmount,
          };
          console.log(`Lifecycles found for ${appName}:`, Object.keys(module));
        } else {
          console.warn(
            `Lifecycle functions not found in ES module for ${appName}`
          );
        }
      } else {
        // 普通 JS 应用 - 直接在沙箱中执行
        console.log(`Loading regular JS for ${appName}:`, scriptUrl);
        const response = await fetch(scriptUrl);
        const scriptText = await response.text();
        const wrappedScript = `(function(window){ with(window) { ${scriptText} } }).call(window, window);`;
        new Function("window", wrappedScript)(sandbox);

        // 检查是否在全局对象中暴露了生命周期函数
        if ((sandbox as any)[`${appName}Lifecycles`]) {
          console.log(`Lifecycles found in global scope for ${appName}`);
        }
      }
    } catch (error) {
      console.error(`Failed to execute script ${scriptInfo.url}:`, error);
      throw error;
    }
  }
};

const rewriteCssRules = (cssText: string, scope: string): string => {
  return cssText.replace(/([^\{\}]+)(?=\s*\{)/g, (match) => {
    if (match.trim().startsWith("@")) return match;
    return match
      .split(",")
      .map((selector) => {
        const trimmed = selector.trim();
        if (
          trimmed.startsWith(":root") ||
          trimmed.startsWith("html") ||
          trimmed.startsWith("body")
        ) {
          return trimmed;
        }
        return `${scope} ${trimmed}`;
      })
      .join(", ");
  });
};

const preloadApps = () => {
  requestIdleCallback(() => {
    console.log("Preloading other micro-apps...");
    const appsToPreload = apps.filter(
      (app) =>
        app.preload !== false &&
        !appAssetsCache.has(
          typeof app.entry === "string" ? app.entry : app.name
        )
    );
    appsToPreload.forEach((app) => parseAssets(app));
  });
};

// --- API METHODS ---

export const registerMicroApps = (
  appList: AppInfo[],
  lifeCycles?: GlobalLifeCycles
) => {
  apps.push(...appList);
  if (lifeCycles) {
    globalLifeCycles = lifeCycles;
  }
};

export const start = (options: StartOptions = { preload: true }) => {
  const faviconEl = document.querySelector("link[rel*='icon']");
  originalFavicon = faviconEl ? faviconEl.getAttribute("href") : null;

  console.log("Micro-frontend framework started (HTML Entry Mode).");
  handleRouteChange().then(() => {
    if (options.preload) {
      preloadApps();
    }
  });
  window.addEventListener("popstate", () => handleRouteChange());
};

export const loadApp = async (app: AppInfo) => {
  try {
    // Check if app instance already exists
    if (appInstanceCache.has(app.name)) {
      const instance = appInstanceCache.get(app.name)!;
      if (instance.status === 'MOUNTED') return;

      if (globalLifeCycles.beforeMount) {
        await globalLifeCycles.beforeMount(app);
      }

      (instance.container.getRootNode() as HTMLElement).style.display = 'block';
      const lifecycles = (instance.sandbox.getProxy() as any)[`${app.name}Lifecycles`];
      await lifecycles.mount({ container: instance.container });
      instance.status = 'MOUNTED';

      if (globalLifeCycles.afterMount) {
        await globalLifeCycles.afterMount(app);
      }
      return;
    }

    if (globalLifeCycles.beforeLoad) {
      await globalLifeCycles.beforeLoad(app);
    }

    if (app.icon) {
      const isURL =
        app.icon.startsWith("http") ||
        app.icon.startsWith("/") ||
        app.icon.startsWith(".");
      setFavicon(isURL ? app.icon : emojiToDataURL(app.icon));
    }

    const container = document.querySelector(app.container) as HTMLElement;
    if (!container) {
      throw new Error(`Container not found for app: ${app.name}`);
    }

    const sandbox = new ProxySandbox();
    sandbox.active();

    (sandbox.getProxy() as any).__IS_MICRO_FRONTEND_SANDBOX__ = true;

    const { scripts, styles } = await parseAssets(app);
    const cssIsolationMode = app.cssIsolation ?? "runtime";

    let mountContainer: HTMLElement | ShadowRoot = container;
    let styleElements: HTMLStyleElement[] = [];

    if (cssIsolationMode === "shadow") {
      if (!container.shadowRoot) {
          container.attachShadow({ mode: "open" });
      }
      mountContainer = container.shadowRoot!;
      const stylePromises = styles.map(async (styleUrl) => {
        const response = await fetch(styleUrl);
        const cssText = await response.text();
        const styleEl = document.createElement("style");
        styleEl.textContent = cssText;
        mountContainer.appendChild(styleEl);
      });
      await Promise.all(stylePromises);
    } else {
      // 'runtime' mode
      const scope = `[data-mf-app="${app.name}"]`;
      container.setAttribute("data-mf-app", app.name);
      for (const styleUrl of styles) {
        try {
          const response = await fetch(styleUrl);
          const cssText = await response.text();
          const styleEl = document.createElement("style");
          styleEl.textContent = rewriteCssRules(cssText, scope);
          document.head.appendChild(styleEl);
          styleElements.push(styleEl);
        } catch (error) {
          console.error(`Failed to load and scope style ${styleUrl}:`, error);
        }
      }
      mountContainer = container;
    }

    await executeScripts(scripts, sandbox.getProxy(), app.name);

    const lifecycles = (sandbox.getProxy() as any)[`${app.name}Lifecycles`];

    if (
      !lifecycles ||
      !lifecycles.bootstrap ||
      !lifecycles.mount ||
      !lifecycles.unmount
    ) {
      throw new Error(
        `Could not find lifecycles on window['${app.name}Lifecycles']`
      );
    }

    const instance: AppInstance = {
      name: app.name,
      sandbox,
      container: mountContainer,
      status: 'MOUNTED',
      styleElements: cssIsolationMode === 'runtime' ? styleElements : undefined,
    };
    appInstanceCache.set(app.name, instance);

    await lifecycles.bootstrap();

    if (globalLifeCycles.beforeMount) {
      await globalLifeCycles.beforeMount(app);
    }

    await lifecycles.mount({ container: mountContainer });

    if (globalLifeCycles.afterMount) {
      await globalLifeCycles.afterMount(app);
    }
  } catch (error) {
    console.error(`Failed to load app ${app.name}:`, error);
    if (globalLifeCycles.onError) {
      globalLifeCycles.onError(error as Error, app);
    }
  }
};

export const unmountApp = async (app: AppInfo) => {
  try {
    if (globalLifeCycles.beforeUnmount) {
      await globalLifeCycles.beforeUnmount(app);
    }

    if (originalFavicon) {
      setFavicon(originalFavicon);
    }

    const instance = appInstanceCache.get(app.name);
    if (!instance || instance.status === 'UNMOUNTED') return;

    const lifecycles = (instance.sandbox.getProxy() as any)[
      `${app.name}Lifecycles`
    ];
    if (!lifecycles || !lifecycles.unmount) return;

    await lifecycles.unmount({ container: instance.container });
    instance.status = 'UNMOUNTED';

    // Hide the container instead of clearing it
    (instance.container.getRootNode() as HTMLElement).style.display = 'none';

    if (globalLifeCycles.afterUnmount) {
      await globalLifeCycles.afterUnmount(app);
    }
  } catch (error) {
    console.error(`Failed to unmount app ${app.name}:`, error);
    if (globalLifeCycles.onError) {
      globalLifeCycles.onError(error as Error, app);
    }
  }
};
