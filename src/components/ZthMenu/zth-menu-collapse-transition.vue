<template>
  <transition mode="out-in" v-bind="listeners">
    <slot />
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { addClass, hasClass, removeClass } from '@/utils'
import type { BaseTransitionProps, TransitionProps } from 'vue'

export default defineComponent({
  name: 'ZthMenuCollapseTransition',
  setup() {
    const perfix = 'menu'
    const listeners = {
      onBeforeEnter: (el) => (el.style.opacity = '0.2'),
      onEnter(el, done) {
        addClass(el, `${perfix}-opacity-transition`)
        el.style.opacity = '1'
        done()
      },

      onAfterEnter(el) {
        removeClass(el, `${perfix}-opacity-transition`)
        el.style.opacity = ''
      },

      onBeforeLeave(el) {
        if (!el.dataset) {
          ;(el as any).dataset = {}
        }
        if (hasClass(el, 'zth-menu-collapse')) {
          removeClass(el, 'zth-menu-collapse')
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          addClass(el, 'zth-menu-collapse')
        } else {
          addClass(el, 'zth-menu-collapse')
          el.dataset.oldOverflow = el.style.overflow
          el.dataset.scrollWidth = el.clientWidth.toString()
          removeClass(el, 'zth-menu-collapse')
        }

        el.style.width = `${el.scrollWidth}px`
        el.style.overflow = 'hidden'
      },

      onLeave(el: HTMLElement) {
        addClass(el, 'horizontal-collapse-transition')
        el.style.width = `${el.dataset.scrollWidth}px`
      },
    } as BaseTransitionProps<HTMLElement> as TransitionProps

    return {
      listeners,
    }
  },
})
</script>
