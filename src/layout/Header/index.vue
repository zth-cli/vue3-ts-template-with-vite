<template>
  <div class="header" :class="{ 'light-header': !isHor }">
    <!-- 折叠按钮 -->
    <div v-if="!isHor" class="collapse-btn">
      <el-icon :size="20">
        <component :is="collapse ? 'expand' : 'fold'" style="font-size: 20px" @click="handleCollapse()" />
      </el-icon>
    </div>
    <Breadcrumb v-if="!isHor"></Breadcrumb>
    <!-- <div class="solgan ellipsis" title="首页">ZeroToHero</div> -->
    <div v-if="isHor" class="logo">
      <img src="@/assets/img/logo.png" />
    </div>
    <div class="header-menu">
      <slot>
        <Menu v-if="isHor" menu-mode="horizontal"></Menu>
      </slot>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
          <el-icon :size="16" class="icon-cammand">
            <component is="rank" @click="handleFullScreen()" />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="系统设置" placement="bottom">
          <el-icon v-if="props.showThemeBar" :size="16" class="icon-cammand">
            <component is="setting" @click="settingBarStatus = true" />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="重载" placement="bottom">
          <el-icon v-if="props.showThemeBar" :size="16" class="icon-cammand">
            <component is="refresh-right" @click="reloadPage" />
          </el-icon>
        </el-tooltip>
        <el-avatar icon="el-icon-user-solid" :size="30" style="margin-left: 10px"></el-avatar>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span>
            管理员
            <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="mouse" command="updataPassword">密码修改</el-dropdown-item>
              <el-dropdown-item icon="switch-button" command="loginout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <AppSettingBar :status="settingBarStatus" @visible-change="toggleThemeBar"></AppSettingBar>
  </div>
</template>
<script setup lang="ts">
import { Menu } from '../Menu'
import { Breadcrumb } from '../Breadcrumb'
import AppSettingBar from './AppSettingBar.vue'
import { removeAllStorge } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router'
import { Ref, ref, unref, computed } from 'vue'
import bus from '@/utils/bus'

const router = useRouter()
const route = useRoute()

const settingBarStatus = ref<boolean>(false)
const fullscreen: Ref<boolean> = ref(false)
const collapse: Ref<boolean> = ref(false)

const props = withDefaults(defineProps<{ showThemeBar?: boolean }>(), {
  showThemeBar: true,
})

// 获取layout状态peovide
const layoutProvide = inject<any>('layout-provide')
const { menuMode, headerColor } = toRefs(layoutProvide)
const isHor = computed(() => menuMode.value === 'horizontal')

// 收起展开侧边菜单
const handleCollapse = () => {
  collapse.value = !collapse.value
  bus.emit('swithCollapse', collapse.value)
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
.header {
  background-color: v-bind('headerColor.backgroundColor');
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  font-size: 20px;
  color: v-bind('headerColor.textColor');
  i {
    font-size: 16px;
    cursor: pointer;
  }
  .collapse-btn {
    color: v-bind('headerColor.textColor');
    margin-right: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      color: var(--color-primary);
    }
  }
  .solgan {
    cursor: pointer;
    max-width: 250px;
    line-height: 50px;
    margin-right: 24px;
    font-weight: bolder;
  }
  .header-menu {
    flex: 1;
  }
  .header-right {
    padding-right: 20px;
    .header-user-con {
      display: flex;
      align-items: center;
    }
    .icon-cammand {
      color: v-bind('headerColor.textColor');
      transform: rotate(45deg);
      margin-left: 12px;
      font-weight: lighter;
    }
    .user-name {
      margin-left: 10px;
      color: v-bind('headerColor.textColor');
      .el-dropdown-link {
        cursor: pointer;
      }
    }
    .el-dropdown-menu__item {
      text-align: center;
    }
  }
}
.light-header {
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
