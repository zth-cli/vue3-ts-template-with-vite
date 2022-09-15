<template>
  <ul class="zth-menu">
    <template v-for="(item, index) in model" :key="index">
      <sub-menu v-if="item.children?.length">
        <template #title>
          <el-icon :size="20">
            <component is="setting" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <zth-menu :model="item.children"></zth-menu>
      </sub-menu>
      <menu-item v-else>{{ item.title }}</menu-item>
    </template>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ model: Array<any> }>()
</script>
<script lang="ts">
export default {
  name: 'ZthMenu',
}
</script>
<style lang="scss">
.zth-menu {
  border-right: solid 1px var(--el-menu-border-color);
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #001529;
  box-sizing: border-box;
  color: #fff;
  transition: all 0.3s;
  i {
    margin-right: 5px;
    width: 24px;
  }
}
</style>
