import { loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'
import Inspector from 'vite-plugin-vue-inspector'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import VueMacros from 'unplugin-vue-macros/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { configMockPlugin } from './build/configMockPlugin'
import { configHtmlPlugin } from './build/configHtmlPlugin'
import path from 'path'

const resolve = (dir: string) => path.join(__dirname, dir)

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  const root = process.cwd()
  // console.log(loadEnv(mode, process.cwd())); // 获取当前环境的.nev.${mode}的值
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = loadEnv(mode, root)
  return {
    plugins: [
      VueMacros({
        plugins: {
          vue: vue({
            include: [/\.vue$/, /\.md$/],
          }),
          vueJsx: vueJsx(),
        },
      }),
      DefineOptions(),
      configMockPlugin(command),
      configHtmlPlugin(loadEnv(mode, root), isBuild),
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex', 'vue/macros'], // 自动导入vue和vue-router等相关函数
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
          filepath: './.eslintrc-auto-import.json', // 默认
          globalsPropValue: true,
        },
        dirs: [
          'src/store',
        ],
        vueTemplate: true,
        resolvers: [ElementPlusResolver()],
      }),
      //
      Components({
        dirs: ['src/components'],
        deep: true,
        resolvers: [ElementPlusResolver()],
      }),
      // 仓库: https://github.com/antfu/vite-plugin-inspect
      // Visit http://localhost:3333/__inspect/ to see the inspector
      Inspect(),

      // 仓库: https://github.com/webfansplz/vite-plugin-vue-inspector
      Inspector({
        toggleButtonVisibility: 'never',
      }),
      // 仓库: https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // 仓库: https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),
    ],
    base: isBuild ? './' : VITE_PUBLIC_PATH,
    server: {
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: VITE_PROXY, // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: isBuild,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        components: resolve('src/components'),
        api: resolve('src/api'),
        views: resolve('src/views'),
        utils: resolve('src/utils'),
        routes: resolve('src/routes'),
        styles: resolve('src/styles'),
      },
    },
    css: {
      preprocessorOptions: {
        // 引入公用的样式
        scss: {
          // additionalData: '@import "./src/styles/mixin.scss";',
        },
      },
    },
  }
}
