import { h, resolveComponent } from 'vue'
export const Icon = defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => (
      <el-icon size={20} {...attrs}>
        {props.name && h(resolveComponent(props.name))}
      </el-icon>
    )
  },
})
