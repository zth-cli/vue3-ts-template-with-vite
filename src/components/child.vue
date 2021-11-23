<!--
 * @Author: 阮志雄
 * @Date: 2021-10-25 14:25:11
 * @LastEditTime: 2021-11-03 18:41:17
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\components\child.vue
-->
<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ props.name }}</h2>
    <el-button type="primary" size="mini" @click="clickHandle">点击</el-button>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref, useAttrs } from "vue";

// 定义ref响应式变量
let title: Ref<string> = ref("home page");

// 定义常量(非响应式),可直接在模板使用
const theme = {
  color: "red",
};

// 定义props
interface Props {
  name?: string;
  [key: string]: any;
}
// defineProps编译器宏(处理过程一同被编译掉)
const props = withDefaults(defineProps<Props>(), {
  name: "Vue3",
});

// 自定义事件
const emits = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();


// 使用useAttrs(),useSlots()
const attrs = useAttrs()
console.log(attrs?.id); // 父组件传过来的非props定义的属性


// 函数方法
const clickHandle = () => {
  emits("change", 1);
};

// 对外暴露属性(defineExpose)
defineExpose({
  title,
  theme
})
</script>
<style>
h1 {
  color: v-bind("theme.color");
}
</style>
