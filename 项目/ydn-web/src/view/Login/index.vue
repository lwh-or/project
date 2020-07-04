<template>
  <div id="login">
    <!-- 短信验证码登录 -->
    <Form v-show="!isModel">
      <h1 slot="title" class="login_title">欢迎使用YDN</h1>
      <van-field
        v-model="phone"
        :clearable="true"
        type="tel"
        left-icon="../../../static/images/login_register/phone@2x.png"
        
        placeholder="输入手机号码"
        slot="phone"
      >
      </van-field>
      <van-field
        v-model="msg_code"
        :clearable="true"
        icon-prefix="my"
        left-icon="../../../static/images/login_register/info@2x.png"
        placeholder="输入短信验证码"
        slot="note"
      >
        <button
          class="button"
          slot="right-icon"
          style="color:#0BE2B6;"
          :disabled="show"
          @click="showPic"
        >
          {{ code_text }}
        </button>
      </van-field>
      <van-button
        color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
        slot="button"
        block
        @click="login"
        >登录</van-button
      >

      <div class="box" slot="box">
        <span class="left tip" @click="isModel = true">密码登录</span>
        <span class="right tip" @click="$router.push('/reset/password')"
          >忘记密码了</span
        >
      </div>
      <div class="text" slot="text">
        <p>没有账户？ <span class="color">马上注册</span></p>
      </div>
    </Form>

    <!-- 登录密码登录 -->
    <Form v-show="isModel">
      <h1 slot="title" class="login_title">欢迎使用YDN</h1>
      <van-field
        v-model="phone"
        :clearable="true"
        type="tel"
        left-icon="../../../static/images/login_register/phone@2x.png"
        placeholder="输入手机号码"
        slot="phone"
      >
      </van-field>
      <van-field
        :type="showEYE ? `password` : `text`"
        v-model="password"
        :clearable="true"
        icon-prefix="my"
        left-icon="../../../static/images/login_register/password@2x.png"
        placeholder="输入登录密码"
        slot="loginPassword"
        @click-right-icon="showEYE = !showEYE"
      >
        <van-icon
          slot="right-icon"
          class="eye"
          :name="
            showEYE
              ? `../../../static/images/login_register/icon-hide@2x.png`
              : `../../../static/images/login_register/icon-show 2@2x.png`
          "
        ></van-icon>
      </van-field>
      <van-button
        color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
        slot="button"
        block
        @click="login"
        >登录</van-button
      >

      <div class="box" slot="box">
        <span class="left tip" @click="isModel = false">验证码登录</span>
        <span class="right tip" @click="$router.push('/reset/password')"
          >忘记密码了</span
        >
      </div>
      <div class="text" slot="text">
        <p>
          没有账户？
          <span class="color" @click="$router.push('/register')">马上注册</span>
        </p>
      </div>
    </Form>
  </div>
</template>

<script>
import { returnVerify, messageCode } from "../../tool/verify";
import Countdown from "../../mixin/Countdown.js";
import Form from "../../components/Form";
import Vue from "vue";
import { Field, Icon } from "vant";
Vue.use(Field);
Vue.use(Icon);
export default {
  name: "login",
  data() {
    return {
      phone: "", // 手机号
      isModel: true, // 默认显示登录密码登录
      hide: true,
      account: "",
      password: "",
      isClick: true,
      codeClick: true,
      code_text: "获取验证码",
      all_time: 60,
      msg_token: "",
      msg_code: "",
      showEYE: true,
      verity_token: "",
      code_text: "发送验证码",
      show: false,
    };
  },
  methods: {
    login() {
      console.log(1111111111);
      
      if (this.isClick) {
        // 不允许点击多次
        const { phone, password, msg_code, isModel } = this;
        if (isModel) {
          // 密码登录
          if (returnVerify({ phone, password }, this)) {
            this.isClick = false;
            this.$http
              .post("/pwd-login", {
                account: this.phone,
                pwd: this.password,
              })
              .then((res) => {
                this.isClick = true;
                if (res.data.status === 200) {
                  this.$store.commit("INITUSER", res.data.data);
                  this.$toast("登录成功！");
                  this.$router.replace("/");
                }else if(res.data.status === 403){
                  this.$toast(res.data.msg);
                }else{
                  this.$toast(res.data.msg);
                }
              })
              .catch((err) => {
                this.$toast(err);
                this.phone = "";
                this.password = "";
              });
          }
        } else {
          // 短信验证码登录
          if (messageCode({ phone, msg_code }, this)) {
            this.isClick = false;
            this.$http
              .post("/sms-login", {
                account: this.phone,
                verity_code: 1,
                verity_token: this.verity_token,
              })
              .then((res) => {
                if (res.data.status === 200) {
                  this.isClick = true;
                  this.$store.commit("INITUSER", res.data.data);
                  this.$toast("登录成功！");
                  this.$router.replace("/");
                }else{
                  console.log(111111);
                  
                  this.$toast(res.data.msg);
                }
              })
              .catch((err) => {
                this.$toast(err);
                this.phone = "";
                this.msg_code = "";
              });
          }
        }
      } else {
        this.$toast("请不要重复提交");
      }
    },
    showPic() {
      this.$toast("短信验证码已发送!");
      //
      if (this.getPicAuth(this.phone)) return;
      this.countDown();
      this.show = true;
    },
    countDown() {
      //验证码倒计时
      this.time = setInterval(this.countDownTime, 1000);
      this.countDownTime();
    },
    countDownTime() {
      if (this.all_time < 0) {
        clearInterval(this.time);
        this.code_text = "发送验证码";
        this.all_time = 60;
        this.show = false;
        return;
      }
      this.code_text = this.all_time + "s后重新获取";
      this.all_time--;
    },
    getPicAuth(account) {
      if (!account) {
        this.$toast("请输入手机号!");
        return true;
      } else {
        this.$http
          .post("/login/send-code", {
            account,
            type: 1,
          })
          .then((res) => {
            const {
              data: { verity_token },
              status,
            } = res.data;
            if (status === 200) {
              this.verity_token = verity_token;
              localStorage.setItem("_token_ydn", verity_token);
            }
          });
      }
    },
  },
  components: {
    Form,
  },
};
</script>

<style lang="less" scoped>
@import "../../../static/css/login.less";
#login {
  /deep/ .van-field__control {
    color: #fff;
  }
  /deep/ .van-field__control {
    background: transparent;
  }
  /deep/ .van-field__left-icon{
    /deep/ .van-icon{
      img{
        width: 1.066667rem;
        height: 1.066667rem;
      }
    }
    /deep/ .my{
      img{
        width: 1.066667rem;
        height: 1.066667rem;
      }
    }
  }
  /deep/ .van-field__body{
    margin-left: 1.066667rem;
  }
}
</style>
