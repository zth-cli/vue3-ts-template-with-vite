<template>
  <div class="curd_tree_wrap">
    <span class="toggle" :title="toggle ? '收起' : '展开'">
      <el-icon @click="changeSatus"><ArrowLeft v-show="toggle" /> <ArrowRight v-show="!toggle" /></el-icon>
    </span>
    <div v-show="toggle" class="tree_main">
      <el-input v-if="search" v-model="filterText" placeholder="输入关键字进行过滤" size="small"></el-input>
      <div v-loading="loading" class="tree_list">
        <el-tree
          ref="tree"
          class="filter-tree"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="expandOnclickNode"
          :render-content="renderContent"
          node-key="id"
          highlight-current
          @node-click="nodeClick"
        >
          <template #default="{ node, data }">
            <slot v-bind="{ node, data }">
              <i class="el-icon-folder"> </i>
              <span>{{ data[treeProps['label']] }}</span>
            </slot>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ref, watch, h, VNode } from 'vue'
import { defaultTreeData, defaultProps } from './enums'

const loading = ref<boolean>(false)
const treeData = ref<Array<any>>(defaultTreeData)
const toggle = ref<boolean>(true)
const filterText = ref<string>('')
const tree = ref(null)

interface ItreeProp {
  dataUrl?: string
  param?: { [x: string]: any }
  search?: boolean
  treeProps?: any
  defaultExpandAll?: boolean
  expandOnclickNode?: boolean
  resDataName?: string
  renderContent?: (node: Node, data: any, store: Node['store']) => VNode
}

const props = withDefaults(defineProps<ItreeProp>(), { ...defaultProps })

const emit = defineEmits(['changeSatus', 'nodeClick'])

const queryData = () => {
  if (props.dataUrl && !loading.value) {
    loading.value = true
    const params = Object.assign({}, props.param)
    http
      .get<{ code: number; data: { [x: string]: any } | Array<any> }>(props.dataUrl, params)
      .then((res) => {
        loading.value = false
        if (res.code === 1) {
          treeData.value = res.data[props.resDataName]
        }
      })
      .catch(() => {
        loading.value = false
      })
  }
}
const changeSatus = () => {
  toggle.value = !toggle.value
  emit('changeSatus', toggle.value) // 触发自定义事件
}
const filterNode = (value: any, data: { label: string | any[] }) => {
  if (!value) {
    return true
  }
  return data[props.treeProps.label].indexOf(value) !== -1
}
const nodeClick = (data: any, node: any) => {
  emit('nodeClick', { data, node })
}
queryData()
watch(filterText, (neeVal) => {
  tree.value.filter(neeVal)
})
</script>
<style lang="scss">
.curd_tree_wrap {
  background-color: var(--content-background);
  height: 100%;
  position: relative;
  border-radius: 0 4px 4px 0;
  margin-right: 12px;
  .el-tree {
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
  line-height: 34px;
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
