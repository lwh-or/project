<template>
  <div class="reg" id="Register">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
    </Header>

    <Form>
      <h1 slot="title" class="login_title">欢迎注册YDN</h1>
      <!--  -->
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
        :type="passShow ? `password` : `text`"
        v-model="password"
        :clearable="true"
        icon-prefix="my"
        left-icon="../../../static/images/login_register/password@2x.png"
        placeholder="设置登录密码"
        slot="loginPassword"
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
      <van-field
        :type="pwaShow ? `password` : `text`"
        v-model="pwaPassword"
        :clearable="true"
        icon-prefix="my"
        left-icon="../../../static/images/login_register/correct@2x.png"
        placeholder="再次输入登录密码"
        slot="pwaPassword"
        @click-right-icon="pwaShow = !pwaShow"
      >
        <van-icon
          slot="right-icon"
          class="eye"
          :name="
            pwaShow
              ? `../../../static/images/login_register/icon-hide@2x.png`
              : `../../../static/images/login_register/icon-show 2@2x.png`
          "
        ></van-icon>
      </van-field>

      <van-field
        v-model="msg_code"
        :clearable="true"
        left-icon="../../../static/images/login_register/info@2x.png"
        placeholder="短信验证码"
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

      <van-field
        v-model="Inboxcode"
        :clearable="true"
        left-icon="../../../static/images/login_register/Safety@2x.png"
        placeholder="邀请码（必填）"
        slot="Inbox"
      >
      </van-field>

      <div class="http-xie">
        <van-checkbox v-model="checked">
          <template #icon="props">
            <img
              class="img-icon"
              :src="props.checked ? activeIcon : inactiveIcon"
            />
          </template>
          已阅读并同意《<span class="user-x">用户服务协议</span>》
        </van-checkbox>
      </div>

      <van-button
        color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
        slot="button"
        block
        @click="register"
        >下一步</van-button
      >


    </Form>


    <div class="downloadApp" v-if="isDownload" @click="$router.push('/download')">下载APP</div>

  </div>
</template>

<script>
import Vue from "vue";
import Form from "../../components/Form";
import { Checkbox } from "vant";
Vue.use(Checkbox);
import { returnVerify } from "../../tool/verify";
export default {
  name: "register",
  data() {
    return {
      index: 1,
      showArea: false,
      show: false,
      area_list: [],
      area_id: 1,
      area_code: "86",
      pic_src: "",
      pic_token: "",
      pic_code: "",
      codeClick: true,
      code_text: "发送验证码",
      all_time: 60,
      msg_token: "",
      msg_code: "", // 验证码
      phone: "",
      email: "",
      password: "",
      pwaPassword: "",
      notecaptcha: "", // 短信验证码
      Inboxcode: "", // 邀请码
      asset_password: "",
      invitation_code: "",
      isClick: true,
      checked: true, // 复选框
      activeIcon: "../../../static/images/login_register/Agree@2x.png",
      inactiveIcon: "../../../static/images/login_register/correct@2x.png",
      passShow: true,
      pwaShow: true,
      verity_token: "",
      state_id: 1,
      disabled: true,
      disabledBtn: false, // 是否禁用按钮
      isDownload :false
    };
  },
  created() {
    if (this.$route.query.type == "invite") {
      this.Inboxcode = this.$route.query.invitation_code;
    }
  },
  mounted(){
    // 判断路由中是否存在邀请码，存在就显示下载APP按钮
    if(this.$route.query.invitation_code){
      this.isDownload = true
    }else{
      this.isDownload = false
    }
    
  },
  methods: {
    onChange(val) {
      this.area_id = val.id;
      this.area_code = val.code;
      this.showArea = false;
    },
    getArea() {
      this.$http.get("/area").then((res) => {
        var data = res.data.data;
        data.forEach((item) => {
          item.text = item.code + " " + item.state_china;
        });
        this.area_list = data;
      });
    },
    // 注册
    register() {
      if (this.isClick) {
        const {
          phone,
          password,
          pwaPassword,
          msg_code,
          Inboxcode,
          checked,
        } = this;
        const result = returnVerify(
          { phone, password, pwaPassword, msg_code, Inboxcode, checked },
          this
        );
        if (result) {
          this.isClick = false;
          this.$http
            .post("/register", {
              state_id: this.state_id,
              account: this.phone,
              pwd: this.password,
              pwd_confirmation: this.password,
              verity_token: this.verity_token,
              verity_code: this.msg_code,
              invite_code: this.Inboxcode,
            })
            .then((res) => {
              this.isClick = true;
              if (res.data.status == 200) {
                this.$toast("注册成功");
                this.$router.replace("/login");
              }else{
                this.$toast(res.data.msg);
              }
            })
            .finally(() => {
              this.phone = this.password = this.pwaPassword = this.msg_code = this.Inboxcode = this.checked =
                "";
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
          .post("/register/send-code", {
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
#Register {
  /deep/ .van-field__control {
    color: #fff;
  }
  /deep/ .header{
    height: 1.413333rem;
  }
  /deep/ .van-nav-bar__placeholder{
    height: 0;
  }
}

.van-nav-bar__placeholder {
  height: 0;
}

.img-icon {
  width: 0.96rem;
  height: 0.96rem;
  display: block;
}

.http-xie {
  font-size: 0.64rem;
  margin-top: 1.28rem;
  .user-x {
    color: #0be2b6;
  }
}

.downloadApp{
  margin-top: 30px;
  color: #0be2b6;
}
</style>
