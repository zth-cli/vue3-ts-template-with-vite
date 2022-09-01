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
      background-color="#001428"
      active-text-color="#409EFF"
      text-color="#fff"
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
import { useStore } from 'vuex'
import bus from '@/utils/bus'

const store = useStore()
const isCollapse = ref<boolean>(false)

const routeArr = computed(() => store.getters.routes)

const props = withDefaults(defineProps<{ menuMode?: 'horizontal' | 'vertical' }>(), {
  menuMode: 'vertical',
})

bus.on('swithCollapse', (bool: boolean) => {
  props.menuMode === 'vertical' ? (isCollapse.value = bool) : ''
})
</script>

<style lang="scss">
.horizontal-menu-main {
  background-color: #001428;
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
    // color: rgb(214, 106, 87);
  }
  // .el-menu .el-sub-menu__title .el-sub-menu__icon-arrow {
  //   @include font_color(#fff);
  // }
  .el-menu .el-sub-menu__title:hover {
    // @include header-active-background();
  }
  .el-menu .el-menu-item:hover {
    // @include header-active-background();
  }
  .el-menu .el-menu-item.is-active {
    // @include header-active-background();
  }
  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title,
  .el-menu--horizontal > .el-menu-item {
    // height: 50px !important;
    // line-height: 50px !important;
    padding: 0 12px !important;
    font-size: 14px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none !important;
  }
}
.vertical-menu-main {
  width: 200px;
  transition: width 0.2s ease-in;
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
