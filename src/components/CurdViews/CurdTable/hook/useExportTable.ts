import { reactive, Ref, ref } from 'vue'
import { http } from '@/utils/http'
import { ItableProps } from '../../type'

export function useExportTable(props: ItableProps) {
  const pageParam = reactive<{ pageSize: number; pageIndex: number }>({
    pageSize: 20,
    pageIndex: 1,
  })
  const error = ref(null)

  const exportData = () => {
    if (props.exportUrl) {
      const params = props.showPage
        ? Object.assign({}, JSON.parse(JSON.stringify(pageParam)), props.params)
        : props.params
      http
        .get<any>(props.exportUrl, params)
        .then((result) => {
          window.location = result.request.responseURL
        })
        .catch((err) => {
          error.value = err
        })
    }
  }
  return { exportData, error }
}
