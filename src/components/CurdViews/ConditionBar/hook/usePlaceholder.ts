import { IformItem } from '../../type'

export const usePlaceholder = (item: IformItem) => {
  if (item.label) {
    return item.label
  }
  let result
  if (item.placeholder === null) {
    switch (item.type) {
      case 'text':
        result = item.disabled || item.readonly ? '' : item.label
        break
      case 'popText':
        result = item.disabled || item.readonly ? '' : '请选择...'
        break
      case 'time':
        result = item.disabled || item.readonly ? '' : '选择时间'
        break
      case 'datetime':
      case 'date':
        result = item.disabled || item.readonly ? '' : '选择日期'
        break
      case 'datetimerange':
        result = item.disabled || item.readonly ? '' : '选择时间段'
        break
      case 'year':
        result = item.disabled || item.readonly ? '' : '选择年份'
        break
      default:
        result = ''
        break
    }
  } else {
    result = item.placeholder
  }
  return result
}
