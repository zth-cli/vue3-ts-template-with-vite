import Request from './request'

import type { RequestConfig } from './request/types'
interface ZTHRequestConfig<T> extends RequestConfig {
  data?: T
}
interface ZTHResponse<T> {
  statusCode: number
  desc: string
  result: T
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => config,
    // 响应拦截器
    responseInterceptors: (result) => result
  }
})

/**
 * @description: 函数的描述
 * @interface D 请求参数的interface
 * @interface T 响应结构的intercept
 * @param {ZTHRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const zthRequest = <D, T = any>(config: ZTHRequestConfig<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<ZTHResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}

export default zthRequest
