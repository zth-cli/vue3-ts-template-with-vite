<!--
 * @Author: 阮志雄
 * @Date: 2021-11-23 10:16:25
 * @LastEditTime: 2021-11-25 23:40:30
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\views\BasicTable\index.vue
-->
<template>
  <div class="content">
    <div class="table-layout">
      <div class="layout-left">
        <Tree :treeProps="{ children: 'children', label: 'label', disabled: false }" #default="{ data }">
          <span>{{ data.label }}</span>
        </Tree>
      </div>
      <div class="layout-right">
        <ConditionBar :fromOptions="fromOptions"></ConditionBar>
        <CurdTable :columns="columns" :params="{ id: 1 }" ref="childRef">
          <template v-slot:action="{ row }">
            <el-button size="mini">{{ row.id }}</el-button>
          </template>
          <template #hd>
            <el-input size="mini" placeholder="Type to search" />
          </template>
        </CurdTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import day from 'dayjs'
import { ConditionBar } from '@/components/CurdViews/ConditionBar'
import { CurdTable } from '@/components/CurdViews/CurdTable'
import { Tree } from '@/components/CurdViews/Tree'
import { onMounted, reactive, ref } from 'vue'
const columns = reactive<Array<Icolumns>>([
  { label: '序号', type: 'selection', align: 'center' },
  { label: '序号', type: 'index', align: 'center' },
  { label: '菜单名称', prop: 'creator', align: 'center' },
  {
    label: '用户信息',
    align: 'center',
    headerAlign: 'center',
    prop: 'creator',
    childrens: [
      { prop: 'creator', label: '角色名', align: 'center', width: 180 },
      { prop: 'creator', label: '用户年龄', align: 'center' },
      { label: '用户', slot: 'proflies', align: 'center' },
      { label: '操作', slot: 'operation', width: 150, align: 'center' }
    ]
  },
  {
    label: '可用性',
    prop: 'isValid',
    align: 'center',
    enum: [
      { value: '可用', id: '1' },
      { value: '不可用', id: '0', type: 'danger' }
    ]
  },
  {
    label: 'Action',
    slot: 'action',
    headerSlot: 'hd',
    align: 'center'
  }
])
const fromOptions = [
  { name: 'description', label: '角色描述', type: 'text' },
  {
    name: 'date',
    label: '日期',
    type: 'date',
    dateSwitch: [
      { type: 'date', typeName: 'day' },
      { type: 'month', typeName: 'month' },
      { type: 'year', typeName: 'year' }
    ],
    dateTypeParamName: 'timeUnit',
    format: 'YYYY-MM-DD',
    default: day().format('YYYY-MM-DD')
  }
]
const childRef = ref<InstanceType<typeof CurdTable>>(null)
onMounted(() => {
  // @ts-ignore
  childRef.value.toggleAllSelection()
})
</script>
<style lang="scss">
.table-layout {
  height: 100%;
  width: 100%;
  display: flex;
  .layout-right {
    flex: 1;
  }
}
</style>
