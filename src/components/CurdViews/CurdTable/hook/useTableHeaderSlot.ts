import { Ref, ref } from 'vue'
import { Icolumns } from '../../type'
export function useTableHeaderSlot(mColumns: Ref<Icolumns[]>) {
  const headerSlotArr = ref<Array<any>>([])
  const Columns = mColumns.value
  function Maps(mColumns: any[]) {
    mColumns.forEach((item: { childrens?: any }) => {
      const keys = Object.keys(item)
      if (keys.includes('headerSlot')) {
        headerSlotArr.value.push(item)
      }
      if (item.childrens && item.childrens.length > 0) {
        Maps(item.childrens)
      }
    })
  }
  Maps(Columns)
  return { headerSlotArr }
}
