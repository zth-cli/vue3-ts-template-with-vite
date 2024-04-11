<template>
  <TablePlayground>
    <SelectFilter :data="selectFilterData" :default-values="selectFilterValues" @change="changeSelectFilter" />
    <CurdTable
      ref="proTable"
      highlight-current-row
      :columns="columns"
      :request-api="getGiftlist"
      :init-param="Object.assign(treeFilterValues, selectFilterValues)"
    >
      <!-- 表格 header 按钮 -->
      <template #table-header>
        <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
        <el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
        <el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
        <el-button type="primary" :icon="Pointer" plain @click="setCurrent">选中第二行</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation>
        <el-button type="primary" link :icon="View">查看</el-button>
        <el-button type="primary" link :icon="EditPen">编辑</el-button>
        <el-button type="primary" link :icon="Refresh">重置密码</el-button>
        <el-button type="primary" link :icon="Delete">删除</el-button>
      </template>
    </CurdTable>
  </TablePlayground>
</template>
<script setup lang="ts" name="useSelectFilter">
import { ElMessage } from 'element-plus'
import { TablePlayground } from '@/components/TablePlayground'
import { SelectFilter } from '@/components/CurdViewsV2/SelectFilter'
import CurdTable from '@/components/CurdViewsV2/CurdTable/index.vue'
import { CirclePlus, Delete, EditPen, Pointer, Download, Upload, View, Refresh } from '@element-plus/icons-vue'
import { CurdTableInstance, ColumnProps, SelectDataProps } from '@/components/CurdViewsV2'
import { useHandleData } from '@/hooks/useHandleData'
import { getGiftlist } from '@/api'
// ProTable 实例
const proTable = ref<CurdTableInstance>()

// 表格配置项
const columns = reactive<ColumnProps[]>([
  { type: 'radio', label: '单选', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { prop: 'username', label: '用户姓名', width: 120, search: { type: 'input', tooltip: '我是搜索提示' } },
  { prop: 'gender', label: '性别', width: 120, sortable: true },
  { prop: 'idCard', label: '身份证号' },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  { prop: 'status', label: '用户状态', width: 120, sortable: true },
  { prop: 'createTime', label: '创建时间', width: 180, sortable: true },
  { prop: 'operation', label: '操作', width: 330, fixed: 'right' },
])

// selectFilter 数据（用户角色为后台数据）
const selectFilterData = reactive<SelectDataProps[]>([
  {
    title: '用户状态(单)',
    key: 'userStatus',
    options: [
      { label: '全部', value: '' },
      { label: '在职', value: '1', icon: 'User' },
      { label: '待培训', value: '2', icon: 'Bell' },
      { label: '待上岗', value: '3', icon: 'Clock' },
      { label: '已离职', value: '4', icon: 'CircleClose' },
      { label: '已退休', value: '5', icon: 'CircleCheck' },
    ],
  },
  {
    title: '用户角色(多)',
    key: 'userRole',
    multiple: true,
    options: [],
  },
])

setTimeout(() => {
  selectFilterData[1].options = [
    { label: '全部', value: '' },
    { label: '管理员', value: '1' },
    { label: '普通用户', value: '2' },
  ]
}, 1000)
// 默认 selectFilter 参数
const selectFilterValues = ref({ userStatus: '2', userRole: ['1', '2'] })
const changeSelectFilter = (value: typeof selectFilterValues.value) => {
  ElMessage.success('请注意查看请求参数变化 🤔')
  proTable.value!.pageParams.pageIndex = 1
  selectFilterValues.value = value
}

// 默认 treeFilter 参数
const treeFilterValues = reactive({ departmentId: ['11'] })
const changeTreeFilter = (val: string[]) => {
  ElMessage.success('请注意查看请求参数变化 🤔')
  proTable.value!.pageParams.pageIndex = 1
  treeFilterValues.departmentId = val
}
// 选择行
const setCurrent = () => {
  proTable.value!.radio = proTable.value?.tableData[1].id
  proTable.value?.element?.setCurrentRow(proTable.value?.tableData[1])
}
watch(
  () => proTable.value?.radio,
  () => proTable.value?.radio && ElMessage.success(`选中 id 为【${proTable.value?.radio}】的数据`),
)
</script>
