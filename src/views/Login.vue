<template>
  <div class="login_main">
    <div class="login_content">
      <div class="loginbox">
        <h2 style="text-align: center">{{ slogan }}</h2>
        <div class="formbox">
          <div class="sub-title">账号登录</div>
          <div class="bdbox">
            <el-input
              v-model="mobile"
              placeholder="请输入11位手机号码"
              prefix-icon="el-icon-user"
              autocomplete="off"
            ></el-input>
            <span v-show="!isValidPhone" class="color_warning" style="font-size: 12px">*请输入有效号码</span>
          </div>
          <div class="bdbox">
            <el-input v-model="passwords" placeholder="请输入密码" prefix-icon="el-icon-c-scale-to-original">
            </el-input>
          </div>
          <el-button v-debounce="loginajax" type="primary" :loading="isLoging" class="login_btn">登录</el-button>
          <p class="login-tips">
            <span @click="loginByPwd = !loginByPwd">{{ loginByPwd ? '短信登录' : '密码登录' }}</span>
            <span>没有账号? 立即注册</span>
          </p>
        </div>
      </div>
    </div>
    <div class="load-container">
      <div class="loader-bounce"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getConfig } from '@/config'
import { ref, Ref, computed, getCurrentInstance } from 'vue'
import { useMenuStore } from '@/store/menu'
import { useRouter } from 'vue-router'
import { setStorge } from '@/utils/auth'
const internalInstance = getCurrentInstance()
const slogan = internalInstance.appContext.config.globalProperties.$config.Title
const mobile: Ref<string> = ref('')
const passwords: Ref<string> = ref('')
const isLoging: Ref<boolean> = ref(false)
const loginByPwd: Ref<boolean> = ref(true)
const menuStore = useMenuStore()
const router = useRouter()
const loginajax = () => {
  getUserMenu()
}
const getUserMenu = () => {
  menuStore.getUserMenu().then((routes) => {
    setStorge('token', '2321314dqdqf21')
    console.log(routes)
    router.replace('/')
  })
}
console.log(getConfig('Title'))
const isValidPhone = computed(() => {
  const phoneReg =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
  return !phoneReg.test(mobile.value) && mobile.value ? false : true
})
// https://www.showdoc.com.cn/1647563843342425/7782842647927484
</script>
<style lang="scss">
.login_main {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  min-height: 700px;
  background-color: hsl(210, 25%, 97%);
  background: url(../assets/bg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: #000, $alpha: 0.4);
    backdrop-filter: blur(26px);
    z-index: 0;
  }
  .login_content {
    width: 50%;
    height: 64%;
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    background: url(../assets/bg.jpg) no-repeat;
    backdrop-filter: blur(26px);
    background-size: cover;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      border-radius: 50%;
      top: -47%;
      left: -137%;
      background-color: #fff;
      z-index: -1;
    }
    .loginbox {
      box-sizing: border-box;
      padding: 10px;
      width: 47%;
      background-color: #fff;
      z-index: 10;
      position: relative;
      padding: 50px 20px;
      h2 {
        width: 100%;
        // height: 50px;
        margin-bottom: 12px;
        // line-height: 50px;
        font-size: 27px;
        color: #606266;
        font-weight: bolder;
        letter-spacing: 2px;
      }
      .sub-title {
        color: #606266;
        text-align: center;
        font-size: 20px;
      }
      .formbox {
        width: 100%;
        margin-top: 30px;
        .bdbox {
          margin-top: 15px;
        }
      }
    }
    .login-tips {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      line-height: 28px;
      cursor: pointer;
      color: #1989fa;
    }
  }
  .login_btn {
    width: 100%;
    border-radius: 4px;
    margin-top: 15px;
    transition: all 500ms;
    // @include font_color(null);
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
