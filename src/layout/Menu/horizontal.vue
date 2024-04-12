<template>
  <SidebarMenu mode="horizontal" />
</template>
<script setup lang="ts">
import { SidebarMenu } from './SidebarMenu'
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<style lang="scss">
@import './style.scss';
</style>
