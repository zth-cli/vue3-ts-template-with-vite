<template>
  <router-view>
    <template #default="{ Component }">
      <transition :name="menuMode === 'horizontal' ? 'slide-fade-Y' : 'slide-fade-X'" appear>
        <keep-alive v-if="route.meta.isCache">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
defineProps({
  menuMode: {
    type: String,
    default: 'vertical',
  },
})

const route = useRoute()
console.log(route.fullPath)
</script>
<style lang="scss">
.child-view {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
