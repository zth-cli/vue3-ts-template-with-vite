<template>
  <div class="drawer-block-checkbox">
    <template v-for="(item, index) in colors" :key="index">
      <div class="theme-color-block" :style="{ background: item.color }" @click="changeTheme(item)">
        <el-icon v-show="themeName === item.theme" class="selectIcon">
          <Select />
        </el-icon>
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
<style lang="scss">
.theme-color-block {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  .selectIcon {
    color: rgb(142, 142, 142);
    font-weight: 700;
    font-size: 14px;
    pointer-events: none;
  }
}
</style>
