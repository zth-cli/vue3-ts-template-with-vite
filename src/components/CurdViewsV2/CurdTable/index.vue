<template>
  <div class="curd-table">
    <!-- 查询条件 -->
    <CurdSearchForm
      v-show="isShowSearch"
      v-model="searchParam"
      :search="_searchHandle"
      :reset="_resetHandle"
      :columns="searchColumns"
    />

    <div class="table-main">
      <div class="table-header">
        <div class="header-lf">
          <slot
            name="table-header"
            :selected-rows-keys="selectedRowsKeys"
            :selected-rows="selectedRows"
            :is-selected="isSelected"
          />
        </div>
        <div class="header-ri">
          <slot name="table-tool">
            <el-space wrap>
              <el-icon :class="['ri-icon', { refresh: loading }]" title="刷新" @click="queryTableData">
                <RefreshRight />
              </el-icon>
              <SizeSetting v-model="tableSize">
                <el-icon class="ri-icon" title="密度"><Operation /></el-icon>
              </SizeSetting>
              <!-- <el-button v-if="columns.length" :icon="Operation" circle @click="openColSetting" /> -->
              <ColSetting v-model="colSetting">
                <el-icon class="ri-icon" title="表格列"><Setting /></el-icon>
              </ColSetting>
              <el-icon v-if="searchColumns.length" class="ri-icon" @click="isShowSearch = !isShowSearch">
                <Search />
              </el-icon>
            </el-space>
          </slot>
        </div>
      </div>
      <!-- el-table -->
      <el-table
        ref="tableRef"
        :data="tableData"
        :row-key="rowKey"
        :size="tableSize"
        v-bind="$attrs"
        @selection-change="selectionChange"
      >
        <!-- 默认插槽, el-table-column -->
        <slot></slot>
        <template v-for="item in tableColumns" :key="item">
          <!-- 处理特殊 column -->
          <el-table-column
            v-if="item.type && columnTypes.includes(item.type)"
            v-bind="item"
            :align="item.align || 'center'"
          >
            <template #default="scope">
              <!-- expand 支持 tsx 语法 && 作用域插槽 -->
              <template v-if="item.type == 'expand'">
                <!-- 支持render函数 -->
                <component :is="item.renderCell" v-bind="scope" v-if="item.renderCell"> </component>
                <slot v-else :name="item.type" v-bind="scope"></slot>
              </template>
              <!-- 单选时 -->
              <el-radio v-if="item.type == 'radio'" v-model="radio" :label="scope.row[rowKey]"><span></span></el-radio>
            </template>
          </el-table-column>
          <!-- 其他常规 el-table-column -->
          <TableColumn v-if="!item.type && item.prop && !item.hidden" :column="item">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </TableColumn>
        </template>
        <template #append>
          <slot name="append"> </slot>
        </template>
        <template #empty>
          <div class="table-empty">
            <slot name="empty">
              <div>暂无数据</div>
            </slot>
          </div>
        </template>
      </el-table>
      <!-- 分页组件 -->
      <slot name="pagination">
        <Pagination
          v-if="pagination"
          :pageable="pageParams"
          :handle-size-change="handleSizeChange"
          :handle-current-change="handleCurrentChange"
        />
      </slot>
    </div>
    <!-- 列设置 -->
    <!-- <ColSetting ref="colRef" v-model:col-setting="colSetting" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ColumnProps } from '..'
import { ElTable } from 'element-plus'
import { Refresh, RefreshRight, Operation, Search } from '@element-plus/icons-vue'
import { useTable } from './hooks/useTable'
import { useSelection } from './hooks/useSelection'
import { useColEnum } from './hooks/useColEnum'
import CurdSearchForm from '../CurdSearchForm/index.vue'
import Pagination from './components/Pagination.vue'
import { ColSetting } from './components/ColSetting'
import { SizeSetting } from './components/SizeSetting'
import { TableColumn } from './components/TableColumn'

defineOptions({ name: 'CurdTable' })

interface CurdTableProps {
  columns: ColumnProps[] // 表格列配置项
  requestApi?: (params: any) => Promise<any> // 请求表格数据的api
  apiUrl?: string // 请求表格数据的api地址, 二选一，优先级低于 requestApi
  requestAuto?: boolean // 是否初次加载时自动请求表格数据
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理
  pagination?: boolean // 是否需要分页组件
  initParam?: any // 初始化请求参数
  size?: '' | 'default' | 'small' | 'large' // 表格大小
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<CurdTableProps>(), {
  requestAuto: true,
  columns: () => [],
  pagination: true,
  initParam: {},
  rowKey: 'id',
  size: 'small',
})

// 暴露事件
const emit = defineEmits(['search', 'reset'])

// 表格大小
const tableSize = ref(props.size)

// 是否显示搜索模块
const isShowSearch = ref(true)

// 单选值
const radio = ref('')

// 表格实例引用
const tableRef = ref<InstanceType<typeof ElTable>>()

// 特殊的 column 列类型
const columnTypes = ['selection', 'radio', 'index', 'expand']

// 表格多选 Hooks
const { selectionChange, selectedRows, selectedRowsKeys, isSelected } = useSelection(props.rowKey)

// 表格操作 Hooks
const {
  tableData,
  pageParams,
  searchParam,
  loading,
  queryTableData,
  searchHandle,
  resetHandle,
  handleSizeChange,
  handleCurrentChange,
} = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback)

// 点击查询事件
const _searchHandle = (params: any) => {
  emit('search', params)
  searchHandle()
}

// 重置事件
const _resetHandle = () => {
  emit('reset')
  resetHandle()
}

// 清空选中数据列表
const clearSelection = () => tableRef.value?.clearSelection()

// 初始化请求
onMounted(() => props.requestAuto && queryTableData())

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, queryTableData, { deep: true })

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 扁平化 columns 备用
const { setEnumMap, enumMap } = useColEnum()
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async (col) => {
    if (col.children?.length) {
      flatArr.push(...flatColumnsFunc(col.children))
    }
    flatArr.push(col)

    // 给每一项 column 添加 hidden && isFilterEnum 默认属性
    col.hidden = col.hidden ?? false
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    setEnumMap(col)
  })
  return flatArr.filter((item) => !item.children?.length)
}

const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.type)

// 设置搜索表单排序默认值,同时设置搜索表单项的默认值
if (searchColumns.length > 0) {
  searchColumns.forEach((column, index) => {
    column.search!.order = column.search?.order ?? index + 2
    if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
      searchParam.value[column.search.key || column.prop!] = column.search?.defaultValue
    }
  })
  // 排序搜索表单项
  searchColumns.sort((a, b) => a.search?.order - b.search?.order)
}

// 过滤掉不需要设置显隐的列
const colRef = ref()
const colSetting = tableColumns.value?.filter((item) => !columnTypes.includes(item.type!) && item.prop !== 'operation')
const openColSetting = () => colRef.value.openColSetting()

// 提取eltable所有的方法
const exposeFn = {
  tableData,
  searchParam,
  pageParams,
  queryTableData,
  resetHandle,
  clearSelection,
  enumMap,
  isSelected,
  selectedRows,
  selectedRowsKeys,
  radio,
}
onMounted(() => {
  const entries = Object.entries(tableRef.value)
  for (const [method, fn] of entries) {
    exposeFn[method] = fn
  }
})

// 暴露参数和方法
defineExpose(exposeFn)
</script>
<style lang="scss">
@import './style.scss';
</style>
