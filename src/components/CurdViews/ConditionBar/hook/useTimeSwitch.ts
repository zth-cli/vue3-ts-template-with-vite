import day from 'dayjs'
import { ref } from 'vue'
export const useTimeSwitch = (fromData: { [x: string]: any }) => {
  const switchIndex = ref<number>(0)
  const switchDate = (prop: string, typeObj, typeParamName: string, index) => {
    switchIndex.value = index
    const format =
      typeObj.type === 'date'
        ? 'YYYY-MM-DD'
        : typeObj.type === 'month'
        ? 'YYYY-MM'
        : typeObj.type === 'year'
        ? 'YYYY'
        : 'YYYY-MM-DD'
    // 解决日期选择多日后，切换为日和月报错问题
    const date = typeof fromData[prop] === 'string' ? fromData[prop] : fromData[prop][0]
    fromData[prop] = day(date).format(format.toUpperCase())
    if (typeParamName) {
      fromData[typeParamName] = typeObj.typeName
    }
  }
  return { switchDate, switchIndex }
}
