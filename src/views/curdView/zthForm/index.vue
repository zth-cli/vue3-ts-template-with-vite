<template>
  <Layout>
    <el-card>
      <!-- {{ state }} -->
      <ZthForm
        v-model="state"
        :columns="columns"
        :rules="rules"
        label-position="top"
        :col-props="{ lg: 24, md: 24, sm: 24, xs: 24 }"
        :row-props="{ gutter: 20 }"
        @change="handleChange"
        @submit="handleSubmit"
        @submit-error="handleSubmitError"
        @reset="handleReset"
      >
        <template #zth-field-name>
          <el-input v-model="state.name" placeholder="自定义输入框插槽" />
        </template>
        <template #zth-label-name>
          <span>slot自定义label</span>
        </template>
      </ZthForm>
    </el-card>
  </Layout>
</template>
<script setup lang="ts">
import { Layout } from '@/components/Layout'
import { ModelValues, ZthFormItemProp } from '@/components/ZthForm'
import ZthForm from '@/components/ZthForm/index.vue'
import { ref } from 'vue'
const state = ref({
  status: '0',
  name: '',
  rate: 4,
  progress: 70,
  switch: true,
  time: new Date().toString(),
  endTime: [],
  img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入名称',
    },
  ],
  tag: [
    {
      required: true,
      message: '请输入标签',
    },
  ],
}

const columns: ZthFormItemProp[] = [
  {
    label: '名称',
    width: 120,
    prop: 'name',
    tooltip: '名称最多显示6个字符',
    formItemProps: {
      maxlength: 6,
      required: true,
    },
    fieldProps: {
      placeholder: '请输入名称',
    },
  },
  {
    label: '状态',
    width: 120,
    prop: 'status',
    valueType: 'select',
    renderLabel(label, props) {
      console.log(label, props)
      return h('span', { style: { color: 'blue' } }, `渲染函数自定义标签-${label}`)
    },
    options: [
      {
        label: '未解决',
        value: '0',
        color: 'red',
      },
      {
        label: '已解决',
        value: '1',
        color: 'blue',
      },
      {
        label: '解决中',
        value: '2',
        color: 'yellow',
      },
      {
        label: '失败',
        value: '3',
        color: 'red',
      },
    ],
  },
  {
    label: '标签',
    width: 120,
    prop: 'tag',
  },
  {
    label: '执行进度',
    width: 200,
    prop: 'progress',
    valueType: 'slider',
  },
  {
    label: '评分',
    width: 200,
    prop: 'rate',
    valueType: 'rate',
  },
  {
    label: '是否显示(给el-switch传递插槽)',
    width: 100,
    prop: 'switch',
    valueType: 'switch',
    fieldSlots: {
      // 向el-switch组件传递插槽, 使用渲染函数或者jsx
      'active-action': () => {
        return h('span', 'T')
      },
      'inactive-action': () => {
        return h('span', 'F')
      },
    },
  },
  {
    label: '图片',
    prop: 'img',
    width: 100,
    valueType: 'img',
    renderField(value, onChange, _props) {
      return h('div', {}, [
        h('p', { style: { color: 'red' } }, '渲染函数渲染'),
        h('img', {
          src: value,
          style: {
            width: '100px',
            height: '100px',
          },
          onClick: () => {
            onChange('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
          },
          onError: () => {
            onChange('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
          },
        }),
        h(
          'span',
          {
            style: {
              color: 'red',
              cursor: 'pointer',
            },
            onClick: () => {
              onChange('')
            },
          },
          '删除',
        ),
      ])
    },
  },
  {
    label: '时间',
    prop: 'time',
    valueType: 'date-picker',
  },
  {
    label: '数量',
    prop: 'number',
    valueType: 'input-number',
    fieldProps: { precision: 2, step: 2 },
  },
  {
    label: '城市',
    prop: 'city',
    valueType: 'cascader',
    options: [
      {
        value: '0',
        label: '陕西',
        children: [
          {
            value: '0-0',
            label: '西安',
            children: [
              {
                value: '0-0-0',
                label: '新城区',
              },
              {
                value: '0-0-1',
                label: '高新区',
              },
              {
                value: '0-0-2',
                label: '灞桥区',
              },
            ],
          },
        ],
      },
      {
        value: '1',
        label: '山西',
        children: [
          {
            value: '1-0',
            label: '太原',
            children: [
              {
                value: '1-0-0',
                label: '小店区',
              },
              {
                value: '1-0-1',
                label: '古交市',
              },
              {
                value: '1-0-2',
                label: '万柏林区',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: '地区',
    prop: 'place',
    tooltip: '请精确到门牌号',
    fieldProps: {
      placeholder: '请精确到门牌号',
    },
  },
  {
    label: '要求',
    prop: 'demand',
    valueType: 'checkbox',
    options: [
      {
        label: '四六级',
        value: '0',
      },
      {
        label: '计算机二级证书',
        value: '1',
      },
      {
        label: '普通话证书',
        value: '2',
      },
    ],
  },
  {
    label: '梦想',
    prop: 'gift',
    valueType: 'radio',
    options: [
      {
        label: '诗',
        value: '0',
      },
      {
        label: '远方',
        value: '1',
      },
      {
        label: '美食',
        value: '2',
      },
    ],
  },
  {
    label: '到期时间',
    prop: 'endTime',
    valueType: 'date-picker',
    fieldProps: {
      type: 'datetimerange',
      startPlaceholder: '请选择开始时间',
      endPlaceholder: '请选择结束时间',
    },
  },
  {
    label: '说明',
    prop: 'desc',
    valueType: 'textarea',
    fieldProps: {
      maxlength: 10,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    },
  },
]

const handleChange = (values: ModelValues, prop: ZthFormItemProp) => {
  console.log(values, prop, 'change')
}
const handleSubmit = (values: ModelValues) => {
  console.log(values, 'Submit')
}
const handleSubmitError = (err: any) => {
  console.log(err, 'err')
}
const handleReset = () => {
  console.log('handleReset')
}
</script>
<style></style>
