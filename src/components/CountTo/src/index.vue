<template>
  <span :style="{ color }">
    {{ value }}
  </span>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect, unref, onMounted, watch } from 'vue'
import { useTransition, TransitionPresets } from '@vueuse/core'
import { isNumber } from '@/utils'
interface Props {
  startVal: number
  endVal: number
  duration?: number
  autoplay?: boolean
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  decimal?: string
  color?: string
  // 动画模式
  useEasing?: boolean
  transition?: string
}
const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 2022,
  duration: 1500,
  autoplay: true,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  decimal: '.',
  // 动画模式
  useEasing: true,
  transition: 'linear',
})
const emit = defineEmits(['onStarted', 'onFinished'])
const source = ref(props.startVal)
const disabled = ref(false)
let outputValue = useTransition(source)

const value = computed(() => formatNumber(unref(outputValue)))

watchEffect(() => {
  source.value = props.startVal
})

watch([() => props.startVal, () => props.endVal], () => {
  if (props.autoplay) {
    start()
  }
})

onMounted(() => {
  props.autoplay && start()
})

function start() {
  run()
  source.value = props.endVal
}

function reset() {
  source.value = props.startVal
  run()
}

function run() {
  outputValue = useTransition(source, {
    disabled,
    duration: props.duration,
    onFinished: () => emit('onFinished'),
    onStarted: () => emit('onStarted'),
    ...(props.useEasing ? { transition: TransitionPresets[props.transition] } : {}),
  })
}

function formatNumber(num: number | string) {
  if (!num && num !== 0) {
    return ''
  }
  const { decimals, decimal, separator, suffix, prefix } = props
  num = Number(num).toFixed(decimals)
  num += ''

  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return prefix + x1 + x2 + suffix
}
</script>
