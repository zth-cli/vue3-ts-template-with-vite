<template>
  <div class="curd-condition-bar">
    <template v-for="(item, index) in options">
      <section v-if="!item.type || item.type === 'list'" :key="index" class="condition-item">
        <div class="category-title ellipsis">{{ item.title }}：</div>
        <div ref="categorys" :class="[switchData[item.name] ? 'category-content-auto' : '', 'category-content']">
          <el-button
            v-if="item.options.length > 1"
            size="small"
            style="margin-top: 10px"
            :type="fromData[item.name].length ? 'text' : 'primary'"
            @click="resetItemActive(item, index)"
            >全部</el-button
          >
          <ul class="item-ul">
            <li v-for="(ele, inde) in item.options" :key="ele.value" class="item-li">
              <el-button
                size="small"
                :type="item.options.length < 2 ? 'primary' : isActive(index, inde) ? 'primary' : 'text'"
                @click="setFlowSatus(item, index, inde, ele.value)"
                >{{ ele.label }}</el-button
              >
            </li>
          </ul>
        </div>
        <div class="category-more">
          <el-button
            size="small"
            style="margin-top: 6px"
            type="text"
            :icon="!switchData[item.name] ? 'arrow-down' : 'arrow-up'"
            @click="switchData[item.name] = !switchData[item.name]"
            >{{ !switchData[item.name] ? '展开' : '收起' }}</el-button
          >
        </div>
      </section>
    </template>
    <ConditionBar :from-options="options" @query="query" @params-change="paramsChange" @reset-data="resetData">
      <template #tool>
        <slot name="tool"></slot>
      </template>
      <template #ltool>
        <slot name="ltool"></slot>
      </template>
      <template #rtool>
        <slot name="rtool"></slot>
      </template>
    </ConditionBar>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, nextTick, toRaw } from 'vue'
import { ConditionBar } from '@/components/CurdViews/ConditionBar'

const categorys = ref(null)
let anchor = reactive([])
const fromData: { [key: string]: any } = reactive({})
const switchData = reactive({})
const orignalFromData = {}

const emit = defineEmits(['params-change', 'query'])
interface Props {
  options: Array<any>
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [
    {
      name: 'area',
      title: '接入电网',
      options: [{ label: '省调公司', value: '1232213213' }]
    }
  ]
})
const initFromData = () => {
  props.options.forEach((item) => {
    if (item.type === 'list' || !item.type) {
      fromData[item.name] = []
      orignalFromData[item.name] = []
      switchData[item.name] = false
    }
  })
}
const setFlowSatus = (item, index, i, val) => {
  setValue(item, val)
  setActive(item, index, i)
}
const setValue = (item, val) => {
  if (props.multiple) {
    const index = fromData[item.name].indexOf(val)
    if (index > -1) {
      // 多选存在，删除值
      fromData[item.name].splice(index, 1)
    } else {
      fromData[item.name].push(val)
    }
  } else {
    fromData[item.name] = [val]
  }
  emit('params-change', { fromData })
}
const setActive = (item, index, i) => {
  // if (!item.multiple) {
  //   this.anchor.forEach((ele, indx) => {
  //     if (ele.split('~')[0] === String(index)) {
  //       this.anchor.splice(indx, 1)
  //     }
  //   })
  // }
  const id = String(index) + '~' + String(i)
  if (props.multiple) {
    if (anchor.indexOf(id) < 0) {
      anchor.push(id)
    } else {
      const i = anchor.indexOf(id)
      anchor.splice(i, 1)
    }
  } else {
    let ind = null
    const isExiste = anchor.some((item, i) => {
      if (Number(item.split('~')[0]) === index) {
        ind = i
      }
      return Number(item.split('~')[0]) === index
    })
    isExiste ? (anchor[ind] = id) : anchor.push(id)
  }
  // console.log(anchor);
}
const resetItemActive = (item, index) => {
  const arr = anchor.filter((ele, indx) => {
    return ele.split('~')[0] !== String(index)
  })
  anchor = arr
  fromData[item.name] = []
}
const isActive = (index, i) => {
  return anchor.includes(String(index) + '~' + String(i))
}

const resetData = () => {
  for (const key in fromData) {
    fromData[key] = orignalFromData[key]
  }
  anchor = []
}

// 输入框
const paramsChange = (params) => {
  const fromDatas = Object.assign({}, params, fromData)
  emit('params-change', fromDatas)
}
const query = (params) => {
  emit('query', { ...params, ...toRaw(fromData) })
}

initFromData()
watch(
  () => props.options,
  () => {
    initFromData()
  }
)
watch(switchData, async () => {
  await nextTick()
  categorys.value.forEach((element) => {
    element.scrollTop = 0
  })
})
</script>
<style lang="scss">
$linehieht: 40px;
.curd-condition-bar {
  @include content-background();
  margin-bottom: 12px;
  border-radius: 4px;
  padding: 0 12px;
  .condition-item {
    &:last-child {
      border-bottom: none;
    }
    padding: 8px 0;
    border-bottom: 1px dashed #21a5bd;
    // @include border-color();
    // line-height: 50px;
    display: flex;
    .category-title {
      @include font_color(null);
      width: 130px;
      line-height: 46px;
    }
    .category-more {
      @include font_color(null);
      width: 80px;
      text-align: center;
    }
    .category-content-auto {
      height: 200px !important;
      overflow: auto !important;
    }
    .category-content {
      display: flex;
      align-items: flex-start;
      flex: 1;
      height: $linehieht;
      overflow: hidden;
      .item-ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .item-li {
          line-height: $linehieht;
          transition: all 0.3s linear;
          margin-left: 14px;
        }
      }
    }
  }
}
</style>
