<template>
  <transition name="toast" @after-leave="afterLeave" @after-enter="afterEnter">
    <!-- 弹窗 -->
    <div
      v-show="visible"
      ref="container"
      class="toast-container"
      :style="toastStyle"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <!-- icon -->
      <template v-if="type || type != 'custom'">
        <div v-if="type === 'success'" class="toast-icon success">
          <i class="fi fi-br-check"></i>
        </div>
        <div v-if="type === 'warning'" class="toast-icon warning">?</div>
        <div v-if="type === 'info'" class="toast-icon info">
          <i class="fi fi-sr-bell-ring"></i>
        </div>
        <div v-if="type === 'error'" class="toast-icon error">
          <i class="fi fi-br-cross-small"></i>
        </div>
      </template>
      <div
        v-if="type === 'custom'"
        :style="{ backgroundColor: customIconBackground }"
        class="toast-icon"
        v-html="customIcon"
      ></div>
      <img v-if="type === 'img'" class="toast-custom-img" :src="customImg" />
      <!-- content -->
      <div class="toast-content">
        <!-- head -->
        <div v-if="title" class="toast-head">
          <!-- title -->
          <span class="toast-title">{{ title }}</span>
          <!-- time -->
          <span class="toast-countdown">{{ countDown }}</span>
        </div>
        <!-- body -->
        <div v-if="message" class="toast-body" v-html="message"></div>
        <!-- operate -->
        <div class="toast-operate">
          <a
            class="toast-button-confirm"
            :class="[
              { success: type === 'success' },
              { warning: type === 'warning' },
              { info: type === 'info' },
              { error: type === 'error' },
            ]"
            >{{ confirmText }}</a
          >
        </div>
      </div>
      <!-- 关闭 -->
      <div v-if="closeIcon" class="toast-close" @click="destruction">
        <i class="fi fi-rr-cross-small"></i>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, defineComponent } from 'vue'

interface Itoasts {
  title: string
  closeIcon?: boolean
  message?: string
  type?: 'success' | 'warning' | 'info' | 'error' | 'custom' | 'img'
  confirmText?: string
  customIcon?: string
  customIconBackground?: string
  customImg?: string
  autoClose?: number
  close: (id: string) => void
}
const props = withDefaults(defineProps<Itoasts>(), { closeIcon: true, autoClose: 4500 })
// 显示
const visible = ref(false)

// 容器实例
const container = ref(null)

// 高度
const height = ref(0)

// 位置
const toastPosition = ref({
  x: 16,
  y: 16,
})
const toastStyle = computed(() => {
  return {
    top: `${toastPosition.value.y}px`,
    right: `${toastPosition.value.x}px`,
  }
})

// 倒计时
const countDown = computed(() => {
  return '2 seconds ago'
})

const id = ref('')

// 离开以后
function afterLeave() {
  // Bus.emit('closed', id.value)
  props.close(id.value)
}
// 进入以后
function afterEnter() {
  height.value = container.value.offsetHeight
}

// 定时器
const timer = ref(null)

// 鼠标进入
function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
  }
}
// 鼠标移出
function createTimer() {
  if (props.autoClose) {
    timer.value = setTimeout(() => {
      visible.value = false
    }, props.autoClose)
  }
}

// 销毁
function destruction() {
  visible.value = false
}

onMounted(() => {
  createTimer()
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})

// 暴露属性方法给实力
defineExpose({
  id,
  visible,
  container,
  height,
  toastPosition,
  toastStyle,
})
// return {
//   visible,
//   toastPosition,
//   toastStyle,
//   countDown,
//   afterLeave,
//   afterEnter,
//   clearTimer,
//   createTimer,
//   timer,
//   destruction,
//   container,
//   height,
//   id
// }
</script>

<style lang="scss" scoped>
// 外部容器
.toast-container {
  width: 330px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  background-color: rgba(#f7f7f7, 0.6);
  border: 1px solid #e5e5e5;
  padding: 14px 13px;
  z-index: 1001;
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 10px;
  backdrop-filter: blur(15px);
  display: flex;
  align-items: stretch;
  transition: all 0.3s ease;
  will-change: top, left;
}
// -------------- icon --------------
.toast-icon,
.toast-close {
  flex-shrink: 0;
}
.toast-icon {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
// 正确
.toast-icon.success {
  background-color: rgba(#2bb44a, 0.15);
  color: #2bb44a;
}
// 异常
.toast-icon.warning {
  background-color: rgba(#ffcc00, 0.15);
  color: #f89e23;
  font-weight: 600;
  font-size: 18px;
}
// 错误
.toast-icon.error {
  font-size: 18px;
  background-color: rgba(#eb2833, 0.1);
  color: #eb2833;
}
// 信息
.toast-icon.info {
  background-color: rgba(#3e71f3, 0.1);
  color: #3e71f3;
}
// 自定义图片
.toast-custom-img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}
// ------------- content -----------
.toast-content {
  padding: 0 8px 0 13px;
  flex: 1;
}
// -------------- head --------------
.toast-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// title
.toast-title {
  font-size: 16px;
  line-height: 24px;
  color: #191919;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// time
.toast-countdown {
  font-size: 12px;
  color: #929292;
  line-height: 18.375px;
}
// --------------- body -----------
.toast-body {
  color: #191919;
  line-height: 21px;
  padding-top: 5px;
}
// ---------- close -------
.toast-close {
  padding: 3px;
  cursor: pointer;
  font-size: 18px;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.toast-close:hover {
  background-color: rgba(#e4e4e4, 0.5);
}
// --------- operate ----------
.toast-button-confirm {
  font-weight: 600;
  color: #3e71f3;
}
.toast-button-confirm:hover {
  color: #345ec9;
}
// 成功
.toast-button-confirm.success {
  color: #2bb44a;
}
.toast-button-confirm.success:hover {
  color: #218a3a;
}
// 异常
.toast-button-confirm.warning {
  color: #f89e23;
}
.toast-button-confirm.warning:hover {
  color: #df8f1f;
}
// 信息
.toast-button-confirm.info {
  color: #3e71f3;
}
.toast-button-confirm.info:hover {
  color: #345ec9;
}
// 错误
.toast-button-confirm.error {
  color: #eb2833;
}
.toast-button-confirm.error:hover {
  color: #c9101a;
}

/*动画*/
.toast-enter-from,
.toast-leave-to {
  transform: translateX(120%);
}
.v-leave-from,
.toast-enter-to {
  transform: translateX(00%);
}
</style>
