<template>
  <div>
    <FlowBar :options="fromOptions" :multiple="true"></FlowBar>
    <CurdView :tableOptions="tableOptions" :fromOptions="fromOptions" @selection-change="selectionChange" @row-add="rowAdd">
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
    <Overlay v-model="close">
      <FormData v-bind="fromDataOptions" :before-submit="beforeSubmit"></FormData>
    </Overlay>
  </div>
</template>

<script lang="ts" setup>
import { FlowBar } from '@/components/CurdViews/FlowBar'
import CurdView from '@/components/CurdViews/index.vue'
import { reactive, ref } from 'vue'
import Overlay from '@/components/Overlay/index.vue'
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
    options: [
      { label: '省调公司', value: '1232213213' },
      { label: '省调公司', value: '423' }
    ]
  }
]) as formItem[]

let fromDataOptions = {
  postParams: {},
  postUrl: '/api/modifyComment/create',
  contentType: 'form-data',
  formItem: reactive([
    {
      name: 'issueType',
      label: '故障类型',
      type: 'select',
      options: [
        {
          value: '计量故障',
          label: '计量故障'
        },
        {
          value: '电线打火',
          label: '电线打火'
        }
      ]
    },
    {
      name: 'date',
      label: '日期',
      type: 'date',
      format: 'yyyy-MM-dd',
      span: 12
    },
    {
      name: 'standardDetails',
      label: '标准化作业评分',
      type: 'editTable',
      span: 24,
      columns: [
        {
          name: 'standardDetail',
          label: '标准化作业',
          type: 'textarea'
        },
        {
          name: 'standardComment',
          label: '评分要求',
          type: 'textarea',
          maxlength: 100
        },
        {
          name: 'standardScore',
          label: '评价',
          type: 'text',
          default: 100
        }
      ]
      // default: [{ username: 'rzx', username1: '认真细致', content: ['1'] }]
    },
    {
      name: 'qualityDetails',
      label: '抢修质量评分',
      type: 'editTable',
      span: 24,
      columns: [
        {
          name: 'qualityDetail',
          label: '抢修质量',
          type: 'textarea'
        },
        {
          name: 'qualityComment',
          label: '评分要求',
          type: 'textarea',
          maxlength: 100
        },
        {
          name: 'qualityScore',
          label: '评价',
          type: 'text',
          default: 100
        }
      ]
      // default: [{ username: 'rzx', username1: '认真细致', content: ['1'] }]
    },
    {
      name: 'userComment',
      label: '用户评价',
      type: 'select',
      span: 8,
      options: [
        {
          value: '满意',
          label: '满意'
        },
        {
          value: '不满意',
          label: '不满意'
        }
      ],
      default: '满意'
    },
    {
      name: 'userScore',
      label: '用户评分',
      type: 'text',
      span: 8
    },
  ])
}
const rowAdd = () => {
  close.value = true
}
const selectionChange = (selection) => {
  console.log(selection)
}
const getRow = (row) => {
  console.log(row)
}

const beforeSubmit = (params)=> {
  console.log(params);
  
  return params
}
</script>
<style lang="scss"></style>
