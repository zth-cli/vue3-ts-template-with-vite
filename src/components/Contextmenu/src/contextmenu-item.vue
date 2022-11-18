<template>
  <p @click.stop="itemClickHnadle()">
    <slot></slot>
  </p>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { itemProvide, Tprovide, Command } from './utils'

const props = defineProps<{
  command: Command
}>()

const itemPro = inject<Tprovide>(itemProvide)

const itemClickHnadle = () => {
  itemPro.itemClickHnadle(props.command)
}
</script>
<script lang="ts">
export default {
  name: 'ContextmenuItem',
}
</script>
<style></style>
