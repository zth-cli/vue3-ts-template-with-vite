<!--
 * @Author: 阮志雄
 * @Date: 2021-10-25 14:25:11
 * @LastEditTime: 2021-12-17 10:15:35
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\components\child.vue
-->
<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ props.name }}</h2>
    <el-button type="primary" size="mini" @click="clickHandle">点击</el-button>
    <el-button type="primary" size="mini" @click="clickHandles">点击</el-button>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, useAttrs, getCurrentInstance } from 'vue'

// 定义ref响应式变量
let title: Ref<string> = ref('home page')

// 定义常量(非响应式),可直接在模板使用
const theme = {
  color: 'red'
}

// 定义props
interface Props {
  name?: string
  [key: string]: any
}
// defineProps编译器宏(处理过程一同被编译掉)
const props = withDefaults(defineProps<Props>(), {
  name: 'Vue3'
})

// 自定义事件
const emits = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 使用useAttrs(),useSlots()
const attrs = useAttrs()
console.log(attrs?.id) // 父组件传过来的非props定义的属性

// 函数方法
const clickHandle = () => {
  emits('change', 1)
}

const instance = getCurrentInstance()
const clickHandles = () => {
  // 这里调用 vue3 的全局变量时比较羞耻, 不知道各位大佬有没有其他好办法
  instance.appContext.config.globalProperties.$Toast({
    type: 'info',
    title: '这是一句标题',
    message: '本文就是梳理mount函数的主要逻辑，旨在理清基本的处理流程（Vue 3.1.1版本）。'
  })
}

// 对外暴露属性(defineExpose)
defineExpose({
  title,
  theme
})
</script>
<style>
h1 {
  color: v-bind('theme.color');
}
</style>
