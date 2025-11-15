import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
//rollup-plugin-i18n-auto
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { compression, defineAlgorithm } from 'vite-plugin-compression2'
import zlib from 'zlib'

const outDir = resolve('../../static/myvue')

console.log(outDir)

//https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // 目标接口的域名
        changeOrigin: true, // 是否允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
      },
    },
    // open: true, // 启动时自动打开浏览器
    port: 3000, // 指定端口号

  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
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
  ],
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
})
