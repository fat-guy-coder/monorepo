import { defineConfig } from "vite";
import { compression, defineAlgorithm } from "vite-plugin-compression2";
import zlib from "zlib";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9090,
    // Allow access from any network interface
    host: "0.0.0.0",
  },
  build: {
    // Output to a unified dist folder at the workspace root
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    compression({
      algorithms: [
        "gzip",
        defineAlgorithm("brotliCompress", {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 6,
        }),
      ],
      // deleteOriginalAssets: true,
      threshold: 500,
    }),
  ],
});
