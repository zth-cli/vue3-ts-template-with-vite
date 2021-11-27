<template>
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
</template>

<script lang="ts">
import CurdView from '@/components/CurdViews/index.vue'
const tableOptions: ItableProps = {
  pageSize: 20,
  showPanelTool: true,
  params: {}, // params的改变都会触发，表格的重新查询
  dataUrl: '',
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
}
const fromOptions: formItem[] = [
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
  }
]
export default {
  data() {
    return {
      tableOptions,
      fromOptions,
      close: false
    }
  },
  components: { CurdView },
  methods: {
    rowAdd() {
      this.close = true
    },
    selectionChange(selection) {
      console.log(selection)
    },
    getRow(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss"></style>
