<template>
  <div class="dashboard-item">
    <div class="t-card__header">
      <div class="t-card__header-wrapper">
        <div>
          <span class="t-card__title">{{ title }}</span>
        </div>
      </div>
    </div>
    <div class="t-card__body">
      <div class="dashboard-item-top">
        <countTo prefix="" :start-val="1" :end-val="count" />
      </div>
      <div class="dashboard-item-left">
        <span>
          <svg-icon :icon="icon" style="font-size: 120px"></svg-icon>
        </span>
      </div>
    </div>
    <div class="t-card__footer">
      <div class="t-card__footer-wrapper">
        <div class="dashboard-item-bottom">
          <div class="dashboard-item-block">
            座数
            <el-tag size="small" style="margin: 0 8px" effect="plain">123</el-tag>
            台数
            <el-tag size="small" style="margin: 0 8px" effect="plain">123</el-tag>
            容量
            <el-tag size="small" style="margin: 0 8px" effect="plain">123</el-tag>
          </div>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="t-card_mask">
      <svg-icon :icon="icon" style="font-size: 120px"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { countTo } from '@/components/CountTo'
export default defineComponent({
  components: { countTo },
  props: {
    count: {
      type: Number,
      default: 1020,
    },
    title: String,
    icon: {
      type: String,
      default: 'shuidian-3',
    },
  },
  data() {
    return {}
  },
})
</script>
<style lang="scss">
.dashboard-item {
  height: 168px;
  padding: 8px;
  border: 1px dash transparent;
  border-radius: 6px;
  background-color: var(--content-background);

  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  .t-card__header {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    position: relative;
    line-height: 1.5;
    .t-card__header-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      .t-card__title {
        font-size: 14px;
        font-weight: 500;
        margin-right: 8px;
        word-break: break-all;
      }
    }
  }
  .t-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 24px;
    padding-top: 0;
    line-height: 1.5;
    box-sizing: border-box;
    flex: 1;
    position: relative;
    .dashboard-item-top {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      span {
        display: inline-block;
        font-size: 36px;
        line-height: 44px;
      }
    }
    .dashboard-item-left {
      position: absolute;
      top: 0;
      right: 32px;
      span {
        margin-top: -24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 66px;
        height: 66px;
        // background: #e0ebff;
        border-radius: 50%;
      }
    }
  }
  .t-card__footer {
    display: flex;
    justify-content: space-between;
    padding: 16px 24px;
    box-sizing: border-box;
    padding-top: 0;
    .t-card__footer-wrapper {
      flex: 1;
      color: rgba(0, 0, 0, 0.4);
      font-size: 14px;
      .dashboard-item-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .dashboard-item-block {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 22px;
      }
    }
  }
  .t-card_mask {
    position: absolute;
    top: 20px;
    right: 10px;
    font-size: 90px;
    filter: blur(30px);
  }
}
</style>
