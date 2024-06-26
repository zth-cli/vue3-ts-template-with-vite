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
import FormItem from './FormItem.vue'
import type { ZthFormItemProp, ModelValues, ModelValueType } from '.'
import { getLabelSlotName, getFieldSlotName } from './utils'

export interface ZthFormContentProps extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  hasLabel?: boolean
  columns?: ZthFormItemProp[]
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
}

export interface ZthFormContentEmits {
  (e: 'change', values: ModelValues, column: ZthFormItemProp): void
}

defineOptions({ name: 'FormContent' })

const props = withDefaults(defineProps<ZthFormContentProps>(), {
  hasLabel: true,
  rowProps: () => ({}),
  colProps: () => ({}),
  columns: () => [],
})
const emit = defineEmits<ZthFormContentEmits>()

// 定义v-model
const model = defineModel<ModelValues>()

const getHasLabel = (hasLabel?: boolean | Ref<boolean> | ComputedRef<boolean>) => {
  const has = unref(hasLabel) as boolean
  if (typeof has === 'boolean') {
    return has
  }
  return props.hasLabel
}

const handleChange = (_: ModelValueType, column: ZthFormItemProp) => {
  emit('change', model.value, column)
}
</script>
