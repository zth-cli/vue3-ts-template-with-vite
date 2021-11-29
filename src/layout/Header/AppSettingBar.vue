<template>
  <el-drawer title="系统配置" :append-to-body="true" v-model="visible" @close="change" size="300px">
    <ul class="theme-list">
      <li class="theme-item">
        <el-divider><p>菜单布局</p></el-divider>
        <div class="drawer-block-checkbox">
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-slide"
            @click=" layout.menuMode = 'vertical'; saveTheme('menuMode') ">
            <i class="selectIcon el-icon-check" v-show="layout.menuMode==='vertical'" />
          </div>
          <div
            class="drawer-block-checkbox-item drawer-block-checkbox-item-top"
            @click=" layout.menuMode = 'horizontal'; saveTheme('menuMode')" >
            <i class="selectIcon el-icon-check" v-show="layout.menuMode ==='horizontal'" />
          </div>
        </div>
      </li>
      <!-- <li class="theme-item">
        <el-divider><p>主题颜色</p></el-divider>
        <div class="drawer-block-checkbox">
          <template v-for="(item, index) in colors" :key="index">
            <div
              class="theme-color-block"
              :style="{ background: item.color }"
              @click="
                changeTheme(item.theme);
                themeName = item.theme
              "
            >
              <i class="selectIcon el-icon-check" v-show="themeName === item.theme" />
            </div>
          </template>
        </div>
      </li> -->
      <li class="theme-item">
        <el-divider><p>界面显示</p></el-divider>
        <div class="theme-item-sub">
          <span>多标签:</span>
          <el-switch v-model="layout.tagsBar" inline-prompt @change="saveTheme('tagsBar')" ></el-switch>
        </div>
        
        <!-- <el-checkbox v-model="layout.tagsBar" @change="saveTheme('tagsBar')"></el-checkbox> -->
      </li>
    </ul>
  </el-drawer>
</template>

<script lang="ts" setup>
import bus from '@/utils/bus'
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const colors = ref<any[]>([
  { theme: 'theme3', color: '#397373', name: '经典' },
  { theme: 'theme2', color: '#0e9b92', name: '清爽' },
  { theme: 'theme4', color: '#000', name: '暗夜' },
  { theme: 'theme1', color: '#030033', name: '炫酷' }
])
const themeName = ref<string>(localStorage.getItem('theme') || 'theme2')
const layout = reactive({
  menuMode: localStorage.getItem('menuMode'),
  tagsBar: localStorage.getItem('tagsBar') === 'true'
})
const styles = reactive({
  height: 'calc(100% - 55px)',
  overflow: 'auto',
  paddingBottom: '53px',
  position: 'static'
})
const visible = ref<boolean>(false)

const props = withDefaults(defineProps<{ status: boolean }>(), { status: false })
const emit = defineEmits(['visibleChange'])

const change = () => {
  emit('visibleChange', false)
}
const saveTheme = (key: string) => {
  store.dispatch('changeSetting', { key, value: layout[key] })
}
const changeTheme = (theme: string) => {
  const { VITE_PUBLIC_PATH: publicPath } = import.meta.env
  document.documentElement.setAttribute('data-theme', theme)
  document.getElementById('theme').setAttribute('href', `${publicPath}theme/${theme}/index.css`)
  localStorage.setItem('theme', theme)
  bus.emit('changMenuColor', theme)
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
  padding: 0 18px;
  @include font-color(null);
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
          position: absolute;
          bottom: 4px;
          right: 6px;
          @include font-color(null);
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
          @include header-background();
          content: '';
          z-index: 1;
        }
        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          @include header-background();
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
          @include header-background();
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
          color: #fff;
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
