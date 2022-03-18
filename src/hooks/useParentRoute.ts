import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

// 通过子路ID 寻找父级路由集合
export default function useParentRoute() {
  const store = useStore()
  const route = useRoute()

  const routeArr = computed(() => store.getters.routes)

  const parentRoute = ref<Array<any>>([])
  const findRouteById = (routeArrs: Array<IrouteItem>, id: number) => {
    for (let index = 0; index < routeArrs.length; index++) {
      const element = routeArrs[index]
      if (element.id === id) {
        parentRoute.value = [element]
        findRouteById(routeArr.value, element.parentId)
        break
      } else if (element.children) {
        findRouteById(element.children, id)
      }
    }
  }
  findRouteById(routeArr.value, route.meta.rId)

  watch(
    () => route.path,
    () => {
      findRouteById(routeArr.value, route.meta.rId)
    }
  )

  return { parentRoute }
}
