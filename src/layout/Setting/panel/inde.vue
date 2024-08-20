<template>
  <el-drawer title="系统配置" :append-to-body="true" size="300px" v-bind="$attrs">
    <!-- 继承所有的slot -->
    <template v-for="k in Object.keys($slots)" #[k] :key="k">
      <slot :name="k" />
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<style></style>
