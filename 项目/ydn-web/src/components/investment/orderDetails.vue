<template>
  <div class="bgb">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">释放明细</div>
    </Header>
    <div class="order_top">
      <div class="order_title">
        <div class="order_profit">
          <p>预计总收益(YDN)</p>
          <p>{{ order.quantity }}</p>
        </div>
        <div class="order_log">
          <img src="../../../static/images/miner/order_log.png" alt="">
        </div>
      </div>

      <!-- 头部详情 -->
      <div class="order_details">
        <div class="od_code">
          <p>预计收益利息(YDN)</p>
          <p>{{ order.profit }}</p>
        </div>
        <div class="od_code">
          <p>利率</p>
          <p>{{ order.rate }}%</p>
        </div>
        <div class="od_code">
          <p>到期时间</p>
          <p>{{ format(order.finishtime) }}</p>
        </div>
      </div>
    </div>

    <!-- 详情内容 -->
    <div class="order_con">
      <div class="oc_title">
        <p>释放本金</p>
        <p>本期收益</p>
        <p>日期</p>
      </div>
      <div v-if="orderItem.length">
        <div class="oc_con" >
          <div class="oc_con_item" v-for="(item,index) in orderItem" :key="index">
            <p>{{item.quantity}}</p>
            <p>{{item.profit}}</p>
            <p>{{format(item.createtime)}}</p>
          </div>
        </div>
        <div class="oc_summary">
          <p>累计释放本金：{{ordercon.quantity}}</p>
          <p>累计收益：{{ordercon.profit}}</p>
        </div>
      </div>

      <div v-else>
        <BlankPage>
          <img class="undraw_img" slot="img" src="../../../static/images/miner/order_bj.png" alt="" />
          <p class="slot_text" slot="text">暂无记录</p>
        </BlankPage>
      </div>

    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar'
import BlankPage from '../../components/BlankPage'
export default {
  name: 'orderDetails',
  components: {
    topBar,
    BlankPage
  },
  data() {
    return {
      title: '订单详情',
      order: {},
      orderItem:[],
      ordercon :{}
    }
  },
  methods: {
    format(timestamp) {
      var time = new Date(timestamp * 1000)
      var y = time.getFullYear()
      var M = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var m = time.getMinutes()
      var s = time.getSeconds()
      if (M < 10) {
        M = '0' + M
      }
      if (d < 10) {
        d = '0' + d
      }
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return y + '-' + M + '-' + d
    },
    getDetails() {
      this.$http
        .get(`/invest/order_detail?order_id=${this.$route.query.id}`)
        .then(res => {
          console.log(res)

          if (res.data.status == 200) {
            // order 订单详情
            this.order = res.data.data.order
            this.orderItem = res.data.data.profit_log.data
            this.ordercon = res.data.data.profit_total
            // profit_log 明细
          }
        })
    }
  },
  created() {
    this.getDetails()
  }
}
</script>
<style lang="less" scoped>
.bgb {
  .order_top {
    width: 335px;
    margin: auto;
    .order_title {
      display: flex;
      justify-content: space-around;
      .order_profit {
        text-align: center;
        p:first-child {
          color: #999999;
          font-size: 14px;
          margin-top: 0.8rem;
        }
        p:last-child {
          margin-top: 0.746667rem;
          color: #0be2b6;
          font-size: 25px;
          font-weight: bold;
        }
      }
      .order_log {
        width: 119px;
        height: 95px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .order_details {
      margin-top: 0.426667rem;
      display: flex;
      justify-content: space-between;
      .od_code {
        text-align: center;
        p:first-child {
          color: #999999;
          font-size: 12px;
        }
        p:last-child {
          font-size: 14px;
          color: #e4e4e4;
        }
      }
    }
  }
  .order_con {
    width: 17.866667rem;
    height: 21.76rem;
    background: rgba(23, 24, 24, 1);
    border-radius: 6px;
    margin: 1.066667rem auto 0;
    .oc_title {
      display: flex;
      justify-content: space-between;
      width: 16.266667rem;
      height: 2.666667rem;
      line-height: 2.666667rem;
      border-bottom: 1px solid #333333;
      margin: auto;
      p {
        color: #e4e4e4;
        font-size: 0.746667rem;
      }
      p:first-child {
        margin-left: 0.266667rem;
      }
      p:last-child {
        margin-right: 20px;
      }
    }
    .oc_con {
      height: 16rem;
      width: 16.266667rem;
      margin: auto;
      border-bottom: 1px solid #333333;
      overflow-y: scroll;
      .oc_con_item {
        display: flex;
        justify-content: space-between;
        margin-top: 0.746667rem;
        p {
          font-size: 12px;
          color: #cccccc;
        }
      }
    }
    .oc_summary {
      display: flex;
      justify-content: space-around;
      margin-top: 0.746667rem;
      p {
        color: #e4e4e4;
        font-size: 14px;
      }
    }
  }
}

.slot_text {
  font-size: 20px;
  color: #666666;
  text-align: center;
  margin-top: 15px;
}
.undraw_img {
  // margin-top: 4.8rem;
  display: block;
  margin: 2.773333rem auto 0;
  width: 4.746667rem;
  height: 4.266667rem;
}
</style>
