import { defineConfig, PluginOption } from "vite";
import { resolve, join } from "path";
import dts from "vite-plugin-dts";
import { compression, defineAlgorithm } from "vite-plugin-compression2";
import zlib from "zlib";
import { cpSync, existsSync, rmSync, mkdirSync } from "fs";

// 目标输出目录
const outDirDist = resolve(__dirname, "dist");
const outDirPackages = resolve(__dirname, "../../packages/micro-frontend");

// 自定义插件：在每次vite构建后的generateBundle钩子里将文件复制到/packages/micro-frontend
function copyToPackagesMicroFrontend(): PluginOption {
  return {
    name: "copy-dist-to-packages-micro-frontend",
    closeBundle() {
      // 删除原有目标文件夹
      if (existsSync(outDirPackages)) {
        rmSync(outDirPackages, { recursive: true, force: true });
      }
      mkdirSync(outDirPackages, { recursive: true });
      // 复制dist内容到outDirPackages
      cpSync(outDirDist, outDirPackages, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
      insertTypesEntry: true,
      // 输出类型到两个目录：dist 和 ../../packages/micro-frontend
      outDir: outDirDist,
    }),
    compression({
      algorithms: [
        "gzip",
        defineAlgorithm("brotliCompress", {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
        }),
      ],
    }),
    copyToPackagesMicroFrontend(),
  ],
  build: {
    outDir: outDirDist,
    lib: {
      entry: resolve(__dirname, "main.ts"),
      name: "LdMicroFrontend",
      fileName: (format) => `ld-micro-frontend.${format}.js`,
    },
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    emptyOutDir: true,
  },
});
