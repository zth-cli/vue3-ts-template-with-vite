<template>
  <CurdView
    :table-options="tableOptions"
    :from-options="fromOptions"
    :tree-options="treeOptions"
    @selection-change="selectionChange"
    @node-click="treeNodeClick"
    @row-add="rowAdd"
  >
    <template #action="{ row }">
      <el-button size="small" @click="getRow(row)">action</el-button>
    </template>
    <template #proflies="{ row }">
      <el-button size="small" @click="getRow(row)">proflies</el-button>
    </template>
    <template #operation="{ row }">
      <el-button size="small" @click="getRow(row)">operation</el-button>
    </template>
  </CurdView>
</template>

<script lang="ts">
import CurdView from '@/components/CurdViews/index.vue'
import { IformItem, ItableProps, ItreeProps } from '@/components/CurdViews/type'
import { defineComponent } from 'vue'
const tableOptions: ItableProps = {
  pageSize: 20,
  showPanelTool: true,
  params: {}, // params的改变都会触发，表格的重新查询
  dataUrl: '/orderlyElectricityConsumption/XDAnalysis/getXDUserReport',
  columns: [
    { type: 'selection', width: 70, align: 'center' },
    { type: 'index', label: '序号', align: 'center', width: 80 },
    {
      label: '用户信息',
      align: 'center',
      headerAlign: 'center',
      prop: 'creator',
      childrens: [
        { prop: 'creator', label: '角色名', align: 'center', width: 180 },
        { prop: 'creator', label: '用户年龄', align: 'center' },
        { label: '用户', slot: 'proflies', align: 'center' },
        { label: '操作', slot: 'operation', width: 150, align: 'center' },
      ],
    },
    { label: 'Action', slot: 'action', width: 150, align: 'center' },
  ],
}
const fromOptions: IformItem[] = [
  { name: 'description', label: '角色描述', span: 6, type: 'text' },
  {
    name: 'occurTime',
    label: '日期',
    span: 6,
    type: 'date',
    format: 'yyyy-MM-dd',
  },
  {
    name: 'bvId',
    label: '电压等级',
    type: 'select',
    prop: { label: 'bvName', value: 'bvId' },
    options: [{ bvId: 1, bvName: '220kV' }],
  },
]
const treeOptions: ItreeProps = {
  dataUrl: '/esdaw0',
  search: true,
  treeProps: { children: 'children', label: 'label', disable: 'false' },
}
export default defineComponent({
  name: 'ViewTable',
  components: { CurdView },
  data() {
    return {
      tableOptions,
      fromOptions,
      treeOptions,
      close: false,
    }
  },
  methods: {
    rowAdd() {
      this.close = true
    },
    selectionChange(selection) {
      console.log(selection)
    },
    getRow(row) {
      console.log(row)
    },
    treeNodeClick({ data, node }) {
      console.log(data, node)
      //  合并操作，强制触发响应反应
      this.tableOptions.params = Object.assign({}, this.tableOptions.params, {
        stId: 1,
      })
    },
  },
})
</script>
<style lang="scss"></style>
