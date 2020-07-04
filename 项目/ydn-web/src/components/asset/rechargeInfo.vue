// 充提记录
<template>
  <div id="rechargeInfo">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title"
           style="color:#fff;">充提记录</div>
      <!-- <img slot="right"
           class="history"
           :src="
          filter
            ? `../../../static/images/recharge/filtrate-on@2x.png`
            : `../../../static/images/recharge/filter@2x.png`
        "
           @click="onCancel" /> -->
    </Header>
    <!--  -->
    <div class="main">
      <Tabs :Names="names"
            :List="list"
            :Arr="arr"
            @update="getInfo" />

    </div>

    <!-- <van-action-sheet v-model="show"
                      :actions="actions"
                      cancel-text="取消"
                      @click-overlay="onCancel"
                      @cancel="Cancel"
                      @select="onSelect" /> -->
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet } from "vant";
import Tabs from "../../components/Tabs";
import PullToLoad from '../../tool/pulltoload.js'
Vue.use(ActionSheet);
export default {
  name: "rechargeInfo",
  components: {
    Tabs,
  },
  data () {
    return {
      names: {
        title1: "充值记录",
        title2: "提现记录",
      },
      title: 0,
      list: [],
      arr: [],
      genduo: true,
      name: "全部",
      rechargePage: 0,
      withdrawPage: 0,
      filter: false,
      show: false,
      actions: [
        { name: "全部", id: 1 },
        { name: "成功", id: 2 },
        { name: "处理中", id: 3 },
        { name: "已撤回", id: 4 },
        { name: "提币失败", id: 5 },
      ],
    };
  },
  methods: {
    async walletLog () {
      let rechargePage = ++this.rechargePage;
      let withdrawPage = ++this.withdrawPage;
      await this.$http
        .get(`/wallet/log`, {
          params: {
            page: rechargePage,
            type: "recharge",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            let data = res.data.data.data;
            this.list = [...this.list, ...data];
          }
        });
      await this.$http
        .get(`/wallet/log`, {
          params: {
            page: withdrawPage,
            type: 'withdraw'
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            let data = res.data.data.data
            this.arr = [...this.arr, ...data]
          }
        });
    },
    onCancel () {
      this.filter = !this.filter;
      this.show = !this.show;
    },
    getInfo (value) {
      this.title = value;
    },
    Cancel () {
      this.filter = !this.filter;
    },
    onSelect (action, index) {
      this.filter = this.show = false;
      this.name = action.name;
      // 筛选
      this.fileter(action.id);
    },
    fileter (id) {
      // 筛选出来------------------------
      console.log(id)
      //wallet/status-option
      this.$http.get('wallet/status-option')
    },
  },
  mounted () {
    this.walletLog();
    let self = this;
    this.$nextTick(() => {
      this.pull = new PullToLoad('#rechargeInfo', {
        // 当滑动到距离底部还有 100px 的时候就触发加载事件
        threshold: 5000,
        // 指定 loading 的 selector
        // loader: '#loader'
      })
      this.pull.on("load", function (reset) {
        self.walletLog()
      })
    })

  },
  beforeDestroy () {
    this.pull.off('load');
  },
};
</script>

<style lang="less" scoped>
.history {
  width: 1.28rem;
  height: 1.227rem;
  display: block;
}

#rechargeInfo {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .main {
    background: rgba(23, 24, 24, 1);
    box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
    border-radius: 0.32rem;
    width: 17.867rem;
    margin: 0 auto;
  }
  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
  /deep/ .van-action-sheet__gap {
    background-color: #000000;
  }
  /deep/ .van-action-sheet__item {
    margin: 0 1.013rem;
    border-top: 1px solid #333;

    &:nth-child(1) {
      border-top: none;
    }
  }
}

.van-popup {
  background-color: rgba(23, 24, 24, 1) !important;
}
.van-action-sheet__item {
  background-color: rgba(23, 24, 24, 1) !important;
  color: #fff;
  font-size: 0.64rem;
  width: 90%;
}

.van-action-sheet__cancel {
  background-color: rgba(23, 24, 24, 1) !important;
  color: #fff;
  font-size: 0.64rem;
}

.van-action-sheet__cancel::before {
  background-color: #040606;
  font-size: 0.64rem;
}
</style>
