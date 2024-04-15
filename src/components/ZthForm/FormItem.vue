<template>
  <el-form-item
    ref="formItemInstance"
    :label="hasLabel ? label : ''"
    :prop="prop"
    class="plus-form-item"
    v-bind="customFormItemProps"
  >
    <!-- 优先使用自定义插槽 -->
    <slot
      v-if="$slots[getFieldSlotName(prop)]"
      :name="getFieldSlotName(prop)"
      :prop="prop"
      :label="label"
      :field-props="customFieldProps"
      :value-type="valueType"
      :column="props"
    />
    <el-switch
      v-else-if="valueType === 'switch'"
      ref="fieldInstance"
      v-model="state"
      class="plus-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-switch>
    <el-input
      v-else
      ref="fieldInstance"
      v-model="state"
      type="input"
      class="plus-form-item-field"
      :placeholder="label"
      autocomplete="off"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
  </el-form-item>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { FieldValueType, ZthFormItemProp } from '.'
import { getCustomProps, getFieldSlotName } from './utils'
defineOptions({ name: 'FormItem' })

export interface PlusFormItemEmits {
  (e: 'change', data: FieldValueType): void
}

export interface FormItemProps {
  hasLabel?: ZthFormItemProp['hasLabel']
  label?: ZthFormItemProp['label']
  prop: ZthFormItemProp['prop']
  fieldProps?: ZthFormItemProp['fieldProps']
  valueType?: ZthFormItemProp['valueType']
  options?: ZthFormItemProp['options']
  formItemProps?: ZthFormItemProp['formItemProps']
  renderField?: ZthFormItemProp['renderField']
  renderLabel?: ZthFormItemProp['renderLabel']
  tooltip?: ZthFormItemProp['tooltip']
  fieldSlots?: ZthFormItemProp['fieldSlots']
  fieldChildrenSlot?: ZthFormItemProp['fieldChildrenSlot']
  index?: number
}

const emit = defineEmits<PlusFormItemEmits>()

const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  hasLabel: true,
  tooltip: '',
  formItemProps: () => ({}),
  fieldProps: () => ({}),
  options: () => [],
  fieldSlots: () => ({}),
  valueType: undefined,
  renderField: undefined,
  renderLabel: undefined,
  fieldChildrenSlot: undefined,
  index: 0,
})
const formItemInstance = ref()
// 定义v-model
const state = defineModel<FieldValueType>()

const customFormItemProps = ref<any>({})
const customFieldProps = ref<any>({})

const fieldInstance = ref()
/**
 * 监听formItemProps
 */
watch(
  () => props.formItemProps,
  (val) => {
    getCustomProps(val, state.value, props, props.index, 'formItemProps')
      .then((data) => {
        customFormItemProps.value = data
      })
      .catch((err) => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true,
  },
)

/**
 * 监听fieldProps
 */
watch(
  () => props.fieldProps,
  (val) => {
    getCustomProps(val, state.value, props, props.index, 'fieldProps')
      .then((data) => {
        customFieldProps.value = data
        // customFieldPropsIsReady.value = true
      })
      .catch((err) => {
        throw err
      })
  },
  {
    immediate: true,
    deep: true,
  },
)

const handleChange = (val: any) => {
  emit('change', val)
}
defineExpose({
  formItemInstance,
  fieldInstance,
})
</script>
