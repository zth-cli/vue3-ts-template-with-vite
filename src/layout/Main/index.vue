<template>
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
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.fullPath)
</script>
<style lang="scss"></style>
