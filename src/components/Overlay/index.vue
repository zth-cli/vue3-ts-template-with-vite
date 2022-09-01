<template>
  <transition name="slide-fade">
    <div v-show="modelValue" class="overlay">
      <div
        ref="overlayMain"
        v-dialogDrag="{ dialogDrag: isDialogDrag, handle: '.overlay_head' }"
        :style="{ height: oheight, width: width }"
        :class="{ full_screen: isFullScreen }"
        class="overlayMain"
        @click.stop
      >
        <div class="overlay_head" @dblclick.stop="fullScreen()">
          {{ title }}
          <div class="fr close_btn">
            <span @click="fullScreen()">
              <el-icon class="ol_icon" :size="size">
                <full-screen />
              </el-icon>
              <i class="el-icon-full-screen"></i>
            </span>
            <span @click="switchs()">
              <el-icon class="ol_icon" :size="size">
                <close />
              </el-icon>
            </span>
          </div>
        </div>
        <div class="overlay_view">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, toRefs, reactive, computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'OverLay',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    oheight: {
      type: String,
      default: '',
    },
    owidth: {
      type: String,
      default: '',
    },
    title: String,
    isDialogDrag: {
      // 控制弹框拖拽
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  emits: ['update:modelValue'],
  setup(props: any, context: { emit: any }) {
    const { emit } = context
    const { owidth, size, modelValue } = toRefs(props)
    const isFullScreen = ref(false)
    const sizeArr = reactive({ mini: '30vw', small: '60vw', large: '90vw' })
    const overlayMain = ref<HTMLElement>(null)
    const fullScreen = () => {
      isFullScreen.value = !isFullScreen.value
      if (isFullScreen.value) {
        overlayMain.value.style.left = '0px'
        overlayMain.value.style.top = '0px'
      }
    }
    const switchs = () => {
      emit('update:modelValue', false)
    }
    const width = computed(() => (owidth.value ? owidth.value : sizeArr[size.value]))
    return {
      overlayMain,
      isFullScreen,
      width,
      fullScreen,
      switchs,
    }
  },
})
</script>

<style lang="scss">
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  .full_screen {
    transition: all 0.21s ease-in-out;
    width: 100vw !important;
    height: 100vh !important;
  }
  .overlayMain {
    position: relative;
    background-color: var(--content-background);
    box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow-x: hidden;
    // transition: all 0.2s ease-in;  //拖拽延迟
    box-sizing: content-box;
    margin: 0 auto;
    // transition: all .21s ease-in-out;
    .overlay_head {
      // background-color: var(--color-primary);
      border-bottom: 1px solid transparent;
      text-align: start;
      height: 46px;
      padding: 2px 8px;
      line-height: 46px;
      font-size: 17px;
      cursor: pointer;
      .close_btn {
        cursor: pointer;
        .ol_icon {
          margin-left: 14px;
          font-size: 20px;
          &:hover {
            color: #e8ebee;
          }
        }
      }
    }
    .overlay_view {
      box-sizing: border-box;
      width: 100%;
      min-height: 100px;
      height: calc(100% - 50px);
      overflow: auto;
      // padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // justify-content: center;
      .form_btn {
        text-align: center;
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
