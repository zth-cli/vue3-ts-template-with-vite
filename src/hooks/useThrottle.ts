// 节流
export function useThrottle(cb: Function, duration = 100) {
  let start = +new Date()
  return function (...args) {
    const now = +new Date()
    if (now - start >= duration) {
      cb.apply(this, args)
      start = now
    }
  }
}
