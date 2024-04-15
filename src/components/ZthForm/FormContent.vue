<template>
  <el-row v-bind="rowProps" style="width: 100%">
    <el-col v-for="item in columns" :key="item.prop" v-bind="item.colProps || colProps">
      <FormItem
        v-model="model[item.prop]"
        v-bind="item"
        :has-label="getHasLabel(item.hasLabel)"
        :label-width="getHasLabel(item.hasLabel) ? item.labelWidth : '0px'"
        @change="(value: any) => handleChange(value, item)"
      >
        <!--表单项label插槽 -->
        <template v-if="$slots[getLabelSlotName(item.prop)]" #[getLabelSlotName(item.prop)]="data">
          <slot :name="getLabelSlotName(item.prop)" v-bind="data" />
        </template>

        <!--表单项插槽 -->
        <template v-if="$slots[getFieldSlotName(item.prop)]" #[getFieldSlotName(item.prop)]="data">
          <slot :name="getFieldSlotName(item.prop)" v-bind="data" />
        </template>

        <!--表单tooltip插槽 -->
        <template v-if="$slots['tooltip-icon']" #tooltip-icon>
          <slot name="tooltip-icon" />
        </template>
      </FormItem>
    </el-col>

    <!-- 搜索的footer插槽  -->
    <slot name="search-footer" />
  </el-row>
</template>

<script lang="ts" setup>
import type { Ref, ComputedRef } from 'vue'
import { unref, defineModel } from 'vue'
import type { FormProps, RowProps, ColProps } from 'element-plus'
import { ElRow, ElCol } from 'element-plus'
import FormItem from './FormItem.vue'
import type { ZthFormItemProp, FieldValues, FieldValueType } from '.'
import { getLabelSlotName, getFieldSlotName } from './utils'
import { Mutable } from 'element-plus/es/utils'

export interface PlusFormContentProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  hasLabel?: boolean
  columns?: ZthFormItemProp[]
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
}

export interface PlusFormContentEmits {
  (e: 'change', values: FieldValues, column: ZthFormItemProp): void
}

defineOptions({ name: 'FormContent' })

const props = withDefaults(defineProps<PlusFormContentProps>(), {
  hasLabel: true,
  rowProps: () => ({}),
  colProps: () => ({}),
  columns: () => [],
})
const emit = defineEmits<PlusFormContentEmits>()

// 定义v-model
const model = defineModel<FieldValues>()

const getHasLabel = (hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>) => {
  const has = unref(hasLabel) as boolean
  if (typeof has === 'boolean') {
    return has
  }
  return props.hasLabel
}

const handleChange = (_: FieldValueType, column: ZthFormItemProp) => {
  emit('change', model.value, column)
}
</script>
