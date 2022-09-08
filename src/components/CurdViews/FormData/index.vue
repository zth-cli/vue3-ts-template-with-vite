<template>
  <div ref="data_ref" class="from_data_main">
    <el-form ref="ruleForm" :model="formData" :rules="rules" size="default" label-width="100px">
      <el-row>
        <template v-for="item in fromItems">
          <template v-if="item.type === 'date' || item.type === 'datetime'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  v-model="formData[item.name]"
                  style="width: 100%"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  clearable
                  :value-format="item.format || 'yyyy-MM-dd'"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'month' || item.type === 'year'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  v-model="formData[item.name]"
                  style="width: 100%"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  clearable
                  :value-format="item.format"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'daterange'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  v-model="formData[item.name]"
                  style="width: 100%"
                  :type="item.type"
                  :disabled="item.disabled"
                  :value-format="item.format"
                  clearable
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-select
                  v-model="formData[item.name]"
                  style="width: 100%"
                  filterable
                  :disabled="item.disabled"
                  clearable
                  :multiple="item.multiple"
                  :collapse-tags="item.multiple"
                  value-key="value"
                >
                  <el-option
                    v-for="(ele, i) in item.options ? item.options : []"
                    :key="i"
                    :value="item.prop && item.prop['value'] ? ele[item.prop['value']] : ele.value"
                    :label="item.prop && item.prop['label'] ? ele[item.prop['label']] : ele.label"
                    :disabled="ele.disabled"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-radio-group v-model="formData[item.name]">
                  <template v-for="ele in item.options" :key="ele.value">
                    <el-radio :disabled="item.disabled" :label="ele.value">{{ ele.label }}</el-radio>
                  </template>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-checkbox-group v-model="formData[item.name]">
                  <template v-for="ele in item.options" :key="ele.value">
                    <el-checkbox :disabled="item.disabled" :label="ele.value">{{ ele.label }}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'editTable'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <EditTable v-model:propData="formData[item.name]" :columns="item.columns"></EditTable>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'upload'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <zth-upload v-model="formData[item.name]" :data="item.params" :url="item.url"></zth-upload>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'input'">
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-input
                  v-model="formData[item.name]"
                  :disabled="item.disabled"
                  :type="item.type"
                  :placeholder="getPlaceholder(item)"
                >
                  <template v-if="item.append" #append>
                    <slot :name="item.append" :form-data="{ data: formData, key: item.name }"></slot>
                  </template>
                  <template v-if="item.prepend" #prepend>
                    <slot :name="item.prepend" :form-data="{ data: formData, key: item.name }"></slot>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col :key="item.name" :span="item.span || 12">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-input
                  v-model="formData[item.name]"
                  :disabled="item.disabled"
                  :type="item.type"
                  :placeholder="getPlaceholder(item)"
                >
                  <template v-if="item.append" #append>
                    <slot :name="item.append" :form-data="{ data: formData, key: item.name }"></slot>
                  </template>
                  <template v-if="item.prepend" #prepend>
                    <slot :name="item.prepend" :form-data="{ data: formData, key: item.name }"></slot>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
    </el-form>
    <div v-show="postUrl ? true : false" class="btns">
      <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
      <el-button class="warning" @click="resetForm(ruleForm)">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { http } from '@/utils/http'
import { EditTable } from '../EditTable'
import { ZthUpload } from '../Upload'
import { ref, toRaw, watch } from 'vue'
import { usePlaceholder } from './hook/usePlaceholder'
import { useDefaultData } from './hook/useDefaultData'
import { ElMessage } from 'element-plus'
import qs from 'qs'
const ruleForm = ref(null)
const fromItems = ref<Array<any>>([])

//  定义props
interface IformProps {
  formItem: Array<any>
  postUrl?: string
  // 额外的提交数据,例如在提交表单时，会把选中id一同提交进来,但是Id并不需要显示
  postParams?: { [x: string]: any }
  rowData?: { [x: string]: any }
  rules?: { [x: string]: any }
  beforeSubmit?: Function
  placeholderLabel?: boolean
  contentType?: 'json' | 'form-data'
}
const props = withDefaults(defineProps<IformProps>(), {
  formItem: () => [],
  placeholderLabel: false,
  contentType: 'json',
  beforeSubmit: function (formData) {
    // 提交前,对value为Array类型的进行字符串拼接
    for (const key in formData) {
      if (formData[key] instanceof Array) {
        formData[key] = formData[key].join(',')
      }
    }
    return formData
  },
})

// 自定义事件
const emit = defineEmits(['submit', 'from-change'])

// 初始化赋值
fromItems.value = toRaw(props.formItem)
const { getPlaceholder } = usePlaceholder(props)
const { formData, rules, invaildArr } = useDefaultData(props)

// 提交
const submitForm = async (formEl) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let formDatas = Object.assign({}, props.postParams, toRaw(formData))
      for (const key in formDatas) {
        if (invaildArr.value.includes(key)) {
          delete formDatas[key]
        }
      }
      formDatas = await props.beforeSubmit(formDatas)
      if (props.postUrl && props.postUrl !== 'simulationdata') {
        const params = props.contentType === 'json' ? formDatas : qs.stringify(formDatas)
        const headers =
          props.contentType === 'form-data' ? { headers: { 'content-type': 'application/x-www-form-urlencoded' } } : {}
        http.request<{ data: any; code: number }>('post', props.postUrl, params, headers).then((res) => {
          if (res.code === 1) {
            emit('submit', formDatas, res.data)
            ElMessage.success('已提交')
          } else {
            ElMessage.error('提交异常')
          }
        })
      } else {
        emit('submit', formDatas)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置
const resetForm = (formEl) => {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

// 侦听
watch(
  () => formData,
  (val) => {
    emit('from-change', val)
  },
  { deep: true }
)
watch(
  () => props.rowData,
  (val) => {
    for (const key in formData) {
      if (key in val) {
        formData[key] = val[key]
      }
    }
  },
  { deep: true }
)
</script>
<style>
.from_data_main {
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: #ffffff; */
  box-sizing: border-box;
  padding: 18px;
}

.from_data_content_mini .from_item {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.from_data_content_mini .from_item .el-form-item__content {
  margin-left: 0 !important;
}

.from_item_label {
  display: inline-block;
  min-width: 100px;
  text-align: end;
}
.from_data_main .btns {
  margin-top: 18px;
  text-align: center;
  padding-bottom: 12px;
}
.line {
  color: black;
  text-align: center;
}
/* 组合input居中显示 */
.el-form-item__content .el-input-group {
  vertical-align: middle !important;
}
</style>
