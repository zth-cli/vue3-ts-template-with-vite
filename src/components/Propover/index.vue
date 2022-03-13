<template>
  <el-popover v-model:visible="visible" placement="top" :width="160">
    <p>{{ content }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" type="text" @click="visible = false; cancelBtn()">取消</el-button>
      <el-button size="small" type="primary" @click="visible = false; confirmBtn()">确认</el-button>
    </div>
    <template #reference>
      <el-button size="small" type="danger" @click="visible = true;">{{ subContent }}</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { stringify } from 'querystring';
import { ref } from 'vue'
const emit = defineEmits(['on-confirm', 'on-cancel']) // 事件
const { content, subContent } = withDefaults(defineProps<{
  content?: string,
  subContent?: string,
  size?: string
}>(), {
  content: '确定删除吗？',
  subContent: '删除',
  size: 'samll'
})
const confirmBtn = () => {
  emit('on-confirm')
}
const cancelBtn = () => {
  emit('on-cancel')
}
const visible = ref(false)
</script>