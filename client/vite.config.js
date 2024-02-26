import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteCommonjs(), react(), vitePluginRequire.default()],
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "build",
    commonjsOptions: { transformMixedEsModules: true }, // Change
  },
  // base: "/",
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(["react-s3"])],
    },
  },
});
