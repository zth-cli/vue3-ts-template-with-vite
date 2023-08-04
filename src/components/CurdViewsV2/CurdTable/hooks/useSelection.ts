import { ref, computed } from 'vue'

export const useSelection = (rowKey = 'id') => {
  // 是否选中数据
  const isSelected = ref<boolean>(false)
  // 选中的数据列表
  const selectedRows = ref([])

  // 当前选中的所有ids(数组)，可根据项目自行配置id字段
  const selectedRowsIds = computed((): string[] => {
    const ids: string[] = []
    selectedRows.value.forEach((item) => ids.push(item[rowKey]))
    return ids
  })

  const selectionChange = (rowArr: any) => {
    rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
    selectedRows.value = rowArr
  }

  return {
    isSelected,
    selectedRows,
    selectedRowsIds,
    selectionChange,
  }
}
