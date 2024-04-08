import { ElDropdown } from 'element-plus'
import { defineExpose } from 'vue'

export const SizeSetting = defineComponent({
  name: 'SizeSetting',
  setup(_props, { slots, attrs }) {
    const sizeArr = [
      { label: '默认', value: 'default' },
      { label: '宽松', value: 'large' },
      { label: '紧凑', value: 'small' },
    ]
    const dropRef = ref<InstanceType<typeof ElDropdown>>()
    defineExpose({
      ...dropRef.value,
    })
    return () => (
      <>
        <el-radio-group {...attrs}>
          <el-dropdown ref={dropRef} trigger='click'>
            {{
              default: () => slots.default(),
              dropdown: () => (
                <el-dropdown-menu>
                  {sizeArr.map((item) => (
                    <el-dropdown-item key={item.value}>
                      <el-radio value={item.value}>{item.label}</el-radio>
                    </el-dropdown-item>
                  ))}
                </el-dropdown-menu>
              ),
            }}
          </el-dropdown>
        </el-radio-group>
      </>
    )
  },
})
