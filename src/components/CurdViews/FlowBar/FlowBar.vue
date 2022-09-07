<template>
  <div class="curd-condition-bar">
    <template v-for="(item, index) in options">
      <template v-if="!item.type || item.type === 'flow'">
        <section v-if="!item.disabled" :key="index" class="condition-item">
          <div class="category-title ellipsis">{{ item.label }}：</div>
          <div ref="categorys" :class="[switchData[item.name] ? 'category-content-auto' : '', 'category-content']">
            <el-button
              size="small"
              style="margin-top: 10px"
              :disabled="item.disabledAll"
              :type="formData[item.name].length ? 'text' : 'primary'"
              @click="resetItemActive(item, index)"
              >全部</el-button
            >
            <ul class="item-ul">
              <li v-for="(ele, inde) in item.options" :key="ele.value" class="item-li">
                <el-button
                  size="small"
                  :type="isActive(index, inde) ? 'primary' : 'text'"
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
import { toArray } from '@/utils'
import { IformItem } from '../type'

const categorys = ref(null)
let anchor = reactive([])
const formData: { [key: string]: any } = reactive({})
const switchData = reactive({})
const orignalFromData = {}

const emit = defineEmits(['params-change', 'query'])
interface Props {
  options: Array<IformItem>
  initParams?: any // 初始参数集合,优先级比default高
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  initParams: {},
  options: () => [
    {
      name: 'area',
      label: '接入电网',
      options: [{ label: '省调公司', value: '1232213213' }],
    },
  ],
})
const initFromData = () => {
  anchor = []
  props.options.forEach((item, index) => {
    if (item.type === 'flow' || !item.type) {
      if (!item.disabled) {
        const defaultValue = item.default ? toArray(item.default) : []
        formData[item.name] = props.initParams[item.name] ? toArray(props.initParams[item.name]) : defaultValue
        orignalFromData[item.name] = props.initParams[item.name] ? toArray(props.initParams[item.name]) : defaultValue
        switchData[item.name] = false
        // 默认选中状态
        if (formData[item.name].length > 0) {
          if (props.multiple) {
            formData[item.name].forEach((element: any) => {
              const i = item.options.findIndex((ele) => ele.value === element)
              setActive(item, index, i)
            })
          } else {
            const i = item.options.findIndex((ele) => ele.value === formData[item.name][0])
            setActive(item, index, i)
          }
        }
      }
    }
  })
}
const setFlowSatus = (item: IformItem, index: number, i: number, val: any) => {
  setValue(item, val)
  setActive(item, index, i)
}
const setValue = (item: IformItem, val: any) => {
  if (props.multiple) {
    const index = formData[item.name].indexOf(val)
    if (index > -1) {
      // 多选存在，删除值
      formData[item.name].splice(index, 1)
    } else {
      formData[item.name].push(val)
    }
  } else {
    formData[item.name] = [val]
  }
  emit('params-change', { formData })
}
const setActive = (item: IformItem, index: number, i: number) => {
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
const resetItemActive = (item: { name: string | number }, index: any) => {
  const arr = anchor.filter((ele, indx) => {
    return ele.split('~')[0] !== String(index)
  })
  anchor = arr
  formData[item.name] = []
}
const isActive = (index: any, i: any) => {
  return anchor.includes(String(index) + '~' + String(i))
}

const resetData = () => {
  for (const key in formData) {
    formData[key] = orignalFromData[key]
  }
  anchor = []
}

// 输入框
const paramsChange = (params: any) => {
  const formDatas = Object.assign({}, params, formData)
  emit('params-change', formDatas)
}
const query = (params: any) => {
  emit('query', { ...params, ...toRaw(formData) })
}

// initFromData()
watch(
  () => props.options,
  () => {
    initFromData()
  },
  { deep: true, immediate: true }
)
watch(switchData, async () => {
  await nextTick()
  categorys.value.scrollTop = 0
})
</script>
<style lang="scss">
$linehieht: 40px;
.curd-condition-bar {
  background-color: var(--content-background);
  margin-bottom: 12px;
  border-radius: 4px;
  padding: 0 12px;
  .condition-item {
    &:last-child {
      border-bottom: none;
    }
    padding: 8px 0;
    border-bottom: 1px dashed #21a5bd;
    // line-height: 50px;
    display: flex;
    .category-title {
      width: 130px;
      line-height: 46px;
    }
    .category-more {
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
