/**
 * Fetch API 客户端工具
 *
 * 基于原生 Fetch API 实现的 HTTP 客户端，提供与 Axios 类似的 API 接口。
 * 支持请求/响应拦截器、自动 token 注入、统一错误处理等功能。
 *
 * @module utils/fetch
 */

import Message from '@/components/Message';
import router from '@/router';



// API response types
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}
// ============================================
// 类型定义
// ============================================

/**
 * 请求配置接口
 * 兼容 Axios 的 RequestConfig，便于从 axios 迁移
 */
export interface RequestConfig extends Omit<RequestInit, 'body' | 'method'> {
  /** 请求 URL（相对路径或绝对路径） */
  url: string;
  /** HTTP 方法（不区分大小写，如 'get', 'POST'） */
  method?: string;
  /** 基础 URL，会与 url 拼接 */
  baseURL?: string;
  /** 请求超时时间（毫秒），默认 30000 */
  timeout?: number;
  /** URL 查询参数（会自动转换为 query string） */
  params?: Record<string, any>;
  /** 请求体数据（会自动序列化为 JSON，除非 Content-Type 为 application/x-www-form-urlencoded） */
  data?: any;
  /**
   * 静默模式：发生错误时不弹出 Message（仍会 reject，交给调用方处理）
   * 适用于 SSE/长连接 ACK 等“失败但不应打扰用户”的请求。
   */
  silent?: boolean;
}

/**
 * API 请求结果类型
 * 返回统一的 ApiResponse 格式
 */
export type ApiResult<T> = Promise<ApiResponse<T>>;

/**
 * 请求拦截器类型
 */
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;

/**
 * 响应拦截器类型
 */
type ResponseInterceptor = (response: any) => any | Promise<any>;

/**
 * 错误拦截器类型
 */
type ErrorInterceptor = (error: any) => any | Promise<any>;

/**
 * 自定义请求错误类
 */
class RequestError extends Error {
  /** 错误代码（HTTP 状态码或业务错误码） */
  public code: number;
  /** 错误数据 */
  public data: any;
  /** HTTP 响应对象（如果有） */
  public response?: Response;

  constructor(message: string, code: number = -1, data: any = null, response?: Response) {
    super(message);
    this.name = 'RequestError';
    this.code = code;
    this.data = data;
    this.response = response;
  }
}

// ============================================
// Fetch 客户端实现
// ============================================

/**
 * Fetch 客户端类
 * 提供请求/响应拦截、错误处理、超时控制等功能
 */
class FetchClient {
  /** 基础 URL */
  private baseURL: string;
  /** 默认超时时间（毫秒） */
  private timeout: number;
  /** 拦截器集合 */
  private interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
    error: ErrorInterceptor[];
  };

  /**
   * 创建 Fetch 客户端实例
   * @param options - 客户端配置选项
   * @param options.baseURL - 基础 URL，默认为空字符串
   * @param options.timeout - 默认超时时间（毫秒），默认 30000
   */
  constructor(options: { baseURL?: string; timeout?: number } = {}) {
    this.baseURL = options.baseURL || '';
    this.timeout = options.timeout || 6000000;
    this.interceptors = {
      request: [],
      response: [],
      error: [],
    };
  }

  /**
   * 添加请求拦截器
   * @param interceptor - 请求拦截器函数
   */
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
  }

  /**
   * 添加响应拦截器
   * @param interceptor - 响应成功拦截器函数
   * @param errorInterceptor - 响应错误拦截器函数（可选）
   */
  addResponseInterceptor(
    interceptor: ResponseInterceptor,
    errorInterceptor?: ErrorInterceptor
  ): void {
    this.interceptors.response.push(interceptor);
    if (errorInterceptor) {
      this.interceptors.error.push(errorInterceptor);
    }
  }

  /**
   * 将对象转换为 URLSearchParams 格式（用于 application/x-www-form-urlencoded）
   * @param data - 要转换的数据对象
   * @returns URLSearchParams 实例
   */
  private objectToFormData(data: Record<string, any>): URLSearchParams {
    const formData = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return formData;
  }

  /**
   * 构建完整的请求 URL
   * @param url - 相对或绝对 URL
   * @param baseURL - 基础 URL
   * @param params - 查询参数
   * @returns 完整的 URL 字符串
   */
  private buildURL(url: string, baseURL?: string, params?: Record<string, any>): string {
    const base = baseURL || this.baseURL;
    let finalURL: string;

    // 处理 baseURL 和 url 的拼接
    if (!base || url.startsWith('http://') || url.startsWith('https://')) {
      // 如果 baseURL 为空，或 url 是绝对路径，直接使用 url
      finalURL = url;
    } else {
      // 确保 baseURL 以 / 结尾，url 不以 / 开头（或都处理）
      const baseEndsWithSlash = base.endsWith('/');
      const urlStartsWithSlash = url.startsWith('/');

      if (baseEndsWithSlash && urlStartsWithSlash) {
        finalURL = `${base}${url.slice(1)}`;
      } else if (!baseEndsWithSlash && !urlStartsWithSlash) {
        finalURL = `${base}/${url}`;
      } else {
        finalURL = `${base}${url}`;
      }
    }

    // 添加查询参数
    if (params && Object.keys(params).length > 0) {
      const urlObj = new URL(finalURL, window.location.origin);
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
      finalURL = urlObj.toString();
    }

    return finalURL;
  }

  /**
   * 执行 HTTP 请求
   * @param config - 请求配置
   * @returns Promise，解析为 ApiResponse<T>
   */
  async request<T = unknown>(config: RequestConfig): Promise<ApiResponse<T>> {
    let processedConfig = { ...config };

    // 执行请求拦截器
    for (const interceptor of this.interceptors.request) {
      processedConfig = await interceptor(processedConfig);
    }

    const {
      url,
      method = 'GET',
      params,
      data,
      headers,
      timeout,
      baseURL,
      silent,
      ...rest
    } = processedConfig;
    const upperCaseMethod = method.toUpperCase();

    // 构建完整 URL
    const finalURL = this.buildURL(url, baseURL || processedConfig.baseURL, params);

    // 设置超时
    const finalTimeout = timeout || this.timeout;
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), finalTimeout);

    // 准备请求头
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // 合并自定义请求头
    const mergedHeaders: Record<string, string> = {
      ...defaultHeaders,
      ...(headers as Record<string, string>),
    };

    // 处理请求体
    let body: string | URLSearchParams | undefined;
    const contentType =
      mergedHeaders['Content-Type'] || mergedHeaders['content-type'] || 'application/json';

    if (data && !['GET', 'HEAD'].includes(upperCaseMethod)) {
      if (contentType === 'application/x-www-form-urlencoded') {
        // 表单编码格式
        body = this.objectToFormData(data);
        // 删除 Content-Type，让浏览器自动设置（包含 boundary）
        delete mergedHeaders['Content-Type'];
        delete mergedHeaders['content-type'];
      } else {
        // JSON 格式
        body = JSON.stringify(data);
      }
    }

    // 构建 fetch 选项
    const fetchOptions: RequestInit = {
      ...rest,
      method: upperCaseMethod,
      headers: mergedHeaders,
      body,
      signal: controller.signal,
    };

    try {
      const response = await fetch(finalURL, fetchOptions);
      clearTimeout(timeoutId);

      // 处理 HTTP 错误状态
      if (!response.ok) {
        let errorData: any = null;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          } else {
            errorData = { message: await response.text() };
          }
        } catch {
          // 忽略解析错误
        }

        const presetHttpMessages: Record<number, string> = {
          500: '服务器内部错误，请稍后再试',
          504: '网关超时，请稍后重试',
        };

        const error = new RequestError(
          presetHttpMessages[response.status] ||
          errorData?.message ||
          `HTTP error! Status: ${response.status}`,
          response.status,
          errorData,
          response
        );
        ; (error as any).config = processedConfig

        // 执行错误拦截器
        let processedError = error;
        for (const interceptor of this.interceptors.error) {
          processedError = await interceptor(processedError);
        }

        return Promise.reject(processedError);
      }

      // 解析响应数据
      let responseData: any;
      const responseContentType = response.headers.get('content-type');
      if (responseContentType && responseContentType.includes('application/json')) {
        const raw = await response.text();
        // 兼容部分后端在 2xx 下返回空 body 的场景（例如仅依赖 SSE 回流）
        responseData = raw.trim().length > 0 ? JSON.parse(raw) : { code: 0, message: 'Success', data: null };
      } else {
        responseData = await response.text();
      }

      // Special handling for non-standard APIs (e.g. dify)
      if (
        typeof url === 'string' &&
        responseData &&
        typeof responseData === 'object' &&
        !('code' in responseData)
      ) {
        responseData = { code: 0, message: 'success', data: responseData };
      }

      // Non-JSON text fallback
      if (typeof responseData === 'string') {
        responseData = { code: 0, message: 'Success', data: responseData };
      }

      // 执行响应拦截器
      for (const interceptor of this.interceptors.response) {
        responseData = await interceptor(responseData);
      }

      return responseData as ApiResponse<T>;
    } catch (error) {
      clearTimeout(timeoutId);

      // 处理超时错误
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError = new RequestError('Request timed out', -2, null); // 使用-2作为超时错误码
        ; (timeoutError as any).config = processedConfig
        let processedError = timeoutError;
        for (const interceptor of this.interceptors.error) {
          processedError = await interceptor(processedError);
        }
        return Promise.reject(processedError);
      }

      // 处理其他错误（如 TypeError: Failed to fetch）
      let processedError: any = error;
      if (!(processedError instanceof RequestError)) {
        processedError = new RequestError(
          processedError instanceof Error ? processedError.message : 'Network error',
          -3,
          { originalError: processedError }
        )
      }
      ; (processedError as any).config = processedConfig
      for (const interceptor of this.interceptors.error) {
        processedError = await interceptor(processedError);
      }

      return Promise.reject(processedError);
    }
  }
}

// ============================================
// 创建并配置单例实例
// ============================================

/**
 * Fetch 客户端单例实例
 * 已配置基础 URL、超时时间和拦截器
 */
const service = new FetchClient({
  baseURL: import.meta.env.VITE_BASE_API || '',
  timeout: 6000000,
});

// 请求拦截器：自动添加 token
service.addRequestInterceptor((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    const headers = (config.headers || {}) as Record<string, string>;
    headers['Authorization'] = `Bearer ${token}`;
    config.headers = headers;
  }
  return config;
});

// 响应拦截器：处理业务逻辑
service.addResponseInterceptor(
  // 成功响应拦截器
  (response: ApiResponse<any>) => {
    // 成功的响应（code === 0 或 code === 200）
    if (response.code === 0 || response.code === 200) {
      return response;
    }
    // 业务错误：抛出错误，由错误拦截器处理
    throw new RequestError(response.message || 'Request failed', response.code, response.data);
  },
  // 错误拦截器
  (error: any) => {
    console.error('Response error:', error);
    const silent = Boolean((error as any)?.config?.silent);

    // 处理 401 未授权错误
    if (error instanceof RequestError && error.code === 401) {
      localStorage.removeItem('token');

      // 防止 401 风暴/循环跳转：检查当前路由
      try {
        if (router.currentRoute.value.path !== '/login') {
          router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath },
          });
        }
      } catch (routerError) {
        console.error('Router error:', routerError);
        // 如果路由跳转失败，使用 window.location 作为后备方案
        window.location.href = '/login';
      }

      if (!silent) Message.error('登录已过期，请重新登录');
      return Promise.reject(error);
    }

    // 处理 500 服务器错误
    if (error instanceof RequestError && error.code === 500) {
      if (!silent) Message.error('服务器内部错误，请稍后再试');
      return Promise.reject(error);
    }

    // 处理 504 网关超时：不弹出提示，交给调用方/上层逻辑处理
    if (error instanceof RequestError && error.code === 504) {
      return Promise.reject(error);
    }

    // 处理 code === -1 的业务错误：给出提示（避免上层出现未处理异常时“静默”）
    // 仍然保持 reject，让调用方可以继续按需捕获/中断流程
    if (error instanceof RequestError && error.code === -1) {
      if (!silent) Message.error(error.message || '操作失败');
      return Promise.reject(error);
    }

    // 处理超时错误（code === -2）：不弹出提示，让调用方自行处理
    if (error instanceof RequestError && error.code === -2) {
      return Promise.reject(error);
    }

    // 处理其他错误
    let message = 'Network error';
    if (error instanceof RequestError) {
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    // 业务错误（code !== 0 && code !== 200）已经在响应拦截器中处理并显示消息
    // 这里只处理网络错误和 HTTP 错误
    if (!(error instanceof RequestError && error.code > 0 && error.code < 500)) {
      if (!silent) Message.error(message);
    }

    return Promise.reject(error);
  }
);

// ============================================
// 导出函数和类型
// ============================================

/**
 * 通用请求函数
 *
 * @example
 * ```typescript
 * // GET 请求
 * const data = await request<User[]>({
 *   url: '/api/users',
 *   method: 'get',
 *   params: { page: 1, size: 10 }
 * });
 *
 * // POST 请求
 * const result = await request<CreateUserResponse>({
 *   url: '/api/users',
 *   method: 'post',
 *   data: { name: 'John', email: 'john@example.com' }
 * });
 *
 * // 表单编码请求
 * const loginResult = await request<LoginResponse>({
 *   url: '/api/login',
 *   method: 'post',
 *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 *   data: { username: 'user', password: 'pass' }
 * });
 * ```
 *
 * @param config - 请求配置
 * @returns Promise，解析为 ApiResponse<T>
 */
export function request<T = unknown>(config: RequestConfig): Promise<ApiResponse<T>> {
  return service.request<T>(config);
}

/**
 * 导出类型定义
 * 注意：RequestConfig 和 ApiResult 已在定义时导出，无需重复导出
 * ApiResponse 从 @/types 重新导出，方便 API 文件统一使用
 */


/**
 * 导出 FetchClient 类（用于高级用法）
 */
export { FetchClient, RequestError };

/**
 * 导出默认实例（用于高级用法）
 */
export default service;
