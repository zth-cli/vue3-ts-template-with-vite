import { inject, ref } from 'vue'
import { filterEnum, filterEnumColor, formatValue, handleRowAccordingToProp } from '@/utils/util'
import { ColumnProps, HeaderRenderScope, RenderScope } from '@/components/CurdViewsV2'

export const TableColumn = defineComponent({
  name: 'TableColumn', // 组件名
  props: {
    column: {
      type: Object as PropType<ColumnProps>,
      required: true,
    },
  },
  setup(props, { slots }) {
    // defineOptions({ name: 'TableColumn' })

    const enumMap = inject('enumMap', ref(new Map()))

    // 渲染表格数据
    const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
      return enumMap.value.get(item.prop) && item.isFilterEnum
        ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
        : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
    }

    // 获取 tag 类型
    const getTagType = (item: ColumnProps, scope: { [key: string]: any }) => {
      return filterEnumColor(
        handleRowAccordingToProp(scope.row, item.prop!),
        enumMap.value.get(item.prop),
        item.fieldNames,
      ) as any
    }
    const columnAttrs = (item: ColumnProps) => {
      const attrs = Object.assign({}, item)
      if (attrs.children) {
        delete attrs.children
      }
      return attrs
    }
    const renderLoop = (item: ColumnProps) => {
      return (
        <>
          {!item.hidden && (
            <el-table-column
              {...columnAttrs(item)}
              align={item.align || 'center'}
              showOverflowTooltip={item.showOverflowTooltip || true}>
              {{
                default: (scope: RenderScope<any>) => {
                  if (item.children) {
                    // 多级表头
                    return item.children.map((child) => renderLoop(child))
                  }
                  if (item.renderCell) {
                    // tsx || 渲染函数自定义单元格内容渲染
                    return item.renderCell(scope)
                  }
                  if (slots[item.prop!]) {
                    // 传递插槽, 插槽名为列的prop
                    return slots[item.prop!]!(scope)
                  }
                  if (item.enum) {
                    // 如果有枚举类型，根据值渲染对应的枚举名称
                    return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>
                  }
                  // 正常处理
                  return renderCellData(item, scope)
                },
                header: (scope: HeaderRenderScope<any>) => {
                  if (item.headerRender) {
                    // tsx || 渲染函数自定义表头内容渲染
                    return item.headerRender(scope)
                  }
                  if (slots[`${item.prop}Header`]) {
                    // 传递插槽, 插槽名为列的prop + Header
                    return slots[`${item.prop}Header`]!(scope)
                  }
                  return item.label
                },
              }}
            </el-table-column>
          )}
        </>
      )
    }
    return () => renderLoop(props.column)
  },
})
