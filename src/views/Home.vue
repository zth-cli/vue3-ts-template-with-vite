<template>
  <child @change="getData" id="123" ref="childRef">
    <h4>默认内容</h4>
  </child>
</template>

<script lang="ts" setup>
import { getConfig } from '@/config'
import child from '@/components/child.vue'
import { ref, onMounted } from 'vue'
onMounted(() => {
  console.log(import.meta.env.MODE)
  console.log(import.meta.env)
  console.log(getConfig())

  console.log(childRef.value)
})
const childRef = ref<InstanceType<typeof child>>(null)
const getData = (id: number) => {
  alert(id)
}
</script>
<style></style>
