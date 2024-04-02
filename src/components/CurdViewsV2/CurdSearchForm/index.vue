<template>
  <div v-if="columns.length" class="table-search">
    <el-form ref="formRef" :model="searchParam">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
          <el-form-item :label="`${item.label} :`">
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </GridItem>
        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
            <el-button :icon="Delete" @click="reset">重置</el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '收起' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button></div
        ></GridItem>
      </Grid>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SearchFormItem from './components/SearchFormItem.vue'
import type { ColumnProps } from '@/components/CurdViewsV2'
import type { BreakPoint } from '@/components/Grid/interface'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'

export interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  searchCol: number | Record<BreakPoint, number>
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

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  }
}

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    prev +=
      (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) {
        show = true
      }
    } else if (prev >= props.searchCol) {
      show = true
    }
    return prev
  }, 0)
  return show
})
</script>
<script lang="ts">
export default {
  name: 'CurdSearchForm',
}
</script>
