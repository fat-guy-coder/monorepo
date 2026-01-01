# @ld/micro-frontend

A modern, lightweight, and secure micro-frontend framework built from scratch with native JavaScript, prioritizing performance, security, and developer experience.

This framework is designed around a **JS Module Entry** approach, providing a seamless, type-safe integration experience in a monorepo environment.

---

## Core Features

- **🚀 JS Module Entry**: Instead of parsing HTML, the framework loads micro-apps as standard JavaScript modules using dynamic `import()`. This is faster, more efficient, and provides full TypeScript support out of the box.

- **🛡️ High-Security Proxy Sandbox**: A robust sandboxing mechanism that isolates micro-apps to prevent interference with the main application or other micro-apps. It provides:
  - **Prototype Pollution Protection**: Prevents modification of global object prototypes like `Array.prototype`.
  - **Sandbox Escape Prevention**: Hijacks `eval` and `new Function` to ensure all code executes within the sandbox.
  - **Automatic Event Listener Cleanup**: Tracks all `document` and `window` event listeners and automatically removes them when an app is unmounted, preventing memory leaks.
  - **`Object.defineProperty` Interception**: Prevents micro-apps from modifying the global `window` object through low-level APIs.

- **⚡️ Smart Preloading**: After the first application is mounted, the framework uses `requestIdleCallback` to preload the modules of other registered apps in the background, making subsequent app switches feel instantaneous.

- **📡 Centralized State & Communication**: A built-in `sharedState` manager provides a simple but powerful publish-subscribe (Pub/Sub) mechanism for cross-app communication and state sharing.

- **📦 Dual Build Strategy**: Supports building to a local `dist` directory for development or to a shared `packages` directory for seamless integration in a `pnpm` workspace.

## API Reference

### `registerMicroApps(apps: AppInfo[])`

Registers a list of micro-applications with the framework.

- `apps`: An array of `AppInfo` objects.

**`AppInfo` Object:**

| Property    | Type     | Description                                      |
|-------------|----------|--------------------------------------------------|
| `name`      | `string` | A unique name for the micro-app.                 |
| `entry`     | `string` | The URL to the micro-app's JS module entry file. |
| `container` | `string` | A CSS selector for the container element.        |
| `activeRule`| `string` | The URL path prefix that activates the app.      |

### `start(options?: StartOptions)`

Starts the micro-frontend framework, begins listening to route changes, and loads the initial application.

- `options`: An optional configuration object.

**`StartOptions` Object:**

| Property  | Type      | Default | Description                                    |
|-----------|-----------|---------|------------------------------------------------|
| `preload` | `boolean` | `true`  | Whether to preload other apps in the background. |

---

## Usage Guide

### 1. Creating a Micro-App

To make a standard application (e.g., Vue, React) compatible, create a dedicated JS/TS entry file (e.g., `micro-entry.ts`) that exports a default object with three lifecycle functions.

```typescript
// my-vue-app/src/micro-entry.ts
import { createApp, type App as VueApp } from 'vue';
import App from './App.vue';
import { sharedState } from '@ld/micro-frontend';

let appInstance: VueApp | null = null;

async function bootstrap() {
  console.log('Vue app bootstrapped');
}

async function mount(props: { container: HTMLElement, sandbox: WindowProxy }) {
  appInstance = createApp(App);
  appInstance.mount(props.container);

  // Example: Communicate with the main app
  const theme = sharedState.getState('theme');
  console.log('Theme from main app:', theme);
  sharedState.publish('app-loaded', { name: 'my-vue-app' });
}

async function unmount() {
  if (appInstance) {
    appInstance.unmount();
    appInstance = null;
  }
}

export default {
  bootstrap,
  mount,
  unmount,
};
```

### 2. Setting up the Main Application

In your main application's host HTML file, use an `importmap` to resolve the framework package.

```html
<!-- apps/main/index.html -->
<head>
  <script type="importmap">
    {
      "imports": {
        "@ld/micro-frontend": "../../packages/micro-frontend/ld-micro-frontend.es.js"
      }
    }
  </script>
</head>
<body>
  <div id="micro-app-container"></div>
  <script type="module" src="./main.js"></script>
</body>
```

In your main JavaScript file, register the apps and start the framework.

```javascript
// apps/main/main.js
import { registerMicroApps, start } from '@ld/micro-frontend';

const apps = [
  {
    name: 'my-vue-app',
    entry: 'http://localhost:8080/src/micro-entry.ts', // Dev server URL to the JS entry
    container: '#micro-app-container',
    activeRule: '/my-vue-app',
  },
  // ... other apps
];

registerMicroApps(apps);
start({ preload: true }); // Start with preloading enabled
```

### 3. Inter-App Communication

Use the `sharedState` object for communication.

```javascript
import { sharedState } from '@ld/micro-frontend';

// In the main app (or another micro-app)
sharedState.setState('userInfo', { id: 1, name: 'Admin' });

// In your micro-app
const userInfo = sharedState.getState('userInfo');
console.log(userInfo);

// Subscribe to changes
const unsubscribe = sharedState.subscribe('userInfo', (newUser) => {
  console.log('User info changed:', newUser);
});

// Publish a global event
sharedState.publish('user:logout', { reason: 'session_expired' });

// Listen to an event
sharedState.on('user:logout', (data) => {
  console.log('Logout reason:', data.reason);
});
```

