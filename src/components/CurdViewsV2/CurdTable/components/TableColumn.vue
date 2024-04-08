<template>
  <component :is="renderLoop(column)"></component>
</template>

<script lang="tsx" setup>
import { inject, ref, useSlots } from 'vue'
import { filterEnum, filterEnumColor, formatValue, handleRowAccordingToProp } from '@/components/CurdViewsV2/utils'
import { ColumnProps } from '@/components/CurdViewsV2'

defineProps<{ column: ColumnProps }>()

// 获取父级传入的插槽
const slots = useSlots()

const enumMap = inject('enumMap', ref(new Map()))

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
  return enumMap.value.get(item.prop) && item.isFilterEnum
    ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
    : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
}

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: { [key: string]: any }) => {
  return filterEnumColor(
    handleRowAccordingToProp(scope.row, item.prop!),
    enumMap.value.get(item.prop),
    item.fieldNames,
  ) as any
}

const renderLoop = (item: ColumnProps) => {
  // tsx语法，传递插槽，作用如下
  /*
    <el-table-column v-bind="$attrs" align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
      </template>
    </el-table-column>
  */
  return (
    <>
      {!item.hidden && (
        <el-table-column {...item} align={item.align || 'center'} showOverflowTooltip={item.showOverflowTooltip}>
          {{
            default: (scope: any) => {
              if (item.children) {
                return item.children.map((child) => renderLoop(child))
              }
              if (item.renderCell) {
                return item.renderCell(scope)
              }
              if (slots[item.prop!]) {
                return slots[item.prop!]!(scope)
              }
              if (item.enum) {
                return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>
              }
              return renderCellData(item, scope)
            },
            header: () => {
              if (item.headerRender) {
                return item.headerRender(item)
              }
              if (slots[`${item.prop}Header`]) {
                return slots[`${item.prop}Header`]!({ row: item })
              }
              return item.label
            },
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>
<script lang="tsx">
export default {
  name: 'TableColumn',
}
</script>
