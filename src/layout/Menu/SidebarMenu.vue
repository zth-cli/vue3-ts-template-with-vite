<template>
  <el-menu unique-opened :collapse="collapse" router v-bind="$attrs">
    <SidebarItem
      v-for="item in routeArr"
      :key="item.path"
      :is-collapse="collapse"
      :item="item"
      :mode="($attrs?.mode as string) || ''"
    />
  </el-menu>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '@/store/menu'
import { SidebarItem } from './SidebarItem'

defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
})
const menuStore = useMenuStore()
const routeArr = computed<IrouteItem[]>(() => menuStore.routes)
</script>
<style></style>
