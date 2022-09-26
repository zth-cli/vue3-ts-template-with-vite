<template>
  <el-card class="t-box-card" shadow="never" :body-style="{ padding: '12px' }">
    <template #header>
      <div class="t-header">
        <span>地区发电统计图</span>
        <el-radio-group v-model="typeName" size="small" style="float: right; padding: 3px 0">
          <el-radio-button label="台数"></el-radio-button>
          <el-radio-button label="座数"></el-radio-button>
          <el-radio-button label="容量"></el-radio-button>
        </el-radio-group>
      </div>
    </template>
    <el-row :gutter="18" style="margin-bottom: 16px">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div id="charts03" class="charts_main"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <el-table :data="tableData" height="300" style="width: 100%" size="large">
          <el-table-column label="排名" align="center" width="100">
            <template #default="{ $index }">
              <span :class="['aindex', $index <= 2 ? 'active' : '']">{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="typeName" label="地区" align="center" width="100"> </el-table-column>
          <el-table-column prop="tcount" label="台数" align="center"> </el-table-column>
          <el-table-column prop="zcount" label="座数" align="center"> </el-table-column>
          <el-table-column prop="rcount" label="容量" align="center"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { echarts } from '@/utils/lib/echarts'
const areaArr = ['西安', '铜川', '汉中', '延安', '榆林', '湄南', '安康', '宝鸡', '商洛']
export default defineComponent({
  data() {
    return {
      typeName: '台数',
      tableData: areaArr.map((item) => {
        return { typeName: item, tcount: '325', zcount: '121', rcount: '5334' }
      }),
    }
  },
  mounted() {
    const chartDom = document.getElementById('charts03')
    const myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '3%',
        top: 30,
        bottom: 20,
      },
      legend: {
        data: ['台数', '座数', '容量'],
      },
      color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['西安', '铜川', '汉中', '延安', '榆林', '湄南', '安康', '宝鸡', '商洛'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '台数',
          type: 'line',
          barGap: 0.2,

          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 123, 109, 430, 89],
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0, 125, 123,0.8)',
              },
              {
                offset: 1,
                color: 'rgba(58,77,233,0.3)',
              },
            ]),
          },
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
  .aindex {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 100%;
    background-color: var(--background);
  }
  .active {
    background-color: var(--color-primary);
    color: #fff;
  }
}
</style>
