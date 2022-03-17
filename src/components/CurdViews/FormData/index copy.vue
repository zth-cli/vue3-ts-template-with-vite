<!--
 * @Author: 阮志雄
 * @Date: 2022-03-17 16:23:42
 * @LastEditTime: 2022-03-17 16:23:42
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\src\components\CurdViews\FormData\index copy.vue
-->
<template>
  <div class="from_data_main" ref="data_ref">
    <el-form :model="fromData" :rules="rules" ref="ruleForm" size="medium" label-width="100px">
      <el-row>
        <template v-for="item in fromItems">
          <template v-if="item.type === 'date' || item.type === 'datetime'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  style="width: 100%"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  clearable
                  v-model="fromData[item.name]"
                  :value-format="item.format || 'yyyy-MM-dd'"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'month' || item.type === 'year'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  style="width: 100%"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="getPlaceholder(item)"
                  clearable
                  v-model="fromData[item.name]"
                  :value-format="item.format"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'daterange'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-date-picker
                  style="width: 100%"
                  v-model="fromData[item.name]"
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
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-select
                  style="width: 100%"
                  v-model="fromData[item.name]"
                  filterable
                  :disabled="item.disabled"
                  clearable
                  :multiple="item.multiple"
                  :collapse-tags="item.multiple"
                  value-key="value"
                >
                  <el-option
                    v-for="ele in item.options ? item.options : []"
                    :value="item.isValueKey ? ele : ele.value"
                    :label="ele.label"
                    :key="ele.value"
                    :disabled="ele.disabled"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'radio'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-radio-group v-model="fromData[item.name]">
                  <template v-for="ele in item.options">
                    <el-radio :disabled="item.disabled" :label="ele.value" :key="ele.value">{{ ele.label }}</el-radio>
                  </template>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <el-checkbox-group v-model="fromData[item.name]">
                  <template v-for="ele in item.options">
                    <el-checkbox :disabled="item.disabled" :label="ele.value" :key="ele.value">{{
                      ele.label
                    }}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'editTable'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item :key="item.name" class="from_item" :label="item.label" :prop="item.name">
                <edit-table :columns="item.columns" v-model="fromData[item.name]"></edit-table>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'input'">
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item class="from_item" :key="item.name" :label="item.label" :prop="item.name">
                <el-input
                  :disabled="item.disabled"
                  :type="item.type"
                  v-model="fromData[item.name]"
                  :placeholder="getPlaceholder(item)"
                >
                  <template v-if="item.append" #append>
                    <slot :name="item.append" :fromData="{ data: fromData, key: item.name }"></slot>
                  </template>
                  <template v-if="item.prepend" #prepend>
                    <slot :name="item.prepend" :fromData="{ data: fromData, key: item.name }"></slot>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col :span="item.span || 12" :key="item.name">
              <el-form-item class="from_item" :key="item.name" :label="item.label" :prop="item.name">
                <el-input
                  :disabled="item.disabled"
                  :type="item.type"
                  v-model="fromData[item.name]"
                  :placeholder="getPlaceholder(item)"
                >
                  <template v-if="item.append" #append>
                    <slot :name="item.append" :fromData="{ data: fromData, key: item.name }"></slot>
                  </template>
                  <template v-if="item.prepend" #prepend>
                    <slot :name="item.prepend" :fromData="{ data: fromData, key: item.name }"></slot>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
    </el-form>
    <div class="btns" v-show="postUrl ? true : false">
      <el-button size="mini" type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button size="mini" @click="resetForm('ruleForm')" class="warning">重置</el-button>
    </div>
  </div>
</template>

<script>
import {EditTable} from '../CurdViews/EditTable/'
import { apiPost } from '@/api'
export default {
  components: { EditTable },
  data() {
    return {
      fromData: {},
      fromItems: this.fromItem,
      rules: {}, // 表单验证规则
      invaildArr: [],
      typeArr: [
        'date',
        'daterange',
        'datetime',
        'datetimerange',
        'year',
        'month',
        'time',
        'timerange',
        'radio',
        'checkbox',
        'select',
        'text',
        'number',
        'input',
        'textarea',
        'editTable'
      ],
      dateType: ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'time', 'timerange'],
      mediaStyle: 'lg'
    }
  },
  props: {
    fromItem: {},
    postUrl: {
      type: String,
      default: ''
    }, // 表单提交地址 post请求
    postParams: {
      type: Object,
      default: function () {
        return {}
      }
    }, // 默认提交数据,例如在提交表单时，会把选中母线id一同提交进来
    rowData: {}, // 编辑已有表单数据，key和fromData的key值一样
    toolAlign: {
      default: 'left'
    },
    rulesprops: {}, // 表单验证规则
    beforeSubmit: {
      type: Function,
      default: function (fromData) {
        // 提交前,对value为Array类型的进行字符串拼接
        for (const key in fromData) {
          if (fromData[key] instanceof Array) {
            fromData[key] = fromData[key].join(',')
          }
        }
        return fromData
      }
    }
  },
  methods: {
    getPlaceholder(item) {
      if (this.placeholderLabel) {
        return item.label
      }
      let result
      if (item.placeholder == null) {
        switch (item.type) {
          case 'text':
            result = item.disabled || item.readonly ? '' : item.label
            break
          case 'textarea':
            result = item.disabled || item.readonly ? '' : '请输入内容'
            break
          case 'time':
            result = item.disabled || item.readonly ? '' : '选择时间'
            break
          case 'datetime':
          case 'date':
            result = item.disabled || item.readonly ? '' : '选择日期'
            break
          case 'datetimerange':
            result = item.disabled || item.readonly ? '' : '选择时间段'
            break
          case 'year':
            result = item.disabled || item.readonly ? '' : '选择年份'
            break
          default:
            result = ''
            break
        }
      } else {
        result = item.placeholder
      }
      return result
    },
    defaultData() {
      //  时间控件初始值
      this.invaildArr = []
      this.fromItem.forEach((item) => {
        for (const key in item) {
          if (key === 'name') {
            const str = item[key]
            this.$set(this.fromData, [str], '')
          }
          if (key === 'rules') {
            this.rules[item.name] = item[key]
          }
          if (key === 'invaild' && item.invaild) {
            // 筛选部分只显示不提交字段
            this.invaildArr.push(item.name)
          }
          if (key === 'remoteMethod' && item.remoteMethod && item.type === 'select') {
            item.remoteMethod.then((res) => {
              item.options = res
            })
          }
          if (key === 'son' && item.type === 'doubleinput') {
            for (const son of item[key]) {
              if (this.rowData[son.name]) {
                this.$set(this.fromData, son.name, this.rowData[son.name])
              } else {
                this.$set(this.fromData, son.name, '')
              }
            }
          }
        }
        if (this.typeArr.includes(item.type)) {
          const keys = Object.keys(this.postParams)
          const defaultValue = keys.includes(item.name)
            ? this.postParams[item.name]
            : item.default !== 'undefined'
            ? item.default
            : null
          this.fromData[item.name] = defaultValue
          if (item.multiple) {
            // eslint-disable-next-line no-unused-expressions
            const mulValue = typeof defaultValue === 'string' ? defaultValue.split(',') : defaultValue
            this.fromData[item.name] = mulValue || []
          }
          if (this.dateType.includes(item.type)) {
            this.fromData[item.name] = item.default ? item.default : this.$day().format(item.format.toUpperCase())
          }
        }
        if (this.rowData) {
          // eslint-disable-next-line no-unused-expressions
          this.rowData[item.name] ? (this.fromData[item.name] = this.rowData[item.name]) : '' // 赋值对应key
        }
      })
    },
    changeGroupinput(row) {
      this.$emit('change-groupinput', row)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        var fromData = Object.assign({}, this.postParams, this.fromData)
        for (const key in fromData) {
          if (this.invaildArr.includes(key)) {
            delete fromData[key]
          } else {
            // if (fromData[key] instanceof Array) {
            //   // 对value为Array类型的进行字符串拼接
            //   fromData[key] = fromData[key].join(',')
            // }
          }
        }
        fromData = await this.beforeSubmit(fromData)
        console.log(fromData)
        if (this.postUrl && this.postUrl !== 'simulationdata') {
          if (valid) {
            apiPost(this.postUrl, fromData).then((res) => {
              if (res.code === 1) {
                this.$emit('submit', fromData, res.data)
                this.$notify({
                  title: '提示',
                  message: '已提交',
                  duration: 1500,
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '提示',
                  message: res.msg,
                  duration: 1500,
                  type: 'error'
                })
              }
            })
            // 跟http.js中提示重复
            // .catch(() => {
            //   this.$notify({
            //     title: '提示',
            //     message: '提交异常',
            //     duration: 1500,
            //     type: 'error'
            //   })
            // })
          } else {
            console.log('error submit!!')
            return false
          }
        } else {
          if (valid) {
            this.$emit('submit', fromData)
          } else {
            console.log('error submit!!')
            return false
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    fromMediaQuery() {
      if (this.$refs.data_ref) {
        var parent = this.$refs.data_ref
        if (parent.offsetWidth <= 600) {
          this.mediaStyle = 'sm'
        } else if (parent.offsetWidth <= 890) {
          this.mediaStyle = 'md'
        } else {
          this.mediaStyle = 'lg'
        }
      }
    },
    debounce(fn, wait) {
      var timeout = null
      return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    }
  },
  created() {
    if (this.fromItem) {
      if (this.rulesprops) {
        this.rules = this.rulesprops
      }
      this.defaultData()
    }
  },
  watch: {
    fromData: {
      handler: function (val) {
        this.$emit('from-change', val)
      },
      deep: true
    },
    postParams: {
      handler: function (val) {
        // this.defaultData()
      },
      deep: true
    },
    rowData: {
      handler: function (val) {
        for (const key in this.fromData) {
          if (key in val) {
            this.fromData[key] = val[key]
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.fromMediaQuery()
    window.addEventListener('resize', this.debounce(this.fromMediaQuery, 500))
  }
}
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

.from_data_content_lg {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33.3%);
  justify-content: space-around;
  /* flex-wrap: wrap; */
  box-sizing: border-box;
  padding: 12px;
}
.from_data_content_md {
  grid-template-columns: repeat(auto-fill, 50%);
}
.from_data_content_sm {
  grid-template-columns: repeat(auto-fill, 100%);
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
