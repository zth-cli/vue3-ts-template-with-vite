<template>
  <slot></slot>
  <Teleport to="body"><div v-show="showContext" ref="mask" class="zth-context-mask"></div></Teleport>
  <div v-show="showContext" ref="contextDom" class="zth-context" :style="{ left: left + 'px', top: top + 'px' }">
    <slot name="menu"> </slot>
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useSlots, getCurrentInstance, provide } from 'vue'
import ContextmenuItem from './contextmenu-item.vue'
import { itemProvide, Tprovide, Command } from './utils'

const instance = getCurrentInstance()
const mask = ref(null)
const slots = useSlots()

const props = withDefaults(
  defineProps<{
    trigger?: 'contextmenu' | 'click' | 'dbcliclk'
  }>(),
  {
    trigger: 'contextmenu',
  }
)

const emits = defineEmits<{
  (e: 'command', command: Command)
}>()

const itemClickHnadle = (command: Command) => {
  emits('command', command)
  showContext.value = false
}

provide<Tprovide>(itemProvide, { itemClickHnadle })

// tabs右键事件
const showContext = ref<boolean>(false)
const contextDom = ref(null)
const left = ref<number>(0)
const top = ref<number>(0)
const tabsRightClickHandle = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
  // const parentDom = instance.vnode.el.nextElementSibling
  // const bounds = parentDom.getBoundingClientRect()
  const x = e.clientX,
    y = e.clientY
  left.value = x + 6
  top.value = y + 12
  showContext.value = true
}
onClickOutside(contextDom, () => {
  showContext.value = false
})

onMounted(() => {
  nextTick(() => {
    const menuSlots = slots?.menu() || []
    if (menuSlots.length > 0) {
      const legal = menuSlots.every((item) => item.type === ContextmenuItem)
      if (!legal) {
        throw new Error('menu slot must be ContextmenuItem compoenet')
      }
      const parentDom = instance.vnode.el.nextElementSibling as HTMLElement
      if (parentDom === mask.value) {
        throw new Error('must wrap an Element DOM!')
      }
      parentDom.addEventListener(props.trigger, tabsRightClickHandle)
    }
  })
})
onUnmounted(() => {
  const parentDom = instance.vnode.el.nextElementSibling as HTMLElement
  parentDom.removeEventListener(props.trigger, tabsRightClickHandle)
})
const maskReturn = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
}
onMounted(() => {
  mask.value.addEventListener('contextmenu', maskReturn)
})
onBeforeUnmount(() => {
  mask.value.removeEventListener('contextmenu', maskReturn)
})
</script>
<script lang="ts">
export default {
  name: 'Contextmenu',
}
</script>
<style lang="scss">
.zth-context-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 110;
  user-select: none;
}
.zth-context {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
  background-color: var(--content-background);
  border-radius: 2px;
  width: 120px;
  padding: 12px 0;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 30px;
  color: var(--el-text-color-secondary);
  box-shadow: var(--el-box-shadow);
  p {
    padding-left: 20px;
    text-align: start;
    cursor: pointer;
    &:hover {
      background-color: var(--background);
      color: var(--el-text-color-regular);
    }
  }
  .disabled {
    cursor: not-allowed !important;
    color: var(--el-border-color);
    &:hover {
      background-color: var(--background);
      color: var(--el-border-color);
    }
  }
}
</style>
