<template>
  <div class="curd_tree_wrap">
    <span class="toggle">
      <i :class="[toggle ? 'el-icon-arrow-left' : 'el-icon-arrow-right']" @click="changeSatus"></i>
    </span>
    <div v-show="toggle" class="tree_main">
      <!-- {{dataUrlArr}} -->
      <!-- <slot name="treetab"></slot> -->
      <div v-if="dataUrlArr.length > 1" class="tree_tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="tab in dataUrlArr" :key="tab.value" :label="tab.name" :name="tab.value"></el-tab-pane>
        </el-tabs>
      </div>
      <el-input
        v-if="search && !isLazyLoad"
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        size="small"
      ></el-input>
      <slot v-else name="searchselect"></slot>
      <div v-loading="loading" class="lazy_tree_list">
        <el-scrollbar
          class="treescrollbar"
          style="height: 100%; background: #fff; overflow-y: hidden; overflow-x: hidden"
        >
          <el-tree
            v-if="isShow"
            ref="tree"
            class="filter-tree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :render-content="renderFunction"
            node-key="id"
            :load="loadNode"
            lazy
            :highlight-current="true"
            :default-expanded-keys="defaultExpandedNodes"
            @node-click="nodeClick"
            @node-expand="nodeExpand"
          ></el-tree>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script type="jsx">
import { apiGet } from '@/api'
export default {
  props: {
    dataUrlArr: {
      type: Array,
      default: function () {
        return []
      },
    },
    param: {},
    search: {
      type: Boolean,
      default: true,
    },
    defaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'name',
          isLeaf: 'leaf',
        }
      },
    },
    renderFunction: {
      type: Function,
      default: renderContent,
    },
    defaultExpandedNodes: {
      type: Array,
      default: () => [],
    },
    isLazyLoad: {
      // true: 表示树为异步加载，用slot自定义搜索框，否则用input过滤搜索
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      toggle: true,
      filterText: '',
      isShow: true,
      activeName: this.dataUrlArr[0].value,
      activeIndex: 0,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    // dataUrlArr: {
    //   handler(val) {
    //     this.$nextTick(() => {
    //       this.loadNode();
    //     });
    //   },
    //   deep: true
    // }
  },
  created() {},
  methods: {
    queryData(resolve, index) {
      if (!this.dataUrlArr || this.loading === true) {
        return
      }
      this.loading = true
      //   let params = Object.assign({}, this.dataUrlArr[index].params);
      //   console.log(params);

      return apiGet(
        this.dataUrlArr[this.activeIndex].urlArr[index].url,
        this.dataUrlArr[this.activeIndex].urlArr[index].params
      )
        .then((res) => {
          this.loading = false
          if (res.code === 0) {
          } else {
            const data = res.data[this.dataUrlArr[this.activeIndex].urlArr[index].responseName]

            if (index === this.dataUrlArr[this.activeIndex].urlArr.length - 1) {
              data.forEach((item) => {
                item.leaf = true
              })
            } else {
              data.forEach((item) => {
                // 暂时兼容书上查询公式
                if (item.attribute === 'formulaId') {
                  item.leaf = true
                }
              })
            }
            return resolve(data)
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    changeSatus() {
      this.toggle = !this.toggle
      this.$emit('changeSatus', this.toggle) // 触发自定义事件
    },
    filterNode(value, data) {
      if (!value) {
        return true
      }
      return data.name.indexOf(value) !== -1
    },
    nodeClick(data, node) {
      this.$emit('nodeClick', { data, node })
    },
    loadNode(node, resolve) {
      const urlArr = this.dataUrlArr[this.activeIndex].urlArr
      for (let index = 0; index < urlArr.length; index++) {
        if (node.level === index) {
          return this.queryData(resolve, index)
        }
        if (node.level > urlArr.length - 1) {
          return resolve([])
        }
      }
    },
    nodeExpand(data, node) {
      this.$emit('node-expand', data, node)
    },
    handleClick(tab) {
      this.isShow = false
      this.dataUrlArr.forEach((item, index) => {
        if (item.value === tab.name) {
          this.activeIndex = index
          this.$emit('tab-click', index)
          this.$nextTick(() => {
            this.isShow = true
          })
        }
      })
    },
  },
}

function renderContent(h, { node }) {
  // console.log(node);
  // eslint-disable-next-line no-unused-vars
  let icon = 'el-icon-folder'
  switch (node.level) {
    case 1:
      icon = 'el-icon-folder'
      break
    case 2:
      icon = 'el-icon-document'
      break
    case 3:
      icon = 'el-icon-collection-tag'
      break
    case 4:
      icon = 'el-icon-coin'
      break
    default:
      icon = 'el-icon-document'
      break
  }
  return (
    <span class='custom-tree-node'>
      <span>
        <i class={icon}> </i> {node.label}{' '}
      </span>{' '}
    </span>
  )
}
</script>
<style lang="scss">
.curd_tree_wrap {
  background-color: var(--content-background);
  height: 100%;
  position: relative;
  border-radius: 0 4px 4px 0;
  .el-tree {
    background-color: transparent;
    min-width: 100%;
    display: inline-block !important;
  }
}

.toggle {
  position: absolute;
  top: 49%;
  right: -12px;
  background-color: #ece9f1;
  width: 12px;
  height: 28px;
  color: #282a29;
  text-align: center;
  cursor: pointer;
  line-height: 28px;
}

.tree_main {
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
}

.lazy_tree_list {
  min-width: 220px;
  font-size: 12px !important;
  height: calc(100% - 30px);
  overflow-y: auto;
  overflow-x: hidden;
}
.treescrollbar {
  background-color: transparent !important;
}
</style>
