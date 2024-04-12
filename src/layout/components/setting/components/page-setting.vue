<template>
  <div class="theme-item-sub">
    <span>多标签:</span>
    <el-switch v-model="configStroe.tagsBar" inline-prompt @change="setTagVisible"></el-switch>
  </div>
</template>
<script setup lang="ts">
import { useConfigStroe } from '@/store/appSetting'
const configStroe = useConfigStroe()
const setTagVisible = (val: boolean) => {
  configStroe.tagsBar = val
}
</script>
<style></style>
