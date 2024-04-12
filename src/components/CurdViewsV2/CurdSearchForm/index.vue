<template>
  <div v-if="columns.length" class="table-search">
    <el-form ref="formRef" :model="searchParam">
      <el-row ref="gridRef" :gutter="20">
        <el-col
          v-for="(item, index) in columns"
          v-show="index < collapsedIndex || !collapsed"
          :key="item.prop"
          v-bind="getResponsive"
          :index="index"
        >
          <el-form-item>
            <template #label>
              <el-space :size="4">
                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                <el-tooltip v-if="item.search?.tooltip" effect="dark" :content="item.search?.tooltip" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </el-space>
              <span>&nbsp;:</span>
            </template>
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </el-col>
        <el-col v-bind="btnSpan">
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
            <el-button :icon="Delete" @click="reset">重置</el-button>
            <el-button v-if="showCollapse" type="primary" link @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '收起' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SearchFormItem from './components/SearchFormItem.vue'
import { useBreakPoint } from '@/hooks'
import { BreakPoint, ColumnProps } from '@/components/CurdViewsV2'

defineOptions({ name: 'SearchForm' })

export interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
  modelValue: { [key: string]: any } // 搜索参数
}
// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({}),
})

const emit = defineEmits(['update:modelValue'])

// 搜索参数
const searchParam = computed(() => props.modelValue)

// 搜索方法
watch(
  searchParam,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true },
)

/**
 * ------------------------------------------响应式-----------------------------------------------
 */
// el-col响应式属性, 固定避免自定义不一致性
const getResponsive = computed<Record<BreakPoint, number>>(() => ({
  xs: 24,
  sm: 8,
  md: 8,
  lg: 6,
  xl: 4,
}))
// 寻找开始隐藏的索引
const { breakPoint } = useBreakPoint()
const MAX_COL = 24
const collapsedIndex = computed(() => {
  const span = getResponsive.value[breakPoint.value]
  // 计算收起时的查询项列数,减去查询列
  return MAX_COL / span - 1 || 1
})

const collapsed = ref(true)
const searchNum = computed(() => {
  return props.columns.reduce((prev, current) => {
    prev += current.search ? 1 : 0
    return prev
  }, 0)
})

// 根据是否有search判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  return searchNum.value > collapsedIndex.value
})

// 展开时搜索项的位置
const btnSpan = computed(() => {
  const span = getResponsive.value[breakPoint.value]
  // 一行可显示的列数
  const col = MAX_COL / span
  // 剩余的列数
  const remainder = searchNum.value % col
  // 余下的列数分配给查询按钮项
  const span1 = (col - remainder) * span
  return collapsed.value ? getResponsive.value : { span: span1 }
})
</script>
