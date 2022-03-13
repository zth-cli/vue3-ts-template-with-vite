<template>
  <div>
    <FlowBar :options="fromOptions" :multiple="true"></FlowBar>
    <CurdView
      :tableOptions="tableOptions"
      :fromOptions="fromOptions"
      @selection-change="selectionChange"
      @row-add="rowAdd"
    >
      <template v-slot:action="{ row }">
        <el-button size="small" @click="getRow(row)">action</el-button>
      </template>
      <template v-slot:proflies="{ row }">
        <el-button size="small" @click="getRow(row)">proflies</el-button>
      </template>
      <template v-slot:operation="{ row }">
        <el-button size="small" @click="getRow(row)">operation</el-button>
      </template>
    </CurdView>
  </div>
</template>

<script lang="ts" setup>
import { FlowBar } from '@/components/CurdViews/FlowBar'
import CurdView from '@/components/CurdViews/index.vue'
import { reactive, ref } from 'vue';
let close = ref<boolean>(false)
let tableOptions = reactive({
  pageSize: 20,
  showPanelTool: true,
  params: {}, // params的改变都会触发，表格的重新查询
  dataUrl: '/getAsyncRoutes',
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
        { label: '操作', slot: 'operation', width: 150, align: 'center' }
      ]
    },
    { label: 'Action', slot: 'action', width: 150, align: 'center' }
  ]
}) as ItableProps
let fromOptions = reactive([
  { name: 'description', label: '角色描述', span: 6, type: 'text' },
  {
    name: 'occurTime',
    label: '日期',
    span: 6,
    type: 'date',
    format: 'yyyy-MM-dd'
  },
  {
    name: 'code',
    label: '电压等级',
    type: 'select',
    options: []
  },
  {
    name: 'area',
    title: '接入电网',
    options: [{ label: '省调公司', value: '1232213213' }, { label: '省调公司', value: '423' }]
  }
]) as formItem[]
const rowAdd = () => {
  close.value = true
}
const selectionChange = (selection) => {
  console.log(selection)
}
const getRow = (row) => {
  console.log(row)
}
</script>
<style lang="scss"></style>
