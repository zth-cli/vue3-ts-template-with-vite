import { reactive } from 'vue'
import day from 'dayjs'
import { IformItem } from '../../type'
export const useDefaultData = (props) => {
  const orignalFormData: { [x: string]: any } = {}
  const fromData = reactive<{ [x: string]: any }>({})
  const typeArr: Array<string> = [
    'date',
    'daterange',
    'datetime',
    'datetimerange',
    'year',
    'month',
    'time',
    'timerange',
  ]

  if (props.fromOptions.length) {
    props.fromOptions.forEach((item: IformItem) => {
      for (const key in item) {
        if (key === 'name') {
          const str = item[key]
          fromData[str] = ''
        }
        if (key === 'remoteMethod' && item.remoteMethod && item.type === 'select') {
          item.remoteMethod.then((res) => {
            item.options = res
          })
        }
      }
      fromData[item.name] = item.default ? item.default : ''
      orignalFormData[item.name] = item.default ? item.default : ''
      if (typeArr.includes(item.type)) {
        fromData[item.name] = item.default ? item.default : day().format(item.format.toUpperCase())
        orignalFormData[item.name] = item.default ? item.default : day().format(item.format.toUpperCase())
      }
    })
  }
  const resetData = () => {
    for (const key in orignalFormData) {
      fromData[key] = orignalFormData[key]
    }
  }
  return {
    fromData,
    typeArr,
    resetData,
  }
}
