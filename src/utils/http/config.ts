import { AxiosRequestConfig } from 'axios'

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.PROD ? '' : '',
  timeout: 30000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

export function genConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config) {
    return defaultConfig
  }
  const { headers } = config
  if (headers && typeof headers === 'object') {
    defaultConfig.headers = {
      ...defaultConfig.headers,
      ...headers,
    }
  }
  return { ...defaultConfig }
}

export const METHODS = ['post', 'get', 'put', 'delete', 'option', 'patch']

export const FILES_TYPES = {
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  zip: 'application/zip',
  pdf: 'application/pdf',
  json: 'application/json',
  ppt: 'application/vnd.ms-powerpoint',
  pttx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
}
