<template>
  <div>
    <child id="123" ref="childRef" v-dialogDrag @change="getData">
      <h4>默认内容</h4>
    </child>
    <overlay v-model="close" title="弹框" oheight="50vh" />
  </div>
</template>

<script lang="ts" setup>
import child from '@/components/child.vue'
import { overlay } from '@/components/Overlay'
import { ref, onMounted } from 'vue'

const close = ref<boolean>(false)
onMounted(() => {
  console.log(import.meta.env.MODE)
  console.log(import.meta.env)

  console.log(childRef.value)
})
const childRef = ref<InstanceType<typeof child>>(null)
const getData = (id: number) => {
  close.value = !close.value
}
</script>
<style></style>
