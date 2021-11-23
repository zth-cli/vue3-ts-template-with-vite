<template>
  <div class="header light-header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn">
      <i
        @click="handleCollapse()"
        :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      ></i>
    </div>
    <div class="logo ellipsis" title="首页">ZeroToHero</div>
    <div class="header-menu">
      <slot></slot>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <!-- <img src="@/assets/img/a.png" /> -->
        </div>
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip
            :content="fullscreen ? `取消全屏` : `全屏`"
            placement="bottom"
          >
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            管理员
            <i f class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-mouse" command="updataPassword"
                >密码修改</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-switch-button" command="loginout"
                >注销</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { removeAllStorge } from "@/utils/auth";
import { useRouter } from "vue-router";
import { Ref, ref } from "vue";
import bus from "../utils/bus";
const router = useRouter();
const fullscreen: Ref<boolean> = ref(false);
const collapse: Ref<boolean> = ref(false);

// 收起展开侧边菜单
const handleCollapse = () => {
  collapse.value = !collapse.value;
  bus.emit("swithCollapse", collapse.value);
};

const handleCommand = (command: string) => {
  if (command === "loginout") {
    removeAllStorge();
    router.replace("/login");
  } else if (command === "updataPassword") {
  }
};
const handleFullScreen = () => {
  const element = document.documentElement;
  if (fullscreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
  fullscreen.value = !fullscreen.value;
};
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
  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    /* height: 30px; */
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    line-height: 50px;
    .el-icon-bell {
      // @include font_color(#fff);
    }
  }
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    // @include font_color(#fff);
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator {
    margin-left: 8px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
