<template>
  <div class="horizontal-menu-main vertical-menu-main" :class="{ isCollapse: isCollapse }">
    <div class="slide-logo">
      <!-- <img src="@/assets/img/logo.png" /> -->
    </div>
    <el-menu
      class="sidebar-el-menu"
      unique-opened
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      text-color="#fff"
      router
    >
      <template v-for="item in routeArr">
        <template v-if="item.children">
          <el-sub-menu :index="item.title" :key="item.index">
            <template #title>
              <i class="icons" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="(subItem, i) in item.children"
              :key="i"
              :index="subItem.path"
            >{{ subItem.title }}</el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.index">
            <template #title>
              <i class="icons" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
// import routeArr from '../mock/router'
import bus from '../utils/bus'
const isCollapse = ref<boolean>(false)
const store = useStore()
const routeArr = computed(()=> store.getters.routes)
bus.on('swithCollapse', (bool: boolean) => {
  isCollapse.value = bool
})
// const props = withDefaults(defineProps<{ isCollapse: boolean }>(), { isCollapse: false })
</script>

<style lang="scss">
.horizontal-menu-main {
  @include header-background();
  height: 100%;
  width: auto;
  overflow-y: auto;
  .el-menu {
    @include header-background();
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
  .el-menu .el-sub-menu__title .el-sub-menu__icon-arrow {
    @include font_color(#fff);
  }
  .el-menu .el-sub-menu__title:hover {
    @include header-active-background();
  }
  .el-menu .el-menu-item:hover {
    @include header-active-background();
  }
  .el-menu .el-menu-item.is-active {
    @include header-active-background();
  }
  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title,
  .el-menu--horizontal > .el-menu-item {
    height: 50px !important;
    line-height: 50px !important;
    padding: 0 12px !important;
    font-size: 12px;
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
