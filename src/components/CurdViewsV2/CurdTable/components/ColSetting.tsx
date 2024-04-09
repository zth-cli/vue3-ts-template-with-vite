import { defineModel } from 'vue'
export const ColSetting = defineComponent({
  name: 'ColSetting',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const model = ref([])
    watch(
      () => props.modelValue,
      (val) => {
        model.value = val
      },
      {
        immediate: true,
      },
    )
    watch(
      () => model.value,
      (val) => {
        emit('update:modelValue', val)
      },
    )
    return () => (
      <>
        <el-popover placement='bottom' trigger='click'>
          {{
            default: () => <span>{JSON.stringify(model)}</span>,
            reference: () => slots.default(),
          }}
        </el-popover>
      </>
    )
  },
})
