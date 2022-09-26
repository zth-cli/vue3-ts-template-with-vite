<!--
 * @Author: 阮志雄
 * @Date: 2022-09-26 15:56:19
 * @LastEditTime: 2022-09-26 16:06:27
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-ts-template-with-vue-cli\src\views\Home\widgets\table-card-one.vue
-->
<template>
  <el-card class="t-box-card" shadow="never" :body-style="{ padding: '12px' }">
    <template #header>
      <div class="t-header">
        <span>电压等级发电统计</span>
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
          typeName: '330kV',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '220kV',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '110kV',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '35kV',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '10kV',
          tcount: '325',
          zcount: '121',
          rcount: '5334',
        },
        {
          typeName: '300v',
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
    border: none;
    padding: 14px 20px;
  }
  .t-header {
    span {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
