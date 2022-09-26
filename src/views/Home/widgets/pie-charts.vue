<template>
  <el-card class="t-box-card" shadow="never" :body-style="{ padding: '12px' }">
    <template #header>
      <div class="t-header">
        <span>发电统计比例图</span>
      </div>
    </template>

    <div id="charts02" class="charts_main"></div>
  </el-card>
</template>

<script lang="ts">
import { echarts } from '@/utils/lib/echarts'
export default defineComponent({
  data() {
    return {}
  },
  mounted() {
    const chartDom = document.getElementById('charts02')
    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'item',
      },
      color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: '台数' },
            { value: 735, name: '座数' },
            { value: 580, name: '容量' },
          ],
        },
      ],
    }

    option && myChart.setOption(option)
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
  .charts_main {
    height: 320px;
    width: 100%;
  }
}
</style>
