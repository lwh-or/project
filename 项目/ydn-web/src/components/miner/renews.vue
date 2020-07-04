<template>
  <!-- 矿机续约 -->
  <div class="renews">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">{{miner.name}}</div>
    </Header>

    <div class='renews_title'>
      <div>
        <p>剩余产能</p>
        <p>{{minerOrder.surplus_capacity}}天</p>
      </div>
      <div>
        <p>到期日期</p>
        <p>{{minerOrder.expired_at}}</p>
      </div>
    </div>

    <div class="renews_title renews_con">
      <div class="con_title">
        <p>续约情况</p>
      </div>
      <div>
        <p>剩余产能</p>
        <p>{{miner.capacity}}天</p>
      </div>
      <div>
        <p>续约到期日期</p>
        <p>{{miner.expired_at}}</p>
      </div>
      <div>
        <p>续约费用</p>
        <p>{{miner.price}} {{miner.symbol}}</p>
      </div>
      <div>
        <p>矿机资产可用</p>
        <p>{{asset.miner_quantity}} {{miner.symbol}} </p>
      </div>
    </div>
    <div class="f-16 pur-btn" @click="renewNow">立即续约</div>
    <van-overlay :show="showNow">
      <div class="wrapper">
        <div class="sess_case case">
          <div class="cass_title">
            <p>您当前的矿机资产账户不足，</p>
            <p>请前往充值</p>
          </div>
          <div class="cass_licai">当前矿机账户：{{asset.miner_quantity}} {{miner.symbol}} </div>
          <div class="sess_btn">
            <button class="sess_case sess_tran" @click="$router.push('/transfer')">
              前往划转
            </button>
            <button class="sess_case" @click="$router.push('/recharge')">
              前往充值
            </button>
          </div>
          <img @click="showNow = false" class="clome" src="../../../static/images/miner/clome@2x.png" alt="">
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  name: 'Renews',
  data() {
    return {
      asset: {},
      miner: {},
      showNow: false,
      minerOrder: {}
    }
  },
  methods: {
    //确定续约
    renewNow() {
      //判断资产是否充足
      console.log()

      if (Number(this.asset.miner_quantity) < Number(this.miner.price)) {
        console.log(222222)

        this.showNow = true
      } else {
        // this.showNow = true
        this.onLoad()
      }
    },
    //续约操作
    onLoad() {
      this.$http
        .post(`/miner-orders/${this.$route.params.id}/renew`)
        .then(res => {
          console.log(res);
          
          //预约成功
          if (res.status === 200) {
            this.$toast({
              message: res.data.msg,
              position: 'bottom'
            })
            //回到详情页
            this.$router.back()
          } else {
            this.$toast({
              message: res.data.msg,
              position: 'bottom'
            })
          }
        })
    },
    getMinerOrder() {
      this.$http
        .get(`/miner-orders/${this.$route.params.id}`)
        .then(response => {
          this.minerOrder = response.data
        })
    },
    //续约列表(详情)
    onOrders() {
      this.$http
        .get(`/miner-orders/${this.$route.params.id}/renew`)
        .then(res => {
          this.asset = res.data.asset
          this.miner = res.data.miner
        })
    }
  },
  mounted() {
    ///miner-orders/{id}/renews
  },
  created() {
    // this.onLoad()
    this.onOrders()
    this.getMinerOrder()
  }
}
</script>
<style lang="less" scoped>
@import '../../../static/css/real.less';
.wrapper .case {
  width: 16.533333rem;
}
.wrapper .sess_case {
  background: url('../../../static/images/miner/renews_bj.png') no-repeat;
  background-size: 100% 100%;
  p:first-of-type {
    margin-top: 0;
  }
  .cass_title {
    text-align: center;
    margin-top: 1.546667rem;
    p {
      font-size: 18px;
      color: rgba(0, 0, 0, 1);
    }
  }
  .cass_licai {
    margin-top: 7.36rem;
    color: #999999;
    font-size: 0.746667rem;
    font-weight: 400;
  }
  .sess_btn {
    .sess_case {
      width: 100px;
      height: 1.706667rem;
      margin-left: .533333rem;
    }
    .sess_tran {
      background: rgba(203, 255, 244, 1);
      color: #0be2b6;
      margin-right: .533333rem;
    }
  }
}
.renews_title {
  width: 17.866667rem;
  height: 4.8rem;
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
  }
}
.renews_con {
  height: 11.68rem;
  margin-top: 0.746667rem;
  .con_title {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #333333;
    p {
      color: #fff;
      font-size: 0.853333rem;
    }
  }
}
.pur-btn {
  width: 6.613333rem;
  text-align: center;
  height: 2.133333rem;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 1.28rem;
  margin: auto;
  line-height: 2.133333rem;
  color: white;
  margin-top: 1.546667rem;
}
</style>