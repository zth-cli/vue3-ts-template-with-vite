<template>
  <div>
    <h1>{{ title }}</h1>
    <el-icon color="red">
      <edit />
    </el-icon>
    <h2>{{ props.name }}</h2>
    <el-button type="primary" @click="clickHandle"> 点击 </el-button>
    <el-button type="primary" @click="clickHandles"> 提示 </el-button>
    <el-button v-auth="{ action: ['admin'], effect: 'disabled' }" type="primary"> 鉴权 </el-button>
    <el-button type="warning" @click="warn('控制台抛异常')"> 控制台抛异常 </el-button>
    <el-button
      type="primary"
      @click="downloadByUrl({ url: 'http://localhost:8889/src/assets/img/logo.png', fileName: 'a.png' })"
    >
      下载
    </el-button>
    <slot name="default" />
    {{ loading }}
    <p />
    <CountNum prefix="$" :start-val="1" :end-val="100" />
    <renderJsx>
      <strong>这是默认插槽内容</strong>
      <template #footer="{ text }">
        <strong>具名插槽内容：{{ text }}</strong>
      </template>
    </renderJsx>
  </div>
</template>

<script lang="ts" setup>
import renderJsx from './renderJSX.vue'
import { CountNum } from './CountNum'
import { warn } from '@/utils/log'
import { downloadByUrl } from '@/utils/downloadFile'
import { Ref, ref, useAttrs, getCurrentInstance, onMounted } from 'vue'
import { useRequest } from '@/hooks/useRequest'
import { getAsyncRoutes } from '@/api'

const { loading, error, result, fetchResource } = useRequest(getAsyncRoutes)

const handler = () => {
  console.log(1)
}

onMounted(() => {
  fetchResource().then((result) => {
    console.log(result)
  })
})
// 定义ref响应式变量
const title: Ref<string> = ref('home page')

// 定义常量(非响应式),可直接在模板使用
const theme = {
  color: 'red',
}

// 定义props
interface Props {
  name?: string
  [key: string]: any
}
// defineProps编译器宏(处理过程一同被编译掉)
const props = withDefaults(defineProps<Props>(), {
  name: 'Vue3',
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
  instance.appContext.config.globalProperties.$Toast({
    type: 'info',
    title: '这是一句标题',
    message: 'mount函数的主要逻辑。',
  })
}

// 对外暴露属性(defineExpose)
defineExpose({
  title,
  theme,
})
</script>
<style>
h1 {
  color: v-bind('theme.color');
}
</style>
