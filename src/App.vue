<script setup lang="ts">
import { useTheme } from '@/hooks'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const { setTheme } = useTheme()
setTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100vh;
  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
