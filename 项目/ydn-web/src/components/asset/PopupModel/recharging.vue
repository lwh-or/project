<template>
  <!-- 体现记录 -->
  <div id="recharging">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">充提记录</div>
    </Header>
    <van-tabs
      swipeable
      background="#000"
      color="#29ACAD"
      title-inactive-color="#fff"
      title-active-color="#fff"
      @click="tabs"
    >
      <van-tab title="充值记录">
        <div
          v-show="rechargeList.length > 0"
          class="main"
          v-for="item in rechargeList"
          :key="item.id"
        >
          <!-- 记录 -->
          <div class="main_text">
            <p>
              {{ item.coin }}<span>+{{ item.quantity }}</span>
            </p>
            <p>{{ item.createtime | formatData }}</p>
          </div>
          <!-- 成功的详情 -->
          <!-- <div class="main_sessecc" @click="$router.push(`transactionBox/${item.behavior_id}`)"> -->
          <div class="main_sessecc" @click="goDetails(item)">
            <p>
              {{
                item.status === 0
                  ? "审核中"
                  : item.status === 1
                  ? "成功"
                  : "失败"
              }}
            </p>
            <img
              src=" ../../../../static/images/miner/right-icon@2x.png"
              alt=""
            />
          </div>
        </div>
        <div v-show="rechargeList.length === 0" class="jilu">
          <img src="../../../../static/images/miner/no-record.png" alt="" />
          <p>暂无记录</p>
        </div>
      </van-tab>
      <van-tab title="提现记录">
        <div
          v-show="withdrawList.length > 0"
          class="main"
          v-for="item in withdrawList"
          :key="item.id"
        >
          <!-- 记录 -->
          <div class="main_text">
            <p>
              {{ item.coin }}<span>{{ item.quantity }}</span>
            </p>
            <p>{{ item.createtime | formatData }}</p>
          </div>
          <!-- 成功的详情 -->
          <div
            class="main_sessecc"
            @click="$router.push(`transactionBox/${item.behavior_id}`)"
          >
            <!-- <p>成功</p> -->
            <p>
              {{
                item.status === 0
                  ? "审核中"
                  : item.status === 1
                  ? "成功"
                  : "失败"
              }}
            </p>
            <img
              src="../../../../static/images/miner/right-icon@2x.png"
              alt=""
            />
          </div>
        </div>
        <div v-show="withdrawList.length === 0" class="jilu">
          <img src="../../../../static/images/miner/no-record.png" alt="" />
          <p>暂无记录</p>
        </div>
      </van-tab>
    </van-tabs>
    <div
      style="color:#999999; text-align: center;margin:1.6rem 0;font-size:.747rem;"
    >
      没有更多了
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    withdrawList: [], //提现记录
    rechargeList: [], //充值记录
    sta: 2,
  }),
  mounted() {
    //{{ item.createtime | formatData }}
    let data = {
      type: "recharge",
    };
    // this.$http.get(`wallet/log?type=recharge`, data).then((res) => {});
  },
  methods: {
    //重提记录、
    setWalletLog(type, num) {
      console.log(type);
      this.$http.get(`wallet/log?type=${type}`).then((res) => {
        if (num === 0) {
          this.rechargeList = res.data.data.data;
        } else if (num === 1) {
          this.withdrawList = res.data.data.data;
        }
      });
    },
    tabs(num) {
      //挖矿中
      if (num === 0) {
        const type = "recharge";
        this.setWalletLog(type, num);
      } else if (num === 1) {
        const type = "withdraw";
        this.setWalletLog(type, num);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    goDetails(item) {
      var arr = JSON.stringify(item);
      this.$router.push("/details/" + encodeURIComponent(arr));
    },
    onLoad(data) {
      this.$http
        .get("/miner-orders", {
          params: this.pagination,
        })
        .then((response) => {
          this.loading = false;

          if (response.data.data.length) {
            response.data.data.map((item) => {
              this.list.push(item);
            });

            this.pagination.page++;
          } else {
            this.finished = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
  },
  created() {
    //进来加载默认数据
    this.setWalletLog("recharge", 0);
  },
};
</script>

<style scoped lang="less">
#recharging {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  // position: relative;
  /deep/ .van-hairline--top-bottom:after{
    border-width: 0;
  }
  /deep/ .van-tabs__wrap{
    border: 0;
  }
}
.van-tab__pane{
  overflow: hidden;
}
// .van-tabs{
//   position: absolute;
//   top: 30px;
//   left: 50%;
//   transform: translateX(-50%);
// }
.van-panel--list .van-panel__header .van-panel__header--subtitle {
  font-size: 12px;
}
.main {
  width: 335px;
  background: rgba(23, 24, 24, 1);
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 6px;
  padding-bottom: 1.066667rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 0.8rem;
  border-bottom: 1px solid #333333;
  position: relative;
  .main_text {
    height: 4.106667rem;
    width: 16.266667rem;
    padding-top: 0.906667rem;
    line-height: 1.6rem;
    margin: auto;
    p {
      clear: #ffffff;
      font-size: 0.853333rem;
      span {
        display: inline-block;
        margin-left: 2.133333rem;
      }
    }
    p:last-child {
      font-size: 12px;
      color: #e4e4e4;
    }
  }
  .main_sessecc {
    width: 3.733333rem;
    display: flex;
    justify-content: space-between;
    padding-top: 1.7rem;
    p {
      width: 3.2rem;
      display: inline-block;
    }
    img {
      width: 0.8rem;
      margin-top: 0.206667rem;
      height: 0.8rem;
    }
  }
}
.jilu {
  width: 100%;
  text-align: center;
  margin-top: 4.266667rem;
  img {
    width: 4.426667rem;
    height: 5.813333rem;
    margin: auto;
  }
  p {
    color: #666666;
    font-size: 1.066667rem;
    margin-top: 1.28rem;
  }
}
</style>
