<template>
  <div class="header light-header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn">
      <i @click="handleCollapse()" :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
    </div>
    <div class="logo ellipsis" title="首页">ZeroToHero</div>
    <div class="header-menu">
      <slot></slot>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <el-tooltip :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
          <i class="el-icon-rank icon-cammand" @click="handleFullScreen"></i>
        </el-tooltip>
        <el-tooltip content="主题切换" placement="bottom">
          <i class="el-icon-orange icon-cammand" @click="settingBarStatus = true" v-if="props.showThemeBar"></i>
        </el-tooltip>
        <el-avatar icon="el-icon-user-solid" style="margin-left: 10px"></el-avatar>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            管理员
            <i f class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-mouse" command="updataPassword">密码修改</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="loginout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <AppSettingBar :status="settingBarStatus" @visibleChange="toggleThemeBar"></AppSettingBar>
  </div>
</template>
<script setup lang="ts">
import AppSettingBar from './AppSettingBar.vue'
import { removeAllStorge } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router'
import { Ref, ref, unref } from 'vue'
import bus from '@/utils/bus'

const router = useRouter()
const route = useRoute()

const settingBarStatus = ref<boolean>(false)
const fullscreen: Ref<boolean> = ref(false)
const collapse: Ref<boolean> = ref(false)

const props = withDefaults(defineProps<{ showThemeBar?: boolean }>(), {
  showThemeBar: true
})

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
  }
}
const handleFullScreen = () => {
  const element = document.documentElement
  if (fullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    }
  }
  fullscreen.value = !fullscreen.value
}
const toggleThemeBar = (bool: boolean) => {
  settingBarStatus.value = bool
}
// 刷新页面
const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath
  })
}
</script>
<style lang="scss">
.header {
  @include header-background();
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 20px;
  @include font_color(#fff);
  .collapse-btn {
    margin-right: 12px;
    cursor: pointer;
    &:hover {
      color: #d66a57;
    }
  }
  .logo {
    cursor: pointer;
    max-width: 250px;
    line-height: 50px;
    margin-right: 24px;
    // @include font_color(#fff);
    font-weight: bolder;
  }
  i {
    // @include font_color(#fff);
    font-size: 20px;
    cursor: pointer;
  }
  .header-menu {
    flex: 1;
  }
  .header-right {
    padding-right: 20px;
  }
  .header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
  }
  .icon-cammand {
    transform: rotate(45deg);
    margin-left: 10px;
    font-weight: lighter;
  }
  .user-name {
    margin-left: 10px;
  }
  .el-dropdown-link {
    @include font_color(#fff);
    cursor: pointer;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
}

.light-header {
  @include content-background();
  @include font_color(null);
  border-bottom: 3px solid transparent;
  @include border-color();
  .el-dropdown-link {
    @include font_color(null);
    cursor: pointer;
  }
}
</style>
