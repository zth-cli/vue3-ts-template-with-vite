import { reactive, ref } from 'vue'
import { typeArr, dateType } from '../enum/index'
import dayjs from 'dayjs'
export const useDefaultData = (props) => {
  type formDataType = { [x: string]: any }
  const formData: formDataType = reactive({})
  let rules = reactive({})
  const invaildArr = ref<string[]>([])

  rules = props.rules
  props.formItem.forEach((item) => {
    for (const key in item) {
      if (key === 'name') {
        const str = item[key]
        formData[str] = ''
      }
      if (key === 'rules') {
        rules[item.name] = item[key]
      }
      if (key === 'invaild' && item.invaild) {
        // 筛选部分只显示不提交字段
        invaildArr.value.push(item.name)
      }
      if (key === 'remoteMethod' && item.remoteMethod && item.type === 'select') {
        item.remoteMethod.then((res) => {
          item.options = res
        })
      }
      if (typeArr.includes(item.type) && !dateType.includes(item.type)) {
        const keys = Object.keys(props.postParams)
        const defaultValue = keys.includes(item.name)
          ? props.postParams[item.name]
          : item.default !== 'undefined'
          ? item.default
          : null
        formData[item.name] = defaultValue
        if (item.multiple) {
          const mulValue = typeof defaultValue === 'string' ? defaultValue.split(',') : defaultValue
          formData[item.name] = mulValue || []
        }
        if (dateType.includes(item.type)) {
          formData[item.name] = item.default ? item.default : dayjs().format(item.format.toUpperCase())
        }
      }
      if (props.rowData) {
        props.rowData[item.name] ? (formData[item.name] = props.rowData[item.name]) : '' // 赋值对应key
      }
    }
  })
  return {
    formData,
    rules,
    invaildArr,
  }
}
