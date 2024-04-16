import { isFunction, isObject, isPromise, isString } from '@/utils'
import { ModelValueType, ZthFormItemProp } from '..'
import { SetupContext } from 'vue'

/**
 * @description 过滤slots
 * @param slots
 * @param name
 * @returns
 */
export const filterSlots = (slots: RecordType, name: string): SetupContext['slots'] => {
  const data: RecordType = {}
  Object.keys(slots || {}).forEach((key) => {
    if (key.startsWith(name)) {
      data[key] = slots[key]
    }
  })

  return data
}

/**
 * 处理slot名称
 */
export const getSlotName = (type: string, prop?: string | number) => {
  return prop ? `zth-${type}-${prop}` : `zth-${type}`
}

/**
 * 处理form-item中的slot名称
 */
export const getFieldSlotName = (prop?: string | number) => {
  return `${getSlotName('field', prop)}`
}

/**
 *   处理form-item中的label slot名称
 */
export const getLabelSlotName = (prop?: string | number) => {
  return `${getSlotName('label', prop)}`
}
/**
 *   处理form-item中的 extra slot名称
 */
export const getExtraSlotName = (prop?: string | number) => {
  return `${getSlotName('extra', prop)}`
}

/**
 * @description 获取数据类型
 * @param value
 * @returns string
 */
export const toRawType = (value: any): string => {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * @description 抛出异常
 * @param data
 * @param type
 */
const throwError = (data: any, type: string) => {
  if (!isObject(data)) {
    throw new Error(`${type} expected Object but got ${toRawType(data)}`)
  }
}
/**
 * @description 获取自定义的props 支持对象 函数 和 Promise(PropsItemType类型)
 * @param props
 * @param value
 * @param row
 * @returns
 */
export const getCustomProps = async (
  props: RecordType | ((...arg: any) => RecordType | Promise<RecordType>) | undefined,
  value: ModelValueType | undefined,
  row: RecordType,
  index: number,
  type: 'formItemProps' | 'fieldProps',
): Promise<any> => {
  try {
    let data: RecordType = {}
    const params = { row, index }

    if (!props) {
      data = {}
    } else if (isRef(props)) {
      // computed 支持
      data = props.value as RecordType
    } else if (isObject(props)) {
      // object 支持
      data = { ...props }
    } else if (isFunction(props)) {
      // 函数 和  函数返回一个Promise
      data = await (props as any)(value, params)
    } else if (isPromise(props)) {
      // 本身是一个Promise
      data = await (props as any)
    } else {
      data = props
    }

    throwError(data, type)

    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * @description 获取tooltip
 * @param tooltip
 * @returns
 */
export const getTooltip = (tooltip: ZthFormItemProp['tooltip']) => {
  if (isString(tooltip)) {
    return { content: tooltip }
  }
  if (isObject(tooltip)) {
    return tooltip as RecordType
  }
}
