<template>
  <div class="curd_tree_wrap">
    <span class="toggle">
      <i :class="[toggle ? 'el-icon-arrow-left' : 'el-icon-arrow-right']" @click="changeSatus"></i>
    </span>
    <div class="tree_main" v-show="toggle">
      <el-input v-if="search" placeholder="输入关键字进行过滤" size="small" v-model="filterText"></el-input>
      <div class="tree_list" v-loading="loading">
        <el-tree
          class="filter-tree"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterNode"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="expandOnclickNode"
          node-key="id"
          highlight-current
          @node-click="nodeClick"
          ref="tree"
        >
          <template #default="{ node, data }">
            <slot v-bind="{ node, data }">
              <i class="el-icon-folder"> </i>
              <span>{{ node[treeProps['label']] }}</span>
            </slot>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { ref, watch, h } from 'vue'
import { defaultTreeData, defaultProps } from './enums'

let loading = ref<boolean>(false)
let treeData = ref<Array<any>>(defaultTreeData)
let toggle = ref<boolean>(true)
let filterText = ref<string>('')
const tree = ref(null)

interface ItreeProp {
  dataUrl?: string
  param?: { [x: string]: any }
  search?: boolean
  treeProps?: any
  defaultExpandAll?: boolean
  expandOnclickNode?: boolean
  resDataName?: string
}

const props = withDefaults(defineProps<ItreeProp>(), {...defaultProps})

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
  if (!value) return true
  return data.label.indexOf(value) !== -1
}
const nodeClick = (data: any, node: any) => {
  emit('nodeClick', { data, node })
}
const renderContent = ({ node, data, store }) => {
  return h(
    'span',
    {
      class: 'custom-tree-node'
    },
    [
      h('span', null, node.label),
      h('span', null, [
        h(
          'a',
          {
            onClick: () => {}
          },
          'Append '
        ),
        h(
          'a',
          {
            onClick: () => {}
          },
          'Delete'
        )
      ])
    ]
  )
}
queryData()
watch(filterText, (neeVal) => {
  tree.value.filter(neeVal)
})

// function renderContent(h, { node, data }) {
//   // console.log(data.label)
//   var icon = 'el-icon-folder'
//   switch (node.level) {
//     case 1:
//       icon = 'el-icon-folder'
//       break
//     case 2:
//       icon = 'el-icon-document'
//       break
//     case 3:
//       icon = 'el-icon-collection-tag'
//       break
//     case 4:
//       icon = 'el-icon-coin'
//       break
//     default:
//       icon = 'el-icon-document'
//       break
//   }
//   return (
//     <span class="custom-tree-node">
//       <span>
//         <i class={icon}> </i> {data.label}{' '}
//       </span>{' '}
//     </span>
//   )
// }
</script>
<style lang="scss">
.curd_tree_wrap {
  /* background-color: #fff; */
  @include content-background();
  // @include box-shadow();
  height: 100%;
  position: relative;
  border-radius: 0 4px 4px 0;
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
