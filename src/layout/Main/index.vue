<template>
  <div class="zth-route-view">
    <router-view>
      <template #default="{ Component }">
        <transition :name="menuMode === 'horizontal' ? 'slide-fade-Y' : 'slide-fade-X'" appear>
          <keep-alive v-if="route.meta.isCache">
            <component :is="Component" :key="route.fullPath" class="child-view" />
          </keep-alive>
          <component :is="Component" v-else :key="route.fullPath" class="child-view" />
        </transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { useConfigStroe } from '@/store/appSetting'

const store = useConfigStroe()
const route = useRoute()
const menuMode = computed(() => store.menuMode)
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
    box-sizing: border-box;
    padding: 0 12px;
  }
}
</style>
