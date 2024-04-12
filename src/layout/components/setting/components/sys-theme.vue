<template>
  <div class="drawer-block-checkbox">
    <template v-for="(item, index) in colors" :key="index">
      <div class="theme-color-block" :style="{ background: item.color }" @click="changeTheme(item)">
        <el-icon v-show="themeName === item.theme" class="selectIcon"><Select /></el-icon>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/store/modules/themeSetting'
import { ref } from 'vue'

defineOptions({ name: 'SysTheme' })

const themeStroe = useThemeStore()
const colors = ref([
  { theme: 'light', color: '#fff', name: '浅色' },
  { theme: 'default', color: '#409EFF', name: '经典' },
  { theme: 'green', color: '#0fa59b', name: '翠绿' },
  { theme: 'blue', color: '#550fa5', name: '清爽' },
  { theme: 'dark', color: '#000', name: '暗夜' },
])
const themeName = ref<string>(localStorage.getItem('_theme_') || 'default')

const changeTheme = (data: any) => {
  themeStroe.setSysTheme(data.theme)
  themeName.value = data.theme
}
</script>
<style></style>
@/store/modules/themeSetting
