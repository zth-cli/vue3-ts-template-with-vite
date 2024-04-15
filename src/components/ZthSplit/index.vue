<template>
  <div ref="split-block" class="co-split">
    <div v-if="modeStr === 'vertical'" class="co-split-vertical">
      <div class="co-left-pane co-split-pane-vertical" :style="leftTopStyle">
        <slot name="left"></slot>
      </div>
      <div
        :class="['co-split-trigger', 'trigger-vertical', { 'c-disbale': forbind }]"
        :style="{ left: percent + '%' }"
        @mousedown="triggerMousedown"
        @mouseup="triggerMouseup()"
      >
        <div class="co-split-button co-split-button-vertical" @click.stop="triggerHandle"></div>
      </div>
      <div class="co-right-pane co-split-pane-vertical" :style="rightBottomStyle">
        <slot name="right"></slot>
      </div>
    </div>
    <div v-if="modeStr === 'horizontal'" class="co-split-horizontal">
      <div class="co-top-pane co-split-pane-horizontal" :style="leftTopStyle">
        <slot name="top"></slot>
      </div>
      <div
        :class="['co-split-trigger', 'trigger-horizontal', { 'c-disbale': forbind }]"
        :style="{ top: percent + '%' }"
        @mousedown="triggerMousedown"
        @mouseup="triggerMouseup()"
      >
        <div class="co-split-button co-split-button-horizontal" @click.stop="triggerHandle"></div>
      </div>
      <div class="co-bottom-pane co-split-pane-horizontal" :style="rightBottomStyle">
        <slot name="bottom"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: 0.8,
      validator: function (value: number) {
        // 比例小于1
        return value <= 1
      },
    },
    mode: {
      type: String,
      default: 'vertical',
      validator: function (value: string) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      },
    },
    miniPiexl: {
      type: Number,
      default: 200,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'on-trigger'],
  data() {
    return {
      percent: 0,
      spliting: false, //是否在split
      endPoint: 0,
      startPoint: 0,
      wrapWidth: 0,
      trgger: false,
    }
  },
  computed: {
    leftTopStyle: function () {
      return this.mode === 'vertical' ? { right: 100 - this.percent + '%' } : { bottom: 100 - this.percent + '%' }
    },
    rightBottomStyle: function () {
      return this.mode === 'vertical' ? { left: this.percent + '%' } : { top: this.percent + '%' }
    },
    modeStr: function () {
      return this.mode
    },
    forbind: function () {
      return this.disabled
    },
    lastWidth: function () {
      return this.wrapWidth * this.modelValue
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        this.$nextTick(() => {
          if (!val) {
            this.percent = 0
            return
          }
          const wrap = this.$refs['split-block']
          this.wrapWidth = this.mode === 'vertical' ? wrap.clientWidth : wrap.clientHeight
          this.percent = this.getPercent(this.modelValue * 100)
        })
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      const wrap = this.$refs['split-block']
      window.addEventListener('mouseup', () => {
        this.spliting = false
        this.$emit('update:modelValue', this.percent / 100)
        wrap.removeEventListener('mousemove', this.splitHandle)
      })
    })
  },
  methods: {
    splitHandle(event: PointerEvent) {
      if (this.spliting) {
        this.endPoint = this.mode === 'vertical' ? event.pageX : event.pageY
        const percent = ((this.wrapWidth * this.modelValue + (this.endPoint - this.startPoint)) / this.wrapWidth) * 100
        this.percent = this.getPercent(percent)
      } else {
        console.log('up')
      }
    },
    triggerMousedown(event: PointerEvent) {
      const wrap = this.$refs['split-block']
      wrap.style.userSelect = 'none'
      this.spliting = true
      this.startPoint = this.mode === 'vertical' ? event.pageX : event.pageY
      wrap.addEventListener('mousemove', this.splitHandle)
    },
    triggerMouseup() {
      this.spliting = false
      this.$emit('update:modelValue', this.percent / 100)
      const wrap = this.$refs['split-block']
      wrap.style.userSelect = 'auto'
      wrap.removeEventListener('mousemove', this.splitHandle)
    },
    getPercent(percent: number) {
      const currentWidth = (this.wrapWidth * percent) / 100
      const miniValue = (this.miniPiexl / this.wrapWidth) * 100
      return currentWidth <= this.miniPiexl
        ? miniValue
        : currentWidth >= this.wrapWidth - this.miniPiexl
          ? 100 - miniValue
          : percent
    },
    triggerHandle() {
      this.trgger = !this.trgger
      this.$emit('on-trigger', this.trgger)
    },
  },
})
</script>
<style lang="scss">
.co-split {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: auto;
  .co-split-vertical {
    .co-split-pane-vertical {
      position: absolute;
      top: 0;
      bottom: 0;
    }
    .co-left-pane {
      left: 0;
    }
    .co-right-pane {
      right: 0;
    }

    .trigger-vertical {
      width: 3px;
      height: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .co-split-horizontal {
    .co-split-pane-horizontal {
      position: absolute;
      left: 0;
      right: 0;
    }
    .co-top-pane {
      top: 0;
    }
    .co-bottom-pane {
      bottom: 0;
    }
    .trigger-horizontal {
      width: 100%;
      height: 3px;
      cursor: row-resize;
      &:hover {
        // background-color: var(--el-color-primary-light-9);
        background-image: linear-gradient(
          to right,
          var(--el-color-primary-light-9),
          var(--el-color-primary),
          var(--el-color-primary-light-9)
        );
      }
    }
  }
  .co-split-trigger {
    background: transparent;
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
    position: absolute;
    z-index: 10;
    .co-split-button {
      pointer-events: all;
      position: absolute;
      background-color: var(--el-color-info-light-5);
      color: #282a29;
      text-align: center;
      cursor: pointer;
      z-index: 100;
      border-radius: 3px;
      box-sizing: border-box;
      &:hover {
        border: 1px solid var(--el-color-primary-light-5);
        background-color: #fff;
      }
    }
    .co-split-button-vertical {
      top: 50%;
      transform: translateY(-50%);
      right: -1px;
      width: 6px;
      height: 68px;
    }
    .co-split-button-horizontal {
      left: 50%;
      transform: translateX(-50%);
      top: -1px;
      width: 68px;
      height: 6px;
    }
    &:hover {
      // background-color: var(--el-color-primary-light-9);
      background-image: linear-gradient(
        to bottom,
        var(--el-color-primary-light-9),
        var(--el-color-primary),
        var(--el-color-primary-light-9)
      );
    }
  }
  .c-disbale {
    pointer-events: none;
  }
}
</style>
