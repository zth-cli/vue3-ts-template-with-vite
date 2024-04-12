<template>
  <Playground>
    <CurdTable
      ref="tableRef"
      title="用户列表"
      highlight-current-row
      size="small"
      :columns="columns"
      :request-api="getGiftlist"
      :row-class-name="tableRowClassName"
      :span-method="objectSpanMethod"
      :show-summary="true"
      :summary-method="getSummaries"
      @row-click="rowClick"
    >
      <!-- 表格 header 按钮 -->
      <template #table-header="scope">
        <el-button type="primary" :icon="CirclePlus" @click="tableRef?.el?.toggleAllSelection()">
          全选 / 全不选
        </el-button>
        <el-button type="primary" :icon="Finished" plain @click="setCurrent">选中第二行</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope['isSelected']"
          @click="batchDelete(scope['selectedRowsIds'])"
        >
          批量删除
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 自定义标题 -->
      <template #createTimeHeader>
        <el-button type="primary">自定义表头</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
      <template #append>
        <span style="color: var(--el-color-primary)">
          我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。
        </span>
      </template>
    </CurdTable>
  </Playground>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ColumnProps } from '@/components/CurdViewsV2'
import { useHandleData } from '@/hooks/useHandleData'
import CurdTable from '@/components/CurdViewsV2/CurdTable/index.vue'
import { CirclePlus, Finished, Delete, Refresh } from '@element-plus/icons-vue'
import { getGiftlist } from '@/api'

// 获取 CurdTable DOM
const tableRef = ref(null)
// 自定义渲染表头（使用tsx语法）
const renderHeader = (scope) => {
  return (
    <el-button type='primary' onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
      {scope.column.label}
    </el-button>
  )
}
// 表格配置项
const columns: ColumnProps<any>[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  // { type: 'radio', label: '单选', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { type: 'expand', label: 'Expand', width: 100 },
  {
    prop: 'base',
    label: '基本信息',
    children: [
      {
        prop: 'username',
        label: '用户姓名',
        width: 110,
        search: { type: 'input', order: 2, defaultValue: '男', tooltip: '这是提示！😃' },
      },
      { prop: 'age', label: '年龄', width: 100, search: { type: 'input', order: 2, defaultValue: '男' } },
      {
        prop: 'gender',
        label: '性别',
        search: { type: 'select', order: 2 },
        isFilterEnum: true,
        enum: [
          { label: '男', value: 1 },
          { label: '女', value: 2, color: 'danger' },
        ],
        width: 100,
      },
      {
        prop: 'details',
        label: '详细资料',
        children: [
          { prop: 'idCard', label: '身份证号' },
          { prop: 'email', label: '邮箱' },
          { prop: 'address', label: '居住地址' },
        ],
      },
    ],
  },
  {
    prop: 'status',
    label: '用户状态',
    search: { type: 'input', order: 1 },
    enum: [
      { label: '正常', value: 1 },
      { label: '禁用', value: 2, color: 'danger' },
    ],
  },
  {
    prop: 'createTime',
    // renderHeader,
    label: '创建时间',
    width: 200,
    search: { type: 'date-picker', order: 2, defaultValue: '男' },
  },
  // { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
]

watch(
  () => tableRef.value?.radio,
  () => tableRef.value?.radio && ElMessage.success(`选中 id 为【${JSON.stringify(tableRef.value?.radio)}】的数据`),
)

// 选择行
const setCurrent = () => {
  tableRef.value?.el?.setCurrentRow(tableRef.value?.tableData[1])
}

const getSummaries = (param: any) => {
  const { columns } = param
  const sums: string[] = []
  columns.forEach((column, index) => {
    if (index === 0) {
      return (sums[index] = '合计')
    }
    sums[index] = 'N/A'
  })
  return sums
}

const objectSpanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 3) {
    if (rowIndex % 2 === 0) {
      return { rowspan: 2, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

// 设置列样式
const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex === 2) {
    return 'warning-row'
  }
  if (rowIndex === 6) {
    return 'success-row'
  }
  return ''
}

// 单击行
const rowClick = (row, column) => {
  console.log(row)
  if (column.property === 'operation') {
    return
  }
  ElMessage.success('当前行被点击了！')
}

// 删除用户信息
const deleteAccount = async (params) => {
  useHandleData()
  tableRef.value.queryTableData()
}

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  alert('删除所选用户信息')
  tableRef.value.el?.clearSelection()
  tableRef.value.queryTableData()
}

// 重置用户密码
const resetPass = async (params) => {
  alert('重置用户密码')
  tableRef.value.queryTableData()
}
</script>
