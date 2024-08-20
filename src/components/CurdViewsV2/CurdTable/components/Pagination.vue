<template>
  <!-- 分页组件 -->
  <el-pagination
    :current-page="pageable.pageIndex"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :background="true"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { Pageable } from '@/components/CurdViewsV2'
defineOptions({
  name: 'Pagination',
})

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (size: number) => void
  handleCurrentChange: (currentPage: number) => void
}

defineProps<PaginationProps>()
</script>
