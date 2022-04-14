import { toRaw } from 'vue'

export const useQuery = (
  emit: (event: 'query' | 'resize' | 'params-change', ...args: any[]) => void,
  fromData: { [x: string]: any }
) => {
  const query = () => {
    const paramsData = {}
    const params = fromData
    for (const key in params) {
      if (params[key] instanceof Array) {
        // 对value为Array类型的进行字符串拼接
        paramsData[key] = params[key].join(',')
      } else {
        paramsData[key] = params[key]
      }
    }
    emit('query', toRaw(params))
  }
  return { query }
}
