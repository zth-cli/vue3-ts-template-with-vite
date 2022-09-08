import mitt, { Emitter } from 'mitt'
type Events = {
  [key: string]: any
  // 事件名称字符串, 传值any
}
const bus: Emitter<Events> = mitt<Events>()
export default bus
