<template>
  <div class="vertical-header" :class="{ 'horizontal-header': isHorizontal, 'mobile-header': isMobile }">
    <!-- 折叠按钮 -->
    <div v-if="!isHorizontal || isMobile" class="collapse-btn">
      <el-icon :size="16">
        <component :is="isCollapse ? 'expand' : 'fold'" @click="handleCollapse()" />
      </el-icon>
    </div>
    <Breadcrumb v-if="!isHorizontal"></Breadcrumb>
    <div v-if="isHorizontal && !isMobile" class="logo">
      <img src="@/assets/img/logo.png" />
    </div>
    <div class="header-menu">
      <Horizontal v-if="isHorizontal && !isMobile"></Horizontal>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
          <el-icon :size="15" class="icon-cammand">
            <component is="FullScreen" @click="handleFullScreen()" />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="系统设置" placement="bottom">
          <el-icon v-if="props.showThemeBar" :size="16" class="icon-cammand">
            <component is="setting" @click="settingBarStatus = true" />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="重载" placement="bottom">
          <el-icon :size="16" class="icon-cammand">
            <component is="refresh-right" @click="reloadPage" />
          </el-icon>
        </el-tooltip>
        <el-avatar icon="el-icon-user-solid" :size="30" style="margin-left: 10px"></el-avatar>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <div class="user-name-con">
            {{ '管理员' }}
            <el-icon><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="mouse" command="updataPassword">密码修改</el-dropdown-item>
              <el-dropdown-item icon="switch-button" command="loginout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <Setting v-model="settingBarStatus"></Setting>
  </div>
</template>
<script setup lang="ts">
import Horizontal from '../Menu/horizontal.vue'
import { Breadcrumb } from '../Breadcrumb'
import Setting from '../Setting/index.vue'
import { removeAllStorge } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router'
import { Ref, ref, unref } from 'vue'

const { isCollapse, isMobile } = inject<any>('layout-provide')
const router = useRouter()
const route = useRoute()

const settingBarStatus = ref<boolean>(false)
const fullscreen: Ref<boolean> = ref(false)

const props = withDefaults(defineProps<{ showThemeBar?: boolean; isHorizontal: boolean }>(), {
  showThemeBar: true,
  isHorizontal: false,
})

// 收起展开侧边菜单
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleCommand = (command: string) => {
  if (command === 'loginout') {
    removeAllStorge()
    router.replace('/login')
  } else if (command === 'updataPassword') {
    // TODO
  }
}
const handleFullScreen = () => {
  const element = document.documentElement
  if (fullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else if (element.requestFullscreen) {
    element.requestFullscreen()
  }
  fullscreen.value = !fullscreen.value
}
const toggleThemeBar = (bool: boolean) => {
  settingBarStatus.value = bool
}
// 刷新页面
const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath,
  })
}
</script>
<style lang="scss">
$headerHeight: 48px;
.vertical-header {
  background-color: var(--content-background);
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: $headerHeight;
  color: var(--el-text-color-regular);
  i {
    font-size: 16px;
    cursor: pointer;
  }
  .collapse-btn {
    color: var(--el-text-color-regular);
    margin-right: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 12px;
    &:hover {
      color: var(--color-primary);
    }
  }
  .header-menu {
    flex: 1;
    min-width: 0;
  }
  .header-right {
    padding-right: 12px;
    min-width: 204px;
    .header-user-con {
      display: flex;
      align-items: center;
    }
    .icon-cammand {
      color: var(--menu-text);
      margin-left: 12px;
      font-weight: lighter;
    }
    .user-name {
      margin-left: 10px;
      font-size: 14px;
      color: var(--menu-text);
      .el-text {
        color: var(--menu-text);
        max-width: 120px;
      }
      cursor: pointer;
      .el-dropdown-link {
        cursor: pointer;
      }
    }
    .el-dropdown-menu__item {
      text-align: center;
    }
  }
}
.horizontal-header:not(.mobile-header) {
  background-color: var(--menu-background) !important;
}
body[layout='vertical'] .vertical-header,
.mobile-header {
  .icon-cammand {
    color: var(--el-text-color-regular) !important;
  }
  .user-name {
    color: var(--el-text-color-regular) !important;
  }
}
</style>
