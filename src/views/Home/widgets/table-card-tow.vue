<template>
  <el-card class="t-box-card" shadow="never" :body-style="{ padding: '12px' }">
    <template #header>
      <div class="t-header">
        <span>发电类型统计</span>
      </div>
    </template>
    <el-table :data="tableData" height="300" style="width: 100%" size="large">
      <el-table-column prop="typeName" label="" align="center" width="100"> </el-table-column>
      <el-table-column prop="tcount" label="台数" align="center"> </el-table-column>
      <el-table-column prop="zcount" label="座数" align="center"> </el-table-column>
      <el-table-column prop="rcount" label="容量" align="center"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      tableData: [
        {
          typeName: '燃煤',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '燃气',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '垃圾',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '生活物质',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '综合利用',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
      ],
    }
  },
})
</script>
<style lang="scss">
.t-box-card {
  .el-card__header {
    padding: 14px 20px;
    border: none;
  }
  .t-header {
    span {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
