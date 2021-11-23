<template>
  <div class="curd_tree_wrap">
    <span class="toggle">
      <i
        :class="[toggle ? 'el-icon-arrow-left' : 'el-icon-arrow-right']"
        @click="changeSatus"
      ></i>
    </span>
    <div class="tree_main" v-show="toggle">
      <el-input
        v-if="search"
        placeholder="输入关键字进行过滤"
        size="mini"
        v-model="filterText"
      ></el-input>
      <div class="tree_list" v-loading="loading">
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :render-content="renderFunction"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="expandOnclickNode"
          node-key="id"
          highlight-current
          @node-click="nodeClick"
          ref="tree"
        >
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGet } from '@/api'
export default {
  data () {
    return {
      loading: false,
      treeData: [
        {
          id: 1,
          label: '一级 1',
          level: 1,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  children: [
                    {
                      id: 9,
                      label: '三级 1-1-1'
                    },
                    {
                      id: 10,
                      label: '三级 1-1-2'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      toggle: true,
      filterText: ''
    }
  },
  props: {
    dataUrl: {},
    param: {},
    search: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object,
      default: function () {
        return {
          children: 'children',
          label: 'name'
        }
      }
    },
    renderFunction: {
      type: Function,
      default: renderContent
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandOnclickNode: {
      type: Boolean,
      default: true
    },
    resDataName: {
      type: String,
      default: ''
    }
  },
  created () {
    this.queryData()
  },
  methods: {
    queryData () {
      if (!this.dataUrl || this.loading === true) {
        return
      }
      this.loading = true
      const params = Object.assign({}, this.params)
      apiGet(this.dataUrl, params)
        .then((res) => {
          this.loading = false
          if (res.code === 1) {
            this.treeData = res.data[this.resDataName]
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    changeSatus () {
      this.toggle = !this.toggle
      this.$emit('changeSatus', this.toggle) // 触发自定义事件
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    nodeClick (data, node) {
      this.$emit('nodeClick', {
        data,
        node
      })
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}

function renderContent (h, { node, data }) {
  // console.log(data.label)
  var icon = 'el-icon-folder'
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
    <span class="custom-tree-node">
      <span>
        <i class={icon}> </i> {data.label}{' '}
      </span>{' '}
    </span>
  )
}
</script>
<style lang='scss'>
.curd_tree_wrap {
  /* background-color: #fff; */
  @include content-background();
  @include box-shadow();
  height: 100%;
  position: relative;
  border-radius: 0 4px 4px 0;
  .el-tree{
   background-color: transparent;
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

.tree_list {
  min-width: 220px;
  font-size: 12px !important;
  height: calc(100% - 30px);
  overflow-y: auto;
}
</style>
