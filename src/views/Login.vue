<template>
  <div class="login_main">
    <div class="login_content">
      <div class="loginbox">
        <h2 class="login_title">
          <img src="../assets/img/logo1.png" width="163" height="54" />
          {{ slogan }}
        </h2>
        <div class="formbox">
          <!--用户名-->
          <div class="bdbox">
            <el-input v-model="username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
          </div>

          <!--密码-->
          <div class="bdbox">
            <el-input
              v-model="passwords"
              type="password"
              placeholder="密码"
              autocomplete="off"
              prefix-icon="el-icon-c-scale-to-original"
            ></el-input>
          </div>
          <el-button v-debounce="loginajax" type="primary" :loading="isLoging" class="login_btn">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, computed } from 'vue'
import { useMenuStore } from '@/store/menu'
import { useRouter } from 'vue-router'
import { setStorge } from '@/utils/auth'

const slogan = '欢迎登录'
const mobile: Ref<string> = ref('')
const username: Ref<string> = ref('')
const passwords: Ref<string> = ref('')
const isLoging: Ref<boolean> = ref(false)
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
  display: flex;
  // @include base-background();
  background: url(../assets/img/wlbg.png) no-repeat 0% 100%;
  justify-content: center;
  align-items: center;
}

.login_content {
  width: 450px;
  height: 280px;
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
  // @include box-shadow();
  .loginbox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // padding: 10px;
    border-radius: 10px;
  }
}

.loginbox h2 {
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  height: 60px;
  padding: 0 5px;
  margin-bottom: 20px;
  line-height: 60px;
  font-size: 22px;
  font-weight: normal;
  letter-spacing: 2px;
  color: #fff;
  background-color: var(--color-primary);
  img {
    float: left;
    padding-right: 20px;
    margin-top: 3px;
    vertical-align: middle;
  }
}
.formbox {
  width: 90%;
  margin: 0 auto;
}

.bdbox {
  margin-top: 15px;
}

.login_btn {
  width: 100%;
  border-radius: 4px;
  margin-top: 15px;
  transition: all 500ms;
  cursor: pointer;
  font-size: 16px;
}
</style>
