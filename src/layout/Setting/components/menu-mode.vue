<template>
  <div class="drawer-block-checkbox">
    <div
      v-for="(item, i) in list"
      :key="i"
      :class="['drawer-block-checkbox-item', 'drawer-block-checkbox-item-' + item.value]"
      @click="setMenuMode(item.value)"
    >
      <el-icon v-show="configStroe.menuMode === item.value" class="selectIcon"><Select /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useConfigStroe } from '@/store/modules/appSetting'
const configStroe = useConfigStroe()
const setMenuMode = (mode: 'vertical' | 'horizontal') => {
  configStroe.menuMode = mode
}
const list: Array<{ label: string; value: 'vertical' | 'horizontal' }> = [
  {
    label: 'vertical',
    value: 'vertical',
  },
  {
    label: 'horizontal',
    value: 'horizontal',
  },
]
</script>
<style lang="scss">
.drawer-block-checkbox {
  display: flex;
  overflow: hidden;
  &-item {
    position: relative;
    margin-right: 16px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    width: 44px;
    height: 36px;
    background-color: #f0f2f5;
    .selectIcon {
      color: rgb(142, 142, 142);
      position: absolute;
      bottom: 4px;
      right: 6px;
      font-weight: 700;
      font-size: 14px;
      pointer-events: none;
    }
  }
  &-item-vertical {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #001428;
      content: '';
      z-index: 1;
    }
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      content: '';
    }
  }
  &-item-horizontal {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: transparent;
      content: '';
      z-index: 1;
    }
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #001428;
      content: '';
    }
  }
}
</style>
