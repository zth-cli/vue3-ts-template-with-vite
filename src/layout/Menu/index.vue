<template>
  <div
    class="horizontal-menu-main"
    :class="{ isCollapse: isCollapse, 'vertical-menu-main': props.menuMode === 'vertical' }"
  >
    <div v-if="props.menuMode === 'vertical'" class="slide-logo">
      <img src="@/assets/img/logo.png" />
    </div>
    <el-menu
      class="sidebar-el-menu"
      :mode="props.menuMode"
      unique-opened
      :collapse="isCollapse"
      :background-color="menuColor.backgroundColor"
      :active-text-color="menuColor.activeTextColor"
      :text-color="menuColor.textColor"
      router
    >
      <template v-for="item in routeArr">
        <template v-if="item.children">
          <el-sub-menu :key="item.index" :index="item.title">
            <template #title>
              <el-icon :size="20">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem, i) in item.children" :key="i" :index="subItem.path">
              {{ subItem.title }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :key="item.index" :index="item.path">
            <el-icon :size="20">
              <component :is="item.icon" />
            </el-icon>
            <template #title>
              <span>{{ item.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMenuStore } from '@/store/menu'
import bus from '@/utils/bus'
import { useThemeStore } from '@/store/theme'

const menuStore = useMenuStore()
const themeStroe = useThemeStore()
const isCollapse = ref<boolean>(false)

const routeArr = computed(() => menuStore.routes)
const menuColor = computed(() => themeStroe.menuCss)

const props = withDefaults(defineProps<{ menuMode?: 'horizontal' | 'vertical' }>(), {
  menuMode: 'vertical',
})

bus.on('swithCollapse', (bool: boolean) => {
  props.menuMode === 'vertical' ? (isCollapse.value = bool) : ''
})
</script>

<style lang="scss">
.horizontal-menu-main {
  background-color: v-bind('menuColor.backgroundColor');
  height: 100%;
  width: auto;
  overflow-y: auto;
  .el-menu {
    border-right: none;
  }
  .icons {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title,
  .el-menu--horizontal > .el-menu-item {
    padding: 0 12px !important;
    font-size: 14px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
}
.vertical-menu-main {
  width: 208px;
  transition: width 0.2s ease-in;
  // border-right: 1px solid #eee;
}
.slide-logo {
  margin-left: 10px;
  margin-top: 12px;
}
.isCollapse {
  width: 64px;
  overflow: hidden;
}
</style>
