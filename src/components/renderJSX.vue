<script lang="tsx">
import { defineComponent, h, ref } from 'vue'
export default defineComponent({
  name: 'renderJsx',
  setup(props, { slots }) {
    const ok = ref(true)
    const eventHandle = (e: PointerEvent) => {
      alert(`坐标:${e.clientX}, ${e.clientY}`)
    }
    return () => (
      <>
        <div>这是渲染函数 & JSX</div>
        <el-button
          onClick={(e) => {
            eventHandle(e)
          }}>
          按钮
        </el-button>
        <div>
          <h4>插槽</h4>
          <div>{slots.default()}</div>
          <h4>具名插槽</h4>
          <div>{slots.footer({ text: '插槽传值' })}</div>
        </div>
      </>
    )
  },
})
</script>
