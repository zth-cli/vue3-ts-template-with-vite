import qs from 'qs'
import { http } from '@/utils/http'

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
