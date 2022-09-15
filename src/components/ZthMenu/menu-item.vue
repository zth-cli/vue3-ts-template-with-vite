<template>
  <li class="zth-menu-item">
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<style lang="scss">
.zth-menu-item {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  font-size: var(--el-menu-item-font-size);
  padding: 0 20px 0 40px;
  list-style: none;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
  color: #fff;
}
</style>
