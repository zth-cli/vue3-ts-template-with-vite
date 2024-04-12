import { Icon } from '@/components/Icon'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { CSSProperties } from 'vue'

export const SidebarItem = defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<IrouteItem>,
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
  },
  setup(props, { attrs }) {
    const getDivStyle = computed((): CSSProperties => {
      return {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }
    })
    const getNoDropdownStyle = computed((): CSSProperties => {
      return props.mode === 'vertical'
        ? {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }
        : null
    })

    const getSubMenuIconStyle = computed((): CSSProperties => {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: props.isCollapse ? '0 auto' : '0 5px 0 0',
      }
    })
    const MenuItem = (item: IrouteItem) => {
      return (
        <ElMenuItem index={item.path} class='menu-item-noDropdown' style={getNoDropdownStyle.value} {...attrs}>
          {{
            default: () => (
              <>
                {item.icon && (
                  <div style={getSubMenuIconStyle.value}>
                    <Icon size={18} name={item?.icon} />
                  </div>
                )}
              </>
            ),
            title: () => <div style={getDivStyle.value}>{item.title}</div>,
          }}
        </ElMenuItem>
      )
    }
    const SubMenu = (item: IrouteItem) => {
      return (
        <ElSubMenu index={item.title} {...attrs}>
          {{
            title: () => (
              <>
                <div style={getSubMenuIconStyle.value}>
                  <Icon size={18} name={item?.icon} />
                </div>
                <el-text truncated>{item.title}</el-text>
              </>
            ),
            default: () =>
              item.children?.map((item) => {
                return <SidebarItem item={item} isNest={true} />
              }),
          }}
        </ElSubMenu>
      )
    }
    return () => (
      <>
        {props.item?.children?.length > 0 ? <SubMenu class='sub-menu' {...props.item} /> : <MenuItem {...props.item} />}
      </>
    )
  },
})
