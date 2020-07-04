<template>
  <div class="cathectic">
    <Header>
      <div slot="title" style="color:#fff;">投注</div>
    </Header>
    <div class="cathectic_t">
      <span>本期距离开奖还有：</span>
      <span class="active">
        <van-count-down :time="time_left * 1000" format="HH:mm:ss" style="color:#ff4e5f" @finish="finish" />
      </span>
    </div>

    <!--  -->
    <div class="main">
      <div class="big_img">
        <div class="top">
          <h3>本期累计</h3>
          <p @click="$router.push('/mecathectic')">
            本期我的投注约为: <span>{{ prizepool.note_quantity || 0 }}注</span>
          </p>
        </div>
        <h3 class="ydn">YDN：</h3>
        <h2>{{ prizepool.quantity }}</h2>
        <div class="goto">
          <p @click="$router.push('/histryAward')">
            历史开奖
            <img src="/static/images/cathectic/gen@2x.png" />
          </p>
        </div>
        <!--  -->
        <section class="cathectic_plan">
          <h3>{{ step * 3 }} YDN —— (共{{ step }}注)</h3>
          <div>
            <div class="Stepping">
              <el-slider v-model="props" :min="0" :max="100" :step="1" :show-tooltip="false">
              </el-slider>
              <span class="start">3YDN/注</span>
              <span class="end">{{props}}%</span>
            </div>
            <div class="accumulation">
              <van-stepper v-model="step" theme="round" @change="onStepper" :disable-plus="isdisa" />
            </div>
          </div>
          <div class="margin">
            <div class="balance">可用余额:{{ asset }} YDN</div>
            <div class="recharge" @click="$router.push('/recharge')">
              <img src="../../../static/images/cathectic/echarge.png" />
              充值
            </div>
          </div>
        </section>
      </div>

      <!-- btn -->
      <div class="button" @click="prizePoolbet">立即投注</div>

      <!-- 本期奖品 -->
      <div class="Prize">
        <van-divider :style="{
            borderColor: '#292A2A',
            padding: '0 .48rem',
          }" />
        <p class="purple">
          <img src="/static/images/cathectic/purple@2x.png" />
          <span>本期奖励</span>
        </p>
        <p class="fa-sub">
          一等奖1名：约
          <span style="color:#0BE1B6;">{{ bonus_router.first_quantity }}</span>
          YDN
        </p>
        <div class="sub">
          <p class="fa-sub">
            二等奖1名：约
            <span style="color:#0BE1B6;">{{
              bonus_router.second_quantity
            }}</span>
            YDN
          </p>
          <p class="fa-sub">
            三等奖1名：约
            <span style="color:#0BE1B6;">{{
              bonus_router.third_quantity
            }}</span>
            YDN
          </p>
        </div>
        <div class="pr_info">
          <p>·每周逢一、三、五 0：00开奖。</p>
          <p>
            ·奖金构成：一等奖，奖池{{
              bonus_router.first_prize_proportion
            }}%，二等奖奖池{{
              bonus_router.second_prize_proportion
            }}%，三等奖奖池{{ bonus_router.third_prize_proportion }}%。
          </p>
          <p>·3 YDN/注，可累计重复抽奖，投注越多，中奖几率越大哦。</p>
        </div>
      </div>
    </div>

    <!-- 筛选弹出层 -->
    <van-popup v-model="isModel" position="bottom" :style="{
        height: '11.36rem',
        width: '100%',
        background: '#171818',
        margin: '0 auto',
        borderRadius: '.32rem',
      }">
      <div class="purchase">
        <div class="pur_top">
          <p></p>
          <p>安全验证</p>
          <img @click="isModel = false" src="../../../static/images/miner/cancle.png" alt="" />
        </div>
        <div>
          <div class="tran">
            <p>交易密码</p>
            <input class="input-con" v-model="transactionPwd" placeholder="请输入交易密码" type="password" />
          </div>
        </div>
        <div class="f-16 pur-btn" @click="transaction">确定</div>
      </div>
    </van-popup>
    <!-- 弹出框 -->
    <van-overlay :show="showNow">
      <div class="wrapper">
        <div class="sess_case case">
          <div class="cass_title">
            <p>您当前的红包资产账户不足</p>
            <p>请前往充值</p>
          </div>
          <div class="cass_licai">当前红包账户：{{ asset }}</div>
          <div class="sess_btn">
            <button class="sess_case sess_tran" @click="$router.push('/transfer')">
              前往划转
            </button>
            <button class="sess_case" @click="$router.push('/recharge')">
              前往充值
            </button>
          </div>
          <img @click="showNow = false" class="clome" src="../../../static/images/miner/clome@2x.png" alt="" />
        </div>
      </div>
    </van-overlay>
    <Model :boolean="isShowNow" @hideFn="showModel" v-show="isShowNow">
      <h3 slot="title" class="show_title">提示</h3>
      <div class="box" slot="conent">
        <p class="box_p">为了您的账户安全，请先设置交易密码！</p>
        <button class="show_Btn" @click="$router.push('/createdeal')">
          前往设置
        </button>
      </div>
    </Model>
    <!--  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import { CountDown, Stepper } from 'vant'
Vue.use(CountDown)
Vue.use(Stepper)
import Model from '../../components/Model-Dialog'
export default {
  name: 'Cathectic',
  data() {
    return {
      prizepool: {},
      start_time: '',
      time_left: '', // 剩余多少秒
      open_time: '10000', // 开奖时间
      note_quantity: 3, // 投注数
      step: 0,
      pay_pwd: '',
      accumulation: 1,
      bonus_router: {}, // 中奖名单
      asset: '', // 红包余额
      isModel: false, //交易密码状态框
      transactionPwd: '', //交易密码
      showNow: false,
      isShowNow: false,
      prop: 0,
      props: 0,
      isdisa: false
    }
  },
  created() {
    this.getQuantity()
  },
  mounted() {
    this.getPrizepool() // 投注
    this.getUserInfo() // 资金密码
  },
  watch: {
    props() {
      const s = this.prop * (this.props / 100)
      this.step = Math.round(s)
      if (this.step == Math.round(this.prop)) {
        this.isdisa = true
      } else {
        this.isdisa = false
      }
    }
  },
  components: {
    Model
  },
  methods: {
    onStepper(value) {
      let con = (value / this.prop) * 100
      this.props = Number(con.toFixed(3))
    },
    getQuantity() {
      this.$http.get(`/wallet/asset?account=candy`).then(res => {
        // 红包可用余额
        if (res.data.status === 200) {
          this.asset = res.data.data.asset.asset_all.quantity
        }
        if (this.asset < 1) {
          this.isdisa = true
        } else {
          this.isdisa = false
        }
        let prop = this.asset / 3
        this.prop = prop
      })
    },
    finish() {
      this.getPrizepool()
    },
    getPrizepool() {
      this.$http.get('/prize-pool').then(res => {
        console.log(res)
        if (res.data.status === 200) {
          this.prizepool = res.data.data
          this.time_left = res.data.data.time_left
          this.open_time = res.data.data.open_time // 开奖时间
          this.bonus_router = res.data.data.bonus_router
        }
      })
    },
    getUserInfo() {
      this.$http.get('/user/info').then(res => {
        if (res.data.status === 200) {
          this.pay_pwd = res.data.data.pay_pwd
        }
      })
    },
    showModel(val) {
      this.isShowNow = val
    },
    prizePoolbet() {
      // 资金密码，和下注数+ 余额
      const { pay_pwd, step, asset, transactionPwd } = this
      let newAsset = 3 * step
      // 1. 可用余额不足
      // 2. 没有设置交易密码
      // 3. 输入交易密码进行投注--- 200 --- 400
      console.log(newAsset, asset)

      if (newAsset > asset) {
        console.log('余额不足')
        this.showNow = true
        return null
      } else if (!pay_pwd) {
        console.log('没有设置过资金密码')
        this.isShowNow = true
        return null
      } else if (!this.time_left) {
        this.$toast('活动暂未开始!')
        return null
      }

      this.isModel = true // 交易密码验证
    },
    //确定交易
    transaction() {
      this.$http
        .post('/prize-pool/bet', {
          pay_pwd: this.transactionPwd,
          note_quantity: this.step
        })
        .then(res => {
          if (res.data.status === 200) {
            this.getPrizepool()
            this.getQuantity()
            this.transactionPwd = ''
            this.props = 0
            this.step = 1
            this.$toast('投注成功!')
          } else {
            this.transactionPwd = ''
          }
          this.isModel = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .header {
  height: 3.413333rem;
}
@import '../../../static/css/real.less';
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
      font-weight: bold;
    }
  }
  .cass_licai {
    margin-top: 7.36rem;
    color: #999999;
    font-size: 0.746667rem;
    font-weight: 400;
  }
  .sess_btn {
    padding: 0 30px;
    display: flex;
    justify-content: space-around;

    .sess_case {
      width: 100px;
      height: 1.706667rem;
    }
    .sess_tran {
      background: rgba(203, 255, 244, 1);
      color: #0be2b6;
    }
  }
}
.purchase {
  width: 100%;
  .pur_top {
    width: 16.266667rem;
    margin: 0.906667rem auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 12px;
      height: 12px;
    }
  }
  .tran {
    width: 16.266667rem;
    margin: auto;
    p {
      font-size: 0.746667rem;
      margin-bottom: 0.32rem;
    }
    input {
      width: 100%;
      margin-bottom: 0.746667rem;
    }
    border-bottom: 1px solid #333333;
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
.input-con {
  background-color: transparent;
  border: 0;
}

.cathectic {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 2.667rem;
  .right {
    display: flex;
    align-items: center;
    img {
      height: 0.747rem;
      height: 0.747rem;
      display: block;
      margin-right: 0.267rem;
    }
  }

  .cathectic_t {
    height: 1.067rem;
    background-color: #171818;
    text-align: center;
    font-size: 0.64rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    .active {
      color: #ff4e5f;
    }
  }

  .main {
    width: 17.813rem;
    margin: 0 auto;
    margin-top: 1.6rem;
    background-color: #171818;
    .big_img {
      padding-left: 0.693rem;
      padding-right: 0.693rem;
      width: 100%;
      height: 12.213rem;
      background: url('/static/images/cathectic/background@4x@2x.png') no-repeat;
      background-size: cover;
      .top {
        color: #ffffff;
        padding-top: 0.853rem;
        font-size: 0.96rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        p {
          font-size: 0.64rem;
          span {
            color: #0be2b6;
          }
        }
      }
      .ydn {
        font-size: 0.96rem;
        color: #fff;
        margin-top: 1.387rem;
      }
      h2 {
        color: #0be2b6;
        font-size: 1.6rem;
        font-family: DIN;
        font-weight: bold;
      }
      .goto {
        display: flex;
        justify-content: flex-end;
        p {
          color: #ffffff;
          font-size: 0.64rem;
          display: flex;
          align-items: center;
          img {
            display: block;
            width: 0.373rem;
            height: 0.587rem;
            margin-left: 0.373rem;
          }
        }
      }
      .cathectic_plan {
        box-sizing: border-box;
        margin-top: 0.587rem;
        width: 100%;
        height: 6.507rem;
        border-radius: 0.32rem;
        background: url('/static/images/cathectic/back2@2x.png') no-repeat;
        background-size: cover;
        padding: 0.693rem 0.533rem;
        h3 {
          text-align: center;
          color: #000000;
          font-size: 0.64rem;
        }
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000000;
          font-size: 0.64rem;
          .Stepping {
            box-sizing: border-box;
            width: 9.6rem;
            margin-left: 0.533rem;
            position: relative;
            margin-top: 0.8rem;
            .start {
              width: 60px;
            }
            .start,
            .end {
              position: absolute;
              left: 0;
              top: -15px;
              // width: 1.28rem;
              height: 0.533rem;
              color: #000000;
              font-size: 0.64rem;
            }
            .end {
              margin-left: 49px;
              width: 56px;
              left: 100%;
              transform: translateX(-230%);
            }
          }
          .balance {
            margin-left: 0.747rem;
          }
          .recharge {
            color: rgba(255, 254, 254, 1);
            margin-right: 0.853rem;
            display: flex;
            align-items: center;
            img {
              width: 0.693rem;
              height: 0.693rem;
              display: block;
              margin-right: 0.32rem;
            }
          }
        }
        .margin {
          margin-top: 0.64rem;
        }
      }
    }
    .button {
      width: 14.933rem;
      height: 2.133rem;
      font-size: 0.96rem;
      color: #fff;
      border: 1px solid #0be2b6;
      border-radius: 0.32rem;
      text-align: center;
      line-height: 2.133rem;
      margin: 0 auto;
      margin-top: 4.8rem;
    }
    .Prize {
      font-size: 0.64rem;
      padding: 1.813rem 0.533rem;
      .purple {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.426667rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          display: block;
          margin-right: 0.48rem;
        }
      }
      .fa-sub {
        text-align: center;
      }
      .sub {
        margin-top: 0.64rem;
        display: flex;
        justify-content: space-between;
      }
      .pr_info {
        margin-top: 2.507rem;
        color: rgba(255, 254, 254, 1);
      }
    }
  }
}

.cathectic {
  /deep/ .el-slider__button {
    width: 0.533rem;
    height: 0.533rem;
    background-color: #fff;
    border: none;
  }
  /deep/ .el-slider__stop {
    background-color: #0ce1b6;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
  }
  /deep/ .el-slider__runway {
    background-color: #1abfad;
  }
  /deep/ .el-slider__bar {
    background-color: #0df3c4;
  }
  /deep/ .el-slider__runway {
    height: 0.213rem;
  }
  /deep/ .van-stepper--round {
    .van-stepper__plus {
      background-color: rgba(255, 254, 254, 1);
    }
  }
  /deep/ .van-stepper__plus::before {
    background-color: #0df3c4;
  }
  /deep/ .van-stepper__plus::after {
    background-color: #0df3c4;
  }
  /deep/ .van-stepper__minus {
    background-color: rgba(255, 254, 254, 1);
    border: none;
    color: #0df3c4;
  }
  /deep/ .van-stepper--round {
    .van-stepper__minus--disabled {
      opacity: 1;
    }
  }
}

.show_title {
  font-size: 1.067rem;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}

.box {
  margin-top: 2.4rem;
  text-align: center;
}
.box_p {
  color: rgba(0, 0, 0, 1);
  font-size: 0.747rem;
  text-align: center;
  margin-top: 1.28rem;
}
.show_Btn {
  width: 5.333rem;
  height: 1.707rem;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 0.853rem;
  display: inline-block;
  margin-top: 2.4rem;
  outline: 0;
  border: none;
  font-size: 0.747rem;
  color: #ffffff;
}
</style>
