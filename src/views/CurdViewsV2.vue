<template>
  <div class="table-box">
    <CurdTable
      ref="proTable"
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
        <el-button type="primary" :icon="CirclePlus" @click="proTable.element.toggleAllSelection()"
          >全选 / 全不选</el-button
        >
        <el-button type="primary" :icon="Pointer" plain @click="setCurrent">选中第五行</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope['is-selected']"
          @click="batchDelete(scope['selected-list-ids'])"
        >
          批量删除用户
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
      <template #append>
        <span style="color: var(--el-color-primary)"
          >我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span
        >
      </template>
    </CurdTable>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ColumnProps } from '@/components/CurdViewsV2/CurdTable'
import { useHandleData } from '@/hooks/useHandleData'
import CurdTable from '@/components/CurdViewsV2/CurdTable/index.vue'
import { CirclePlus, Pointer, Delete, Refresh } from '@element-plus/icons-vue'
import { getGiftlist } from '@/api'

// 获取 CurdTable DOM
const proTable = ref()

// 表格配置项
const columns: ColumnProps<any>[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { type: 'expand', label: 'Expand', width: 100 },
  {
    prop: 'base',
    label: '基本信息',
    // headerRender,
    _children: [
      { prop: 'username', label: '用户姓名', width: 110, search: { type: 'input', order: 2, defaultValue: '男' } },
      { prop: 'user.detail.age', label: '年龄', width: 100, search: { type: 'input', order: 2, defaultValue: '男' } },
      {
        prop: 'gender',
        label: '性别',
        search: { type: 'date-picker', order: 2 },
        enum: [
          { label: '男', value: 1, color: 'success' },
          { label: '女', value: 2, color: 'danger' },
        ],
        width: 100,
        fieldNames: { label: 'genderLabel', value: 'genderValue' },
      },
      {
        prop: 'details',
        label: '详细资料',
        _children: [
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
    tag: true,
    search: { type: 'input', order: 1 },
    enum: [
      { label: '正常', value: 1, color: 'success' },
      { label: '禁用', value: 2, color: 'danger' },
    ],
    fieldNames: { label: 'userLabel', value: 'userStatus' },
  },
  { prop: 'createTime', label: '创建时间', width: 200, search: { type: 'select', order: 2, defaultValue: '男' } },
  { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
]

// 选择行
const setCurrent = () => {
  proTable.value.element.setCurrentRow(proTable.value.tableData[4])
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
  useHandleData
  alert('删除用户信息')
  proTable.value.getTableList()
}

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
  alert('删除所选用户信息')
  proTable.value.clearSelection()
  proTable.value.getTableList()
}

// 重置用户密码
const resetPass = async (params) => {
  alert('重置用户密码')
  proTable.value.getTableList()
}
</script>

<style lang="scss">
.el-table .warning-row,
.el-table .warning-row .el-table-fixed-column--right,
.el-table .warning-row .el-table-fixed-column--left {
  background-color: var(--el-color-warning-light-9);
}
.el-table .success-row,
.el-table .success-row .el-table-fixed-column--right,
.el-table .success-row .el-table-fixed-column--left {
  background-color: var(--el-color-success-light-9);
}
</style>
