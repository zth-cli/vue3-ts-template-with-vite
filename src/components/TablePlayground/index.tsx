import { CSSProperties } from 'vue'
import { Playground } from '../Playground'
export const TablePlayground = defineComponent({
  setup(_, { slots }) {
    const style: CSSProperties = {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    }
    return () => (
      <Playground>
        <div style={style}>{slots.default?.()}</div>
      </Playground>
    )
  },
})
