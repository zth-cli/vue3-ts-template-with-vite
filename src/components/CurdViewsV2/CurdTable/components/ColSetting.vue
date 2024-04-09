<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="450px">
    <div class="table-main">
      <el-table></el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '@/components/CurdViewsV2'

defineOptions({
  name: 'ColSetting1',
})
defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)
// 打开列设置
const openColSetting = () => {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<style scoped lang="scss">
.cursor-move {
  cursor: move;
}
</style>
