<template>
  <el-form-item
    ref="formItemInstance"
    :label="hasLabel ? label : ''"
    :prop="prop"
    class="zth-form-item"
    v-bind="customFormItemProps"
  >
    <!-- el-form-item label插槽 -->
    <template v-if="hasLabel" #label="{ label: currentLabel }">
      <span class="zth-form-item__label">
        <template v-if="renderLabel && isFunction(renderLabel)">
          <!-- 优先渲染使用渲染函数(jsx,tsx)传递的插槽 -->
          <JsxRender
            :render="renderLabel"
            :params="props"
            :model-value="currentLabel"
            :custom-field-props="customFieldProps"
          />
        </template>
        <!-- 渲染传递的插槽 -->
        <slot
          v-else
          :name="getLabelSlotName(prop)"
          :prop="prop"
          :label="label"
          :field-props="customFieldProps"
          :value-type="valueType"
          :column="props"
        >
          {{ currentLabel }}
        </slot>

        <el-tooltip v-if="tooltip" placement="top" v-bind="getTooltip(tooltip)">
          <slot name="tooltip-icon">
            <el-icon class="plus-table-column__label__icon" :size="16">
              <QuestionFilled />
            </el-icon>
          </slot>
        </el-tooltip>
      </span>
    </template>
    <template v-if="renderField && isFunction(renderField)">
      <!-- 优先渲染使用渲染函数(jsx,tsx)传递的插槽 -->
      <JsxRender
        :render="renderField"
        :params="props"
        :model-value="state"
        :custom-field-props="customFieldProps"
        render-type="form"
        :handle-change="handleRenderChange"
      />
    </template>
    <!-- 渲染传递的插槽 -->
    <slot
      v-else-if="$slots[getFieldSlotName(prop)]"
      :name="getFieldSlotName(prop)"
      :prop="prop"
      :label="label"
      :field-props="customFieldProps"
      :value-type="valueType"
      :column="props"
    />

    <!-- el-switch -->
    <el-switch
      v-else-if="valueType === 'switch'"
      ref="fieldInstance"
      v-model="state"
      class="zth-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-switch>

    <!-- el-slider -->
    <el-slider
      v-else-if="valueType === 'slider'"
      ref="fieldInstance"
      v-model="state"
      class="zth-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    ></el-slider>

    <!-- el-autocomplete -->
    <el-autocomplete
      v-else-if="valueType === 'autocomplete'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
      @select="handleSelect"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-autocomplete>

    <!-- el-cascader -->
    <el-cascader
      v-else-if="valueType === 'cascader'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      :options="options"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-cascader>

    <!-- el-checkbox-group -->
    <el-checkbox-group
      v-else-if="valueType === 'checkbox'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <el-checkbox v-for="item in customOptions" :key="item.label" :value="item.value" v-bind="item.fieldItemProps">
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component :is="fieldChildrenSlot" v-else-if="isFunction(fieldChildrenSlot)" v-bind="item" />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-checkbox>
    </el-checkbox-group>

    <!-- el-radio-group -->
    <el-radio-group
      v-else-if="valueType === 'radio'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
      <el-radio v-for="item in customOptions" :key="item.label" :value="item.value" v-bind="item.fieldItemProps">
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component :is="fieldChildrenSlot" v-else-if="isFunction(fieldChildrenSlot)" v-bind="item" />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-radio>
    </el-radio-group>

    <!-- el-color-picker -->
    <el-color-picker
      v-else-if="valueType === 'color-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />

    <!-- el-date-picker -->
    <el-date-picker
      v-else-if="valueType === 'date-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      :start-placeholder="'开始时间'"
      :end-placeholder="'结束时间'"
      class="zth-form-item-field"
      type="datetime"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>
    </el-date-picker>

    <!-- el-input-number -->
    <el-input-number
      v-else-if="valueType === 'input-number'"
      ref="fieldInstance"
      v-model="state"
      class="zth-form-item-field"
      :placeholder="label"
      autocomplete="off"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />

    <!-- el-input -->
    <el-rate
      v-else-if="valueType === 'rate'"
      ref="fieldInstance"
      v-model="state"
      class="zth-form-item-field"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
    <!-- el-select -->
    <el-select
      v-else-if="valueType === 'select'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    >
      <!-- 渲染fieldSlots传递的(渲染函数,jsx,tsx)插槽 -->
      <template v-for="(fieldSlot, key) in fieldSlots" :key="key" #[key]="data">
        <component :is="fieldSlot" v-bind="data" />
      </template>

      <el-option
        v-for="item in customOptions"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        v-bind="item.fieldItemProps"
      >
        <template #default>
          <component :is="item.fieldSlot" v-if="isFunction(item.fieldSlot)" v-bind="item" />
          <component :is="fieldChildrenSlot" v-else-if="isFunction(fieldChildrenSlot)" v-bind="item" />
          <template v-else> {{ item.label }} </template>
        </template>
      </el-option>
    </el-select>
    <!-- el-time-picker -->
    <el-time-picker
      v-else-if="valueType === 'time-picker'"
      ref="fieldInstance"
      v-model="state"
      :placeholder="label"
      class="zth-form-item-field"
      clearable
      value-format="YYYY-MM-DD HH:mm:ss"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
    <!-- el-time-select -->
    <el-time-select
      v-else-if="valueType === 'time-select'"
      ref="fieldInstance"
      v-model="state"
      class="zth-form-item-field"
      :placeholder="label"
      clearable
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
    <!-- el-input-textarea -->
    <el-input
      v-else-if="valueType === 'textarea'"
      ref="fieldInstance"
      v-model="state"
      type="textarea"
      class="zth-form-item-field"
      :placeholder="label"
      autocomplete="off"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
    <!-- el-input -->
    <el-input
      v-else
      ref="fieldInstance"
      v-model="state"
      type="input"
      class="zth-form-item-field"
      :placeholder="label"
      autocomplete="off"
      v-bind="customFieldProps"
      @update:model-value="handleChange"
    />
  </el-form-item>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { isFunction } from '@/utils'
import JsxRender from './JsxRender.vue'
import { useCustomOptions } from './hooks/useCustomOptions'
import { ModelValueType, ZthFormItemProp } from '.'
import { getCustomProps, getFieldSlotName, getLabelSlotName, getTooltip } from './utils'
defineOptions({ name: 'FormItem' })

export interface ZthFormItemEmits {
  (e: 'change', data: ModelValueType): void
}

export interface ZthFormItemProps {
  hasLabel?: ZthFormItemProp['hasLabel']
  label?: ZthFormItemProp['label']
  prop: ZthFormItemProp['prop']
  formItemProps?: ZthFormItemProp['formItemProps']
  tooltip?: ZthFormItemProp['tooltip']
  fieldProps?: ZthFormItemProp['fieldProps']
  valueType?: ZthFormItemProp['valueType']
  options?: ZthFormItemProp['options']
  renderField?: ZthFormItemProp['renderField']
  renderLabel?: ZthFormItemProp['renderLabel']
  fieldSlots?: ZthFormItemProp['fieldSlots']
  fieldChildrenSlot?: ZthFormItemProp['fieldChildrenSlot']
  index?: number
}

const emit = defineEmits<ZthFormItemEmits>()

const props = withDefaults(defineProps<ZthFormItemProps>(), {
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
const state = defineModel<ModelValueType>()

const customFormItemProps = ref<any>({})
const customFieldProps = ref<any>({})

const fieldInstance = ref()

const { customOptions, customOptionsIsReady } = useCustomOptions(props)
/**
 * @description 解析formItemProps, 可能是对象, vue响应式对象, function, promise
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
 * @description 解析fieldProps, 可能是对象, vue响应式对象, function, promise
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

/**
 *
 * @description 监听v-model值变化, 触发change事件
 */
const handleChange = (val: any) => {
  emit('change', val)
}
/**
 * el-autocomplete 特殊处理
 * @param param0
 */
const handleSelect = ({ value }: any) => {
  handleChange(value)
}
/**
 * @description 传递渲染函数时, 改变值, 触发change事件
 */
const handleRenderChange = (val: any) => {
  state.value = val
  emit('change', val)
}
defineExpose({
  formItemInstance,
  fieldInstance,
})
</script>
<style lang="scss">
.zth-form-item {
  .zth-form-item-field {
    width: 100%;
  }
}
</style>
