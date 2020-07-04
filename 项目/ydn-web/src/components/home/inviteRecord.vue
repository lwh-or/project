<template>
  <div class="warpper">
    <div class="inviteRecord">
      <Header>
        <img @click="$router.go(-1)"
             src="/static/images/asset/icon-arrows@2x.png"
             slot="left"
             style="width: 1.387rem; height: 1.387rem; display:block;" />
        <div slot="title"
             style="color:#fff;">邀请好友</div>
      </Header>

      <div class="main f-14">
        <div class="inviteRecord_1">
          <div class="info">
            <p>推荐人能够被直推人抽中红包的20％</p>
            <p>ABC等级制度，推荐越多奖励越多</p>
            <p>我的返佣奖励上限：78788YDN</p>
            <p>我的返佣奖励：20000YDN</p>
          </div>
          <div class="copy">
            <h3>我的邀请码：<span ref="link">{{ value }}</span></h3>
            <img @click="copy"
                 :data-clipboard-text="value"
                 class="copytext"
                 src="../../../static/images/RedPack/copy@2x.png" />
          </div>
          <!--  -->
          <section class="button"
                   @click="showBalance = true">链接分享</section>
        </div>
        <div class="f-12 inviteRecord_2"
             v-if="list.length">
          <h2 class="title">我的邀请</h2>
          <div class="tabs">
            <div>被邀请人</div>
            <div>注册时间</div>
            <div>返佣金额</div>
          </div>
          <van-list v-model="loading"
                    :finished="finished"
                    @load="onLoad">
            <div v-for="item in list"
                 :key="item.id">
              <div>
                <div class="tabs font_12">
                  <span>{{ item.account }}</span>
                  <span>{{ format(item.createtime) }}</span>
                  <span>100.00</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>
        <div v-else></div>
      </div>
    </div>

    <!--  -->
    <Share v-show="showBalance"
           :code="showBalance"
           @balancegtab="balanceShow"
           :qrcodeurl="qrcodeurl" />
  </div>
</template>

<script>
import Share from "../../view/Rpacket_red/Share.vue";
export default {
  name: "inviteRecord",
  components: {
    Share,
  },
  data () {
    return {
      title: "好友邀请记录",
      index: 1,
      url: "/",
      loading: false,
      finished: false,
      page_num: 1,
      page_all: 1,
      list: [],
      showBalance: false,
      qrcodeurl: "", // 分享链接
      value: "QX139F",
    };
  },
  methods: {
    format (timestamp) {
      var time = new Date(timestamp * 1000);
      var y = time.getFullYear();
      var M = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var m = time.getMinutes();
      var s = time.getSeconds();
      if (M < 10) {
        M = "0" + M;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return M + "/" + d + " " + h + ":" + m + ":" + s;
    },
    getRecord () {
      this.$http.get(`/user/invite/log?page=${this.page_num}`).then((res) => {
        if (res.data.status == 200) {
          var data = res.data.data;
          this.list = this.list.concat(data.data);
          this.page_all = data.last_page;
          this.page_num++;
          if (this.page_num > this.page_all) {
            this.finished = true;
          }
        }
      });
    },
    onLoad () {
      setTimeout(() => {
        this.getRecord();
        this.loading = false;
        if (this.page_num > this.page_all) {
          this.finished = true;
        }
      }, 500);
    },
    copy () {
      var clipboard = new this.clipboard(".copytext");
      clipboard.on("success", () => {
        this.$toast("复制成功");
      });
    },
    balanceShow (e) {
      this.showBalance = e;
    },
    getInfo () {
      this.$http.get("/user/info").then((res) => {
        if (res.data.status == 200) {
          var data = res.data.data;
          this.qrcodeurl =
            this.$store.state.url +
            // 'http://localhost:8090/' +   //测试
            // 'http://192.168.101.29:5000' +  //测试
            "/#/register?type=invite&invitation_code=" +
            data.invite_code;
          // this.qrcodeurl = 'localhost:8090' +
          // "/#/register?type=invite&invitation_code=" +
          // data.invite_code;
        }
      });
    },
  },
  created () {
    this.getRecord();
    this.getInfo();


  },
};
</script>

<style lang="less" scoped>
.warpper {
  height: 100%;
}
.inviteRecord {
  background: url("../../../static/images/RedPack/Invitation_back@2x.png")
    no-repeat;
  overflow-y: scroll;
  overflow-x: hidden;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  background-attachment: fixed;
  .main {
    position: absolute;
    width: 17.867rem;
    left: 50%;
    top: 55%;
    transform: translateX(-50%);
    
    .inviteRecord_1 {
      background-color: #171818;
      padding: 0.8rem 1.12rem 1.067rem 2.24rem;
      border-radius: 0.32rem;
      .info {
        color: #ffffff;
        font-size: 0.747rem;
      }
      .copy {
        font-size: 0.96rem;
        margin-top: 0.747rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 0.747rem;
          height: 0.747rem;
          display: block;
          margin-left: 0.8rem;
        }
      }
      .button {
        width: 8.213rem;
        height: 2.56rem;
        background: linear-gradient(
          180deg,
          rgba(249, 221, 48, 1) 0%,
          rgba(236, 183, 19, 1) 100%
        );
        border-radius: 1.44rem;
        font-size: 0.96rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-top: 1.067rem;
      }
    }
    .inviteRecord_2 {
      margin-top: 1.067rem;
      background: rgba(23, 24, 24, 1);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
      border-radius: 0.32rem;
      padding: 0.8rem;
      .title {
        font-size: 0.96rem;
        border-bottom: 1px solid #333333;
      }
      .tabs {
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.853rem;
        color: #fff;
        margin-top: 0.747rem;
      }
      .font_12 {
        font-size: 0.64rem;
      }
    }
  }
}
</style>
