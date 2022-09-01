<!--
 * @Author: 阮志雄
 * @Date: 2022-03-18 15:52:32
 * @LastEditTime: 2022-09-01 17:36:06
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\views\Error\404.vue
-->
<template>
  <section class="error-page">
    <el-empty description="404">
      <el-button type="primary" @click="router.push('/')">返回首页</el-button>
    </el-empty>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style lang="scss">
.error-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--content-background);
}
</style>
