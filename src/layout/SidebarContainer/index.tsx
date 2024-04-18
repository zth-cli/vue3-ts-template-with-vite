import { CSSProperties, inject } from 'vue'

export const SidebarContainer = defineComponent({
  name: 'SidebarContainer',
  setup(_props, { slots }) {
    const { isCollapse, isMobile } = inject<any>('layout-provide')
    const style: CSSProperties = {
      position: 'fixed',
      left: 0,
      bottom: 0,
      top: 0,
      zIndex: 1001,
    }
    const mobileStyle = computed<CSSProperties>(() => {
      return isMobile.value
        ? {
            transform: isCollapse.value ? 'translate3d(-208px, 0, 0)' : 'none',
          }
        : {}
    })
    const maskStyle = computed<CSSProperties>(() => {
      return isMobile.value
        ? {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.3)',
          }
        : {}
    })
    return () => (
      <>
        <div style={{ ...style, ...mobileStyle.value }}>{slots.default?.()}</div>
        {isMobile.value && !isCollapse.value && (
          <div style={maskStyle.value} onClick={() => (isCollapse.value = true)} />
        )}
      </>
    )
  },
})
