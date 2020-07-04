<template>
  <!-- 使用设置 -->
  <div class="setup">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">设置</div>
    </Header>

    <div class="setup_con">
      <div>
        <img src="../../../static/images/miner/phone.png" alt="" />
        <p>版本</p>
      </div>
      <p>{{ version }}<span></span></p>
    </div>
    <div class="ser_code">
      <button class="ser_btn" @click="showBox = true">
        退出
      </button>
    </div>

    <van-dialog v-model="showBox" show-cancel-button @confirm="determineRess">
      <p class="dialog_text">提示</p>
      <div class="dialog-text">您确定要退出？</div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'setUp',
  data() {
    return {
      version: '',
      showBox: false
    }
  },
  methods: {
    determineRess() {
      this.$toast('退出成功！')
      this.$store.commit('LOGOUT')
      this.$router.push('/login')
    }
  },
  created() {
    this.$http.get('/webconf').then(res => {
      if (res.data.status == 200) {
        this.version = res.data.data.version
      } else {
        this.$toast(res.data.msg)
      }
    })
  }
}
</script>
<style lang="less" scoped>
.setup_con {
  width: 16.266667rem;
  margin: 1.333333rem auto 0;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.533333rem;
  border-bottom: 1px solid #333333;
  div {
    display: flex;
    img {
      width: 1.173333rem;
      height: 1.493333rem;
      margin-right: 0.533333rem;
    }
    p {
      font-size: 0.853333rem;
    }
  }
  p {
    span {
      margin-left: 0.266667rem;
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: red;
      border-radius: 50%;
    }
  }
}
.setup {
  height: 100%;
  position: relative;
}
.ser_code {
  margin-top: 2.133333rem;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  .ser_btn {
    width: 16.266667rem;
    height: 2.24rem;
    background: linear-gradient(
      180deg,
      rgba(11, 226, 182, 1) 0%,
      rgba(41, 172, 173, 1) 100%
    );
    border-radius: 6px;
    border: 0;
  }
}
.dialog_text {
  text-align: center;
  width: 100%;
  color: #000000;
  font-size: 1.066667rem;
  margin: 2.293333rem 0 1.28rem 0;
  font-weight: bold;
}
.dialog-text {
  width: 100%;
  text-align: center;
  color: #000;
  padding-bottom: 1.6rem;
}
</style>
