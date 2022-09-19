import { MenuItem, ZthMenu, SubMenu } from '@/components/ZthMenu'
import { ElIcon } from 'element-plus'
import { resolveComponent, h } from 'vue'
import type { PropType } from 'vue'
export default defineComponent({
  components: { MenuItem, ZthMenu, SubMenu, ElIcon },
  props: {
    menuData: Array as PropType<IrouteItem[]>,
  },
  methods: {
    menuLoopHandle(data: IrouteItem[]) {
      return data.map((item: IrouteItem) => {
        if (item.children?.length) {
          return (
            <sub-menu index={item.id}>
              {{
                title: () => [
                  item.icon && <el-icon size={20}>{h(resolveComponent(item.icon))}</el-icon>,
                  <span>{item.title}</span>,
                ],
                default: () => this.menuLoopHandle(item.children),
              }}
            </sub-menu>
          )
        }
        return (
          <menu-item index={item.id}>
            {item.icon && <el-icon size={20}>{h(resolveComponent(item.icon))}</el-icon>}
            <span>{item.title}</span>
          </menu-item>
        )
      })
    },
  },
  render() {
    const childNodes = this.menuLoopHandle(this.menuData)
    return <zth-menu>{childNodes}</zth-menu>
  },
})
