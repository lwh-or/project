// 创建交易密码

<template>
  <div id="createdeal">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block; " />
      <div slot="title"
           style="color:#fff;">修改密码</div>
    </Header>

    <Form class="createdeal">
      <van-field v-model="pwd"
                 :clearable="true"
                 icon-prefix="my"
                 type="password"
                 label="旧密码"
                 label-align="left"
                 placeholder="请输入原密码"
                 slot="note">
      </van-field>

      <van-field type="password"
                 v-model="new_pwd"
                 :clearable="true"
                 icon-prefix="my"
                 label="新密码"
                 label-align="left"
                 placeholder="请输入新密码(6至20位数字或字母)"
                 slot="NewPassword">
      </van-field>

      <van-field type="password"
                 v-model="confirm_pwd"
                 :clearable="true"
                 icon-prefix="my"
                 label="确认密码"
                 label-align="left"
                 placeholder="请再次输入新密码"
                 slot="NewPassword">
      </van-field>

      <van-button color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
                  slot="button"
                  block
                  style="font-size:.853rem;"
                  @click="ChangePassword">确认</van-button>
    </Form>
  </div>
</template>

<script>
import Form from "../../Form";
export default {
  name: "Createdeal",
  data () {
    return {
      pwd: "",
      new_pwd: "",
      confirm_pwd: "",
    };
  },
  components: {
    Form,
  },
  methods: {
    ChangePassword () {
      const { pwd, new_pwd, confirm_pwd } = this;
      this.$http
        .post("/user/update-pwd", { pwd, new_pwd, confirm_pwd })
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res.data.data);
            this.$toast("修改密码成功");
            this.$router.push("/login");
          } else {
            this.$toast(res.data.msg);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../static/css/login.less";
.van-field__label {
  text-align: left;
  width: 80px;
}
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
  /deep/ .createdeal{
    width: 100%;
  }
  /deep/ .van-cell {
    padding: 0.533rem 0;
    color: #fff;
  }
  /deep/ .van-field__control {
    color: #fff;
  }
  /deep/ .van-cell__title{
    text-align: left;
    width: 70px;
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
