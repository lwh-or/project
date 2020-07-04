<template>
  <div class="bgb">
    <!-- <h1 class="title">YDN星球</h1> -->
      <Header>
        <div slot="title"
             style="color:#fff;">YDN星球</div>
      </Header>
    <!-- 轮播模块 -->
    <van-swipe class="my-swipe"
               indicator-color="#fff"
               style="width:355px; height:246px; margin:0 auto;"
               autoplay="4000"
               :stop-propagation="false">
      <!-- @click="goTowindow(item.url)" 点击跳转外链 -->
      <van-swipe-item v-for="(item, index) of swipeList"
                      :key="index"><img class="advert_img"
             style="width:100%;height:100%; display:block"
             :src="item.image" /></van-swipe-item>
    </van-swipe>

    <!-- 详情模块 -->
    <div class="advert">
      <div class="info flex_center f-14">
        <div class="info_box">
          <div class="horn">
            <img src="../../../static/images/home/ggo@2x.png" />
          </div>
          <van-swipe :autoplay="3000"
                     :show-indicators="false"
                     vertical>
            <van-swipe-item v-for="item of horn"
                            :key="item.id"
                            style="width:10.666666rem">{{ item.content }}</van-swipe-item>
          </van-swipe>
        </div>
        <!-- <van-button type="default" size="mini" to="/rules">详情</van-button> -->
        <!-- <van-button type="default" size="mini">详情</van-button> -->
      </div>
    </div>
    <!-- 资产模块 -->
    <div class="panel">
      <div class="panel_left">
        <h3 class="mine_pice">
          我的资产(YDN)<img class="eye"
               @click="isEYE = !isEYE"
               :src="
              isEYE
                ? `../../../static/images/home/icon-show2@2x.png`
                : `../../../static/images/home/icon-hide@2x.png`
            " />
        </h3>
        <h2 class="dyn_pice">{{ isEYE ? conversion_total : "*********" }}</h2>
      </div>
      <div class="panel_right">
        <van-button class="panel_btn"
                    type="default"
                    size="mini"
                    to="/asset">管理资产
        </van-button>
      </div>
    </div>
    <!-- 活动板块 -->
    <van-panel class="bene_panel">
      <div class="header"
           slot="header"
           v-if="status">
        <div class="header_left">
          <img class="icon_user"
               src="/static/images/home/icon-user4@2x.png" />
          <div class="header_title">
            <h3 class="be_title">新用户福利</h3>
            <p class="be_info">新注册用户体验矿机收益</p>
          </div>
        </div>
        <div class="header_right">
          <van-button class="panel_btn"
                      type="default"
                      size="mini"
                      @click="receive">{{ claim.button_name }}</van-button>
        </div>
      </div>

      <van-divider v-if="status"
                   :style="{
          borderColor: '#333333',
          paddingLeft: '16px',
          margin: '0.26666rem 0',
        }" />
      <div class="content header">
        <div class="header_left">
          <img class="icon_user"
               src="/static/images/home/icon-packet@2x.png" />
          <div class="header_title">
            <h3 class="be_title">红包雨进行中</h3>
            <p class="be_info">新注册用户免费体验矿机收益</p>
            <p class="be_time">
              {{ time_type }} &nbsp;
              <span>{{ start_time[0] }}</span>
              <span>{{ start_time[1] }}</span>:
              <span>{{ start_time[3] }}</span>
              <span>{{ start_time[4] }}</span>:
              <span>{{ start_time[6] }}</span>
              <span>{{ start_time[7] }}</span>
            </p>
          </div>
        </div>
        <div class="header_right">
          <van-button class="panel_btn"
                      type="default"
                      size="mini"
                      to="/rpacket">立即去抢</van-button>
        </div>
      </div>
    </van-panel>

    <div class="grid">
      <ul class="list_g">
        <li class="item_g"
            @click="$router.push('/investment')">
          <img src="/static/images/home/money@2x.png" />
          <div class="text">
            <h4>理财功能</h4>
            <p class="desc">低风险高收益</p>
          </div>
        </li>
        <li class="item_g"
            @click="$router.push('/miner')">
          <img src="/static/images/home/mine@2x.png" />
          <div class="text">
            <h4>我的矿场</h4>
            <p class="desc">小投资大回报</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Panel, Divider, Grid, GridItem } from "vant";
Vue.use(Panel);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "home",
  data () {
    return {
      swipeList: [],
      time: 30 * 60 * 60 * 1000,
      propsTime: null,
      isEYE: true,
      horn: [],
      conversion_total: null, // 折合
      investment: [],
      red_package: [],
      status: null,
      eventdetails: {}, // 活动详情
      text: "开始倒计时",
      is_login: false, // 用来判断用户有没有登录
      award_list: [],
      surplus: "0",
      recharge_total: "0",
      award_total: "0",
      invite_total: "0",
      id: "",
      start_time: "",
      end_time: "",
      rules: "",
      rob: false,
      show: false,
      error_tips: "",
      success_tips: "",
      notice: false,
      success: false,
      failed: false,
      is_click: true,
      title: "",
      date: "",
      content: "",
      invitation_code: "",
      special: false,
      special_prize: "",
      claim: {}, //新手福利领取
      claim_name: "",
      time_type: "",
    };
  },
  methods: {
    timeChange (timeData) {
      let hours = 0;
      let h = timeData.hours;
      if (timeData.days) {
        hours = 24 * timeData.days;
      }

      hours = h + hours + ":" + timeData.minutes + ":" + timeData.seconds;

      this.propsTime = hours;
    },
    goTowindow (obj) {
      // 跳转外链
      if (obj) {
        this.$router.push("/announcement");
      }
    },
    getUserInfo () {
      this.$http.get("/user/info").then((res) => {
        console.log(res);

        const {
          data: { data },
          status,
        } = res;
        if (status == 200) {
          this.$store.commit("SAVEUSERINFO", data);
          this.invitation_code = data.invite_code;
        }
      });
    },
    carouselList () {
      this.$http
        .get("/carousel/list")
        .then((res) => {
          const {
            data: { data },
            status,
          } = res;
          if (status === 200) {
            this.swipeList = data;
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    hornList () {
      this.$http
        .get("/horn/list")
        .then((res) => {
          const {
            data: { data },
            status,
          } = res;
          if (status === 200) {
            this.horn = data;
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    userAsset () {
      this.$http
        .get("/user/asset")
        .then((res) => {
          const {
            data: {
              data: { conversion_total, investment, red_package },
            },
            status,
          } = res;
          if (status === 200) {
            this.conversion_total = conversion_total;
            this.$store.commit("CONVERSION_TOTAL", conversion_total);
            this.investment = investment;
            this.red_package = red_package;
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    // 新用户福利
    welfareSwitch () {
      this.$http
        .get("/welfareSwitch")
        .then((res) => {
          const { data, status } = res;
          if (status === 200) {
            this.status = data.data.status;
          }
        })
        .catch((err) => {
          this.$toast(err);
        });
    },
    updatePage () {
      this.getSurplus();
      this.getTotalAward();
    },
    getSurplus () {
      this.$http.get(`candy/surplus?id=${this.id}`).then((res) => {
        if (res.data.status == 200) {
          this.surplus = res.data.data.surplus;
        }
      });
    },
    getTotalAward () {
      this.$http.get("user/candy/total").then((res) => {
        if (res.data.status == 200) {
          this.award_total = res.data.data.total;
        }
      });
    },
    getTotalInvite () {
      this.$http.get("user/invite/total").then((res) => {
        if (res.data.status == 200) {
          this.invite_total = res.data.data.total;
        }
      });
    },
    getActive () {
      this.$http.get("/candy/current").then((res) => {
        if (res.data.status === 200) {
          var data = res.data.data;
          // 将当前时间转化为毫秒数 / 1000 转为 秒
          var current = new this.$BN(Date.parse(new Date())).dividedBy(1000);
          // 起始时间
          var start = new this.$BN(data.start_time);
          // 结束时间
          var end = new this.$BN(data.end_time);
          // 判断开始时间是否大于当前时间
          if (start.comparedTo(current) === 1) {
            var surplus = start.minus(current);
            this.countDown(surplus.toString());
            this.time_type = "开抢时间";
          } else {
            if (end.comparedTo(current) === 1) {
              this.time_type = "开奖时间";
              var surplus = end.minus(current);
              this.countDown(surplus.toString());
            }
            this.time_type = "开抢时间";
          }
        }
      });
    },
    // 将毫秒转为 小时 ， 分钟，秒
    countDown (time) {
      var a = time;
      var h = Math.floor(a / 3600);
      a = time - h * 3600;
      var m = Math.floor(a / 60);
      var s = time % 60;
      this.countDownTime(h, m, s);
    },
    countDownTime (h, m, s) {
      var hour = h;
      var minute = m;
      var second = s;
      // 补零操作
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }

      this.start_time = h + ":" + m + ":" + s;
      second = s - 1;
      if (second < 0) {
        if (minute == 0 && hour == 0) {
          this.getActive();
          return;
        }
        second = "59";
        minute--;
      }
      if (minute < 0) {
        minute = "59";
        hour--;
      }
      if (hour < 0) {
        hour = "0";
      }
      const timer = setTimeout(() => {
        this.countDownTime(hour, minute, second);
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    },
    //获取新手福利接口信息
    getClaim () {
      this.$http.get("/newbie-miner").then((res) => {
        console.log(res);

        if (res.data.status === 200) {
          this.claim = res.data.data;
        }
      });
    },
    //点击新手红包领取
    receive () {
      if (this.claim.user_newbie_status === 1) {
        this.$router.push("/benefits");
      } else {
        this.$toast(this.claim.button_name);
      }
    },
  },
  created () {
    // 用户已经登录了
    // if (localStorage.getItem("_token_ydn")) {
    //   this.is_login = true;
    // } else {
    //   this.is_login = false;
    // }
    //新手福利
    this.getClaim();
  },
  mounted () {
    this.getUserInfo(); // 获取用户信息
    this.carouselList(); // 获取轮播
    this.hornList(); // 获取喇叭列表
    // coin ---> 币种

    this.userAsset(); // 用户资产
    this.welfareSwitch(); // 新用户福利
    // id ---> 详情id

    this.getActive();
  },
  beforeDestroy () {
    clearTimeout(this.timer);
    clearInterval(this.time);
  },
};
</script>

<style scoped>
@import "../../../static/css/pop";
.van-count-down {
  color: #29acad;
  font-size: 0.64rem;
  margin-left: 0.267rem;
}

.panel_btn {
  margin-right: 0.8rem;
}

.van-swipe /deep/ .van-swipe__indicators {
  bottom: 3.2rem;
}

.van-swipe /deep/ .van-swipe-item {
  width: 18.933rem;
  height: 13.12rem;
}

.grid {
  width: 17.867rem;
  margin: 0 auto;
  margin-top: 0.693rem;
}

.grid .list_g {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.list_g .item_g:nth-child(odd) {
  margin-right: 0.533rem;
}

.list_g .item_g {
  width: 8.64rem;
  height: 7.04rem;
  position: relative;
}

.list_g .item_g .text {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-left: 0.747rem;
  margin-bottom: 0.8rem;
}

.item_g .text > h4 {
  font-size: 0.747rem;
  color: #e4e4e4;
}

.item_g .text .desc {
  font-size: 0.533rem;
  color: #999999;
}

.list_g .item_g img {
  width: 100%;
  height: 100%;
  display: block;
}

.content .be_time {
  display: flex;
  align-items: center;
  color: #29acad;
  font-size: 0.64rem;
  height: 0.907rem;
  line-height: 0.907rem;
}

.van-divider {
  margin: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header_left {
  display: flex;
  align-items: center;
}

.bene_panel .icon_user {
  display: block;
  width: 1.227rem;
  height: 1.28rem;
  margin: 1.12rem 0.853rem;
}

.bene_panel .be_title {
  font-size: 0.747rem;
  color: #fff;
}

.bene_panel {
  font-size: 0.64rem;
  color: #999999;
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}

.van-cell {
  background-color: transparent;
}
.bene_panel {
  width: 17.867rem;
  height: 8.373rem;
  margin: 0 auto;
  background-color: #171818;
}

.panel {
  width: 17.867rem;
  height: 4.587rem;
  display: flex;
  justify-items: end;
  border: 1px solid rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  margin: 0 auto;
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  padding-left: 0.8rem;
  margin-bottom: 0.907rem;
}

.panel_left {
  flex: 1;
}

.panel_left .mine_pice {
  color: #ffffff;
  font-size: 0.853rem;
  height: 1.173rem;
  line-height: 1.173rem;
  font-weight: 400;
  width: 8rem;
  margin-bottom: 0.16rem;
}

.mine_pice .eye {
  width: 0.853rem;
  height: 0.533rem;
  display: inline-block;
  margin-left: 0.48rem;
}

.panel_left .dyn_pice {
  color: #0be2b6;
  font-size: 1.387rem;
  height: 1.6rem;
  line-height: 1.6rem;
  letter-spacing: -2px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel_right {
  width: 5.333rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 1.013rem;
}

.panel_right .panel_btn,
.header_right .panel_btn {
  width: 4.267rem;
  height: 1.6rem;
  border: 1px solid rgba(228, 228, 228, 1);
  border-radius: 0.427rem;
  line-height: 1.6rem;
  text-align: center;
}
.title {
  color: #fdfdfd;
  font-size: 1.173rem;
  text-align: center;
  margin-bottom: 0.267rem;
}

.advert {
  margin: 0 auto;
  /* padding: 0 1.813rem 0 1.973rem; */
  position: relative;
}

.advert /deep/ .flex_center{
  position: absolute;
  bottom: -21px;
  width: 100%;
  color: white;
  height: 20px;
  margin-bottom: 1.066667rem;
  background-color: rgba(0,0,0,.3);
  padding-left: 1.333333rem;
}

.my-swipe {
  width: 18.933rem;
}

.info_box {
  display: flex;
  align-items: center;
}

/* 1111 */
.info_box /deep/ .van-swipe-item {
  width: 10.667rem;
}
.van-button--mini {
  background: transparent;
  width: 2.56rem;
  height: 1.173rem;
  border-radius: 0.213rem;
  border: 1px solid rgba(151, 151, 151, 1);
  color: #979797;
  font-size: 0.64rem;
  float: right;
  /* margin-right: 0.747rem; */
}

.advert img {
  width: 17.867rem;
  height: 13.12rem;
  display: block;
}

.bgb {
  width: 100%;
  height: 100%;
  padding-top: 0;
  padding-bottom: 3.733333rem;
}
.recommend {
  color: white;
  padding: 0.8rem;
}
.recommend span {
  padding: 0 0.426667rem;
  line-height: 0.96rem;
  border-radius: 0.48rem;
}
.info {
  margin-top: -2rem;
  color: #e0e0e0;
  font-size: 0.64rem;
  display: flex;
  justify-content: space-between;
}

.horn img {
  width: 1.013rem;
  height: 0.853rem;
  display: block;
}
.horn {
  z-index: 999;
  margin-right: 0.4rem;
}
.info >>> .van-swipe {
  width: 90%;
  height: 2.133333rem;
}
.info >>> .van-swipe__track {
  height: 2.133333rem !important;
}
.info >>> .van-swipe-item {
  width: 5.333rem;
  height: 2.133333rem;
  line-height: 2.133333rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wrap {
  width: 10.4rem;
  height: 10.4rem;
  margin: 0 auto;
  padding: 0.266667rem;
  border-radius: 50%;
  border: 1px solid #57b4fa;
}
.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: white;
  text-align: center;
  flex-direction: column;
  justify-content: space-around;
}
.rob {
  width: 3.2rem;
  height: 3.2rem;
  background: #b8b9d2;
  border-radius: 50%;
  color: #fff;
  line-height: 3.2rem;
}
.active {
  background: white;
  color: #0d6096;
}
.total {
  padding: 1.6rem 0.8rem;
  align-items: flex-start;
}
.total span {
  display: block;
  padding: 0 0.266667rem;
  line-height: 0.853333rem;
  border-radius: 0.426667rem;
  color: white;
}
.count {
  padding: 0 0.8rem;
}
.sum {
  width: 100%;
  height: 4.266667rem;
  background-image: url("../../../static/images/home/bg@2x.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: white;
}
.sum > div {
  width: 50%;
  text-align: center;
  line-height: 1.6rem;
}
.sum > div:first-child {
  border-right: 1px solid #61587f;
}
.sum span {
  display: block;
}
.sum .f-24 {
  color: #0d6096;
  font-weight: bold;
}
.rules {
  padding: 0 0.8rem;
  margin-top: 1.066667rem;
  line-height: 0.96rem;
}
.rules > div {
  color: white;
  padding: 0.8rem 0.533333rem;
}
</style>
