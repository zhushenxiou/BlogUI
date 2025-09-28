import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式进行文件覆盖
        additionalData: `@use "@/assets/styles/element-variables.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 添加构建配置以解决代码块大小问题
  build: {
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks(id) {
          // 将第三方库分割到单独的chunk中
          if (id.includes("node_modules")) {
            // 将element-plus相关的依赖单独打包
            if (id.includes("element-plus")) {
              return "element-plus";
            }
            // 将vue相关的依赖单独打包
            else if (id.includes("vue") || id.includes("@vue")) {
              return "vue";
            }
            // 其他第三方依赖统一打包
            return "vendor";
          }
        },
      },
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://117.72.189.56:3000/api", // 指向你的后端服务器地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
