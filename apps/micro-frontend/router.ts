import { type AppInfo, apps, loadApp, unmountApp } from "./main";

let currentApp: AppInfo | null = null;

export const handleRouteChange = async (callback?: (path: string) => void) => {
  const appToLoad = apps.find((app) =>
    window.location.pathname.startsWith(app.activeRule)
  );

  if (currentApp?.name === appToLoad?.name) return;

  if (currentApp) {
    await unmountApp(currentApp);
  }

  if (appToLoad) {
    callback && callback(appToLoad.activeRule);
    await loadApp(appToLoad);
    currentApp = appToLoad;
  } else {
    currentApp = null;
  }
};

export const push = (path: string) => {
  history.pushState(null, "", path);
  handleRouteChange();
};

export const replace = (path: string) => {
  history.replaceState(null, "", path);
  handleRouteChange();
};

export const go = (n: number) => {
  history.go(n);
};

export const back = () => {
  history.back();
};
