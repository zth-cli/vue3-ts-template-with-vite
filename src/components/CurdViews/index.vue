<template>
  <div class="curd_view">
    <div class="curd_tree_view" v-if="treeOptions">
      <!-- <lazy-tree
        v-if="treeOptions.isLazyLoad"
        @changeSatus="trigger"
        @nodeClick="treeNodeClick"
        @node-expand="nodeExpand"
        @tab-click="tabClick"
        :renderFunction="treeOptions.renderContent"
        :dataUrlArr="treeOptions.dataUrlArr"
        :search="treeOptions.search"
        :isLazyLoad="treeOptions.isLazyLoad"
        :defaultExpandedNodes="treeOptions.defaultExpandedNodes"
        ref="lazyTree"
      >
        <template v-slot:searchselect>
          <slot name="searchselect"></slot>
        </template>
      </lazy-tree> -->
      <Tree
        @changeSatus="triggerTree"
        @nodeClick="treeNodeClick"
        :dataUrl="props.treeOptions.dataUrl"
        :search="props.treeOptions.search"
      >
        <template #default="{ node, data }">
          <slot v-bind="{ node, data }">
            <i class="el-icon-folder"> </i>
            <span>{{ node[props.treeOptions.treeProps['label']] }}</span>
          </slot>
        </template>
      </Tree>
    </div>

    <div class="curd_table_view">
      <div :class="[{ boxShadow: tableOptions.mode !== 'simple' }, { mb: tableOptions.mode !== 'simple' }]">
        <ConditionBar
          v-if="showSearchDynamic"
          :width="fromWidth"
          :mode="tableOptions.mode"
          :fromOptions="fromOptions"
          @query="query"
          @params-change="paramsChange"
        >
          <template v-slot:tool>
            <slot name="tool"></slot>
          </template>
          <template v-slot:rtool>
            <slot name="rtool"></slot>
          </template>
          <template v-slot:ltool>
            <slot name="ltool"></slot>
          </template>
        </ConditionBar>
      </div>
      <div :class="{ boxShadow: tableOptions.mode !== 'simple' }">
        <CurdTable
          ref="tableView"
          :highlightCurrentRow="tableOptions.highlightCurrentRow"
          :columns="tableOptions.columns"
          :lazy="tableOptions.lazy"
          :dataUrl="tableOptions.dataUrl"
          :limit="tableOptions.pageSize"
          :isPrivate="tableOptions.isPrivate"
          :params="tableOptions.params"
          :height="tableOptions.height"
          :rowKey="tableOptions.rowKey"
          :stripe="tableOptions.stripe"
          :treeProps="tableOptions.treeProps"
          :maxHeight="tableOptions.maxHeight"
          :showPage="tableOptions.showPage"
          :showPanelTool="tableOptions.showPanelTool"
          :mode="tableOptions.mode"
          :defaultPanel="tableOptions.defaultPanel"
          :border="tableOptions.border"
          :showSummary="tableOptions.showSummary"
          :summaryMethod="tableOptions.summaryMethod"
          :spanMethod="tableOptions.spanMethod"
          :showSettingTool="tableOptions.showSettingTool"
          :responseName="tableOptions.responseName"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @row-add="addRow"
          @row-edit="editRow"
          @row-delete="deleteRows"
          @selection-change="selectionChange"
          @getTableData="getTableData"
          @current-change="handleCurrentChange"
        >
          <!-- 自定义表格slot -->
          <template v-for="item in slotArr" v-slot:[item.slot]="Props">
            <!--  父组件调用  老版本为：slot-scope="{ row, index }" -->
            <slot :name="item.slot" v-bind="Props"></slot>
          </template>
          <template v-for="item in headerSlotArr" v-slot:[item.headerSlot]="Props">
            <slot :name="item.headerSlot" v-bind="Props"></slot>
          </template>
          <template v-slot:panel>
            <slot name="panel"></slot>
          </template>
        </CurdTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tree } from './Tree'
import LazyTree from './LazyTree.vue'
import { CurdTable } from './CurdTable'
import { ConditionBar } from './ConditionBar'
import { emits } from './CurdTable/enums'
import { reactive, ref } from 'vue'

const tableView = ref(null)
let toggle = ref<boolean>(false)
let slotArr = ref<Array<any>>([])
let headerSlotArr = ref<Array<any>>([])

interface IcurdView {
  treeOptions?: ItreeProps
  tableOptions?: ItableProps
  fromOptions?: Array<formItem>
  fromWidth?: string
  showSearchDynamic?: boolean
}
const props = withDefaults(defineProps<IcurdView>(), {
  showSearchDynamic: true,
})

const emit = defineEmits(emits)

// 获取table数据,推荐此做法获取tableData
const getTableData = (rows) => {
  emit('getTableData', rows)
}
const tableData = () => {
  // 此方法会直接暴露tableData，可对表格数据直接增删操作，建议在getTableData事件之后获取数据
  return tableView.value.tableData
}
const rowClick = (row) => {
  emit('row-click', row)
}
const rowDblclick = (row) => {
  emit('row-dblclick', row)
}
const selectionChange = (selection) => {
  if (selection) {
    emit('selection-change', selection)
  }
}
const toggleRowSelection = (rows) => {
  tableView.value.toggleRowSelection(rows)
}
const toggleAllSelection = () => {
  // 全选
  tableView.value.toggleAllSelection()
}
defineExpose({
  toggleRowSelection,
  toggleAllSelection
})
const handleCurrentChange = (row) => {
  emit('current-change', row)
}
const deleteRows = (rows) => {
  emit('row-delete', rows)
}
const editRow = (row) => {
  emit('row-edit', row)
}
const addRow = (bool) => {
  emit('row-add', bool)
}
const paramsChange = (params) => {
  emit('params-change', params)
  props.tableOptions.params = Object.assign({}, props.tableOptions.params, params)
  console.log(props.tableOptions.params)
}
const triggerTree = (bool: boolean) => {
  toggle.value = bool
}
const treeNodeClick = ({ data, node }) => {
  emit('node-click', { data, node })
}
const query = () => {
  tableView.value.queryData()
}
const refresh = () => {
  tableView.value.queryData()
}
const getSlot = () => {
  const mColumns = props.tableOptions.columns
  function Maps(mColumns) {
    mColumns.forEach((item) => {
      const keys = Object.keys(item)
      if (keys.includes('slot')) {
        slotArr.value.push(item)
        // console.log("slot=", that.slotArr);
      }
      if (item.childrens && item.childrens.length > 0) {
        Maps(item.childrens)
      }
    })
  }
  Maps(mColumns)
}
const getHeaderSlot = () => {
  const mColumns = props.tableOptions.columns
  function Maps(mColumns) {
    mColumns.forEach((item) => {
      const keys = Object.keys(item)
      if (keys.includes('headerSlot')) {
        headerSlotArr.value.push(item)
      }
      if (item.childrens && item.childrens.length > 0) {
        Maps(item.childrens)
      }
    })
  }
  Maps(mColumns)
}
const nodeExpand = (data, node) => {
  emit('node-expand', data, node)
}
const tabClick = (val) => {
  emit('tab-click', val)
}
getSlot()
getHeaderSlot()
</script>
<style lang="scss">
.curd_view {
  display: flex;
  height: 100%;
}
.curd_tree_view {
  width: auto;
  min-height: 100%;
  border-radius: 0 4px 4px 0;
}
.curd_table_view {
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
  flex: 1;
  padding-top: 0;
  /* padding-right: 0; */
  // .boxShadow {
  //   @include box-shadow();
  // }
}
</style>
