import { reactive, Ref, ref, unref } from 'vue'
import { http } from '@/utils/http'
import { defaultTableData } from '../enums'
export function useTableFetchData(
  props,
  emit: (arg0: string, arg1: any[] | Ref<any[]>) => void,
  selection: Ref<any[]>
) {
  const loading = ref<boolean>(false)
  const tableData = ref<any[]>(defaultTableData)
  const pageParam = reactive<{ pageSize: number; pageIndex: number }>({
    pageSize: 20,
    pageIndex: 1,
  })
  const total = ref<number>(0)
  const lazyLoad = ref<boolean>(props.lazy)

  const queryData = () => {
    let timeout: any = {}
    if (!props.dataUrl || loading.value) {
      return
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      selection.value = []
      tableData.value = []
      emit('selection-change', [])
      loading.value = true
      const params = props.showPage
        ? Object.assign({}, JSON.parse(JSON.stringify(pageParam)), props.params, {
            pageIndex: (pageParam.pageIndex - 1) * pageParam.pageSize,
          })
        : props.params
      http
        .get<any>(props.dataUrl, params)
        .then((res) => {
          loading.value = false
          if (res.code === 1) {
            let data = res.data
            total.value = res.pojoTotalCount
            if (props.responseName) {
              if (Array.isArray(props.responseName)) {
                props.responseName.forEach((item) => {
                  // @ts-ignore
                  data = data[item]
                })
              } else {
                data = res.data[props.responseName]
              }
            }

            if (props.isPrivate) {
              data.forEach((item: { _disabled: number }) => {
                // 添加私有属性，
                item._disabled = 0
              })
            }
            tableData.value = data
            emit('getTableData', unref(tableData))
          }
        })
        .catch(() => {
          loading.value = false
        })
    }, 200)
  }
  !lazyLoad.value && queryData()
  return {
    queryData,
    loading,
    tableData,
    pageParam,
    total,
    lazyLoad,
  }
}
