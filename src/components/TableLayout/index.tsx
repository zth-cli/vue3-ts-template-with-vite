import { CSSProperties } from 'vue'
import { Layout } from '../Layout'
export const TableLayout = defineComponent({
  name: 'TableLayout',
  setup(_, { slots }) {
    const style: CSSProperties = {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: '100%',
    }
    return () => (
      <Layout>
        <div style={style}>{slots.default?.()}</div>
      </Layout>
    )
  },
})
