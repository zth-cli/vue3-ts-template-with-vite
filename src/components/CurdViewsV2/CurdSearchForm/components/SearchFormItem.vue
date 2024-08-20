<template>
  <component
    :is="map[search.type]"
    v-if="search?.type"
    v-bind="handleElProps"
    v-model.trim="searchParam[search.key || (column as ColumnProps).prop]"
    :data="search?.type === 'tree-select' ? searchOptions : []"
    :options="['cascader', 'select-v2'].includes(search?.type) ? searchOptions : []"
    :placeholder="placeholder"
    :clearable="clearable"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    style="width: 100%"
  >
    <template v-if="search.type === 'cascader'" #default="{ data }">
      <!-- 自定义节点 -->
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="search.type === 'select'">
      <component
        :is="ElOption"
        v-for="(col, index) in searchOptions"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      />
    </template>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { computed, inject, shallowRef, ref } from 'vue'
import { ColumnProps } from '@/components/CurdViewsV2'
// 引入时间控件样式,避免样式丢失
import 'element-plus/es/components/date-picker/style/css'
import {
  ElInput,
  ElSelect,
  ElOption,
  ElCascader,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElSelectV2,
} from 'element-plus/es'
const map = shallowRef({
  input: ElInput,
  select: ElSelect,
  cascader: ElCascader,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  'time-select': ElTimeSelect,
  'select-v2': ElSelectV2,
})
defineOptions({
  name: 'SearchFormItem',
})
const props = defineProps<{
  column: ColumnProps
  searchParam: { [key: string]: any }
}>()
const search = toRef(props.column, 'search')
// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label || 'label',
    value: props.column.fieldNames?.value || 'value',
  }
})

// 接收 enumMap,从cloumns中获取搜索项的枚举(enum)数据, 用于下拉框等选项渲染
const enumMap = inject('enumMap', ref(new Map()))

const searchOptions = computed(() => {
  let enumData = enumMap.value.get(props.column.prop)
  if (!enumData) {
    return []
  }
  if (props.column.search?.type === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] }
    })
  }
  return enumData
})

// element-plus组件props透传, v-bind绑定
const handleElProps = computed(() => {
  const label = unref(fieldNames).label
  const value = unref(fieldNames).value
  const searchType = props.column.search?.type
  const searchProps = props.column.search?.props || {}
  let handleProps = searchProps
  if (searchType === 'tree-select') {
    handleProps = { ...searchProps, props: { label, ...searchProps.props }, nodeKey: value }
  }
  if (searchType === 'cascader') {
    handleProps = { ...searchProps, props: { label, value, ...searchProps.props } }
  }
  return handleProps
})

const placeholder = computed(() => {
  const search = props.column.search
  return search?.props?.placeholder ?? (search?.type === 'input' ? '请输入' : '请选择')
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search
  return search?.props?.clearable ?? true
})
</script>
