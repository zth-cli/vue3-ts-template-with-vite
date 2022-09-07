<template>
  <el-popover v-model:visible="visible" placement="top" :width="160">
    <p>{{ props.content }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" type="text" @click="cancelBtn()">取消</el-button>
      <el-button size="small" type="primary" @click="confirmBtn()">确认</el-button>
    </div>
    <template #reference>
      <el-button size="small" type="danger" @click="visible = true">{{ props.subContent }}</el-button>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['on-confirm', 'on-cancel']) // 事件
const props = withDefaults(
  defineProps<{
    content?: string
    subContent?: string
    size?: string
  }>(),
  {
    content: '确定删除吗？',
    subContent: '删除',
    size: 'samll',
  }
)
const visible = ref(false)
const confirmBtn = () => {
  visible.value = false
  emit('on-confirm')
}
const cancelBtn = () => {
  visible.value = false
  emit('on-cancel')
}
</script>
