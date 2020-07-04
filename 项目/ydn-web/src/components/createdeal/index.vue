// 创建交易密码
<template>
  <div id="createdeal">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title"
           style="color:#fff;">{{ $route.meta.title }}</div>
    </Header>

    <Form class="createdeal">
      <van-field disabled
                 :clearable="true"
                 left-icon="../../../static/images/login_register/phone@2x.png"
                 :placeholder="account"
                 slot="phone">
        <button class="button notecode"
                slot="right-icon"
                @click="showPic"
                :disabled="show">
          {{ code_text }}
        </button>
      </van-field>

      <van-field v-model="verity_code"
                 :clearable="true"
                 icon-prefix="my"
                 left-icon="../../../static/images/login_register/info@2x.png"
                 placeholder="请输入验证码"
                 slot="note">
      </van-field>

      <van-field type="password"
                 v-model="new_pwd"
                 :clearable="true"
                 icon-prefix="my"
                 left-icon="../../../static/images/login_register/password@2x.png"
                 placeholder="请设置交易密码"
                 slot="NewPassword">
      </van-field>

      <van-button color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
                  slot="button"
                  block
                  style="font-size:.853rem;"
                  @click="modifyPassword">确认</van-button>
    </Form>

    <div class="tips">
      <div class="box_top">
        <img src="/static/images/safety/tip@2x.png" />
        <span>温馨提示：</span>
      </div>
      <p class="box_text">
        关键资产操作的时候需要用到交易密码，请牢记您的交易密码并且不要透露给任何人
      </p>
    </div>
  </div>
</template>

<script>
import Form from "../Form";
export default {
  name: "Createdeal",
  data () {
    return {
      verity_code: "",
      new_pwd: "",
      show: false,
      code_text: "发送验证码",
      all_time: 60,
      verity_token: "",
      account: ''
    };
  },
  components: {
    Form,
  },
  methods: {
    // 修改交易密码
    modifyPassword () {
      const { verity_token, verity_code, new_pwd } = this;
      this.$http
        .post("/user/update-paypwd", { verity_token, verity_code, new_pwd })
        .then((res) => {
          if (res.data.status === 200) {
            this.$store.commit('SAVE_PASSWORD', new_pwd)
            this.$toast("交易密码修改成功！");
            this.$router.push('/personal');
          }
        });
    },
    // order 加百分号，转时间
    showPic () {
      this.$toast("短信验证码已发送!");
      //
      if (this.getPicAuth(this.phone)) return;
      this.countDown();
      this.show = true;
    },
    countDown () {
      //验证码倒计时
      this.time = setInterval(this.countDownTime, 1000);
      this.countDownTime();
    },
    countDownTime () {
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
    getPicAuth () {
      this.$http
        .get("/user/send-code", {
          type: 1,
        })
        .then((res) => {
          const {
            data: { verity_token },
            status,
          } = res.data;
          if (status === 200) {
            this.verity_token = verity_token;
          }
        });
    },
  },
  mounted () {
    this.$http.get('/user/info').then(res => {
      if (res.data.status === 200) {
        this.account = res.data.data.account
      }
    })
  }
};
</script>

<style lang="less" scoped>
@import "../../../static/css/login.less";
#createdeal {
  background: transparent;
  padding:0;
  width: 80%;
  margin: auto;
  .notecode {
    widows: 4.693rem;
    height: 1.707rem;
    background: rgba(41, 172, 173, 1);
    border-radius: 0.32rem;
    font-size: 0.64rem;
    color: #fff;
  }
}

#createdeal {
  /deep/ .van-cell {
    padding: 0.533rem 0;
    color: #fff;
  }
  /deep/ .van-field__control {
    color: #fff;
  }
  /deep/ .van-field__left-icon{
    /deep/ .van-icon{
      img{
        width: 1.173333rem;
        height: 1.493333rem;
      }
    }
  }
  /deep/ .van-field__left-icon{
    /deep/ .my{
      img{
        width: 1.173333rem;
        height: 1.493333rem;
      }
    }
  }
  /deep/ .van-field__body{
    margin-left: 20px;
  }
}

.van-button {
  margin-top: 2.72rem;
  border-radius: 0.32rem;
}

.tips {
  width: 16.267rem;
  margin: 0 auto;
  margin-top: 2.24rem;
  .box_top {
    display: flex;
    align-items: center;
    img {
      width: 1.067rem;
      height: 1.067rem;
    }
    span {
      font-size: 0.747rem;
      color: #e4e4e4;
      padding-left: 0.427rem;
    }
  }
  .box_text {
    margin-top: 0.48rem;
    text-align: left;
    font-size: 0.64rem;
    color: #999999;
    line-height: 0.907rem;
  }
}
</style>
