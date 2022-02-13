<script setup lang="ts">
console.log('hello script setup')
// window.addEventListener('click', (event:Event)=> {
//   console.log(event);
  
// }, false)
</script>

<template>
  <router-view />
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
