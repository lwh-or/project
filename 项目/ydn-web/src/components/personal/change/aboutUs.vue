<template>
  <!-- 关于我们 -->
  <div class="about">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">在线客服</div>
    </Header>
    <div class="service">
      <p class="customer">联系客服</p>
      <p class="weChat_ser">如果您有任何疑问可添加下方微信号咨询</p>
      <div class="wechat">
        <p>
          微信号：<span>{{ wechat }}</span>
        </p>
        <img data-clipboard-action="copy" :data-clipboard-text="wechat" class="codeWechat" @click="copy" src="../../../../static/images/miner/weixin.png" alt="" />
      </div>
      <div class="ser_code">
        <button class="ser_btn" @click="$router.back()">
          好的
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      wechat: ''
    }
  },
  methods: {
    copy() {
      let _this = this
      let clipboard = new this.clipboard('.codeWechat')
      clipboard.on('success', function() {
        _this.$toast('复制成功')
      })
      clipboard.on('error', function() {
        _this.$toast('复制失败')
      })
    }
  },
  created() {
    this.$http.get('/webconf').then(res => {
      if (res.data.status == 200) {
        this.wechat = res.data.data.weixin
      } else {
        this.$toast(res.data.msg)
      }
    })
  }
}
</script>
<style lang="less" scoped>
.about {
  height: 100%;
  background: url('../../../../static/images/miner/about_bj.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  /deep/ .header {
    background: rgba(0, 0, 0, 0);
  }
  /deep/ .van-nav-bar__placeholder {
    background: rgba(0, 0, 0, 0);
  }
  /deep/.van-nav-bar__placeholder .van-nav-bar {
    border-top: 20px solid rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
  }
   height: 100%;
   overflow-y: scroll;
  .service {
    position: absolute;
    top: 10.666667rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0.32rem;
    width: 17.866667rem;
    height: 23.626667rem;
    background-color: white;
    .customer {
      text-align: center;
      color: #000000;
      font-size: 0.96rem;
      margin-top: 2.24rem;
      font-weight: bold;
    }
    .weChat_ser {
      color: #666666;
      font-weight: 14px;
      text-align: center;
      margin: 1.28rem 0;
    }
    .wechat {
      display: flex;
      justify-content: center;
      p {
        color: #000000;
        font-size: 16px;
      }
      img {
        width: 0.746667rem;
        height: 0.746667rem;
        margin-left: 0.8rem;
        margin-top: 0.266667rem;
      }
    }
  }
}
.ser_code {
  margin-top: 2.133333rem;
  display: flex;
  justify-content: center;
  .ser_btn {
    width: 8.213333rem;
    height: 2.24rem;
    background: linear-gradient(
      180deg,
      rgba(249, 221, 48, 1) 0%,
      rgba(236, 183, 19, 1) 100%
    );
    border-radius: 1.44rem;
    border: 0;
  }
}
</style>
