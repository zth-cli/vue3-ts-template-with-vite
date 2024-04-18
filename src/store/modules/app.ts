import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'

const env = import.meta.env

export const useAppStore = defineStore(
  'useAppStore',
  () => {
    /*
     * 响应式断点
     */
    const breakpoints = useBreakpoints({
      mobile: 0, // optional
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    })

    const activeBreakpoint = computed(() => breakpoints.active())
    const isMobile = computed(() => unref(breakpoints.active()) === 'mobile')
    const isTablet = computed(() => unref(breakpoints.active()) === 'tablet')

    const sidebarLogo = ref(env.VITE_SIDEBAR_LOGO)
    const menuMode = ref<'vertical' | 'horizontal'>(env.VITE_MENU_MODE)
    const showTag = ref(env.VITE_SHOW_TAG)
    const showThemeBar = ref(env.VITE_SHOW_THEME)
    const collapse = ref(false)

    watch(
      breakpoints.active(),
      (val) => {
        if (val === 'mobile') {
          collapse.value = true
        }
      },
      { immediate: true },
    )

    // watch menuMode, 给body元素的layout添加属性
    watch(
      () => menuMode.value,
      (newValue) => {
        document.body.setAttribute('layout', newValue)
      },
      {
        immediate: true,
      },
    )

    return {
      isMobile,
      isTablet,
      activeBreakpoint,
      sidebarLogo,
      menuMode,
      showTag,
      showThemeBar,
      collapse,
    }
  },
  {
    persist: {
      key: '_appSetting',
      storage: localStorage,
      paths: ['menuMode', 'showTag', 'showThemeBar', 'sidebarLogo'],
    },
  },
)
