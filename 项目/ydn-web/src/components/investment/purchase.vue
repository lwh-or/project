<template>
  <div class="bgb">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">购买</div>
    </Header>
    <div class="all">
      <div class="main">
        <div class="item f-16 flex_between">
          <div>购买数量({{ info.coin }})</div>
          <div>{{ info.investment_num }}</div>
        </div>
        <div class="item f-16 flex_between">
          <div>周期</div>
          <div>{{ info.month_num }}个月</div>
        </div>
        <div class="item f-16 flex_between">
          <div>利率</div>
          <div>{{ info.rate }}%</div>
        </div>
        <div class="item f-16 flex_between">
          <div>预计收益</div>
          <div>{{ info.profit }}</div>
        </div>
        <div class="item f-16 flex_between password">
          <div>资金密码</div>
          <div>
            <input class="input-con" type="password" placeholder="请输入资金密码" v-model="password" />
          </div>
        </div>
      </div>

      <div class="f-16 pur-btn" @click="purchase">购买</div>
      <div class="notice">
        <p class="f-16">
          <img class="tishi-img" src="../../../static/images/miner/tishi.png" alt="" />提示：
        </p>
        <p class="f-14">1、未满产品周期将不能赎回，请合理投资。</p>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar'
export default {
  name: 'purchase',
  components: {
    topBar
  },
  data() {
    return {
      title: '购买',
      info: {},
      password: '',
      isClick: true
    }
  },
  methods: {
    getInfo(id) {
      this.$http
        .get('/invest/one', {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.status == 200) {
            this.info = res.data.data
          }
        })
    },
    purchase() {
      if (this.isClick) {
        this.isClick = false
        if (!this.password) {
          return
        }
        this.$http
          .post('/invest/buy', {
            id: this.$route.query.id,
            pay_pwd: this.password
          })
          .then(res => {
            this.isClick = true
            if (res.data.status == 200) {
              this.$toast(res.data.msg)
              this.$router.replace('/order')
            }else{
              this.$toast(res.data.msg)
            }
          })
      } else {
        this.$toast('请不要重复提交')
      }
    }
  },
  mounted() {
    this.getInfo(this.$route.query.id)
  }
}
</script>

<style scoped>
.flex_between {
  color: #e4e4e4;
}
.all {
  padding: 0 0.8rem;
}
.main {
  margin-top: 0.8rem;
  padding: 0 0.8rem;
  /* border: 0.053333rem solid #dcdcdc; */
  border-radius: 0.32rem;
  background-color: #171818;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
}
.item {
  padding: 1.066667rem 0;
  border-bottom: 0.053333rem solid #333333;
}
.password {
  border: 0;
}
.password > div:last-child {
  width: 70%;
}
.password input {
  width: 100%;
  font-size: 0.853333rem;
  outline: none;
  background-color: #171818;
}
::-webkit-input-placeholder {
  color: #999;
  font-size: 0.746667rem;
}
.notice {
  margin-top: 1.6rem;
  line-height: 1.6rem;
  margin-left: 1.066667rem;
}
.notice p {
  font-size: 14px;
  color: #ffffff;
}
.notice p:last-child {
  font-size: 12px;
  color: #999999;
}
.pur-btn {
  width: 305px;
  text-align: center;
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 6px;
  margin: auto;
  line-height: 45px;
  color: white;
  margin-top: 2.666667rem;
}
.tishi-img {
  width: 1.066667rem;
  height: 1.066667rem;
  vertical-align: middle;
  margin-right: 8px;
}
.input-con {
  background-color: #000;
  border: 0;
}
</style>
