<template>
  <zth-menu>
    <template v-for="(item, index) in model" :key="index">
      <sub-menu v-if="item.children?.length" :index="item.id" :data="item.children">
        <template #title>
          <el-icon :size="20">
            <component is="setting" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </sub-menu>
      <menu-item v-else :index="item.id">{{ item.title }}</menu-item>
    </template>
  </zth-menu>
</template>
<script setup lang="ts">
type menuProps = { model: Array<any>; mode?: boolean; uniqueOpened?: boolean }
const props = defineProps<menuProps>()
</script>
<script lang="ts">
export default {
  name: 'NewMenus',
}
</script>
