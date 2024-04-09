import { ref, watch, h, resolveComponent, defineOptions, defineEmits, PropType } from 'vue'
import { OptionsProps, SelectDataProps } from '..'
import './style.scss'
export const SelectFilter = defineComponent({
  name: 'SelectFilter',
  props: {
    data: {
      type: Array as () => SelectDataProps[],
      default: () => [],
    },
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    // 重新接收默认值
    const selected = ref<Record<string, any>>({})
    watch(
      () => props.defaultValues,
      () => {
        props.data.forEach((item) => {
          if (item.multiple) {
            selected.value[item.key] = props.defaultValues[item.key] ?? ['']
          } else {
            selected.value[item.key] = props.defaultValues[item.key] ?? ''
          }
        })
      },
      { deep: true, immediate: true },
    )

    const handleSelect = (item: SelectDataProps, option: OptionsProps) => {
      if (!item.multiple) {
        //  单选
        if (selected.value[item.key] !== option.value) {
          selected.value[item.key] = option.value
          emit('change', selected.value)
        }
      } else {
        // selected.value[item.key] 警告
        if (!Array.isArray(selected.value[item.key])) {
          console.error(`${item.key}应该是是一个Array类型, 请检查${item.key}是否是一个数组`)
          return
        }

        // 多选 如果选中的是第一个值(全选)，则直接设置
        if (item.options[0].value === option.value) {
          selected.value[item.key] = [option.value]
        }
        // 如果选择的值已经选中了，则删除选中的值
        if (selected.value[item.key].includes(option.value)) {
          const index = selected.value[item.key].findIndex((val: any) => val === option.value)
          selected.value[item.key].splice(index, 1)
          // 当全部删光时，把第第一个值选中
          if (selected.value[item.key].length === 0) {
            selected.value[item.key] = [item.options[0].value]
          }
        } else {
          selected.value[item.key].push(option.value)
          // 单选中全部并且点击到了未选中的值，把第一个值删除掉
          if (selected.value[item.key].includes(item.options[0].value)) {
            selected.value[item.key].splice(0, 1)
          }
        }
        emit('change', selected.value)
      }
    }
    return () => (
      <div class='select-filter'>
        {props.data.map((item) => {
          return (
            <div class='select-filter-item' key={item.key}>
              <div class='select-filter-item-title'>
                <span>{item.title} ：</span>
              </div>
              <el-scrollbar>
                <ul class='item-list'>
                  {item.options.map((option) => {
                    return (
                      <li
                        key={option.value}
                        class={{
                          active:
                            option.value === selected.value[item.key] ||
                            (Array.isArray(selected.value[item.key]) &&
                              selected.value[item.key].includes(option.value)),
                        }}
                        onClick={() => handleSelect(item, option)}>
                        {slots.default ? (
                          slots.default({ option })
                        ) : (
                          <>
                            <>{option.icon && <el-icon>{h(resolveComponent(option.icon))}</el-icon>}</>
                            <span>{option.label}</span>
                          </>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </el-scrollbar>
              {!item.options.length && <span class='empty'>暂无数据</span>}
            </div>
          )
        })}
      </div>
    )
  },
})
