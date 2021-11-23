import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from 'vite-plugin-mock'
import path from "path";

const resolve = (dir: string) => path.join(__dirname, dir);

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // console.log(loadEnv(mode, process.cwd())); // 获取当前环境的.nev.${mode}的值
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = loadEnv(
    mode,
    process.cwd()
  );
  return {
    plugins: [
      vue(),
      viteMockServe({
        // default
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        watchFiles: true
      }),
    ],
    base: process.env.NODE_ENV === "production" ? "./" : VITE_PUBLIC_PATH,
    server: {
      port: Number(VITE_PORT),
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: VITE_PROXY, // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      // @ts-ignore
      sourcemap: false,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        "@": resolve("src"),
        components: resolve("src/components"),
        api: resolve("src/api"),
        views: resolve("src/views"),
        utils: resolve("src/utils"),
        routes: resolve("src/routes"),
        styles: resolve("src/styles"),
      },
    },
    css: {
      preprocessorOptions: {
        // 引入公用的样式
        scss: {
          additionalData: '@import "./src/styles/mixin.scss";',
        },
      },
    },
  };
};
