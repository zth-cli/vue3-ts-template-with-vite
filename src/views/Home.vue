<!--
 * @Author: 阮志雄
 * @Date: 2021-10-25 14:25:11
 * @LastEditTime: 2021-11-22 17:29:52
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\views\Home.vue
-->
<template>
  <div class="home">
    <child @change="getData" id="123" ref="childRef">
      <h4>默认内容</h4>
    </child>
  </div>
</template>

<script lang="ts" setup>
import { getConfig } from "@/config";
import child from "@/components/child.vue";
import { ref, onMounted } from "vue";
onMounted(() => {
  console.log(import.meta.env.MODE);
  console.log(import.meta.env);
  console.log(getConfig());
  
  
  console.log(childRef.value.theme);
})
const childRef = ref<InstanceType<typeof child>>(null)
const getData = (id: number) => {
  alert(id);
};
</script>
<style>
.home {
  height: 100vh;
}
</style>
