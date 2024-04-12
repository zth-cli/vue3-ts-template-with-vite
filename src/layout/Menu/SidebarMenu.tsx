import { computed } from 'vue'
import { useMenuStore } from '@/store/menu'
import { SidebarItem } from './SidebarItem'
export const SidebarMenu = defineComponent({
  name: 'SidebarMenu',
  props: { collapse: { type: Boolean, default: false } },
  setup(props, { attrs }) {
    const menuStore = useMenuStore()
    const routeArr = computed<IrouteItem[]>(() => menuStore.routes)
    return () => (
      <el-menu unique-opened default collapse={props.collapse} router {...attrs}>
        {routeArr.value.map((item, index) => (
          <SidebarItem item={item} isCollapse={props.collapse} mode={attrs?.mode || ''} key={index} />
        ))}
      </el-menu>
    )
  },
})
