<template>
  <div class="curd_tool_bar">
    <div class="curd_tool_content">
      <slot name="ltool"></slot>
      <div class="curd_tools" ref="tools" :class="{ ellipsis_curd_tools: expend }">
        <template v-for="(item, index) in searchDynamic">
          <template v-if="!item.dateSwitch && (item.type === 'date' || item.type === 'month' || item.type === 'year')">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
              <el-date-picker
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                clearable
                v-model="fromData[item.name]"
                size="mini"
                :style="{ width: width }"
                :value-format="item.format"
              >
              </el-date-picker>
            </div>
          </template>
          <template v-else-if="item.type === 'datetime'">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
              <el-date-picker
                type="datetime"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                clearable
                v-model="fromData[item.name]"
                size="mini"
                :style="{ width: width }"
                :format="item.format"
                :value-format="item.format"
              >
              </el-date-picker>
            </div>
          </template>
          <template v-else-if="!item.dateSwitch && item.type === 'daterange'">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
              <el-date-picker
                v-model="fromData[item.name]"
                :type="item.type"
                :disabled="item.disabled"
                :value-format="item.format"
                clearable
                style="width: 260px"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
              >
              </el-date-picker>
            </div>
          </template>
          <template v-else-if="item.type === 'select'">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
              <el-select
                v-model="fromData[item.name]"
                :style="{ width: width }"
                :placeholder="getPlaceholder(item)"
                collapse-tags
                filterable
                clearable
                :multiple="item.multiple ? true : false"
                size="mini"
              >
                <el-option v-for="(ele, i) in item.options" :value="ele.value" :label="ele.label" :key="ele.label + i"> </el-option>
              </el-select>
            </div>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <template v-if="item.options && item.options.length > 0">
                <el-checkbox-group size="mini" v-model="fromData[item.name]">
                  <template v-for="ele in item.options">
                    <el-checkbox :disabled="item.disabled" :label="ele.value" :key="ele.value">{{ ele.label }}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </template>
              <template v-else>
                <el-checkbox size="mini" v-model="fromData[item.name]" true-label="1" false-label="0">{{ item.label }}</el-checkbox>
              </template>
            </div>
          </template>
          <template v-else-if="typeArr.includes(item.type) && item.dateSwitch && item.dateSwitch.length > 1">
            <div :key="'item' + index" class="curd_tool_item" ref="tool">
              <el-button
                class="mini_btns"
                v-for="(el, i) in item.dateSwitch"
                size="mini"
                @click="
                  switchIndex = i
                  switchDate(item.name, el, item.dateTypeParamName)
                "
                :type="switchIndex === i ? 'danger' : 'primary'"
                :key="i"
              >
                {{
                  el.type === 'date' ? '日' : el.type === 'month' ? '月' : el.type === 'year' ? '年' : el.type === 'dates' ? '多日' : '时间'
                }}
              </el-button>
              <el-date-picker
                :style="{ width: width }"
                :type="item.dateSwitch[switchIndex].type"
                :disabled="item.disabled"
                :placeholder="getPlaceholder(item)"
                clearable
                v-model="fromData[item.name]"
                size="mini"
                :value-format="
                  item.dateSwitch[switchIndex].type === 'date'
                    ? 'yyyy-MM-dd'
                    : item.dateSwitch[switchIndex].type === 'month'
                    ? 'yyyy-MM'
                    : item.dateSwitch[switchIndex].type === 'year'
                    ? 'yyyy'
                    : 'yyyy-MM-dd'
                "
              ></el-date-picker>
            </div>
          </template>
          <template v-else>
            <div class="curd_tool_item" :key="index" ref="tool">
              <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
              <el-input :style="{ width: width }" v-model="fromData[item.name]" :placeholder="getPlaceholder(item)" size="mini"></el-input>
            </div>
          </template>
        </template>
        <slot name="rtool"></slot>
      </div>
      <div class="ellipsis_icon a" v-if="ellipsis" @click="expend = !expend">
        <span>{{ expend ? '隐藏' : '展开' }}</span>
        <i :class="[expend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
      </div>
      <div class="btns">
        <el-button type="primary" icon="el-icon-search" v-if="searchDynamic.length > 0 && mode !== 'simple'" size="mini" @click="query()"
          >查询</el-button
        >
        <slot name="tool"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ellipsis: false,
      expend: false,
      fromData: {},
      typeArr: ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month', 'time', 'timerange'],
      switchIndex: 0,
      trigger: true
    }
  },
  props: {
    mode: {
      // 添加场景选择，适应紧凑布局，充分利用空间
      type: String,
      default: 'normal' // 'normal' 正常模式 'simple'简单模式，布局更紧凑
    },
    searchDynamic: {
      type: Array,
      default: function () {
        return []
      }
    },
    toolAlign: {
      default: 'left'
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  mounted() {
    this.toolsMediaQuery()
    window.addEventListener('resize', this.debounce(this.toolsMediaQuery, 500))
    // this.$nextTick(() => {this.toolsMediaQuery()})
  },
  methods: {
    switchDate(prop, typeObj, typeParamName) {
      var format =
        typeObj.type === 'date' ? 'yyyy-MM-dd' : typeObj.type === 'month' ? 'yyyy-MM' : typeObj.type === 'year' ? 'yyyy' : 'yyyy-MM-dd'
      // 解决日期选择多日后，切换为日和月报错问题
      var date = typeof this.fromData[prop] === 'string' ? this.fromData[prop] : this.fromData[prop][0]
      this.fromData[prop] = this.$day(date).format(format.toUpperCase())
      if (typeParamName) {
        this.fromData[typeParamName] = typeObj.typeName
      }
    },
    getPlaceholder(item) {
      if (item.label) {
        return item.label
      }
      let result
      if (item.placeholder == null) {
        switch (item.type) {
          case 'text':
            result = item.disabled || item.readonly ? '' : item.label
            break
          case 'popText':
            result = item.disabled || item.readonly ? '' : '请选择...'
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
      if (this.searchDynamic.length < 1) {
        return
      }
      this.searchDynamic.forEach((item) => {
        for (const key in item) {
          if (key === 'name') {
            const str = item[key]
            this.$set(this.fromData, [str], '')
          }
          if (key === 'remoteMethod' && item.remoteMethod && item.type === 'select') {
            item.remoteMethod.then((res) => {
              item.options = res
            })
          }
        }
        this.fromData[item.name] = item.default ? item.default : ''
        if (this.typeArr.includes(item.type)) {
          this.fromData[item.name] = item.default ? item.default : this.$day().format(item.format.toUpperCase())
        }
      })
      // setInterval(() => { this.trigger = false }, 0)
    },
    query() {
      const fromData = {}
      const params = this.fromData
      for (const key in params) {
        if (params[key] instanceof Array) {
          // 对value为Array类型的进行字符串拼接
          fromData[key] = params[key].join(',')
        } else {
          fromData[key] = params[key]
        }
      }
      this.$emit('query', params)
    },
    toolsMediaQuery() {
      // 对查询条件过多，进行条件部分隐藏
      if (this.$refs.tools) {
        this.ellipsis = false
        var sonWidth = 0
        var parentWidth = this.$refs.tools.offsetWidth // 获取实例元素
        var sonElements = this.$refs.tool
        if (!sonElements) {
          return
        }
        sonElements.forEach((item) => {
          sonWidth += Number(item.offsetWidth)
        })
        if (sonWidth >= parentWidth - 50) {
          this.ellipsis = true
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
    if (this.searchDynamic) {
      this.defaultData()
    }
  },
  watch: {
    fromData: {
      handler: function (params) {
        const fromData = {}
        for (const key in params) {
          if (params[key] instanceof Array) {
            // 对value为Array类型的进行字符串拼接
            fromData[key] = params[key].join(',')
          } else {
            fromData[key] = params[key]
          }
        }
        this.$emit('params-change', fromData)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.a {
  color: #409eff;
}
.curd_tool_bar {
  // background-color: #fff;
  // @include content-background();
  // @include border-color();
  // @include box-shadow();
  padding: 10px;
  border-radius: 4px;
  // border: 1px solid #ebeef5;
  // margin-bottom: 12px;
}

.curd_tool_content {
  display: flex;
  align-items: center;
}

.curd_tools {
  flex: 1;
  text-align: end;
  height: 28px;
  overflow: hidden;
  transition: all 0.5s;
  /* display: flex;
  flex-wrap: wrap; */
}
.ellipsis_curd_tools {
  text-align: start;
  height: auto;
  overflow: auto;
  transition: all 0.5s;
}
.curd_tool_item {
  display: inline-block;
  margin-left: 10px;
  /* margin-bottom: 10px;
  margin-right: 10px; */
  vertical-align: middle;
}
.ellipsis_curd_tools .curd_tool_item {
  margin-bottom: 8px;
}
.ellipsis_icon {
  // @include font-color(null);
  margin-left: 10px;
  cursor: pointer;
  span {
    font-size: 10px;
    margin-right: 4px;
  }
}
.curd_tool_item .mini_btns {
  padding: 7px;
  margin-left: 0;
  margin-right: 8px;
}
.label {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  @include font-color(null);
  text-align: end;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}

/* .el-input {
  width: 180px;
} */
.curd_tool_content .btns {
  max-width: 800px;
  button {
    margin-left: 8px;
  }
}
.curd_tool_content {
  .el-checkbox {
    margin-right: 18px;
  }
  .el-checkbox__label {
    padding-left: 8px;
  }
}
</style>
