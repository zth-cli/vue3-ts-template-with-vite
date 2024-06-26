<template>
  <component :is="renderComponent" v-if="renderType === 'form'" v-model="state" v-bind="customFieldProps" />
  <component :is="renderComponent" v-else v-bind="customFieldProps" />
</template>

<script lang="ts" setup>
import { isVNode, watch, ref } from 'vue'
import type { VNode } from 'vue'
import type { ZthFormItemProp, ModelValueType } from '.'
import { isString } from '@/utils'

defineOptions({ name: 'JsxRender' })

export interface JsxRenderProps {
  /**
   * 渲染的类型
   */
  renderType?: 'form'
  /**
   * @description 表单组件(wl-input等)绑定的值
   */
  modelValue?: ModelValueType
  customFieldProps?: ZthFormItemProp['fieldProps'] | ZthFormItemProp['formItemProps']
  render?: ZthFormItemProp['renderField'] | ZthFormItemProp['renderLabel'] | ((...arg: any[]) => void)
  params?: Partial<ZthFormItemProp>
  handleChange?: (...arg: any[]) => void
}

const props = withDefaults(defineProps<JsxRenderProps>(), {
  renderType: undefined,
  modelValue: '',
  customFieldProps: () => ({}),
  params: () => ({}),
})

const state = ref()

watch(
  () => props.modelValue,
  (val) => {
    state.value = val
  },
  {
    flush: 'post',
    immediate: true,
  },
)

/**
 * @description 调用renderField或renderLabel, 如果是VNode, 添加属性再返回，如果是string, 直接返回
 */
const renderComponent = () => {
  if (!props.render) {
    return
  }

  /** params 回调第二个参数值 */
  const params = { ...props.params } as ZthFormItemProp

  /** dynamicComponent 组件 */
  const dynamicComponent =
    props.renderType === 'form'
      ? (props.render as Exclude<ZthFormItemProp['renderField'], undefined>)(state.value, props.handleChange!, params)
      : (props.render as any)(state.value, params)

  /** VNode / J(T)SX  虚拟dom或者jsx */
  if (isVNode(dynamicComponent)) {
    const payload =
      props.renderType === 'form'
        ? {
            modelValue: state.value,
            ...props.customFieldProps,
            ...dynamicComponent.props,
          }
        : {
            ...props.customFieldProps,
            ...dynamicComponent.props,
          }

    return {
      ...dynamicComponent,
      props: payload,
    } as VNode
  } else if (isString(dynamicComponent)) {
    return dynamicComponent
  }
}
</script>
