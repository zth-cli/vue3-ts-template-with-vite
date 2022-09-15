<template>
  <li class="zth-sub-menu">
    <div class="zth-sub-menu__title">
      <slot name="title"></slot>
      <el-icon :size="20" class="zth-sub-menu__icon-arrow">
        <component is="ArrowDown" />
      </el-icon>
    </div>
    <zth-menu-collapse-transition>
      <slot></slot>
    </zth-menu-collapse-transition>
  </li>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<script lang="ts">
export default {
  name: 'SubMenu',
}
</script>
<style lang="scss">
.zth-sub-menu {
  list-style: none;
  margin: 0;
  padding-left: 0;
  .zth-sub-menu__title {
    display: flex;
    align-items: center;
    height: var(--el-menu-item-height);
    line-height: var(--el-menu-item-height);
    font-size: var(--el-menu-item-font-size);
    padding: 0 var(--el-menu-base-level-padding);
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    color: #fff;
    .zth-sub-menu__icon-arrow {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -7px;
      transition: transform 0.3s;
      font-size: 12px;
      margin-right: 0;
      width: inherit;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>
