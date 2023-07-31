import { isArray } from '@/utils/types'

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
  window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
  if (val === null) {
    return 'null'
  }
  if (typeof val !== 'object') {
    return typeof val
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c: any) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let performanceNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (performanceNow + random) % 16 | 0
      performanceNow = Math.floor(performanceNow / 16)
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
  const num = Math.floor(Math.random() * (min - max) + max)
  return num
}

/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  const timeNow = new Date()
  // 获取当前小时
  const hours = timeNow.getHours()
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) {
    return `早上好 ⛅`
  }
  if (hours >= 10 && hours <= 14) {
    return `中午好 🌞`
  }
  if (hours >= 14 && hours <= 18) {
    return `下午好 🌞`
  }
  if (hours >= 18 && hours <= 24) {
    return `晚上好 🌛`
  }
  if (hours >= 0 && hours <= 6) {
    return `凌晨好 🌛`
  }
}

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
  fieldNames?: { label: string; value: string }
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
  fieldNames?: { label: string; value: string }
): string {
  const value = fieldNames?.value ?? 'value'
  let filterData: { [key: string]: any } = {}
  if (Array.isArray(enumData)) {
    filterData = enumData.find((item: any) => item[value] === callValue)
  }
  return filterData && filterData['color'] ? filterData['color'] : ''
}
