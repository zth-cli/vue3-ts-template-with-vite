import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './build/configMockPlugin'
import { configHtmlPlugin } from './build/configHtmlPlugin'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const resolve = (dir: string) => path.join(__dirname, dir)

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  const root = process.cwd()
  // console.log(loadEnv(mode, process.cwd())); // 获取当前环境的.nev.${mode}的值
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = loadEnv(mode, root)
  return {
    plugins: [
      vue(),
      configMockPlugin(command),
      configHtmlPlugin(loadEnv(mode, root), isBuild),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      //
      Components({
        dirs: ['src/components'],
        deep: true,
        resolvers: [ElementPlusResolver()]
      }),
    ],
    base: isBuild ? './' : VITE_PUBLIC_PATH,
    server: {
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: VITE_PROXY, // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      // @ts-ignore
      sourcemap: false,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components'),
        api: resolve('src/api'),
        views: resolve('src/views'),
        utils: resolve('src/utils'),
        routes: resolve('src/routes'),
        styles: resolve('src/styles')
      }
    },
    css: {
      preprocessorOptions: {
        // 引入公用的样式
        scss: {
          additionalData: '@import "./src/styles/mixin.scss";'
        }
      }
    }
  }
}
