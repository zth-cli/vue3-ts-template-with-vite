<template>
  <div class="drawer-block-checkbox">
    <div class="drawer-block-checkbox-item drawer-block-checkbox-item-slide" @click="setMenuMode('vertical')">
      <el-icon v-show="configStroe.menuMode === 'vertical'" class="selectIcon"><Select /></el-icon>
    </div>
    <div class="drawer-block-checkbox-item drawer-block-checkbox-item-top" @click="setMenuMode('horizontal')">
      <el-icon v-show="configStroe.menuMode === 'horizontal'" class="selectIcon"><Select /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useConfigStroe } from '@/store/modules/appSetting'
const configStroe = useConfigStroe()
const setMenuMode = (mode: 'vertical' | 'horizontal') => {
  configStroe.menuMode = mode
}
</script>
<style></style>
@/store/modules/appSetting
