<template>
  <el-drawer v-model="visible" title="系统配置" :append-to-body="true" size="300px" @close="change">
    <ul class="theme-list">
      <li class="theme-item">
        <el-divider><p>导航栏模式</p></el-divider>
        <div class="drawer-block-checkbox">
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-slide"
            @click="saveTheme('menuMode', 'vertical')"
          >
            <el-icon v-show="layout.menuMode === 'vertical'" class="selectIcon"><Select /></el-icon>
          </div>
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-top"
            @click="saveTheme('menuMode', 'horizontal')"
          >
            <el-icon v-show="layout.menuMode === 'horizontal'" class="selectIcon"><Select /></el-icon>
          </div>
        </div>
      </li>
      <li class="theme-item">
        <el-divider><p>系统主题</p></el-divider>
        <div class="drawer-block-checkbox">
          <template v-for="(item, index) in colors" :key="index">
            <div class="theme-color-block" :style="{ background: item.color }" @click="changeTheme(item)">
              <el-icon v-show="themeName === item.theme" class="selectIcon"><Select /></el-icon>
            </div>
          </template>
        </div>
      </li>
      <li class="theme-item">
        <el-divider><p>头部主题</p></el-divider>
        <div class="drawer-block-checkbox">
          <template v-for="(item, index) in headerCssVars" :key="index">
            <div class="theme-color-block" :style="{ background: item.backgroundColor }" @click="setHeaderTheme(index)">
              <el-icon v-show="activeHeaderIndex === index" class="selectIcon"><Select /></el-icon>
            </div>
          </template>
        </div>
      </li>
      <li class="theme-item">
        <el-divider><p>菜单主题</p></el-divider>
        <div class="drawer-block-checkbox">
          <template v-for="(item, index) in menuCssVars" :key="index">
            <div class="theme-color-block" :style="{ background: item.backgroundColor }" @click="setMenuTheme(index)">
              <el-icon v-show="activeMenuIndex === index" class="selectIcon"><Select /></el-icon>
            </div>
          </template>
        </div>
      </li>
      <li class="theme-item">
        <el-divider><p>界面显示</p></el-divider>
        <div class="theme-item-sub">
          <span>多标签:</span>
          <el-switch v-model="layout.tagsBar" inline-prompt @change="saveTheme('tagsBar')"></el-switch>
        </div>
      </li>
    </ul>
  </el-drawer>
</template>

<script lang="ts" setup>
import bus from '@/utils/bus'
import { reactive, ref, watch } from 'vue'
import { menuCssVars, LOCAL_NAME as MENU_NAME } from '@/styles/CsstoJs/menuCssVar'
import { headerCssVars, LOCAL_NAME } from '@/styles/CsstoJs/headerCssVar'
import { useConfigStroe } from '@/store/appSetting'
import { useThemeStore } from '@/store/theme'
const configStroe = useConfigStroe()
const themeStroe = useThemeStore()
const colors = ref<any[]>([
  { theme: 'default', color: '#0fa59b', name: '经典' },
  { theme: 'blue', color: '#550fa5', name: '清爽' },
  { theme: 'dark', color: '#000', name: '暗夜' },
])

const layout = reactive({
  menuMode: localStorage.getItem('menuMode'),
  tagsBar: localStorage.getItem('tagsBar'),
})
const styles = reactive({
  height: 'calc(100% - 55px)',
  overflow: 'auto',
  paddingBottom: '53px',
  position: 'static',
})
const visible = ref<boolean>(false)

const props = withDefaults(defineProps<{ status: boolean }>(), { status: false })
const emit = defineEmits(['visible-change'])

const change = () => {
  emit('visible-change', false)
}
const saveTheme = (key: string, menuMode?: string) => {
  menuMode ? (layout.menuMode = menuMode) : ''
  configStroe.changeConfig({ key, value: layout[key] })
  // store.dispatch('changeSetting', { key, value: layout[key] })
}
const themeName = ref<string>(localStorage.getItem('_theme_') || 'default')

const changeTheme = (data: any) => {
  themeStroe.setSysTheme(data.theme)
  themeName.value = data.theme
  bus.emit('changMenuColor', data.theme)
}
const activeMenuIndex = ref<number>(Number(localStorage.getItem(MENU_NAME)))
const setMenuTheme = (index: number) => {
  activeMenuIndex.value = index
  themeStroe.setMenuTheme(index)
}

const activeHeaderIndex = ref<number>(Number(localStorage.getItem(LOCAL_NAME)))
const setHeaderTheme = (index: number) => {
  activeHeaderIndex.value = index
  themeStroe.setHeaderTheme(index)
}
watch(
  () => props.status,
  (val) => {
    visible.value = val
  }
)
</script>
<style lang="scss">
.theme-list {
  box-sizing: border-box;
  .theme-item {
    margin-bottom: 40px;
    .theme-item-sub {
      display: flex;
      justify-content: space-between;
    }
    p {
      font-size: 16px;
    }
    .drawer-block-checkbox {
      display: flex;
      overflow: hidden;
      .drawer-block-checkbox-item {
        position: relative;
        margin-right: 16px;
        box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        width: 44px;
        height: 36px;
        background-color: #f0f2f5;
        .selectIcon {
          color: rgb(142, 142, 142);
          position: absolute;
          bottom: 4px;
          right: 6px;
          font-weight: 700;
          font-size: 14px;
          pointer-events: none;
        }
      }
      .drawer-block-checkbox-item-slide {
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #001428;
          content: '';
          z-index: 1;
        }
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
          content: '';
        }
      }
      .drawer-block-checkbox-item-top {
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: transparent;
          content: '';
          z-index: 1;
        }
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #001428;
          content: '';
        }
      }
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
        .selectIcon {
          color: rgb(142, 142, 142);
          font-weight: 700;
          font-size: 14px;
          pointer-events: none;
        }
      }
    }
    span {
      margin-right: 12px;
    }
  }
}
.el-drawer {
  outline: none;
}
</style>
