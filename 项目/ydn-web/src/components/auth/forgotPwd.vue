<template>
  <div id="forgotPwd">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
    </Header>

    <Form>
      <h1 slot="title" class="login_title">
        {{ $route.meta.title || "找回密码" }}
      </h1>
      <van-field
        v-model="phone"
        :clearable="true"
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
          @click="showPic"
        >
          {{ code_text }}
        </button>
      </van-field>

      <van-field
        :type="passShow ? `password` : `text`"
        v-model="confirm_pwd"
        :clearable="true"
        icon-prefix="my"
        left-icon="../../../static/images/login_register/password@2x.png"
        placeholder="输入新密码"
        slot="NewPassword"
        @click-right-icon="passShow = !passShow"
      >
        <van-icon
          slot="right-icon"
          class="eye"
          :name="
            passShow
              ? `../../../static/images/login_register/icon-hide@2x.png`
              : `../../../static/images/login_register/icon-show 2@2x.png`
          "
        ></van-icon>
      </van-field>

      <van-button
        color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
        slot="button"
        block
        @click="submit"
        :disabled="disabledBtn"
        >确认</van-button
      >

      <!-- <div class="text" slot="text">
        <p>手机不可用？ <span class="color">试试密钥找回</span></p>
      </div> -->
    </Form>
  </div>
</template>

<script>
import topBar from "../common/topBar";
import Form from "../Form";
import Countdown from "../../mixin/Countdown.js";
import { messageCode } from "../../tool/verify.js";
export default {
  name: "forgotPwd",
  components: {
    topBar,
  },
  data() {
    return {
      title: "重置登录密码",
      codeClick: true,
      code_text: "发送验证码",
      all_time: 60,
      //
      isClick: true,
      phone: "",
      msg_code: "",
      confirm_pwd: "",
      verity_token: "",
      password: "",
      passShow: true,
    };
  },
  methods: {
    submit() {
      if (this.isClick) {
        const { phone, msg_code, confirm_pwd } = this;
        if (messageCode({ phone, msg_code, confirm_pwd }, this)) {
          this.isClick = false;
          this.$http
            .post("/reset-pwd", {
              account: this.phone,
              pwd: this.confirm_pwd,
              verity_token: this.verity_token,
              verity_code: this.msg_code,
            })
            .then((res) => {
              this.isClick = true;
              if (res.data.status == 200) {
                this.$toast(res.data.msg);
                this.$router.push("/login");
              }
            });
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
          .post("/reset-pwd/send-code", {
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
  // mixins: [Countdown],
};
</script>

<style lang="less" scoped>
@import "../../../static/css/login.less";

#forgotPwd {
  /deep/ .van-field__control {
    color: #fff;
  }
}
</style>
