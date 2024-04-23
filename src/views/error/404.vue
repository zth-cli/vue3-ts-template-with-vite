<template>
  <Layout>
    <section class="error-page">
      <el-empty description="404">
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </el-empty>
    </section>
  </Layout>
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
