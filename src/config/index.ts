import { App } from 'vue'
import axios from 'axios'
let config: object = {}
let params = ''
const setConfig = (cfg?: unknown) => {
  config = Object.assign(config, cfg)
}

const getConfig = (key?: string): ServerConfigs => {
  if (typeof key === 'string') {
    const arr = key.split('.')
    if (arr && arr.length) {
      let data = config
      arr.forEach((v) => {
        if (data && typeof data[v] !== 'undefined') {
          data = data[v]
        } else {
          data = null
        }
      })
      return data
    }
  }
  return config
}

// 获取项目动态全局配置
export const getServerConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig()
  return axios({
    baseURL: '',
    method: 'get',
    url: process.env.NODE_ENV === 'production' ? './serverConfig.json' : '/serverConfig.json'
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config
      // 自动注入项目配置
      if (app && $config && typeof config === 'object') {
        $config = Object.assign($config, config)
        app.config.globalProperties.$config = $config
        // 设置全局配置
        setConfig($config)
      }
      return $config
    })
    .catch(() => {
      throw '请在public文件夹下添加serverConfig.json配置文件'
    })
}
export const setParams = (): void => {
  params = 'hell0'
}
export { getConfig, setConfig, params }
