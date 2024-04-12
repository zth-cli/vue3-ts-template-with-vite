<template>
  <div class="theme-item-sub">
    <span>多标签:</span>
    <el-switch v-model="configStroe.showTag" inline-prompt @change="setTagVisible"></el-switch>
  </div>
</template>
<script setup lang="ts">
import { useConfigStroe } from '@/store/modules/appSetting'
const configStroe = useConfigStroe()
const setTagVisible = (val: boolean) => {
  configStroe.showTag = val
}
</script>
<style lang="scss">
.theme-item-sub {
  display: flex;
  justify-content: space-between;
}
</style>
