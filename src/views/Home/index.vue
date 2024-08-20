<template>
  <Layout>
    <div class="home-main">
      <el-row :gutter="18">
        <el-col
          v-for="(item, i) in dashBoardList"
          :key="i"
          v-motion
          :initial="{
            opacity: 0,
            y: 1000,
          }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: {
              delay: 80 * (i + 1),
            },
          }"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="6"
          :xl="6"
        >
          <dashboardItem v-bind="item" style="margin-bottom: 16px" />
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" style="margin-bottom: 16px">
          <bar-charts />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5" style="margin-bottom: 16px">
          <pie-charts />
        </el-col>
      </el-row>
      <el-row>
        <el-col style="margin-bottom: 16px">
          <line-charts />
        </el-col>
      </el-row>
      <el-row :gutter="18">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin-bottom: 16px">
          <card-one />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin-bottom: 16px">
          <card-tow />
        </el-col>
      </el-row>
    </div>
  </Layout>
</template>

<script lang="ts">
import dashboardItem from './widgets/dashboard-item.vue'
import barCharts from './widgets/bar-charts.vue'
import pieCharts from './widgets/pie-charts.vue'
import lineCharts from './widgets/line-charts.vue'
import cardOne from './widgets/table-card-one.vue'
import cardTow from './widgets/table-card-tow.vue'
export default defineComponent({
  components: { dashboardItem, barCharts, pieCharts, lineCharts, cardOne, cardTow },
  data() {
    return {
      dashBoardList: [
        { title: '总计', count: 1234, icon: 'guangdian' },
        { title: '座数', count: 1234, icon: 'shuidian-3' },
        { title: '台数', count: 1234, icon: 'redianchangSVG' },
        { title: '容量', count: 1234, icon: 'fengdian' },
      ],
    }
  },
})
</script>
<style lang="scss">
.home-main {
  box-sizing: border-box;
  min-height: 100%;
}
</style>
