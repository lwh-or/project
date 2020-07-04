<template>
  <!-- 新手福利 -->
  <div class="benefits">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
    </Header>
    <div class="benefits_img">
      <img src="../../../static/images/miner/benefits2.png" alt="">
    </div>
    <div class="benefits_text">
      <p>新老用户福利</p>
      <p>1.新注册用户赠送体验矿机，并且180日内产出29枚YDN</p>
      <p>2.老用户推荐注册，可奖励1.45枚YDN。推荐越多，奖励越多，快行动起来吧！</p>
    </div>
    <div class="f-16 pur-btn" @click="getNow">立即领取</div>

    <van-overlay :show="wintShow">
      <div class="wrapper" @click.self="cloneShow">
        <div class="container">
          <p class="containe_title">提示</p>
          <p class="containe_title2">为了您的账户安全，请先进行实名验证</p>
          <div class="f-16 pur-btn con-btn" @click="$router.push('/real2')">前往验证</div>
          <img class="deselect" @click="cloneShow" src="../../../static/images/RedPack/deselect@2x.png" />
        </div>
      </div>
    </van-overlay>
  </div>

</template>
<script>
export default {
  name: 'Denefit',
  data() {
    return {
      fits_text: '',
      wintShow: false
    }
  },
  methods: {
    //领取红包
    getNow() {
      this.$http.post('/newbie-miner/receive').then(res => {
        console.log(res)
        if (res.data.status === 200) {
          this.fits_text = res.data.msg
          this.$toast(res.data.msg)
        } else if (res.data.status === 406) {
          this.wintShow = true
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    cloneShow() {
      this.wintShow = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../static/css/real.less';
.benefits_img {
  width: 17.92rem;
  height: 11.2rem;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.benefits_text {
  width: 17.866667rem;
  height: 8.64rem;
  margin: 1.813333rem auto 0;
  background-color: #171818;

  p:first-child {
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    height: 2.133333rem;
  }
  p {
    color: #e4e4e4;
    font-size: 0.746667rem;
    width: 16.266667rem;
    height: 3.2rem;
    margin: auto;
    padding-top: 0.8rem;
  }
}
.pur-btn {
  width: 16.266667rem;
  text-align: center;
  height: 2.133333rem;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 0.32rem;
  margin: auto;
  line-height: 2.133333rem;
  color: white;
  margin-top: 1.546667rem;
}
.wrapper {
  position: relative;
  height: 100%;
  .container {
    background-color: #fff;
    border-radius: 0.853rem;
    width: 16.533rem;
    height: 12.333rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: #333333;
    padding: 1.227rem;
    .deselect {
      position: absolute;
      bottom: -2.667rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.707rem;
      height: 1.707rem;
      display: block;
    }
    .containe_title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-top: 1.6rem;
    }
    .containe_title2 {
      text-align: center;
      font-size: 15px;
      margin-top: 1.066667rem;
    }
    .con-btn {
      width: 6.4rem;
      height: 1.866667rem;
      border-radius: 1.6rem;
      line-height: 1.866667rem;
    }
  }
}
</style>