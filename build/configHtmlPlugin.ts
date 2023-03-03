import type { PluginOption } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

import pkg from '../package.json'

export function configHtmlPlugin(env: { [x: string]: string }, isBuild: boolean) {
  const { VITE_TITLE, VITE_PUBLIC_PATH } = env

  const path = isBuild ? './' : VITE_PUBLIC_PATH

  const getAppConfigSrc = () => {
    return `${path || '/'}_app.config.js?v=${pkg.version}-${new Date().getTime()}`
  }

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_TITLE,
      },
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  })
  return htmlPlugin
}
