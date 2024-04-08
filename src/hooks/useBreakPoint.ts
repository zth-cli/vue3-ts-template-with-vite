import { BreakPoint } from '@/components/CurdViewsV2'

export const useBreakPoint = () => {
  const breakPoint = ref<BreakPoint>('xs')
  const resize = (e: Event) => {
    const width = (e.target as Window).innerWidth
    switch (!!width) {
      case width < 768:
        breakPoint.value = 'xs'
        break
      case width >= 768 && width < 992:
        breakPoint.value = 'sm'
        break
      case width >= 992 && width < 1200:
        breakPoint.value = 'md'
        break
      case width >= 1200 && width < 1920:
        breakPoint.value = 'lg'
        break
      case width >= 1920:
        breakPoint.value = 'xl'
        break
      default:
        break
    }
  }
  onMounted(() => {
    resize({ target: { innerWidth: window.innerWidth } } as any)
    window.addEventListener('resize', resize)
  })
  onActivated(() => {
    resize({ target: { innerWidth: window.innerWidth } } as any)
    window.addEventListener('resize', resize)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })
  onDeactivated(() => {
    window.removeEventListener('resize', resize)
  })
  return { breakPoint }
}
