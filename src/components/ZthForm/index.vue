<template>
  <el-form
    ref="formInstance"
    :label-width="hasLabel ? labelWidth : 0"
    class="plus-form"
    :class="hasLabel ? '' : 'no-has-label'"
    :label-position="labelPosition"
    :validate-on-rule-change="false"
    :label-suffix="hasLabel ? labelSuffix : ''"
    v-bind="$attrs"
    :model="model"
  >
    <FormContent
      v-model="model"
      :row-props="rowProps"
      :col-props="colProps"
      :columns="subColumns"
      :has-label="hasLabel"
      @change="handleChange"
    ></FormContent>
  </el-form>
</template>
<script setup lang="ts">
import { ref, defineModel, useSlots } from 'vue'
import FormContent from './FormContent.vue'
import { FieldValues, ZthFormItemProp } from '.'
import { FormInstance, ElForm, FormProps, RowProps, ColProps, ElMessage } from 'element-plus'

export interface ZthFormProp extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  defaultValues?: FieldValues
  columns?: ZthFormItemProp[]
  labelWidth?: string
  labelSuffix?: string
  labelPosition?: 'left' | 'right' | 'top'
  group?: boolean
  rowProps?: Partial<Mutable<RowProps>>
  colProps?: Partial<Mutable<ColProps>>
  hasReset?: boolean
  hasLabel?: boolean
  hasErrorTip?: boolean
  hasFooter?: boolean
  submitText?: string
  resetText?: string
  submitLoading?: boolean
  footerAlign?: 'left' | 'right' | 'center'
}

export interface PlusFormEmits {
  (e: 'submit', values: FieldValues): void
  (e: 'change', values: FieldValues, column: ZthFormItemProp): void
  (e: 'reset', values: FieldValues): void
  (e: 'submitError', errors: any): void
}

defineOptions({ name: 'ZthForm' })

const formInstance = ref<FormInstance>()

// 获取slots
const slots = useSlots()

// 定义v-model
const model = defineModel<FieldValues>()

// 定义事件
const emit = defineEmits<PlusFormEmits>()

// 定义props
const props = withDefaults(defineProps<ZthFormProp>(), {
  defaultValues: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  rowProps: () => ({}),
  colProps: () => ({}),
  labelSuffix: ':',
  hasErrorTip: true,
  hasFooter: true,
  hasReset: true,
  hasLabel: true,
  submitLoading: false,
  submitText: '',
  resetText: '',
  footerAlign: 'left',
  columns: () => [],
  group: false,
})

// 过滤隐藏item
const filterHide = (columns: ZthFormItemProp[]) => {
  return columns.filter((item) => unref(item.hideInForm) !== true)
}
const subColumns = computed<any>(() => filterHide(props.columns))

const handleChange = (_: FieldValues, column: ZthFormItemProp) => {
  emit('change', model.value, column)
}

// 清空校验
const clearValidate = (): void => {
  formInstance.value?.clearValidate()
}

const handleSubmit = async () => {
  try {
    const valid = await formInstance.value?.validate()
    if (valid) {
      emit('submit', model.value)
      return true
    }
  } catch (errors: any) {
    if (props.hasErrorTip) {
      ElMessage.closeAll()
      const values: any[] = Object.values(errors)
      ElMessage.warning(values[0]?.[0]?.message)
    }
    emit('submitError', errors)
  }
  return false
}

const handleReset = (): void => {
  clearValidate()
  model.value = { ...props.defaultValues }
  emit('reset', model.value)
}

defineExpose({
  formInstance,
  handleSubmit,
  handleReset,
})
</script>
<style></style>
