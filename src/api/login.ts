import { http } from '@/utils/http'
import { AxiosRequestConfig } from 'axios'

// 获取验证码
export const getVerify = (): Promise<IRes<IGiftInfo>> => {
  return http.request<IRes<IGiftInfo>>('get', '/orderlyElectricityConsumption/electricAnalysis/getOverviewRation', {
    occurDate: '2021-10-22',
  })
}

// 接口返回类型定义 例子
export const getGiftlist = (params: any): Promise<IRes<IGiftInfo>> => {
  return http.get('/apis/gift/list', params)
}

export const getAsyncRoutes = (data?: object) => {
  return http.request<{ list: Array<IrouteItem>; code: number }>('get', '/getAsyncRoutes', data)
}

// 不定参数请求
// get
export async function apiGet(url: string, params?: any): Promise<any> {
  const res = await http.get(url, params)
  return res
}
// post
export async function apiPost(url: string, params: any, config?: AxiosRequestConfig<any>): Promise<any> {
  const res = await http.post(url, params, config)
  return res
}
// upload
export async function apiUpload(url: string, params: any): Promise<any> {
  const res = await http.post(url, params)
  return res
}
