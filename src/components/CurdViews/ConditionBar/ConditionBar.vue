<template>
  <div class="curd_tool_bar">
    <div class="curd_tool_content">
      <slot name="ltool"></slot>
      <div class="curd_tools" ref="tools" :class="{ ellipsis_curd_tools: expend }">
        <template v-for="(item, index) in fromOptions" :key="'item' + index">
          <template v-if="item.type && allowType.includes(item.type)">
            <template
              v-if="!item.dateSwitch && (item.type === 'date' || item.type === 'month' || item.type === 'year')"
            >
              <div class="curd_tool_item" :ref="setItemRef">
                <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
                <el-date-picker
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
                  v-model="fromData[item.name]"
                  :style="{ width: width }"
                  :value-format="item.format"
                ></el-date-picker>
              </div>
            </template>
            <template v-else-if="item.type === 'datetime'">
              <div class="curd_tool_item" ref="setItemRef">
                <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
                <el-date-picker
                  type="datetime"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
                  v-model="fromData[item.name]"
                  :style="{ width: width }"
                  :format="item.format"
                  :value-format="item.format"
                ></el-date-picker>
              </div>
            </template>
            <template v-else-if="!item.dateSwitch && item.type === 'daterange'">
              <div class="curd_tool_item" :ref="setItemRef">
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
                ></el-date-picker>
              </div>
            </template>
            <template v-else-if="item.type === 'select'">
              <div class="curd_tool_item" :ref="setItemRef">
                <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
                <el-select
                  v-model="fromData[item.name]"
                  :style="{ width: width }"
                  :placeholder="usePlaceholder(item)"
                  collapse-tags
                  filterable
                  clearable
                  :multiple="item.multiple ? true : false"
                >
                  <el-option
                    v-for="(ele, i) in item.options"
                    :value="ele.value"
                    :label="ele.label"
                    :key="ele.label + i"
                  ></el-option>
                </el-select>
              </div>
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <div class="curd_tool_item" :ref="setItemRef">
                <template v-if="item.options && item.options.length > 0">
                  <el-checkbox-group v-model="fromData[item.name]">
                    <template v-for="ele in item.options" :key="ele.value">
                      <el-checkbox :disabled="item.disabled" :label="ele.value">{{ ele.label }}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </template>
                <template v-else>
                  <el-checkbox
                    v-model="fromData[item.name]"
                    true-label="1"
                    false-label="0"
                  >{{ item.label }}</el-checkbox>
                </template>
              </div>
            </template>
            <template
              v-else-if="typeArr.includes(item.type) && item.dateSwitch && item.dateSwitch.length > 1"
            >
              <div class="curd_tool_item" :ref="setItemRef">
                <el-button
                  class="mini_btns"
                  v-for="(el, i) in item.dateSwitch"
                  @click="
    switchIndex = i;
  switchDate(item.name, el, item.dateTypeParamName)
                  "
                  :type="switchIndex === i ? 'danger' : 'primary'"
                  :key="i"
                >{{ el.type === 'date' ? '日' : el.type === 'month' ? '月' : el.type === 'year' ? '年' : el.type === 'dates' ? '多日' : '时间' }}</el-button>
                <el-date-picker
                  :style="{ width: width }"
                  :type="item.dateSwitch[switchIndex]['type']"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
                  v-model="fromData[item.name]"
                  :value-format="
                    item.dateSwitch[switchIndex].type === 'date'
                      ? 'YYYY-MM-DD'
                      : item.dateSwitch[switchIndex].type === 'month'
                        ? 'YYYY-MM'
                        : item.dateSwitch[switchIndex].type === 'year'
                          ? 'YYYY'
                          : 'yyYYYYyy-MM-DD'
                  "
                ></el-date-picker>
              </div>
            </template>
            <template v-else>
              <div class="curd_tool_item" :ref="setItemRef">
                <label class="label" v-if="mode !== 'simple'">{{ item.label }}：</label>
                <el-input
                  :style="{ width: width }"
                  v-model="fromData[item.name]"
                  :placeholder="usePlaceholder(item)"
                ></el-input>
              </div>
            </template>
          </template>
        </template>
        <slot name="rtool"></slot>
      </div>
      <div class="ellipsis_icon a" v-if="ellipsis" @click="expend = !expend">
        <span>{{ expend ? '隐藏' : '展开' }}</span>
        <i :class="[expend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          icon="search"
          v-if="fromOptions.length > 0 && mode !== 'simple'"
          @click="query()"
        >查询</el-button>
        <el-button>重置</el-button>
        <slot name="tool"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { allowType } from './enum/allowType'
import { usePlaceholder, useTimeSwitch, useDefaultData, useQuery, useItemRefs, useMediaQuery } from './hook'

let expend = ref<boolean>(false)
let switchIndex = ref<number>(0)
const tools = ref(null)

const emit = defineEmits(['query', 'resize', 'params-change'])

interface IconProps {
  mode?: string
  fromOptions: Array<any>
  toolAlign?: string
  width?: string
}
const props = withDefaults(defineProps<IconProps>(), { mode: 'normal', toolAlign: 'left', width: '200px' })

const { fromData, typeArr } = useDefaultData(props) // 初始化默认值
const { switchDate } = useTimeSwitch(fromData) // 时间切换
const { itemRefs, setItemRef } = useItemRefs() // 获取for循环ref
const { query } = useQuery(emit, fromData) // 点击查询
const { toolsMediaQuery, ellipsis } = useMediaQuery(tools, itemRefs) // 布局自适应

const debounce = (fn: () => void, wait: number) => {
  var timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}

onMounted(() => {
  toolsMediaQuery()
  window.addEventListener('resize', debounce(toolsMediaQuery, 500))
})

watch(fromData, (params) => {
  const fromData = {}
  for (const key in params) {
    if (params[key] instanceof Array) {
      // 对value为Array类型的进行字符串拼接
      fromData[key] = params[key].join(',')
    } else {
      fromData[key] = params[key]
    }
  }
  emit('params-change',  fromData )
})
</script>
<style lang="scss">
.a {
  color: #409eff;
}
.curd_tool_bar {
  // background-color: #fff;
  @include content-background();
  padding: 14px;
  border-radius: 4px 4px 0 0;
}

.curd_tool_content {
  display: flex;
  align-items: center;
}

.curd_tools {
  flex: 1;
  text-align: end;
  height: 32px;
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
