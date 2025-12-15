# useFetch Hook 使用说明

这是一个功能强大且可配置的 Vue 3 Composition API `useFetch` hook，旨在简化项目中的网络请求处理。

## 特性

- **响应式状态**: 自动管理 `data`, `error`, `isLoading` 等状态。
- **TypeScript 支持**: 完全类型化，提供强大的类型推断和安全保障。
- **可配置实例**: 通过 `createFetch` 工厂函数创建具有全局配置的 `useFetch` 实例。
- **拦截器**: 支持请求、响应和错误拦截器，方便进行全局处理。
- **自动 Token 管理**: 可配置 `getToken` 函数，自动在请求头中添加 `Authorization`。
- **消息提示集成**: 在请求失败时，可自动调用消息组件进行提示。
- **请求控制**: 支持手动中断 (`abort`) 和重新执行 (`execute`) 请求。
- **生命周期管理**: 在组件卸载时自动中止未完成的请求，防止内存泄漏。
- **超时处理**: 可以为请求设置超时时间。

---

## 快速上手

在你的组件中，可以直接导入并使用默认的 `useFetch` 实例。

```vue
<script setup lang="ts">
import { useFetch } from '@/hooks/useFetch';

interface Post {
  id: number;
  title: string;
  body: string;
}

const { data, error, isLoading } = useFetch<Post>('https://jsonplaceholder.typicode.com/posts/1');
</script>

<template>
  <div v-if="isLoading">正在加载...</div>
  <div v-else-if="error">请求失败: {{ error.message }}</div>
  <div v-else-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.body }}</p>
  </div>
</template>
```

---

## 全局配置 (`createFetch`)

为了在整个应用中共享配置（例如 API 的 `baseUrl` 或 `Token` 处理），你应该使用 `createFetch` 工厂函数创建一个自定义的 `useFetch` 实例。

通常，你可以在项目的某个中央位置（例如 `src/utils/http.ts`）进行配置，然后导出该实例供所有组件使用。

**示例: `src/utils/http.ts`**

```typescript
import { createFetch } from '@/hooks/useFetch';
import { useUserStore } from '@/stores/user'; // 假设你的 token 存在 pinia store 中
import message from '@/components/Message';

export const useMyFetch = createFetch({
  // 设置 API 的基础 URL
  baseUrl: 'https://api.example.com/v1',

  // 配置全局的 fetch 选项
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },

  // 提供一个函数来获取当前的认证 Token
  getToken: () => {
    // 这里只是一个示例，你需要根据你的项目实际情况来获取 token
    const userStore = useUserStore();
    return userStore.token; 
  },

  // 配置全局拦截器
  interceptors: {
    // 请求拦截器：在请求发送前修改配置
    request: async (options) => {
      console.log('全局请求拦截器:', options);
      return options;
    },

    // 响应拦截器：在处理响应数据前进行转换
    response: async (data) => {
      console.log('全局响应拦截器:', data);
      // 假设你的 API 返回的数据结构是 { code: 0, data: ..., msg: '...' }
      if (data && data.code !== 0) {
        // 抛出错误，会进入错误处理流程
        throw new Error(data.msg || '业务错误');
      }
      return data.data; // 只返回业务数据部分
    },

    // 错误拦截器：处理所有请求过程中发生的错误
    error: async (error) => {
      console.error('全局错误拦截器:', error.message);
      // 在这里可以做一些全局的错误上报
      // 注意：这里默认已经集成了 message 提示，除非你在 useFetch 选项中关闭它
    },
  },
});
```

**在组件中使用自定义实例:**

```vue
<script setup lang="ts">
// 导入你自定义的实例
import { useMyFetch } from '@/utils/http';

const { data } = useMyFetch('/users/me'); // 请求的 URL 会是 https://api.example.com/v1/users/me
</script>
```

---

## API 详解

### `useFetch<T>(url, options)`

#### 参数

- `url` (`string | Ref<string>`): 请求的 URL。可以是字符串或一个 ref。
- `options` (`UseFetchOptions`): (可选) 本次请求的配置选项。

#### `UseFetchOptions`

| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| `immediate` | `boolean` | `true` (默认) - 立即执行请求。`false` - 需要手动调用 `execute`。 |
| `timeout` | `number` | 请求超时时间 (毫秒)。 |
| `showErrorMessage` | `boolean` | `true` (默认) - 发生错误时自动弹出 message 提示。 |
| `beforeFetch` | `(options) => options` | 本次请求的**请求拦截器**。 |
| `afterFetch` | `(data) => data` | 本次请求的**响应拦截器**。 |
| `onError` | `(error) => void` | 本次请求的**错误拦截器**。 |
| ... | `RequestInit` | 所有 `fetch` API 的原生选项，如 `method`, `headers`, `body` 等。 |


#### 返回值 (`UseFetchReturn<T>`)

| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| `data` | `ShallowRef<T | null>` | 响应式的数据。 |
| `error` | `ShallowRef<Error | null>` | 响应式的错误对象。 |
| `isLoading` | `Ref<boolean>` | 是否正在加载中。 |
| `isFinished` | `Ref<boolean>` | 请求是否已完成 (无论成功或失败)。 |
| `isAborted` | `Ref<boolean>` | 请求是否被中止。 |
| `abort()` | `() => void` | 中止当前请求的方法。 |
| `execute(url?, options?)` | `() => Promise<void>` | 手动执行请求的方法。可以传入新的 URL 和配置。 |

---

## 进阶用法

### 手动触发请求

设置 `immediate: false`，然后在需要的时候调用 `execute`。

```typescript
const { data, execute } = useFetch('/api/data', { immediate: false });

const loadData = () => {
  execute();
};
```

### POST 请求

```typescript
const { data, execute } = useFetch('/api/login', { immediate: false });

const login = (username, password) => {
  execute(undefined, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};
```

### 动态 URL

`useFetch` 的 `url` 参数可以是 ref，当 ref 的值变化时，你可以调用 `execute` 来使用新的 URL 发起请求。

```typescript
const postId = ref(1);
const url = computed(() => `https://jsonplaceholder.typicode.com/posts/${postId.value}`);

const { data, execute } = useFetch(url, { immediate: false });

const loadNextPost = () => {
  postId.value++;
  execute(); // 会使用更新后的 url
};

// 初始加载
onMounted(() => execute());
```

