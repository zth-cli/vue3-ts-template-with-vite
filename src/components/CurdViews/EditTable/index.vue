<template>
  <div class="_Edit_table">
    <el-table :data="TableData" border stripe>
      <el-table-column v-for="col in columns" :key="col.name" :prop="col.name" :label="col.label">
        <template #default="Scope">
          <template v-if="col.type === 'text'">
            <el-input v-model="Scope.row[col.name]" :placeholder="col.label" clearable></el-input>
          </template>
          <template v-if="col.type === 'select'">
            <el-select
              v-model="Scope.row[col.name]"
              :placeholder="col.label"
              clearable
              filterable
              :multiple="col.multiple ? col.multiple : false"
            >
              <el-option v-for="item in col.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
          <template v-if="col.type === 'textarea'">
            <el-input
              v-model="Scope.row[col.name]"
              :maxlength="col.maxlength"
              show-word-limit
              :placeholder="col.label"
              type="textarea"
              clearable
            ></el-input>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <el-button type="danger" @click="TableData.splice(scope.$index, 1)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-area" title="新增条目" @click="addInitData()">
      <el-icon><circle-plus-filled /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Icolumns {
  name: string
  label: string
  type: string
  multiple?: boolean
  [x: string]: any
}

const TableData = ref<Array<any>>([])
const rowData = ref<any>({})

const props = withDefaults(
  defineProps<{
    propData: Array<any>
    columns: Array<Icolumns>
  }>(),
  {
    propData: () => [],
    columns: () => [
      {
        name: 'content',
        label: '评价',
        type: 'textarea',
        with: 200,
      },
    ],
  }
)

const emit = defineEmits(['update:propData'])

props.columns.forEach((item) => {
  rowData.value[item.name] = ''
  if (item.type === 'select' && item.multiple) {
    rowData.value[item.name] = []
  }
})

const addInitData = () => {
  const rowDatas = Object.assign({}, rowData.value)
  TableData.value.push(rowDatas)
}
watch(
  () => TableData.value,
  (newData) => {
    emit('update:propData', newData)
  },
  { deep: true }
)
watch(
  () => props.propData,
  (newData) => {
    TableData.value = newData
  },
  { deep: true }
)
</script>
<style lang="scss">
._Edit_table {
  width: 100%;
  background-color: var(--content-background);
  .add-area {
    width: 100%;
    border: 1px dashed #e4e7ed;
    padding: 10px 0;
    margin-top: 16px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 28px;
    }
  }
}
</style>
