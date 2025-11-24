import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
//rollup-plugin-i18n-auto
import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import zlib from 'zlib'

const outDir = resolve('../../static/myvue')

console.log(outDir)

// 确保NodeLocalStorage可用
const ensureNodeLocalStorage = () => {
  const existing = Reflect.get(globalThis, 'localStorage') as {
    getItem?: (key: string) => string | null
  } | undefined
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

//https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
  ]

  if (command === 'serve') {
    ensureNodeLocalStorage()
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
    plugins.push(vueDevTools())
  }

  plugins.push(
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    compression({
      algorithms: [
        'gzip', defineAlgorithm('brotliCompress', {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
        })
      ],
      // deleteOriginalAssets: true,
      threshold: 500,
    }),
  )

  return {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8888', // 目标接口的域名
          changeOrigin: true, // 是否允许跨域
        rewrite: (path: string) => path.replace(/^\/api/, ''), // 路径重写
        },
      },
      // open: true, // 启动时自动打开浏览器
      port: 8080, // 指定端口号

    },
    plugins,
    build: {
      outDir,
      emptyOutDir: true,
      // sourcemap: true,
      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
        },
        output: {
          manualChunks: {
            'vue': ['vue', 'vue-router', 'pinia'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    esbuild: {
      sourcemap: true, // 对Vue单文件组件启用sourcemap
    },
  }
})