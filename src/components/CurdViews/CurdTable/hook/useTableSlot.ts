/*
 * @Author: 阮志雄
 * @Date: 2021-11-24 11:09:55
 * @LastEditTime: 2022-08-29 12:44:51
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-template-with-webpack\src\components\CurdViews\CurdTable\hook\useTableSlot.ts
 */
import { Ref, ref } from 'vue'
import { Icolumns } from '../../type'
export function useTableSlot(mColumns: Ref<Icolumns[]>) {
  const slotArr = ref<Array<any>>([])
  const Columns = mColumns.value

  function Maps(Columns: any[]) {
    Columns.forEach((item: { childrens?: any }) => {
      const keys = Object.keys(item)
      if (keys.includes('slot')) {
        slotArr.value.push(item)
      }
      if (item.childrens && item.childrens.length > 0) {
        Maps(item.childrens)
      }
    })
  }
  Maps(Columns)
  return { slotArr }
}
