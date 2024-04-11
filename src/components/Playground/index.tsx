import { CSSProperties } from 'vue'

export const Playground = defineComponent({
  name: 'Playground',
  props: {
    full: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const style: CSSProperties = {
      position: 'absolute',
      left: 0,
      right: 0,
      height: ' 100%',
      width: '100%',
      boxSizing: 'border-box',
      padding: props.full ? '0' : '12px',
    }
    return () => <div style={style}>{slots.default?.()}</div>
  },
})
