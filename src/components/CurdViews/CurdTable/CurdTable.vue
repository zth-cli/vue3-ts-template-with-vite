<template>
  <div class="curd_table">
    <h5 v-if="tableTitle" class="curd_title">{{ tableTitle }}</h5>
    <div class="panel_tool">
      <div v-if="props.mode !== 'simple'" class="panel_tool_left">
        <template v-if="props.showPanelTool">
          <el-button
            v-if="props.defaultPanel.includes('add')"
            :size="tableSize"
            icon="plus"
            type="success"
            @click="addRow()"
            >新增</el-button
          >
          <el-button
            v-if="props.defaultPanel.includes('edit')"
            icon="edit"
            type="primary"
            :size="tableSize"
            :disabled="isSingle"
            @click="editRow()"
            >修改</el-button
          >
          <el-popover v-model:visible="visible" placement="top" :width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="text" :size="tableSize" @click="visible = false">取消</el-button>
              <el-button type="primary" :size="tableSize" @click="deleteRows()">确定</el-button>
            </div>
            <template #reference>
              <el-button
                v-if="props.defaultPanel.includes('delete')"
                icon="circle-close"
                type="danger"
                :size="tableSize"
                :disabled="isMultiple"
                @click="visible = true"
                >删除</el-button
              >
            </template>
          </el-popover>
          <el-button
            v-if="props.defaultPanel.includes('export')"
            :size="tableSize"
            icon="download"
            type="primary"
            @click="exportData()"
            >导出</el-button
          >
          <slot name="panel"></slot>
        </template>
      </div>
      <div v-if="props.showSettingTool && props.mode !== 'simple'" class="panel_tool_right">
        <el-icon :class="['icon', { refresh: loading }]" title="刷新" @click="queryData"><RefreshRight /></el-icon>
        <el-popover placement="bottom-end" :width="80" trigger="click">
          <div style="margin: 5px 0">
            <div v-for="(col, index) in sizeArr" :key="index">
              <el-radio v-model="size" :label="col.value" @change="sizeChange">{{ col.label }}</el-radio>
            </div>
          </div>
          <template #reference>
            <el-icon class="icon" title="密度"><Operation /></el-icon>
          </template>
        </el-popover>
        <el-popover placement="bottom-end" :width="160" trigger="click">
          <div style="margin: 5px 0">
            <div v-for="(col, index) in props.columns" :key="index">
              <el-checkbox v-if="col.label" v-model="col.show" :label="col.label" @change="columnsChange">{{
                col.label
              }}</el-checkbox>
            </div>
          </div>
          <template #reference>
            <el-icon class="icon" title="表格列"><Setting /></el-icon>
          </template>
        </el-popover>
      </div>
    </div>
    <slot name="panel-gap"></slot>
    <div class="curd_table_main">
      <DataTable
        ref="tableView"
        :key="key"
        v-loading="loading"
        :columns="mColumns"
        :table-data="tableData"
        :border="props.border"
        :size="size"
        :height="props.height"
        :row-key="props.rowKey"
        :stripe="props.stripe"
        :tree-props="props.treeProps"
        :show-summary="props.showSummary"
        :summary-method="props.summaryMethod"
        :span-method="props.spanMethod"
        :page-size="pageParam.pageSize"
        :page-index="pageParam.pageIndex"
        :show-page="props.showPage"
        :highlight-current-row="props.highlightCurrentRow"
        style="width: 100%"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @selection-change="selectionChange"
        @current-change="handleCurrentChange"
      >
        <template v-for="item in slotArr" #[item.slot]="Props">
          <slot :name="item.slot" v-bind="Props"></slot>
        </template>
        <template v-for="item in headerSlotArr" #[item.headerSlot]="Props">
          <slot :name="item.headerSlot" v-bind="Props"></slot>
        </template>
        <template #index="Props">
          <slot v-if="props.showPage" name="index">{{
            Props.index + (pageParam.pageIndex - 1) * pageParam.pageSize + 1
          }}</slot>
          <slot v-else name="index">{{ Props.index + 1 }}</slot>
        </template>
      </DataTable>
    </div>
    <div v-if="props.showPage" style="margin: 10px 10px 0 10px; overflow: hidden">
      <div :style="'text-align: ' + props.pageAlign">
        <el-pagination
          :total="total"
          :page-sizes="[20, 40, 80, 100]"
          :page-size="pageParam.pageSize"
          :current-page="pageParam.pageIndex"
          small
          layout="total, sizes, prev, pager, next"
          background
          @current-change="changePage"
          @size-change="changePageSize"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*global Icolumns*/
import DataTable from '@/components/CurdViews/DataTable/DataTable.vue'
import { emits, defaulltProps } from './enums'
import { useTableSlot, useTableHeaderSlot, useTableFetchData, useExportTable } from './hook'
import { ref, computed, watch, toRaw } from 'vue'
import { Icolumns } from '../type'
const tableView = ref<InstanceType<typeof DataTable>>(null)

const props = withDefaults(defineProps<ItableProp>(), { ...defaulltProps, tableSize: 'default' })
const visible = ref<boolean>(false)
const mColumns = ref<Icolumns[]>([])
const selection = ref<any[]>([])
const key = ref<number>(0)

const emit = defineEmits(emits) // 事件

mColumns.value = props.columns.filter((item) => !item.disabled)
const isSingle = computed(() => !(selection.value !== null && selection.value.length === 1))
const isMultiple = computed(() => !(selection.value !== null && selection.value.length > 0))

const sizeArr = [
  { label: '默认', value: 'default' },
  { label: '宽松', value: 'large' },
  { label: '紧凑', value: 'small' },
]
const sizeChange = (val) => {
  console.log(val)
}
const { queryData, loading, tableData, pageParam, total, lazyLoad, size } = useTableFetchData(props, emit, selection)

const { exportData } = useExportTable(props)

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

if (props.pageSize !== null && props.showPage) {
  pageParam.pageSize = toRaw(props.pageSize)
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
watch(
  () => props.columns,
  (curVal: Icolumns[], _oldVal) => {
    mColumns.value = curVal.filter((item) => !item.disabled)
  },
  { deep: true }
)
watch(
  () => props.dataUrl,
  (_curVal, _oldVal) => {
    if (props.showPage) {
      pageParam.pageIndex = 1
    }
    // queryData()
  }
)
watch(
  () => props.initData,
  (_curVal, _oldVal) => {
    tableData.value = _curVal
  },
  { deep: true, immediate: true }
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
  toggleAllSelection,
})
interface ItableProp {
  columns: Icolumns[]
  initData?: Array<any>
  tableTitle?: string
  tableSize?: 'large' | 'default' | 'small'
  mode?: string
  defaultPanel?: Array<string>
  pageAlign?: string
  pageSize?: number
  pageIndex?: number
  showSettingToolbar?: boolean
  showPage?: boolean
  highlightCurrentRow?: boolean
  lazy?: boolean
  exportUrl?: string
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
  spanMethod?: ({ row, column, rowIndex, columnIndex }) => Array<number> | object
  rowKey?: string
  treeProps?: { children: string; hasChildren: string }
}
</script>
<script lang="ts">
export default {
  name: 'CurdTable',
}
</script>
<style lang="scss">
.curd_table {
  background-color: var(--content-background);
  padding: 10px;
  border-radius: 2px;
  .curd_title {
    letter-spacing: 3px;
    text-indent: 4px;
    position: relative;
    margin-bottom: 10px;
    font-size: 14px;
    text-indent: 12px;
    &::after {
      content: '';
      position: absolute;
      left: 0px;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--color-primary);
    }
  }
  .panel_tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-bottom: 10px;
  }
  .panel_tool_left {
    float: left;
    color: #666;
    font-size: 14px;
    padding-bottom: 8px;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    // @include striped-background();
  }
  .panel_tool_right {
    float: right;
    padding-bottom: 8px;
    .icon {
      font-size: 20px;
      cursor: pointer;
      margin: 0 6px;
      &:hover {
        color: var(--color-primary);
      }
    }
    .refresh {
      animation: refresh 0.5s linear infinite;
    }
    @keyframes refresh {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
  button {
    margin-left: 8px;
  }
}
</style>
