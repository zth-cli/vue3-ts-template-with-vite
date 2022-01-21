import { ref } from 'vue'

//  防抖

export function useDebounce(cb:Function, delay = 100) {
  const timer = ref<any>(null)

  const debHandler = () => {
    clearInterval(timer)
    let args = arguments,
      context = this
    timer.value = setTimeout(() => {
      cb.apply(context, args)
    }, delay)
  }
  const debCancel = () => {
    clearInterval(timer)
    timer.value = null
  }
  return { debHandler, debCancel }
}
