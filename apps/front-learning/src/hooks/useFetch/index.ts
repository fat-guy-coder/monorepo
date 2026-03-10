import { ref, shallowRef, onScopeDispose, unref } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import message from '@/components/Message';

// --- 类型定义 ---

/**
 * 请求拦截器
 * @param options - 请求配置
 * @returns 修改后的请求配置
 */
type RequestInterceptor = (options: UseFetchOptions) => UseFetchOptions | Promise<UseFetchOptions>;

/**
 * 响应拦截器
 * @param data - 响应数据
 * @returns 转换后的数据
 */
type ResponseInterceptor = (data: any) => any | Promise<any>;

/**
 * 错误处理拦截器
 * @param error - 发生的错误
 * @returns 处理后的错误或新的错误
 */
type ErrorInterceptor = (error: Error) => Error | Promise<Error> | void | Promise<void>;

/**
 * useFetch 的配置选项，继承自原生的 RequestInit
 */
export interface UseFetchOptions extends RequestInit {
  /**
   * 是否在组件挂载时立即发起请求
   * @default true
   */
  immediate?: boolean;
  /**
   * 请求超时时间 (毫秒)
   */
  timeout?: number;
  /**
   * 是否在发生错误时自动弹出 message 提示
   * @default true
   */
  showErrorMessage?: boolean;
  /**
   * 请求前的拦截器
   */
  beforeFetch?: RequestInterceptor;
  /**
   * 响应成功后的拦截器
   */
  afterFetch?: ResponseInterceptor;
  /**
   * 发生错误时的拦截器
   */
  onError?: ErrorInterceptor;
}

/**
 * useFetch 返回的对象结构
 */
export interface UseFetchReturn<T> {
  /**
   * 响应式的数据引用
   */
  data: ShallowRef<T | null>;
  /**
   * 响应式的错误引用
   */
  error: ShallowRef<Error | null>;
  /**
   * 是否正在请求中
   */
  isLoading: Ref<boolean>;
  /**
   * 请求是否已完成
   */
  isFinished: Ref<boolean>;
  /**
   * 请求是否被中止
   */
  isAborted: Ref<boolean>;
  /**
   * 中止当前请求的方法
   */
  abort: () => void;
  /**
   * 手动执行请求的方法
   * @param url - (可选) 新的请求 URL
   * @param options - (可选) 本次请求的特定配置
   */
  execute: (url?: string | Ref<string>, options?: UseFetchOptions) => Promise<void>;
}

/**
 * 创建 useFetch 实例的配置选项
 */
export interface CreateFetchOptions {
  /**
   * API 的基础 URL
   */
  baseUrl?: string;
  /**
   * 全局的 fetch 配置
   */
  fetchOptions?: UseFetchOptions;
  /**
   * 用于获取认证 Token 的函数
   */
  getToken?: () => string | null | undefined;
  /**
   * 全局拦截器
   */
  interceptors?: {
    request?: RequestInterceptor;
    response?: ResponseInterceptor;
    error?: ErrorInterceptor;
  };
}

// --- `createFetch` 工厂函数 ---

/**
 * 创建一个可配置的 useFetch 实例
 * @param globalOptions - 全局配置
 */
export function createFetch(globalOptions: CreateFetchOptions = {}) {
  return function useFetch<T>(
    initialUrl: string | Ref<string>,
    initialOptions: UseFetchOptions = {}
  ): UseFetchReturn<T> {
    const data = shallowRef<T | null>(null);
    const error = shallowRef<Error | null>(null);
    const isLoading = ref(false);
    const isFinished = ref(false);
    const isAborted = ref(false);

    let controller: AbortController | undefined;

    const abort = () => {
      if (controller) {
        controller.abort();
        isAborted.value = true;
        isLoading.value = false;
      }
    };

    const execute = async (url?: string | Ref<string>, options?: UseFetchOptions) => {
      abort(); // 如果有正在进行的请求，先中止它

      isLoading.value = true;
      isFinished.value = false;
      isAborted.value = false;
      error.value = null;

      const finalUrl = unref(url) || unref(initialUrl);
      const fullUrl = (globalOptions.baseUrl || '') + finalUrl;

      // 合并全局、实例和单次请求的配置，单次请求的优先级最高
      let finalOptions: UseFetchOptions = {
        ...globalOptions.fetchOptions,
        ...initialOptions,
        ...options,
      };

      // 1. 全局请求拦截器
      if (globalOptions.interceptors?.request) {
        finalOptions = await globalOptions.interceptors.request(finalOptions);
      }
      // 2. 实例请求拦截器 (beforeFetch)
      if (finalOptions.beforeFetch) {
        finalOptions = await finalOptions.beforeFetch(finalOptions);
      }

      // 处理 Token
      if (globalOptions.getToken) {
        const token = globalOptions.getToken();
        if (token) {
          finalOptions.headers = {
            ...finalOptions.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      controller = new AbortController();
      const signal = controller.signal;

      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      if (finalOptions.timeout) {
        timeoutId = setTimeout(() => {
          abort();
          const timeoutError = new Error('请求超时');
          error.value = timeoutError;
          // 触发错误处理流程
        }, finalOptions.timeout);
      }

      try {
        const response = await fetch(fullUrl, { ...finalOptions, signal });

        if (timeoutId) clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP 错误! 状态码: ${response.status}`);
        }

        let responseData = await response.json();

        // 1. 全局响应拦截器
        if (globalOptions.interceptors?.response) {
          responseData = await globalOptions.interceptors.response(responseData);
        }
        // 2. 实例响应拦截器 (afterFetch)
        if (finalOptions.afterFetch) {
          responseData = await finalOptions.afterFetch(responseData);
        }

        data.value = responseData;
      } catch (e: any) {
        if (signal.aborted) {
          // 如果是用户主动中止，则不视为错误
          return;
        }

        let processedError = e as Error;

        // 1. 全局错误拦截器
        if (globalOptions.interceptors?.error) {
          await globalOptions.interceptors.error(processedError);
        }
        // 2. 实例错误拦截器 (onError)
        if (finalOptions.onError) {
          await finalOptions.onError(processedError);
        }

        error.value = processedError;

        // 弹出错误消息
        if (finalOptions.showErrorMessage !== false) {
          message.error(processedError.message || '请求失败');
        }
      } finally {
        isLoading.value = false;
        isFinished.value = true;
        controller = undefined;
      }
    };

    if (initialOptions.immediate !== false) {
      execute();
    }

    onScopeDispose(() => {
      abort(); // 组件卸载时自动中止请求
    });

    return {
      data,
      error,
      isLoading,
      isFinished,
      isAborted,
      abort,
      execute,
    };
  };
}

// --- 默认实例 ---

// 创建一个默认的 useFetch 实例，方便直接使用
// 你可以在这里进行全局配置，例如设置 baseUrl
export const useFetch = createFetch({
  // baseUrl: 'https://api.example.com',
  // getToken: () => localStorage.getItem('token'),
});
