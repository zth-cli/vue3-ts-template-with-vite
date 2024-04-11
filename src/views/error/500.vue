<!--
 * @Author: 阮志雄
 * @Date: 2022-03-18 15:52:32
 * @LastEditTime: 2022-09-05 14:52:06
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\views\Error\500.vue
-->
<template>
  <Playground>
    <section class="error-page">
      <el-empty description="500">
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </el-empty>
    </section>
  </Playground>
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
}
</style>
