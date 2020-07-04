<template>
  <div id="recharge">

    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">YDN充值</div>
      <img
        slot="right"
        class="history"
        src="../../../static/images/recharge/hisory@2x.png"
        @click="$router.push('/rechargeInfo')"
      />
    </Header>
    <div class="main">
      <!-- <h3 class="r_title">
        <img src="../../../static/images/recharge/ETH@2x.png" />
        <span>ETH<span style="font-size:.853rem;">(Ether)</span></span>
      </h3> -->
      <div class="r_rqcode" v-if="qrcodeurl">
        <qrcode-vue :value="qrcodeurl" :size="size" level="H"></qrcode-vue>
      </div>
      <p class="r_href">
        {{ qrcodeurl ? qrcodeurl : "生成地址失败" }}
      </p>
      <van-button
        class="button"
        color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)"
        block
        @click="copy"
        ref="link"
        :data-clipboard-text="qrcodeurl"
        >复制地址</van-button
      >
      <div class="r_info">
        <div class="r_warning">
          <img src="../../../static/images/recharge/warning@2x.png" />
          <span>安全事项：</span>
        </div>
        <p class="r_text">·最小充值金额：{{withdrawItem.out_min}} YDN</p>
        <p class="r_text">·少于最小充值金额无法入账且无法追回</p>
        <p class="r_text">
          ·充值后资产先到总资产账户，其他操作需要划转至对应账户
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import clipboard from "clipboard";
import topBar from "../common/topBar";
import animate from "animate.css";
import coinList from "../common/coinList";
export default {
  name: "recharge",
  components: {
    topBar,
    coinList,
    QrcodeVue,
  },
  data() {
    return {
      title: "充值",
      qrcodeurl: "",
      size: 168,
      show: false,
      coin: "ydn",
      withdrawItem:{}
    };
  },
  methods: {
    qrcodesize() {
      var qrcodeSize = "";
      //得到手机屏幕的宽度
      var htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth; // 375
      //设置二维码大小
      qrcodeSize = Math.ceil((htmlWidth / 20) * 10.7);
      this.size = qrcodeSize;
    },
    copy() {
      this.btn = new clipboard(this.$refs.link);
      this.btn.on("success", (e) => {
        this.$toast("复制成功！");
      });
    },
    closeList(val) {
      if (val) {
        this.show = false;
      }
    },
    receive(val) {
      this.coin = val.symbol;
      this.getUrl();
      this.show = false;
    },
    getUrl() {
      this.$http.get(`/user/recharge/address?coin=${this.coin}`).then((res) => {
        if (res.data.status === 200) {
          this.qrcodeurl = res.data.data.address;
        }
      });
    },
     getFee() {
      this.$http.get('user/coins').then(res => {
        if (res.data.status == 200) {
          this.withdrawItem = res.data.data[0]
        }
      })
    }
  },
  mounted() {
    this.copy();
    this.getFee();
  },
  created() {
    this.qrcodesize();
    this.getUrl();
  },
};
</script>

<style lang="less" scoped>

#recharge {
  .main {
    width: 16.267rem;
    margin: 0 auto;
    .r_title {
      margin-top: 1.173rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.96rem;
      color: #e4e4e4;
      img {
        width: 1.013rem;
        height: 1.76rem;
        display: block;
        margin-right: 0.533rem;
      }
    }
    .r_rqcode {
      width: 9.387rem;
      height: 9.387rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.8rem;
    }
    .r_href {
      text-align: center;
      font-size: 0.64rem;
      color: #fff;
      width: 10.933rem;
      height: 1.813rem;
      margin: 0 auto;
      margin-top: 1.6rem;
    }
    .button {
      width: 100%;
      height: 2.133rem;
      border-radius: 0.32rem;
      font-size: 0.853rem;
      margin-top: 1.387rem;
      color: #ffffff;
    }
    .r_info {
      margin-top: 1.6rem;
      font-size: 0.64rem;
      color: #999999;
      .r_warning {
        display: flex;
        align-items: center;
        font-size: 0.747rem;
        color: #e4e4e4;
        font-weight: 400;
        img {
          margin-right: 0.427rem;
          width: 1.067rem;
          height: 1.067rem;
          display: block;
        }
      }
      .r_text {
        line-height: 1.5;
        &:nth-of-type(1) {
          margin-top: 0.533rem;
        }
      }
    }
  }
}
</style>
