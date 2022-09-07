import { h, toRefs } from 'vue'
import { ElTag, ElTableColumn } from 'element-plus/es'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/table-column/style/css'
import { Icolumns } from '../../type'
type Iscope = { row?: { [x: string]: any }; column?: any; $index?: number }

export default function renderFunc(props: any, slots: any) {
  const { columns, showPage, pageIndex, pageSize } = toRefs(props)

  // let elememtArr = []
  function renders(columns: Icolumns[]) {
    const elememtArr = columns.map((item: Icolumns) => {
      // 参照elementui Table-column Attributes
      const columnProps: Icolumns = item
      if (item.filters) {
        columnProps.filterMethod = item.filterMethod ? item.filterMethod : filterHandler
      }
      if (item.type === 'index') {
        // @ts-ignore
        return h(ElTableColumn, columnProps, {
          default: (scope: { $index: number; row: any; column: any }) => {
            let index = null
            let indexEle = ''
            index = showPage.value ? (pageIndex.value - 1) * pageSize.value + scope.$index + 1 : scope.$index + 1
            if (item.slot) {
              // type为index 且有slot，提供插槽功能
              indexEle = slots[item.slot]({
                row: scope.row,
                colum: scope.column,
                index: scope.$index,
              })
            }
            return [h('p', [indexEle, h('span', index)])]
          },
        })
      }
      if (item.type === 'selection') {
        // @ts-ignore
        return h(ElTableColumn, {
          ...columnProps,
          type: item.type,
        })
      }
      if (item.type === 'expand') {
        return h(
          // @ts-ignore
          ElTableColumn,
          {
            ...columnProps,
            type: item.type,
          },
          {
            // scope 就相当于 slot-scope="{title}" 里面的值
            default: (scope: { row: any; column: any; $index: any }) => {
              return [
                h('p', [
                  slots[item.slot]({
                    row: scope.row,
                    colum: scope.column,
                    index: scope.$index,
                  }),
                ]),
              ]
            },
          }
        )
      }
      if (item.headerSlot && !item.slot) {
        // @ts-ignore
        return h(ElTableColumn, columnProps, {
          header: (scope: Iscope) => {
            return [
              h('p', [
                slots[item.headerSlot]({
                  row: scope.row,
                  colum: scope.column,
                  index: scope.$index,
                }),
              ]),
            ]
          },
        })
      }
      if (item.headerSlot && item.slot) {
        // @ts-ignore
        return h(ElTableColumn, columnProps, {
          default: (scope: Iscope) => {
            return [
              h('p', [
                slots[item.slot]({
                  row: scope.row,
                  colum: scope.column,
                  index: scope.$index,
                }),
              ]),
            ]
          },
          header: (scope: Iscope) => {
            return [
              h('p', [
                slots[item.headerSlot]({
                  row: scope.row,
                  colum: scope.column,
                  index: scope.$index,
                }),
              ]),
            ]
          },
        })
      }
      if (!item.headerSlot && item.slot) {
        // @ts-ignore
        return h(ElTableColumn, columnProps, {
          // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
          default: (scope: Iscope) => {
            return [
              h('p', [
                slots[item.slot]({
                  row: scope.row,
                  colum: scope.column,
                  index: scope.$index,
                }),
              ]),
            ]
          },
        })
      }
      if (item.prop && item.enum) {
        const enums = item.enum
        // @ts-ignore
        return h(ElTableColumn, columnProps, {
          default: (scope: Iscope) => {
            let node = null
            for (let index = 0; index < enums.length; index++) {
              const element = enums[index]
              if (element.id === scope.row[item.prop]) {
                node = h(
                  // @ts-ignore
                  ElTag,
                  {
                    size: 'small',
                    type: element.type ? element.type : '',
                  },
                  {
                    default: () => {
                      return element.value
                    },
                  }
                )
                break
              }
            }
            return node
          },
        })
      }
      if (item.childrens?.length > 0) {
        return h(
          // @ts-ignore
          ElTableColumn,
          { prop: item.prop, ...columnProps },
          {
            default: () => {
              return renders(item.childrens)
            },
          }
        )
      }
      // @ts-ignore
      return h(ElTableColumn, { prop: item.prop, ...columnProps })
    })
    return elememtArr
  }

  return renders(columns.value)
}
export function filterHandler(value: any, row: { [x: string]: any }, column: { property: any }) {
  const property = column.property
  return row[property] === value
}
// https://forum.vuejs.org/t/how-to-solve-the-non-function-value-encountered-for-default-slot-prefer-function-slots-for-better-performance-warning/109097
// which has only a getter 命名冲突
