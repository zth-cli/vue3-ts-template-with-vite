<script lang="ts">
import { ElTable } from 'element-plus/es'
import 'element-plus/es/components/table/style/css'
import { h, toRefs, defineComponent, ref, watch } from 'vue'
import { defaultProps } from './enums'
import useTableRender from './hook/useTableRender'

export default defineComponent({
  name: 'DataTable',
  props: defaultProps,

  emits: ['row-click', 'row-dblclick', 'selection-change', 'current-change', 'header-click'],
  setup(props, { emit, slots, expose }) {
    const tableInstance = ref(null)
    let tableColumns = useTableRender(props, slots)
    const { rowKey } = toRefs(props)
    const toggleRowSelection = (rows: any[]) => {
      if (rows) {
        rows.forEach((row: any) => {
          setTimeout(() => {
            tableInstance.value.toggleRowSelection(row)
          }, 0)
        })
      } else {
        tableInstance.value.clearSelection()
      }
    }
    const toggleAllSelection = () => {
      tableInstance.value.toggleAllSelection()
    }
    watch(
      () => props.columns,
      () => {
        tableColumns = useTableRender(props, slots)
      },
      { deep: true }
    )
    expose({
      // 对父级暴露方法和属性
      toggleRowSelection,
      toggleAllSelection,
    })
    return () =>
      h(
        // @ts-ignore
        ElTable,
        {
          ref: tableInstance,
          rowKey: rowKey.value, // 支持树类型的数据的显示,必须要指定 row-key
          treeProps: props.treeProps,
          data: props.tableData,
          border: props.border,
          size: props.tableSize,
          height: props.height,
          maxHeight: props.maxHeight,
          highlightCurrentRow: props.highlightCurrentRow,
          showSummary: props.showSummary,
          summaryMethod: props.summaryMethod,
          spanMethod: props.spanMethod,
          stripe: props.stripe,
          style: {
            width: '100%',
          },
          onRowClick: (row: any) => {
            emit('row-click', row)
          },
          onRowDblclick: (row: any) => {
            emit('row-dblclick', row)
          },
          onSelectionChange: (selection: any[]) => {
            emit('selection-change', selection)
          },
          onCurrentChange: (row: any) => {
            emit('current-change', row)
          },
          onHeaderClick: (column: any, event: Event) => {
            emit('header-click', { column, event })
          },
        },
        {
          default: () => {
            return tableColumns
          },
        }
      )
  },
})
</script>
<style lang="scss"></style>
