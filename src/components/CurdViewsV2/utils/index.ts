import { isArray } from '@/utils'

/**
 * @description 格式化表格单元格默认值(el-table-column)
 * @param {Number} row 行
 * @param {Number} col 列
 * @param {String} callValue 当前单元格值
 * @return string
 * */
export function defaultFormat(row: number, col: number, callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) {
    return callValue.length ? callValue.join(' / ') : '--'
  }
  return callValue ?? '--'
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) {
    return callValue.length ? callValue.join(' / ') : '--'
  }
  return callValue ?? '--'
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes('.')) {
    return row[prop] ?? '--'
  }
  prop.split('.').forEach((item) => (row = row[item] ?? '--'))
  return row
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if (propArr.length === 1) {
    return prop
  }
  return propArr[propArr.length - 1]
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @return string
 * */
export function filterEnum(
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
): string {
  const value = fieldNames?.value ?? 'value'
  const label = fieldNames?.label ?? 'label'
  let filterData: { [key: string]: any } = {}
  if (Array.isArray(enumData)) {
    filterData = enumData.find((item: any) => item[value] === callValue)
  }
  return filterData ? filterData[label] : '--'
}

/**
 * @description 返货当前枚举的color
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @return string
 * */
export function filterEnumColor(
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
): string {
  const value = fieldNames?.value ?? 'value'
  let filterData: { [key: string]: any } = {}
  if (Array.isArray(enumData)) {
    filterData = enumData.find((item: any) => item[value] === callValue)
  }
  return filterData && filterData['color'] ? filterData['color'] : 'primary'
}
