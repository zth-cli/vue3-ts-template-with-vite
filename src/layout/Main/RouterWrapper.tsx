import { PropType, VNode, h } from 'vue'
export const RouterWrapper = defineComponent({
  name: 'RouterWrapper',
  props: {
    is: {
      type: Object as PropType<VNode>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () => <div class='child-view'>{h(props.is, { ...attrs })}</div>
  },
})
