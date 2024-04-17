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
    >
      <!--表单项label插槽 -->
      <template v-for="(_, key) in labelSlots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>
      <!--表单项插槽 -->
      <template v-for="(_, key) in fieldSlots" :key="key" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>
    </FormContent>
    <div v-if="showFooter" :style="style">
      <!-- 渲染 footer 默认插槽 -->
      <slot name="footer" v-bind="{ handleReset, handleSubmit }">
        <el-button v-if="hasReset" @click="handleReset">
          <!-- 重置 -->
          {{ resetText }}
        </el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          <!-- 提交 -->
          {{ submitText }}
        </el-button>
      </slot>
    </div>
  </el-form>
</template>
<script setup lang="ts">
import { ref, defineModel, useSlots } from 'vue'
import FormContent from './FormContent.vue'
import { ModelValues, ZthFormItemProp } from '.'
import { FormInstance, FormProps, RowProps, ColProps, ElMessage } from 'element-plus'
import { filterSlots, getFieldSlotName, getLabelSlotName } from './utils'

export interface ZthFormProp extends /* @vue-ignore */ Partial<Mutable<FormProps>> {
  defaultValues?: ModelValues
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
  showFooter?: boolean
  submitText?: string
  resetText?: string
  submitLoading?: boolean
  footerAlign?: 'left' | 'right' | 'center'
}

export interface ZthFormEmits {
  (e: 'submit', values: ModelValues): void
  (e: 'change', values: ModelValues, column: ZthFormItemProp): void
  (e: 'reset', values: ModelValues): void
  (e: 'submitError', errors: any): void
}

defineOptions({ name: 'ZthForm' })

const formInstance = ref<FormInstance>()

// 获取slots
const slots = useSlots()

/**
 * 表单field的插槽
 */
const fieldSlots = filterSlots(slots, getFieldSlotName())
/**
 * 表单label的插槽
 */
const labelSlots = filterSlots(slots, getLabelSlotName())

// 定义v-model
const model = defineModel<ModelValues>()

// 定义事件
const emit = defineEmits<ZthFormEmits>()

// 定义props
const props = withDefaults(defineProps<ZthFormProp>(), {
  defaultValues: () => ({}),
  labelWidth: '80px',
  labelPosition: 'left',
  rowProps: () => ({}),
  colProps: () => ({}),
  labelSuffix: ':',
  hasErrorTip: true,
  showFooter: true,
  hasReset: true,
  hasLabel: true,
  submitLoading: false,
  submitText: '提交',
  resetText: '重置',
  footerAlign: 'left',
  columns: () => [],
  group: false,
})

// 过滤隐藏item
const filterHide = (columns: ZthFormItemProp[]) => {
  return columns.filter((item) => unref(item.hideInForm) !== true)
}
const subColumns = computed<any>(() => filterHide(props.columns))

// 底部样式
const style = computed(() => ({
  justifyContent: props.footerAlign === 'left' ? 'flex-start' : props.footerAlign === 'center' ? 'center' : 'flex-end',
}))

const handleChange = (_: ModelValues, column: ZthFormItemProp) => {
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
