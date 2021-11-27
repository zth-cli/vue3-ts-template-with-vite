<template>
  <div class="zth-route-view">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="slide-fade">
          <keep-alive v-if="route.meta.isCache">
            <component class="child-view" :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component class="child-view" v-else :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.fullPath)
</script>
<style lang="scss">
.zth-route-view {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  // 路由动画
  .child-view {
    position: absolute;
    left: 0;
    right: 0;
    transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
  }
}
</style>
