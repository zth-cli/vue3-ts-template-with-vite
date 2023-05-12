import { ColumnProps } from '../..'
import { ref, provide } from 'vue'
export const useColEnum = () => {
  // 获取columns中的enum
  const enumMap = ref(new Map<string, { [key: string]: any }[]>())
  provide('enumMap', enumMap)
  const setEnumMap = async (column: ColumnProps) => {
    if (!column.enum) {
      return
    }
    if (typeof column.enum !== 'function') {
      return enumMap.value.set(column.prop!, column.enum!)
    }
    const { data } = await column.enum()
    enumMap.value.set(column.prop!, data)
  }
  return {
    setEnumMap,
    enumMap,
  }
}
