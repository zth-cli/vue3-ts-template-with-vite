import { defineStore } from 'pinia'

const env = import.meta.env

export const useConfigStroe = defineStore(
  'useConfigStroe',
  () => {
    const sidebarLogo = ref(env.VITE_SIDEBAR_LOGO)
    const menuMode = ref<'vertical' | 'horizontal'>(env.VITE_MENU_MODE)
    const showTag = ref(env.VITE_SHOW_TAG)
    const showThemeBar = ref(env.VITE_SHOW_THEME)

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
      sidebarLogo,
      menuMode,
      showTag,
      showThemeBar,
    }
  },
  {
    persist: {
      key: '_appSetting',
      storage: localStorage,
    },
  },
)
