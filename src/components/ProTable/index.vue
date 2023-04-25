<template>
  <!-- 查询表单 card -->
  <SearchForm
    v-show="isShowSearch"
    :search="search"
    :reset="reset"
    :search-param="searchParam"
    :columns="searchColumns"
    :search-col="searchCol"
  />

  <!-- 表格内容 card -->
  <div class="card table-main">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selected-list-ids="selectedListIds"
          :selected-list="selectedList"
          :is-selected="isSelected"
        />
      </div>
      <div class="header-button-ri">
        <slot name="toolButton">
          <el-button :icon="Refresh" circle @click="getTableList" />
          <el-button v-if="columns.length" :icon="Operation" circle @click="openColSetting" />
          <el-button v-if="searchColumns.length" :icon="Search" circle @click="isShowSearch = !isShowSearch" />
        </slot>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="tableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽, el-table-column -->
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index特殊处理 -->
        <el-table-column
          v-if="item.type == 'selection' || item.type == 'index'"
          v-bind="item"
          :align="item.align || 'center'"
        >
        </el-table-column>
        <!-- expand 支持 tsx 语法 && 作用域插槽 -->
        <el-table-column v-if="item.type == 'expand'" v-bind="item" :align="item.align || 'center'">
          <template #default="scope">
            <component :is="item.render" v-bind="scope" v-if="item.render"> </component>
            <slot v-else :name="item.type" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <!-- 其他常规 el-table-column -->
        <TableColumn v-if="!item.type && item.prop && !item.hidden" :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"> </slot>
      </template>
      <!-- 表格无数据情况 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/img/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
  <!-- 列设置 -->
  <ColSetting ref="colRef" v-model:colSetting="colSetting" />
</template>

<script setup lang="ts">
import { ref, watch, provide, onMounted } from 'vue'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'
import { BreakPoint } from '@/components/Grid/interface'
import { ColumnProps } from '@/components/ProTable/interface'
import { ElTable, TableProps } from 'element-plus'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'
import { handleProp } from '@/utils/util'
import SearchForm from '@/components/SearchForm/index.vue'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import TableColumn from './components/TableColumn.vue'

interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[] // 列配置项
  requestApi?: (params: any) => Promise<any> // 请求表格数据的api
  apiUrl?: string // 请求表格数据的api地址, 二选一，优先级低于 requestApi
  requestAuto?: boolean // 是否初次加载时自动请求表格数据
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理
  pagination?: boolean // 是否需要分页组件
  initParam?: any // 初始化请求参数
  border?: boolean // 是否带有纵向边框
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id
  searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

defineOptions({
  name: 'ProTable',
})
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  requestAuto: true,
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
})

// 是否显示搜索模块
const isShowSearch = ref(true)

// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>()

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey)

// 表格操作 Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback)

// 清空选中数据列表
const clearSelection = () => tableRef.value?.clearSelection()

// 初始化请求
onMounted(() => props.requestAuto && getTableList())

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true })

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
provide('enumMap', enumMap)
const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) {
    return
  }
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function') {
    return enumMap.value.set(col.prop!, col.enum!)
  }
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 扁平化 columns 备用
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async (col) => {
    if (col._children?.length) {
      flatArr.push(...flatColumnsFunc(col._children))
    }
    flatArr.push(col)

    // 给每一项 column 添加 hidden && isFilterEnum 默认属性
    col.hidden = col.hidden ?? false
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}

const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el)

// 设置搜索表单排序默认值,同时设置搜索表单项的默认值
if (searchColumns.length > 0) {
  searchColumns.forEach((column, index) => {
    column.search!.order = column.search?.order ?? index + 2
    if (column.search?.defaultValue !== undefined && column.search?.defaultValue !== null) {
      searchInitParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue
      searchParam.value[column.search.key ?? handleProp(column.prop!)] = column.search?.defaultValue
    }
  })

  // 排序搜索表单项
  searchColumns.sort((a, b) => a.search?.order - b.search?.order)
}

// 过滤掉不需要设置显隐的列
const colRef = ref()
const colSetting = tableColumns.value?.filter(
  (item) => !['selection', 'index', 'expand'].includes(item.type!) && item.prop !== 'operation'
)
const openColSetting = () => colRef.value.openColSetting()

// 暴露参数和方法
defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  getTableList,
  reset,
  clearSelection,
  enumMap,
  isSelected,
  selectedList,
  selectedListIds,
})
</script>
