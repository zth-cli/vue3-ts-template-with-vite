<template>
  <div v-if="showTags" class="tags">
    <el-tabs
      v-model="activeValue"
      class="tage-main"
      :closable="!(tagsList.length == 1)"
      type="card"
      size="small"
      @tab-click="changeTab"
      @tab-remove="closeTags"
    >
      <el-tab-pane v-for="item in tagsList" :key="item.path" :label="item.title" :name="item.title"></el-tab-pane>
    </el-tabs>
    <div class="tags-close-box">
      <el-dropdown placement="bottom" @command="handleTags">
        <el-button icon="ArrowDown" style="border: none"></el-button>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import bus from '@/utils/bus'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import { ref, Ref, watch, computed } from 'vue'
import { TabsPaneContext } from 'element-plus'
const route = useRoute()
const router = useRouter()
const tagsList: Ref<Array<any>> = ref([])
const activeValue: Ref<string> = ref('')
// 设置标签route
const setTags = (route: RouteLocationNormalizedLoaded) => {
  const routeObj = {
    title: route.meta.title,
    fullPath: route.fullPath,
    name: route.name,
    path: route.path,
    meta: route.meta,
  }
  const existIndex = tagsList.value.findIndex((item) => {
    return item.path === route.path
  })
  if (existIndex > -1) {
    tagsList.value.splice(existIndex, 1, routeObj)
  } else {
    tagsList.value.push(routeObj)
  }
  activeValue.value = route.meta.title
  bus.emit('tags', tagsList.value)
}
// 关闭单个标签
const closeTags = (tabName: string) => {
  const index = tagsList.value.findIndex((item) => item.title === tabName)
  const delItem = tagsList.value.splice(index, 1)[0]
  // 剩余的tags
  const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1]
  if (item) {
    // 更改路由，watch监听，调用setTags,触发自定义事件tags
    delItem.fullPath === route.fullPath && router.push(item.fullPath)
  } else {
    router.push('/')
  }
}
const changeTab = (pane: TabsPaneContext) => {
  const curPathName = pane.props.label
  const routeItem = tagsList.value.filter((item) => item.title === curPathName)[0]
  router.push(routeItem.path)
}
// 关闭全部标签
const closeAll = () => {
  tagsList.value = []
  router.push('/')
}
// 关闭其他标签
const closeOther = () => {
  const curItem = tagsList.value.filter((item) => {
    return item.fullPath === route.fullPath
  })
  tagsList.value = curItem
}
// 设置标签route
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll()
}
setTags(route)
watch(route, (newValue) => {
  setTags(newValue)
})
const showTags = computed(() => tagsList.value.length > 0)
/*
逻辑：
1.监听路有变化，添加到tagsList
2.关闭选项，

 */
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 44px;
  overflow: hidden;
  padding: 0 10px;
  background-color: var(--background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 19px 6px 10px;
  .tage-main {
    overflow: hidden;
    overflow-x: auto;
  }
  // @include box-shadow();
  .el-tabs--top.el-tabs--card > .el-tabs__header {
    border: none;
  }
  .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:nth-child(2) {
    padding-left: 5px;
  }
  .el-tabs--top.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
    padding-right: 5px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable {
    padding-left: 5px;
    padding-right: 5px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs__header {
    border: none;
    margin: 0;
    .el-tabs__item {
      margin: 3px 5px 3px 3px;
      border-radius: 3px;
      font-size: 12px;
      overflow: hidden;
      cursor: pointer;
      height: 32px;
      padding: 6px 12px 4px !important;
      background-color: var(--content-background);
      vertical-align: middle;

      transition: all 0.3s ease-in;
      line-height: 22px;
      text-align: center;
      border: none !important;
      .el-icon-close:hover {
        background: transparent;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 32px;
    }
    .el-tabs__nav {
      border: none;
    }
  }
  .tags-close-box {
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;

    line-height: 30px;
    // box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
    cursor: pointer;
    .drop-icon {
      font-size: 18px;
      font-weight: bolder;
      transition: all 0.2s ease-in-out;
      &:hover {
        // transform: rotate(90deg);
      }
    }
  }
}
</style>
