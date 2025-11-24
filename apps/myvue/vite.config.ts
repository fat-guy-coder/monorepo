// Node.js 内置模块：用于处理文件路径和 URL
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

// Vite 核心配置函数和插件类型
import { defineConfig } from 'vite'

// Vue 相关插件
import vue from '@vitejs/plugin-vue' // Vue 单文件组件支持
import vueJsx from '@vitejs/plugin-vue-jsx' // Vue JSX 语法支持
import vueDevTools from 'vite-plugin-vue-devtools' // Vue DevTools 开发工具

// 组件自动导入插件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // Ant Design Vue 组件解析器

// 压缩插件：用于构建时压缩资源
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import zlib from 'zlib' // Node.js 压缩库
import { anyType } from 'ant-design-vue/es/_util/type'

// 构建输出目录：相对于当前文件，输出到 ../../static/myvue
const outDir = resolve('../../static/myvue')

// 确保node高版本NodeLocalStorage可用
const ensureNodeLocalStorage = () => {
  const existing = Reflect.get(globalThis, 'localStorage') as
    | {
        getItem?: (key: string) => string | null
      }
    | undefined
  if (existing && typeof existing.getItem === 'function') {
    return
  }

  const store = new Map<string, string>()
  const memoryStorage = {
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => {
      store.set(key, String(value))
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size
    },
  }

  Reflect.set(globalThis, 'localStorage', memoryStorage)
}

ensureNodeLocalStorage()

/**
 * Vite 配置文件
 * 参考文档：https://vite.dev/config/
 *
 * @param command - 当前执行的命令（'build' 或 'serve'）
 */
export default defineConfig(async ({ command }) => {
  ensureNodeLocalStorage()

  return {
    // 开发服务器配置
    server: {
      // 代理配置：将 /api 请求代理到后端服务器
      proxy: {
        '/api': {
          target: 'http://localhost:8888', // 目标接口的域名
          changeOrigin: true, // 是否允许跨域
          rewrite: (path: string) => path.replace(/^\/api/, ''), // 路径重写：移除 /api 前缀
        },
      },
      // open: true, // 启动时自动打开浏览器（已注释）
      port: 3000, // 指定开发服务器端口号
    },

    // 插件列表
    plugins: [
      vue(), // Vue 单文件组件支持
      vueJsx(), // Vue JSX 语法支持
      vueDevTools(), // Vue DevTools 开发工具（仅在开发环境生效）

      // 组件自动导入插件：自动导入 Vue 组件，无需手动 import
      Components({
        resolvers: [
          // Ant Design Vue 组件解析器
          AntDesignVueResolver({
            importStyle: false, // 不自动导入样式，使用 CSS in JS 方式
          }),
        ],
      }),
      // 资源压缩插件：构建时压缩静态资源
      compression({
        algorithms: [
          'gzip', // Gzip 压缩算法
          // Brotli 压缩算法，质量设置为 6（平衡压缩率和速度）
          defineAlgorithm('brotliCompress', {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
          }),
        ],
        // deleteOriginalAssets: true, // 是否删除原始资源（已注释）
        threshold: 500, // 只压缩大于 500 字节的文件
      }),
    ],

    // 构建配置
    build: {
      outDir, // 输出目录
      emptyOutDir: true, // 构建前清空输出目录
      // sourcemap: true, // 是否生成 sourcemap（已注释）

      // Rollup 打包选项
      rollupOptions: {
        // Tree-shaking 配置：移除未使用的代码
        treeshake: {
          moduleSideEffects: false, // 假设模块没有副作用，进行更激进的 tree-shaking
        },
        // 输出配置
        output: {
          // 手动代码分割：将 Vue 相关库打包到单独的 chunk
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'], // Vue 核心库、路由和状态管理
          },
        },
      },
    },

    // 路径解析配置
    resolve: {
      alias: {
        // 配置 @ 别名指向 src 目录，方便导入模块
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // ESBuild 配置
    esbuild: {
      sourcemap: true, // 对 Vue 单文件组件启用 sourcemap，便于调试
    },
  }
})
