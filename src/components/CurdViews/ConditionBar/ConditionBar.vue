<template>
  <div class="curd_tool_bar">
    <div class="curd_tool_content">
      <slot name="ltool"></slot>
      <div ref="tools" class="curd_tools" :class="{ ellipsis_curd_tools: expend }">
        <template v-for="(item, index) in fromOptions" :key="'item' + index">
          <template v-if="item.type && allowType.includes(item.type)">
            <template
              v-if="!item.dateSwitch && (item.type === 'date' || item.type === 'month' || item.type === 'year')"
            >
              <div ref="itemRefs" class="curd_tool_item">
                <label v-if="mode !== 'simple'" class="label">{{ item.label }}：</label>
                <el-date-picker
                  v-model="fromData[item.name]"
                  :type="item.type"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
                  :style="{ width: width }"
                  :value-format="item.format"
                ></el-date-picker>
              </div>
            </template>
            <template v-else-if="item.type === 'datetime'">
              <div ref="itemRefs" class="curd_tool_item">
                <label v-if="mode !== 'simple'" class="label">{{ item.label }}：</label>
                <el-date-picker
                  v-model="fromData[item.name]"
                  type="datetime"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
                  :style="{ width: width }"
                  :format="item.format"
                  :value-format="item.format"
                ></el-date-picker>
              </div>
            </template>
            <template v-else-if="!item.dateSwitch && item.type === 'daterange'">
              <div ref="itemRefs" class="curd_tool_item">
                <label v-if="mode !== 'simple'" class="label">{{ item.label }}：</label>
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
              <div ref="itemRefs" class="curd_tool_item">
                <label v-if="mode !== 'simple'" class="label">{{ item.label }}：</label>
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
                    :key="i"
                    :value="item.prop && item.prop['value'] ? ele[item.prop['value']] : ele.value"
                    :label="item.prop && item.prop['label'] ? ele[item.prop['label']] : ele.label"
                  ></el-option>
                </el-select>
              </div>
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <div ref="itemRefs" class="curd_tool_item">
                <template v-if="item.options && item.options.length > 0">
                  <el-checkbox-group v-model="fromData[item.name]">
                    <template v-for="ele in item.options" :key="ele.value">
                      <el-checkbox :disabled="item.disabled" :label="ele.value">{{ ele.label }}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </template>
                <template v-else>
                  <el-checkbox v-model="fromData[item.name]" true-label="1" false-label="0">{{
                    item.label
                  }}</el-checkbox>
                </template>
              </div>
            </template>
            <template v-else-if="typeArr.includes(item.type) && item.dateSwitch && item.dateSwitch.length > 1">
              <div ref="itemRefs" class="curd_tool_item">
                <el-button
                  v-for="(el, i) in item.dateSwitch"
                  :key="i"
                  class="mini_btns"
                  :type="switchIndex === i ? 'danger' : 'primary'"
                  @click="switchDate(item.name, el, item.dateTypeParamName, i)"
                  >{{
                    el.type === 'date'
                      ? '日'
                      : el.type === 'month'
                      ? '月'
                      : el.type === 'year'
                      ? '年'
                      : el.type === 'dates'
                      ? '多日'
                      : '时间'
                  }}</el-button
                >
                <el-date-picker
                  v-model="fromData[item.name]"
                  :style="{ width: width }"
                  :type="item.dateSwitch[switchIndex]['type']"
                  :disabled="item.disabled"
                  :placeholder="usePlaceholder(item)"
                  clearable
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
              <div ref="itemRefs" class="curd_tool_item">
                <label v-if="mode !== 'simple'" class="label">{{ item.label }}：</label>
                <el-input
                  v-model="fromData[item.name]"
                  :style="{ width: width }"
                  :placeholder="usePlaceholder(item)"
                ></el-input>
              </div>
            </template>
          </template>
        </template>
        <slot name="rtool"></slot>
      </div>
      <div v-if="ellipsis" class="ellipsis_icon a" @click="expend = !expend">
        <span>{{ expend ? '隐藏' : '展开' }}</span>
        <i :class="[expend ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
      </div>
      <div class="btns">
        <el-button v-if="fromOptions.length > 0 && mode !== 'simple'" type="primary" icon="search" @click="query()"
          >查询</el-button
        >
        <el-button @click="flowBarResetData">重置</el-button>
        <slot name="tool"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { IformItem } from '../type'
import { allowType } from './enum/allowType'
import { usePlaceholder, useTimeSwitch, useDefaultData, useQuery, useMediaQuery } from './hook'

const expend = ref<boolean>(false)
const tools = ref(null)
const itemRefs = ref<Array<HTMLElement | null>>([])
const emit = defineEmits(['query', 'resize', 'params-change', 'reset-data'])

interface IconProps {
  mode?: string
  fromOptions: Array<IformItem>
  toolAlign?: string
  width?: string
}
const props = withDefaults(defineProps<IconProps>(), {
  mode: 'normal',
  toolAlign: 'left',
  width: '200px',
})

const { fromData, typeArr, resetData } = useDefaultData(props) // 初始化默认值
const { switchDate, switchIndex } = useTimeSwitch(fromData) // 时间切换
const { query } = useQuery(emit, fromData) // 点击查询
const { toolsMediaQuery, ellipsis } = useMediaQuery(tools, itemRefs) // 布局自适应

const debounce = (fn: () => void, wait: number) => {
  let timeout = null
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}

const flowBarResetData = () => {
  resetData()
  emit('reset-data', fromData)
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
  emit('params-change', fromData)
})
</script>
<style lang="scss">
.a {
  color: #409eff;
}
.curd_tool_bar {
  background-color: var(--content-background);
  // @include content-background();
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
