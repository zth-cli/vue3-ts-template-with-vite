import { useRoute } from 'vue-router'
export const useDefaultActive = () => {
  const route = useRoute()
  const defaultActive = ref(route.path)
  watch(
    () => route.path,
    () => {
      defaultActive.value = route.path
    },
  )
  return { defaultActive }
}
