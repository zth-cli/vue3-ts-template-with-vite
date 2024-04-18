<template>
  <SidebarMenu mode="horizontal" :default-active="defaultActive" />
</template>
<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
import { useDefaultActive } from './hooks/useDefaultActive'
const { defaultActive } = useDefaultActive()
</script>
<style lang="scss">
@import './style.scss';
</style>
