<template>
  <Layout>
    <el-row :gutter="10">
      <el-col :span="12">
        <div ref="chartRef" :style="{ height: '280px', width: '100%' }" />
      </el-col>
      <el-col :span="12">
        <div ref="chartRef1" :style="{ height: '280px', width: '100%' }" />
      </el-col>
      <el-col :span="12">
        <Child />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="default" @click="close = !close"> 按钮 </el-button>
        <new-menu :menu-data="routeArr" :collapse="close" />
        <div v-resize="true" style="height: 300px; width: 300px; background-color: aquamarine">拖拽resize元素</div>
        <div
          v-dragable="true"
          style="height: 300px; width: 300px; background-color: #ddd; position: absolute; left: 400px; top: 400px"
        >
          拖拽元素
        </div>
      </el-col>
    </el-row>
    <GridBackground />
  </Layout>
</template>
<script lang="ts">
import NewMenu from '@/layout/newMenu'
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useECharts } from '@/hooks/useECharts'
import { useMenuStore } from '@/store/menu'
import Child from '@/components/child.vue'
export default defineComponent({
  components: { NewMenu },
  setup() {
    const close = ref(false)
    const chartRef = ref<HTMLDivElement | null>(null)
    const chartRef1 = ref<HTMLDivElement | null>(null)
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
    const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>)

    onMounted(() => {
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
          ],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: [
              111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222, 11111, 4000, 2000,
              500, 333, 222, 111,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
          {
            smooth: true,
            data: [
              33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390, 198, 60, 30, 22, 11,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#019680',
            },
          },
        ],
      })
      setOptions1({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '6:00',
            '7:00',
            '8:00',
            '9:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
          ],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'solid',
              color: 'rgba(226,226,226,0.5)',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            data: [
              111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222, 11111, 4000, 2000,
              500, 333, 222, 111,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#5ab1ef',
            },
          },
          {
            smooth: true,
            data: [
              33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390, 198, 60, 30, 22, 11,
            ],
            type: 'line',
            areaStyle: {},
            itemStyle: {
              color: '#019680',
            },
          },
        ],
      })
    })
    const menuStore = useMenuStore()

    const routeArr = computed(() => menuStore.routes)
    return { chartRef, chartRef1, routeArr, close }
  },
})
</script>
