<template>
  <!-- 购买矿机 -->
  <div class="renews">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">购买矿机</div>
    </Header>

    <div class='purchase_img'>
      <img :src="miner.image.url" alt="">
    </div>

    <div class="renews_title renews_con">
      <div>
        <p>矿机模型</p>
        <p>{{miner.name}}</p>
      </div>
      <div>
        <p>产能</p>
        <p>{{miner.capacity}} 天</p>
      </div>
      <div>
        <p>日产出</p>
        <p>{{miner.nissan}} {{miner.symbol}}</p>
      </div>
      <div>
        <p>购买日期</p>
        <p>{{miner.buy_at}}</p>
      </div>
      <div>
        <p>到期日期</p>
        <p>{{miner.expired_at}}</p>
      </div>
      <div>
        <p>需支付</p>
        <p class="need">{{miner.price}} {{miner.symbol}}</p>
      </div>
      <div>
        <p>资金密码</p>
        <input class="input-con" v-model="purchasePwd" placeholder="请输入交易密码" type="password" />
      </div>
    </div>
    <div class="f-16 pur-btn" @click="confirm">确定购买</div>
  </div>
</template>
<script>
export default {
  name: 'Purchase',
  data() {
    return {
      miner: {},
      asset: {},
      purchasePwd: '' //购买密码
    }
  },
  methods: {
    setBuy() {
      this.$http.get(`/miner/${this.$route.params.id}/buy`).then(response => {
        const { miner, asset } = response.data
        this.miner = miner
        this.asset = asset
      })
    },
    //确定购买
    confirm() {
      if (!this.purchasePwd) {
        this.$toast('请输入交易密码')
        return
      } else {
        let params = {
          paypassword: this.purchasePwd
        }
        this.$http
          .post(`/miner/${this.$route.params.id}/buy`, params)
          .then(response => {
            if (response.data.status === 200) {
              this.$toast('购买成功')
              this.$router.push('/miner/list')
              this.purchasePwd = ''
            } else {
              this.$toast({
                message: response.data.msg,
                position: 'bottom'
              })
            }
          })
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.setBuy()
    })
  }
}
</script>
<style lang="less" scoped>
.renews{
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.067rem;
}
.purchase_img {
  width: 17.866667rem;
  height: 9.386667rem;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}

.renews_title {
  width: 17.866667rem;
  height: 18.986667rem;
  margin: auto;
  background: rgba(23, 24, 24, 1);
  border-radius: 6px;
  box-shadow: 0px 2px 4px 0px #333333;
  padding: 0 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    display: flex;
    justify-content: space-between;
    font-size: 0.746667rem;
    color: #e4e4e4;
    border-bottom: 1px solid #333333;
    padding-bottom: 0.746667rem;
    .input-con {
      width: 11.733333rem;
      background-color: transparent;
      border: 0;
    }
  }
  div:last-child{
    border: 0;
  }
}
.pur-btn {
  width: 305px;
  text-align: center;
  height: 2.133333rem;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 6px;
  margin: auto;
  line-height: 2.133333rem;
  color: white;
  margin-top: 1.546667rem;
}
.need{
  color: #0BE2B6;
  font-size: .746667rem;
}
</style>