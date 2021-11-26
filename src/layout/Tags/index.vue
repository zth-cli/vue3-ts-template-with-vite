<template>
  <div class="tags" v-if="showTags">
    <el-tabs
      :closable="!(tagsList.length == 1)"
      @tab-click="changeTab"
      @tab-remove="closeTags"
      type="card"
      v-model="activeValue"
      size="mini"
    >
      <el-tab-pane
        :key="item.path"
        :label="item.title"
        :name="item.title"
        :tab="item"
        v-for="item in tagsList"
      ></el-tab-pane>
    </el-tabs>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <!-- <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>-->
        <i class="el-icon-menu drop-icon"></i>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import bus from "../utils/bus";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";
import { ref, Ref, watch } from "vue";
const route = useRoute();
const router = useRouter();
const tagsList: Ref<Array<any>> = ref([]);
const activeValue: Ref<string> = ref("");
// 设置标签route
const setTags = (route: RouteLocationNormalizedLoaded) => {
  const routeObj = {
    title: route.meta.title,
    fullPath: route.fullPath,
    name: route.matched[1].components.default.name,
    path: route.path,
    meta: route.meta,
  };
  const existIndex = tagsList.value.findIndex((item) => {
    return item.path === route.path;
  });
  if (existIndex > -1) {
    tagsList.value.splice(existIndex, 1, routeObj);
  } else {
    tagsList.value.push(routeObj);
  }
  activeValue.value = route.meta.title;
  bus.emit("tags", tagsList.value);
};
// 关闭单个标签
const closeTags = (tabName) => {
  const index = tagsList.value.findIndex((item) => item.title == tabName);
  const delItem = tagsList.value.splice(index, 1)[0];
  // 剩余的tags
  const item = tagsList.value[index]
    ? tagsList.value[index]
    : tagsList.value[index - 1];
  if (item) {
    // 更改路由，watch监听，调用setTags,触发自定义事件tags
    delItem.fullPath === route.fullPath && router.push(item.fullPath);
  } else {
    router.push("/");
  }
};
setTags(route);
watch(route, (newValue) => {
  setTags(newValue);
});
</script>
<script lang="ts">
// import bus from "../../utils/bus";
export default {
  data() {
    return {
      tagsList: [],
      activeValue: "",
    };
  },
  methods: {
    changeTab(component) {
      console.log(component);

      const tab = component.$attrs.tab;
      this.$router.push(tab.path);
    },
    // 关闭单个标签
    closeTags(tabName) {
      const index = this.tagsList.findIndex((item) => item.title == tabName);
      const delItem = this.tagsList.splice(index, 1)[0];
      // 剩余的tags
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];
      if (item) {
        // 更改路由，watch监听，调用setTags,触发自定义事件tags
        delItem.fullPath === this.$route.fullPath &&
          this.$router.push(item.fullPath);
      } else {
        this.$router.push("/");
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/"); // 路由变更
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.fullPath === this.$route.fullPath; // 路由变更
      });
      this.tagsList = curItem;
    },
    // 设置标签route
    handleTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
};
/*
逻辑：
1.监听路有变化，添加到tagsList
2.关闭选项，

 */
</script>

<style lang="scss">
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  padding: 0 10px;
  @include content-background();
  display: flex;
  justify-content: space-between;
  align-items: center;
  // @include box-shadow();
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
      height: 23px;
      line-height: 23px;
      border: 1px solid transparent;
      @include border-color();
      @include sec-content-background();
      padding: 0 5px 0 10px;
      vertical-align: middle;
      @include font-color(#fff);
      transition: all 0.3s ease-in;
      border: none;
      padding: 0 5px;
      .el-icon-close:hover {
        background: transparent;
      }
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 30px;
    }
    .el-tabs__item.is-active {
      @include font-color(#fff);
      @include tool-bar-color();
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
      transition: all 0.2s ease-in-out;
      &:hover {
        @include sec-font-color();
        transform: rotate(90deg);
      }
    }
  }
}
</style>
