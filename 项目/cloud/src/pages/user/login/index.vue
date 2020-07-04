<route-config>
  {
  layoutName:'full',
  meta:{
  auth: false
  }
  }
</route-config>
<template>
  <div class="page-module login-container backgroundCover flex width_100 height_100">
    <div class="login-panel" @keyup.enter="login">
      <div class="head-text align_center">
        <img src="./images/login_logo.png">
      </div>
      <el-form class="login-form" size="medium" :model="loginData" :rules="rules" ref="loginForm">
        <el-form-item prop="userName">
          <el-input placeholder="请输入账户名" autofocus v-model="loginData.userName"/>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入账户密码" v-model="loginData.pwd"/>
        </el-form-item>
        <el-form-item>
          <el-button  class="width_100 login_btn"  @click="login" :loading="submitLoad">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapActions} from 'vuex'
import {SET_USER_INFO, SET_TOKEN} from 'src/store/actions/type'
import {homePage} from 'src/common/setting'
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        loginType: 1,
        pwd: '',
        userName: ''
      },
      rules: {
        userName: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
        pwd: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
      },
      submitLoad: false
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: SET_USER_INFO,
      setToken: SET_TOKEN
    }),
    login () {
      const {$refs, $api, loginData, $message, setUserInfo, setToken, $router} = this
      $refs.loginForm.validate(async (valid) => {
        if (!valid) return false
        this.submitLoad = true
        try {
          const {data, transactionStatus} = await $api.user.login(loginData)
          if (!transactionStatus.success) {
            $message.error('登录失败:' + transactionStatus.replyText)
          } else {
            setUserInfo(data.userInfo)
            setToken(data.token)
            $message.success('登录成功')
            $router.replace(homePage)
          }
        } catch (error) {
          $message.error(error.replyText)
        } finally {
          this.submitLoad = false
        }
      })
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .login-container {
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #344058;
    .login-panel {
      padding: 25px 15px;
      width: 350px;
      border-radius: 3px;
      background-color: #fff;
    }

    .head-text {
      margin-bottom: 25px;
    }
    .login_btn{
      background-color: #fd695b;
      color: #fff;
    }
  }
.el-input{
  width: 100% !important;
}
</style>
