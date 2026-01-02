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

// Represents both external and inline scripts
interface ScriptInfo {
  url?: string; // For external scripts
  content?: string; // For inline scripts
  isESModule: boolean;
}

interface AppAssets {
  scripts: ScriptInfo[];
  styles: string[];
  preloads: string[];
}

interface AppInstance {
  name: string;
  sandbox: ProxySandbox;
  styleElements?: HTMLStyleElement[]; // To hold styles for 'runtime' mode
  preloadLinkElements?: HTMLLinkElement[]; // To hold created link elements for cleanup
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

const parseAssets = async (
  app: AppInfo
): Promise<AppAssets> => {
  const entryKey = typeof app.entry === "string" ? app.entry : app.name;
  if (appAssetsCache.has(entryKey)) {
    return appAssetsCache.get(entryKey)!;
  }

  const scripts: ScriptInfo[] = [];
  const styles: string[] = [];
  const preloads: string[] = [];
  let baseUrl = "";

  if (typeof app.entry === "string") {
    try {
      const response = await fetch(app.entry);
      if (!response.ok) {
        throw new Error(`Failed to fetch entry: ${response.statusText}`);
      }
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      baseUrl = new URL(app.entry).origin;

      // Process all script tags, including inline ones
      doc.querySelectorAll("script").forEach((script) => {
        const src = script.getAttribute("src");
        const isESModule = script.getAttribute("type") === "module";
        if (src) {
          scripts.push({ url: new URL(src, baseUrl).href, isESModule });
        } else {
          scripts.push({ content: script.textContent || "", isESModule });
        }
      });

      doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) styles.push(new URL(href, baseUrl).href);
      });

      // Process modulepreload links
      doc.querySelectorAll('link[rel="modulepreload"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) preloads.push(new URL(href, baseUrl).href);
      });

    } catch (error) {
      console.error(`Failed to parse assets for app: ${app.name}:`, error);
      return { scripts: [], styles: [], preloads: [] }; // Return empty on error
    }
  } else if (typeof app.entry === 'object') {
    // Handle object-based entry (if needed, simplified for now)
    const entryObj = app.entry as { scripts?: string[], styles?: string[] };
    (entryObj.scripts || []).forEach(url => scripts.push({ url, isESModule: false }));
    (entryObj.styles || []).forEach(url => styles.push(url));
  }

  const assets = { scripts, styles, preloads };
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
      const { url: scriptUrl, content: scriptContent, isESModule } = scriptInfo;

      // Execute inline script content
      if (typeof scriptContent === 'string') {
        const wrappedScript = `(function(window){ with(window) { ${scriptContent} } }).call(window, window);`;
        new Function("window", wrappedScript)(sandbox);
        continue;
      }

      // Process external scripts
      if (scriptUrl) {
        if (isESModule) {
          console.log(`Loading ES Module for ${appName}:`, scriptUrl);
          const module = await import(/* @vite-ignore */ scriptUrl);
          if (module.bootstrap && module.mount && module.unmount) {
            (sandbox as any)[`${appName}Lifecycles`] = {
                bootstrap: module.bootstrap,
                mount: module.mount,
                unmount: module.unmount,
            };
            console.log(`Lifecycles found for ${appName} in ES module.`);
          }
        } else {
          console.log(`Loading regular JS for ${appName}:`, scriptUrl);
          const response = await fetch(scriptUrl);
          const scriptText = await response.text();
          const wrappedScript = `(function(window){ with(window) { ${scriptText} } }).call(window, window);`;
          new Function("window", wrappedScript)(sandbox);
        }
      }
    } catch (error) {
      console.error(`Failed to execute script for ${appName}:`, error, scriptInfo);
      throw error;
    }
  }
  // Final check for lifecycles exposed on the global scope (for non-ESM/UMD)
  if (!(sandbox as any)[`${appName}Lifecycles`]) {
     const globalExport = (sandbox as any)[appName];
     if (globalExport && globalExport.bootstrap && globalExport.mount && globalExport.unmount) {
         (sandbox as any)[`${appName}Lifecycles`] = globalExport;
         console.log(`Lifecycles found for ${appName} on sandboxed window object.`);
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
  
  if (options.preload) {
    preloadApps();
  }

  handleRouteChange();
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

    const { scripts, styles, preloads } = await parseAssets(app);
    if (scripts.length === 0) {
      throw new Error(`No scripts found for app ${app.name}. Check if the entry point is correct and accessible.`);
    }

    // Handle preloads
    const preloadLinkElements: HTMLLinkElement[] = [];
    for (const preloadUrl of preloads) {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = preloadUrl;
      document.head.appendChild(link);
      preloadLinkElements.push(link);
    }

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
      preloadLinkElements,
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

    // Clean up preload links
    if (instance.preloadLinkElements) {
      instance.preloadLinkElements.forEach((link) => link.remove());
      instance.preloadLinkElements = [];
    }

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
