<template>
  <div class="scrollY" ref="BScroll">
    <div class="Middleware">
      <div class="scroll-warpper">
        <header class="header">
          <div class="cenetr">红包</div>
          <div class="right">
            <img @click="$router.push('/award/record')" src="/static/images/RedPack/details@2x.png" />
          </div>
        </header>
        <!-- <Header>
          <div slot="title" style="color:#fff;">红包</div>
          <img   slot="right" class="history" src="../../../static/images/RedPack/details@2x.png" @click="$router.push('/award/record')" />
        </Header> -->
        <!--  -->
        <div class="scroll_middleware" ref="BScroll" style="padding-top:2.453rem">
          <div id="rpacket">
            <div class="main">
              <div class="rback_text">
                <img src="../../../static/images/RedPack/redenvelopewar@2x.png" />
                <div class="rback_jingbi">
                  <img src="../../../static/images/miner/jingbi.png" alt="" />
                </div>
              </div>

              <div class="info_box">
                <Rollover :list="candyMsgList" />
              </div>

              <section class="pale">
                <!--  -->
                <div class="rpacket_count">
                  <div class="left_count">
                    <h3>{{ candyCurrents.total }}</h3>
                    <p class="tip">总充值量(YDN)</p>
                  </div>
                  <div class="left_count">
                    <h3>{{ surplus }}</h3>
                    <p class="tip">奖池剩余(YDN)</p>
                  </div>
                </div>
                <van-divider :style="{
                    borderColor: '#FFFF00',
                    color: '#fff',
                    fontSize: '.853rem',
                  }">{{ state_title }}</van-divider>
              </section>
              <!--  -->
              <section class="timestamp" v-if="isStart">
                <span>{{ start_time[0] }}</span>
                <span>{{ start_time[1] }}</span>
                <i>时</i>
                <span>{{ start_time[3] }}</span>
                <span>{{ start_time[4] }}</span>
                <i>分</i>
                <span>{{ start_time[6] }}</span>
                <span>{{ start_time[7] }}</span>
                <i>秒</i>
              </section>
              <!-- 当没有活动的时候显示 -->
              <section class="timestamp" v-else>
                <span>0</span>
                <span>0</span>
                <i>时</i>
                <span>0</span>
                <span>0</span>
                <i>分</i>
                <span>0</span>
                <span>0</span>
                <i>秒</i>
              </section>

              <!-- btn -->

              <section class="button" :class="{ active: rob }" @click="gtabNow">
                {{ botton_title }}
              </section>

              <section class="rule">
                <p class="rule_text">抢红包必看</p>
                <div class="rule_info">
                  <p>·每个新注册充值500以上用享有10次体验抽奖</p>
                  <p>
                    ·持续参与每日抽奖需提前存入不得少于2000枚YDN资产到YDN星球钱包账户
                  </p>
                  <p>·每日进行二轮开抢，时间如下：</p>
                  <div style="margin-left:2.666rem">
                    <p>第一轮：每日16：30开抢，17：30结束</p>
                    <p>第二轮：每日20：30开抢，21：30结束</p>
                    <!-- <p>第一轮：每日10：30开抢，11：30结束</p> -->
                  </div>
                </div>
              </section>
              <!--  -->
              <section class="btns">
                <div class="btn-t" @click="$router.push('/award/record')">
                  <h4>我的奖励</h4>
                  <p>累计{{ remaining }}YDN</p>
                </div>
                <div class="btn-t" @click="$router.push('/invite/record')">
                  <h4>邀请好友</h4>
                  <p>共{{ totals }}人</p>
                </div>
              </section>
              <!-- <div class="times" v-show="new_quantity > 0 ? showRemaining = true : showRemaining">新手体验剩余次数：{{totals}} 次</div> -->
              <div class="times" v-show="new_quantity > 0 ? showRemaining = true : showRemaining">新手体验剩余次数：{{new_quantity}} 次</div>
              <div class="advert_bor"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <grabRed v-show="showGrab" :grab="showGrab" :grabItem="gtabItem" @clonegra="showGra" />
    <grabWait v-show="showWait" :wait="showWait" @waitgra="waitShow" />
    <grabRegret v-show="showRegret" :regret="showRegret" @regretgtab="regretShow" />

    <grabBalance v-show="showBalance" :balance="showBalance" @balancegtab="balanceShow" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Divider, Swipe, SwipeItem } from 'vant'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Rollover from '@/components/rollover'
import dayjs from 'dayjs'
Vue.use(Divider)
Vue.use(Swipe)
Vue.use(SwipeItem)
import grabRed from '../Rpacket_red/grabRed'
import grabWait from '../Rpacket_red/grabWait'
import grabRegret from '../Rpacket_red/grabRegret'
import grabBalance from '../Rpacket_red/grabBalance'
export default {
  name: 'Rpacket',
  data() {
    return {
      showGrab: false, //抢到红包弹框
      showWait: false, //红包时间没到弹框
      showRegret: false, //没有中奖
      showBalance: false, //余额不足
      time: null,
      candyMsgList: [],
      total: 0, // 累计中奖数
      candyCurrents: {}, // 当前活动
      start_time: '',
      surplus: null,
      recharge_total: '',
      id: '',
      remaining: '', //邀请人数
      totals: '', // 邀请总数
      content: '',
      showRemaining: false, //是否新人显示体验次数
      prize: {}, //抽奖
      prizeMsg: '',
      prizeTime: null, //开奖时间
      state_title: '',
      botton_title: '',
      rob: false,
      is_click: true,
      error_tips: '',
      gtabItem: {},
      new_quantity: 0,
      isStart: false
    }
  },
  components: {
    grabRed,
    grabWait,
    grabRegret,
    grabBalance,
    Rollover
  },
  watch: {
    BScroll() {
      return this.$refs.BScroll
    }
  },
  mounted() {
    this.getActive() // 当前活动
    this.candyMsg() // 中奖轮播
    // 奖池剩余
    // setTimeout(() => {
    //   this.candySurplus() // 奖池剩余`
    // }, 2000)
    this.candyTotal() // 累计中奖

    // this.inviteTotal(); // 邀请总数

    this.$http.get(`candy/winning-status`).then(res => {
      console.log(res)
    })
  },
  methods: {
    //接受红包弹框返回来的窗口状态
    showGra(e) {
      this.showGrab = e
    },
    waitShow(e) {
      this.showWait = e
    },
    regretShow(e) {
      this.showRegret = e
    },
    balanceShow(e) {
      this.showBalance = e
    },
    setprizeTime(val) {
      //开奖时间倒计时
      let out = val.match(/\d+/g)
      //分别获取小时、分钟和秒
      let h = parseInt(out[0]),
        m = parseInt(out[1]),
        s = parseInt(out[2])
      //转换成秒
      const res = h * 3600 + m * 60 + s
      if (res === 0) {
        this.showGrab = true
      }
    },
    gtabNow() {
      //时间没到请等待
      if (this.rob) {
        this.showWait = true
      } else {
        if (this.is_click) {
          this.is_click = false
          this.$http.get(`/candy/index?id=${this.id}`).then(res => {
            this.is_click = true
            if (res.data.status == 200) {
              var type = res.data.data.type
              //余额不足
              if (type == 2) {
                this.showBalance = true
              } else if (type === 3) {
                this.candyTotal()
                //抢红包
                this.$toast(res.data.msg)
              }
            } else {
              this.$toast(res.data.msg)
            }
          })
        } else {
          this.$toast('请不要重复提交')
        }
      }
    },
    candyMsg() {
      this.$http.get('/candy/msg').then(res => {
        this.candyMsgList = res.data.data
      })
    },
    _initBScroll() {
      if (!this.$refs.BScroll) {
        return
      }
      this.Scroll = new BScroll(this.$refs.BScroll, {
        scrollY: true,
        bounce: false
      })
    },
    candySurplus() {
      console.log(this.candyCurrents.id)
      if (this.candyCurrents.id) {
        this.$http
          .get(`/candy/surplus?id=${this.candyCurrents.id}`)
          .then(res => {
            console.log(res)
            if (res.data.status === 200) {
              this.surplus = res.data.data.surplus
            }
          })
      } else {
      }
    },
    candyTotal() {
      this.$http.get('/candy/total').then(res => {
        this.total = res.data.data.total
      })
      this.$http.get('/user/invite/total').then(res => {
        console.log(res)
        if (res.data.status === 200) {
          this.new_quantity = res.data.data.new_quantity //新手人数
          this.remaining = res.data.data.remaining //我的奖励
          this.totals = res.data.data.total //奖励人数
        }
      })
    },
    getTime(start, endTime) {
      start = dayjs(start).format('HH:mm:ss')
      endTime = dayjs(start).format('HH:mm:ss')
      // console.log(start, endTime)
      return {
        start,
        endTime
      }
    },
    //调用中奖的接口
    winPrize() {
      //开奖接口
      this.$http.get(`candy/winning-status`).then(res => {
        let data = res.data.data.data
        if (data.type === 1) {
          this.showWait = true
          //开奖时间未到
          // this.$toast(data.remark)
        } else if (data.type === 2) {
          this.gtabItem = data
          // 中奖了
          this.showGrab = true
        } else if (data.type === 3) {
          //没有中奖
          this.showRegret = true
        } else {
          console.log('毛都没有')
        }
      })
    },
    getActive() {
      this.$http.get('/candy/current').then(res => {
        if (res.data.status === 200) {
          this.isStart = true
          var data = res.data.data
          console.log(data)

          this.candyCurrents = res.data.data //数据
          this.recharge_total = data.total
          this.id = data.id
          // this.candySurplus(); // 奖池剩余
          var current = new this.$BN(Date.parse(new Date())).dividedBy(1000)
          var start = new this.$BN(data.start_time)
          var end = new this.$BN(data.end_time)
          this.candySurplus()
          if (start.comparedTo(current) === 1) {
            var surplus = start.minus(current)
            this.countDown(surplus.toString())
            this.state_title = '红包雨等待中'
            this.botton_title = '等待中'
            this.rob = true
            this.winPrize()
          } else {
            console.log(1)
            if (end.comparedTo(current) == 1) {
              console.log(2)
              var surplus = end.minus(current)
              this.countDown(surplus.toString())
              const time = setInterval(() => {
                this.candyMsg()
              }, 1000)
              this.$once('hook:beforeDestroy', () => {
                clearInterval(time)
              })
              this.rob = false
              this.botton_title = '马上抢'
              this.state_title = '红包雨进行中'
            } else {
              this.start_time = '**:**:**'
              //显示中奖结果
              this.rob = true
              this.state_title = '红包雨等待中'
              this.botton_title = '等待中'
              this.winPrize()
            }
          }
          // this.candySurplus();
        } else {
          //没有活动
          this.state_title = '暂无任何活动'
          this.botton_title = '等待中'
          this.rob = true
          this.isStart = false
          this.text = res.data.msg
        }
      })
    },
    countDown(time) {
      var a = time
      var h = Math.floor(a / 3600)
      a = time - h * 3600
      var m = Math.floor(a / 60)
      var s = time % 60
      this.countDownTime(h, m, s)
    },
    countDownTime(h, m, s) {
      var hour = h
      var minute = m
      var second = s

      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }

      this.start_time = h + ':' + m + ':' + s

      second = s - 1
      if (second < 0) {
        if (minute == 0 && hour == 0) {
          this.getActive()
          return
        }
        second = '59'
        minute--
      }
      if (minute < 0) {
        minute = '59'
        hour--
      }
      if (hour < 0) {
        hour = '0'
      }
      const timer = setTimeout(() => {
        this.countDownTime(hour, minute, second)
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer)
      })
    }
  }
}
</script>

<style lang="less" scoped>
#rpacket {
  height: 100%;
  overflow-y: scroll;
  margin-bottom: 2.667rem;
  .main {
    width: 100%;
    padding-bottom: 1.493rem;
    height: 100%;
    position: relative;
    .advert_bor {
      position: absolute;
      top: 7.2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 12.16rem;
      height: 1.6rem;
      z-index: 10;
      border-radius: 0.32rem;
      border: 1px solid #ffff00;
    }
    .rback_text {
      margin: 0 auto;
      width: 15.733rem;
      height: 7.573rem;
      position: relative;
      z-index: 1;
      > img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .rback_jingbi {
        position: absolute;
        width: 1.973333rem;
        height: 1.653333rem;
        top: 1.066667rem;
        left: 38%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .info_box {
      margin: 0 auto;
      margin-top: 2.133rem;
      font-size: 0.64rem;
      width: 15.36rem;
    }
    .pale {
      width: 15.36rem;
      margin: 0 auto;
      .rpacket_count {
        margin-top: 7.68rem;
        display: flex;
        justify-content: space-between;
        color: #ffff00;
        padding-bottom: 0.533333rem;
        .left_count {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 5.093rem;
          // // height: 2.4rem;
          // overflow: hidden;
          // text-overflow: ellipsis;
        }
        h3 {
          font-size: 1.067rem;
        }
        .tip {
          color: #ffffff;
          font-size: 0.64rem;
        }
      }
    }
    .timestamp {
      margin-left: 2.453rem;
      margin-right: 2.773rem;
      display: flex;
      span {
        background-color: #42210b;
        width: 1.493rem;
        height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.32rem;
        font-size: 1.067rem;
        color: #fff;
        &:nth-of-type(odd) {
          margin-right: 0.32rem;
        }
      }
      i {
        font-size: 1.067rem;
        width: 1.493rem;
        height: 2.4rem;
        color: #921713;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .button {
      margin: 0 auto;
      margin-top: 1.387rem;
      width: 8.107rem;
      height: 2.56rem;
      background: linear-gradient(
        180deg,
        rgba(249, 221, 48, 1) 0%,
        rgba(236, 183, 19, 1) 100%
      );
      border-radius: 1.44rem;
      font-size: 1.28rem;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-family: 'PingFangBold2';
    }
    .active {
      background: white;
      color: #ccc;
    }
    .rule {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .rule_text {
        margin-top: 1.493rem;
        width: 8.107rem;
        height: 1.173rem;
        background: url('../../../static/images/RedPack/specimen@2x.png')
          no-repeat;
        background-size: cover;
        text-align: center;
        font-size: 0.853rem;
      }
      .rule_info {
        margin-top: 0.8rem;
        padding: 0.8rem;
        width: 17.867rem;
        height: 7.947rem;
        font-size: 0.64rem;
        background: rgba(233, 103, 91, 1);
        border-radius: 0.32rem;
        color: #ffffff;
      }
    }
    .btns {
      margin-top: 1.707rem;
      margin-left: 1.867rem;
      margin-right: 1.867rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn-t {
        width: 6.933rem;
        height: 2.88rem;
        background: linear-gradient(
          180deg,
          rgba(249, 221, 48, 1) 0%,
          rgba(236, 183, 19, 1) 100%
        );
        border-radius: 0.32rem;
        color: #42210b;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h4 {
          font-size: 0.96rem;
        }
        p {
          font-size: 0.64rem;
        }
      }
    }
    .times {
      width: 8.693333rem;
      height: 1.706667rem;
      background: rgba(66, 33, 11, 1);
      border-radius: 0px 16px 16px 0px;
      line-height: 1.706667rem;
      position: absolute;
      left: 0;
      top: 14.986667rem;
      font-size: 0.64rem;
      text-align: center;
    }
  }
}

.scroll-warpper {
  background: url('../../../static/images/RedPack/background@2x.png');
  background-position-y: -15px;
  background-size: cover;
  height: 100%;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.453rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.067rem;
  background-color: #040606;
  z-index: 100;
  .left,
  .right {
    width: 1.387rem;
    height: 1.387rem;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .cenetr {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.96rem;
  }
}
</style>
