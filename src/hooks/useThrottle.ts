// 节流
export function useThrottle(cb:Function, duration = 100) {
  let start = +new Date()
  return function () {
    let args = arguments, context = this
    let now = +new Date()
    if (now - start >= duration) {
      cb.apply(context, args)
      start = now
    }
  }
}
