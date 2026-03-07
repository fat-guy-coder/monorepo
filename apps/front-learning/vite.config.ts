import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, type ConfigEnv, type PluginOption, type ESBuildOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 使用 unplugin-vue-components 插件自动引入 components 目录下的所有组件
import Components from 'unplugin-vue-components/vite'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import zlib from 'zlib'
import VueDevTools from 'vite-plugin-vue-devtools'

const outDir = 'dist'

// 确保NodeLocalStorage可用
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

// https://vite.dev/config/
export default defineConfig((env: ConfigEnv) => {
  const { command, mode } = env
  const isBuild = command === 'build'
  const isDev = command === 'serve'
  const isAnalyze = process.env.ANALYZE === 'true'

  const plugins: PluginOption[] = [
    vue({
      // @ts-ignore - 忽略 TypeScript 检查
      vapor: true,
    }),
    vueJsx(),
  ]

  if (isDev) {
    ensureNodeLocalStorage()
    plugins.push(VueDevTools({ launchEditor: 'cursor' }))
  }

  plugins.push(
    Components({
      dts: false,
    }),
    compression({
      algorithms: [
        'gzip',
        defineAlgorithm('brotliCompress', {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        }),
      ],
      threshold: 512,
      deleteOriginalAssets: false,
    }),
  )
  // 统一使用 object 形式，保证类型推导完整
  const baseConfig = {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
      port: 8080,
      strictPort: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },
    preview: {
      port: 8081,
      strictPort: true,
    },
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      // 在 monorepo 下能更好地优化 workspace 依赖
      dedupe: ['vue', 'vue-router', 'pinia'],
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@ld/micro-frontend', 'codemirror', 'prismjs'],
      esbuildOptions: {
        target: 'esnext',
      },
    },
    build: {
      outDir,
      emptyOutDir: true,
      target: 'esnext',
      cssCodeSplit: true,
      sourcemap: false,
      modulePreload: {
        polyfill: false,
      },
      minify: 'esbuild' as const,
      rollupOptions: {
        // 不使用自定义 treeshake，避免 Vue 3.6 alpha / Pinia 内部 .ids 等被误删导致运行时报错
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo: { name?: string }) => {
            if (/\.(css)$/.test(assetInfo.name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name ?? '')) {
              return 'assets/img/[name]-[hash][extname]'
            }
            if (/\.(woff2?|ttf|eot|otf)$/.test(assetInfo.name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          // 不手动拆分 Vue 相关包，交给 Rollup 默认分包，避免 "reading 'ids' of null"
        },
      },
      chunkSizeWarningLimit: 600,
    },
    esbuild: {
      sourcemap: !isBuild,
      // 显式标注为 ESBuildOptions 以匹配类型
      legalComments: 'none' as ESBuildOptions['legalComments'],
    },
  }

  // 预留一个简单的分析开关，将来可挂上 rollup-plugin-visualizer 等
  if (isBuild && isAnalyze) {
    // 在这里可以按需 push 额外分析插件
  }

  return baseConfig
})
