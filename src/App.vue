<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
console.log('hello script setup')
// window.addEventListener('click', (event:Event)=> {
//   console.log(event);

// }, false)
</script>

<template>
  <el-config-provider :locale="locale">
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
