<template>
  <div class="curd_table">
    <div class="panel_tool_left" v-if="props.showPanelTool && props.mode !== 'simple'">
      <el-button icon="plus" v-if="props.defaultPanel.includes('add')" type="primary" @click="addRow()">新增</el-button>
      <el-button icon="edit" v-if="props.defaultPanel.includes('edit')" type="primary" :disabled="isSingle" @click="editRow()">修改</el-button>
      <el-popover placement="bottom" :width="160" v-model:visible="visible">
        <p>确定删除吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" @click="deleteRows()">确定</el-button>
        </div>
        <template #reference>
          <el-button v-if="props.defaultPanel.includes('delete')" icon="circle-close" type="danger" class="warning" :disabled="isMultiple">删除</el-button>
        </template>
      </el-popover>
      <slot name="panel"></slot>
    </div>
    <div class="panel_tool_right" v-if="props.showSettingTool && props.mode !== 'simple'">
      <el-button type="primary" icon="refresh" @click="queryData"></el-button>
      <el-popover placement="bottom-end" :width="200" trigger="click">
        <div style="margin: 5px 0">
          <div v-for="(col, index) in props.columns" :key="index">
            <el-checkbox @change="columnsChange" v-if="col.label" v-model="col.show" :label="col.label">{{ col.label }}</el-checkbox>
          </div>
        </div>
        <template #reference>
          <el-button icon="caret-bottom"></el-button>
        </template>
      </el-popover>
    </div>
    <div class="curd_table_main">
      <DataTable
        ref="tableView"
        :columns="mColumns"
        :tableData="tableData"
        :border="props.border"
        :size="props.tableSize"
        :height="props.height"
        :rowKey="props.rowKey"
        :stripe="props.stripe"
        :treeProps="props.treeProps"
        :showSummary="props.showSummary"
        :summaryMethod="props.summaryMethod"
        :spanMethod="props.spanMethod"
        :pageSize="pageParam.pageSize"
        :pageIndex="pageParam.pageIndex"
        :showPage="props.showPage"
        :highlight-current-row="props.highlightCurrentRow"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
        @current-change="handleCurrentChange"
        style="width: 100%"
        v-loading="loading"
        :key="key"
      >
        <template v-for="item in slotArr" v-slot:[item.slot]="Props">
          <slot :name="item.slot" v-bind="Props"></slot>
        </template>
        <template v-for="item in headerSlotArr" v-slot:[item.headerSlot]="Props">
          <slot :name="item.headerSlot" v-bind="Props"></slot>
        </template>
        <template v-slot:index="Props">
          <slot name="index" v-if="props.showPage">{{ Props.index + (pageParam.pageIndex - 1) * pageParam.pageSize + 1 }}</slot>
          <slot name="index" v-else>{{ Props.index + 1 }}</slot>
        </template>
      </DataTable>
    </div>
    <div v-if="props.showPage" style="margin: 10px 10px 0 10px; overflow: hidden">
      <div :style="'text-align: ' + props.pageAlign">
        <el-pagination
          :total="total"
          :page-size="pageParam.pageSize"
          :current-page="pageParam.pageIndex"
          @current-change="changePage"
          @size-change="changePageSize"
          :size="props.tableSize"
          layout="total, sizes, prev, pager, next"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from '@/components/CurdViews/DataTable/DataTable.vue'
import { emits, defaulltProps } from './enums'
import { useTableSlot, useTableHeaderSlot, useTableFetchData } from './hook'
import { ref, computed, watch } from 'vue'
const tableView = ref<InstanceType<typeof DataTable>>(null)

const props = withDefaults(defineProps<ItableProp>(), { ...defaulltProps })
const visible = ref<boolean>(false)
let mColumns = ref<Icolumns[]>(props.columns)
let selection = ref<any[]>([])
const key = ref<number>(0)

const emit = defineEmits(emits) // 事件

const isSingle = computed(() => !(selection.value !== null && selection.value.length === 1))
const isMultiple = computed(() => !(selection.value != null && selection.value.length > 0))

const { queryData, loading, tableData, pageParam, total, lazyLoad } = useTableFetchData(props, emit, selection)

const changePage = (page: number) => {
  pageParam.pageIndex = page
  queryData()
}
const changePageSize = (limit: number) => {
  pageParam.pageIndex = 1
  pageParam.pageSize = limit
  queryData()
}
const rowClick = (row: any) => {
  emit('row-click', row)
}
const rowDblclick = (row: any) => {
  emit('row-dblclick', row)
}
const selectionChange = (rows: any) => {
  selection.value = rows
  emit('selection-change', selection.value)
}
const handleCurrentChange = (row: any) => {
  emit('current-change', row)
}
const addRow = () => {
  emit('row-add', true)
}
const editRow = () => {
  // 防止修改时，篡改table里的数据
  emit('row-edit', Object.assign({}, selection.value[0]))
}
const deleteRows = () => {
  visible.value = false
  emit('row-delete', selection.value)
}
const columnsChange = () => {
  const list = []
  for (let key = 0; key < props.columns.length; key++) {
    if (props.columns[key] instanceof Object && props.columns[key].show) {
      list.push(props.columns[key])
    }
  }
  key.value = key.value + Math.random()
  mColumns.value = list
}
// 初始化
if (!props.showPage) {
  delete pageParam.pageSize
  delete pageParam.pageIndex
}
const { slotArr } = useTableSlot(mColumns)
const { headerSlotArr } = useTableHeaderSlot(mColumns)

if (props.pageSize != null && props.showPage) {
  pageParam.pageSize = props.pageSize
}
props.columns.forEach((item: { show: boolean }) => {
  item.show = true
})
// watch
watch(
  () => props.params,
  (_curVal, _oldVal) => {
    if (props.showPage) {
      pageParam.pageIndex = 1
    }
    if (!lazyLoad.value) {
      queryData()
    }
    lazyLoad.value = false
  }
)
watch(props.columns, (curVal: Icolumns[], _oldVal) => {
  mColumns.value = curVal
})
watch(
  () => props.dataUrl,
  (_curVal, _oldVal) => {
    if (props.showPage) {
      pageParam.pageIndex = 1
    }
    queryData()
  }
)
const toggleRowSelection = (rows: any) => {
  // @ts-ignore
  tableView.value.toggleRowSelection(rows)
}
const toggleAllSelection = () => {
  // @ts-ignore
  tableView.value.toggleAllSelection()
}
defineExpose({
  queryData,
  toggleRowSelection,
  toggleAllSelection
})
interface ItableProp {
  columns: Icolumns[]
  tableData?: Array<any>
  tableSize?: string
  mode?: string
  defaultPanel?: Array<string>
  pageAlign?: string
  pageSize?: number
  pageIndex?: number
  showSettingToolbar?: boolean
  showPage?: boolean
  highlightCurrentRow?: boolean
  lazy?: boolean
  dataUrl?: string
  params?: { [x: string]: any }
  height?: string
  maxHeight?: string
  border?: boolean
  stripe?: boolean
  showSettingTool?: boolean
  showPanelTool?: boolean
  showSummary?: boolean
  responseName?: string | Array<string>
  isPrivate?: boolean
  summaryMethod?: (value: any, row: { [x: string]: any }, column: { property: any }) => void
  spanMethod?: () => void
  rowKey?: string
  treeProps?: { children: string; hasChildren: string }
}
</script>
<style lang="scss">
.curd_table {
  background-color: #fff;
  @include content-background();
  padding: 10px;
  border-radius: 4px;
  .panel_tool_left {
    float: left;
    color: #666;
    font-size: 14px;
    padding-bottom: 8px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    @include striped-background();
  }
  .panel_tool_right {
    float: right;
    padding-bottom: 8px;
  }
  button {
    margin-left: 8px;
  }
}
</style>
