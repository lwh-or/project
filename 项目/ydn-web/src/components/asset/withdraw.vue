<template>
  <div class="bgb" id='bgb'>
    <!-- 头部 -->
    <Header>
      <img @click="$router.push('/asset')" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">{{coin}}提现</div>
      <div slot="right" style="color:#fff;width: 1.066667rem;height: 1.173333rem;" @click="$router.push('/recharging')">
        <img src="../../../static/images/miner/red-log.png" alt="" style="width:100%;heigth:100%" />
      </div>
    </Header>
    <div class="all">
      <div class="main">
        <div class="item f-16 password">
          <div class="address">
            <p>提现地址</p>
            <!-- <img src="../../../static/images/miner/qrcode.png" alt="" /> -->
          </div>
          <div class="add-input">
            <input class="input-con" v-model="address" placeholder="请输入提币的钱包地址" />
            <div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-show="addressList.length > 0" v-for="item in addressList" :key="item.id">
                    <div @click="bindingAdd(item)">
                      <p>{{ item.note }}</p>
                      <p class="item_text">{{ item.address }}</p>
                    </div>
                    <i class="el-icon-delete" @click="deleteAddtess(item.id)"></i>
                  </el-dropdown-item>
                  <el-dropdown-item v-show="addressList.length === 0">
                    <div class="noRess">
                      暂无提币地址
                    </div>
                  </el-dropdown-item>
                  <div class="plus_nou" @click="$router.push('/address')">
                    <i class="el-icon-plus">添加提币地址</i>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
              <img class="address-img" @click="$router.push('/setAddress')" src="../../../static/images/miner/address-code.png" alt="" />
            </div>
          </div>
        </div>
        <div class="item f-16 password">
          <div class="address">
            <p>提现数量</p>
            <p class="num">可用数量：{{ balance }}</p>
          </div>
          <div class="add-input">
            <input class="input-con" v-model="wholeNumber" :placeholder='outtext' />
            <div class="add-whole" @click="whole">
              全部
            </div>
          </div>
        </div>
        <div class="item f-16 flex_between">
          <div>提现手续费</div>
          <div>{{ charge }}</div>
        </div>
        <div class="item f-16 flex_between">
          <div>实际到账</div>
          <div>{{ actualReceipt }}</div>
        </div>

        <div class="f-16 pur-btn" @click="confirmWith">确定提币</div>
        <div class="notice">
          <p class="f-16">
            <img class="tishi-img" src="../../../static/images/miner/tishi.png" alt="" />提示：
          </p>
          <div class="f-14">
            <p>• 提币请求申请成功后,请等待系统审核通过</p>
            <p>• 部分币种提币可能需要人工审核，审核时间为9:30-02:00 (UTC+8)</p>
            <p>• 提币默认由资金账户提出，请先将您的其他账户资产划转到资金账户</p>
          </div>
        </div>
      </div>

    </div>

    <van-dialog v-model="isDeleteShow" :show-confirm-button="true" :show-cancel-button="true" :closeOnClickOverlay="true" @confirm="determineRess">
      <p class="dialog_text">提示</p>
      <div class="dialog-text">是否确认删除地址：AE币安地址？</div>
    </van-dialog>

    <!-- 筛选弹出层 -->
    <van-popup v-model="isModel" position="bottom" :style="{
        height: '15.36rem',
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
          <div class="tran">
            <p class="tran_code">验证码</p>
            <van-field v-model="msg_code" :clearable="true" placeholder="短信验证码" slot="note">
              <button class="button" slot="right-icon" style="color:#0BE2B6;" :disabled="show" @click="showPic">
                {{ code_text }}
              </button>
            </van-field>
          </div>
        </div>
        <div class="f-16 pur-btn" @click="transaction">确定</div>
      </div>
    </van-popup>

    <van-overlay :show="wintShow">
      <div class="wrapper" @click.self="cloneShow">
        <div class="container">
          <p class="containe_title">提示</p>
          <p class="containe_title2">为了您的账户安全，请设置交易密码</p>
          <div class="f-16 pur-btn con-btn" @click="$router.push('/Createdeal')">前往设置</div>
          <img class="deselect" @click="cloneShow" src="../../../static/images/RedPack/deselect@2x.png" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import topBar from '../common/topBar'
import animate from 'animate.css'
import coinList from '../common/coinList'
import { mapState } from 'vuex'
import Model from '../../components/Model-Dialog'
export default {
  name: 'withdraw',
  components: {
    topBar,
    coinList,
    Model
  },
  data() {
    return {
      title: '提现',
      show: false,
      coin: 'YDN',
      msg_token: '',
      msg_code: '',
      address: '', //提币地址
      count: '',
      password: '',
      fee: '',
      fee_limit: '',
      balance: '',
      codeClick: true,
      code_text: '获取验证码',
      all_time: 60,
      isClick: true,
      activeNames: ['1'],
      wholeNumber: '', //最少提现数量
      addressList: [],
      isDeleteShow: false,
      ressID: '',
      isModel: false, //交易密码状态框
      transactionPwd: '', //交易密码
      actualReceipt: 0, //实际到账
      charge: 0.001, // 手续费
      withdrawItem: {},
      wintShow: false,
      outtext: '',
      msg_code: '', // 验证码
      show: false,
      code_text: '发送验证码'
    }
  },
  computed: {
    total() {
      var a = new this.$BN(this.count)
      var b = new this.$BN(this.fee_limit)
      var c = a.minus(b)
      if (isNaN(c)) {
        return '0.00'
      }
      return c
    },
    ...mapState(['token'])
  },
  watch: {
    wholeNumber: function() {
      if (isNaN(this.wholeNumber)) {
        this.$toast('请输入正确的金额')
      } else if (this.wholeNumber) {
        let ratio = new this.$BN(Number(this.withdrawItem.out_fee_ratio))
        let outFee = new this.$BN(Number(this.withdrawItem.out_fee_limit))

        //手续费
        const count = Number(this.wholeNumber) * ratio
        console.log(count)

        this.charge = count
        let con = Number(this.wholeNumber) - Number(this.charge)
        if (con < 0) {
          this.actualReceipt = 0
        } else {
          //提现金额
          this.actualReceipt = con
          //
        }
      } else {
        this.charge = '0.0000'
        this.actualReceipt = 0
      }
    },
    all_time() {
      if (this.all_time === 0) {
        this.show = false
      }
    }
  },
  computed: {
    phone() {
      return this.$store.state.user.account
    }
  },
  methods: {
    // 发送验证码
    showPic() {
      this.getPicAuth()
      this.countDown()
      this.show = true
    },
    countDown() {
      //验证码倒计时
      this.time = setInterval(this.countDownTime, 1000)
      this.countDownTime()
    },
    countDownTime() {
      if (this.all_time < 0) {
        clearInterval(this.time)
        this.code_text = '发送验证码'
        this.all_time = 60
        this.show = false
        return
      }
      this.code_text = this.all_time + 's后重新获取'
      this.all_time--
      this.show = true
    },
    getPicAuth() {
      this.$http.get('user/send-code').then(res => {
        if (res.data.status === 200) {
          this.$toast('短信验证码已发送!')
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    cloneShow() {
      this.wintShow = false
    },
    //确定交易
    transaction() {
      if (!this.transactionPwd) {
        this.$toast('请输入交易密码')
        return
      } else if (!this.msg_code) {
        this.$toast('请输入验证码')
        return
      }

      let data = {
        coin: this.coin,
        address: this.address,
        num: this.wholeNumber,
        pay_pwd: this.transactionPwd,
        verity_code: this.msg_code
      }
      //提币接口;
      this.$http.post('user/withdraw', data).then(res => {
        if (res.data.status === 200) {
          this.$toast(res.data.msg)
          this.isModel = false
          this.transactionPwd = ''
          //跳转到提现记录
          this.$router.push('/recharging')
          //提现成功
        } else {
          if (res.data.msg == '请设置资金密码') {
            this.isModel = false
            this.wintShow = true
            return
          } else {
            this.$toast(res.data.msg)
          }
        }
      })
    },
    //确定提币
    confirmWith() {
      if (!this.address) {
        this.$toast('请输入提币地址')
        return
      } else if (!this.wholeNumber) {
        this.$toast('请输入提币数量')
        return
      } else {
        if (this.wholeNumber < 0.01) {
          this.$toast('提现数量小于最小提币数量')
          return
        } else if (Number(this.wholeNumber) > Number(this.balance)) {
          console.log(this.wholeNumber, '-----')
          console.log(this.balance, '-----')
          this.$toast('提现数量大于可用数量')
        } else {
          this.isModel = true
        }
      }
    },
    //全部提币
    whole() {
      this.wholeNumber = this.balance
    },
    bindingAdd(item) {
      this.address = item.address
    },
    //删除提币
    deleteAddtess(id) {
      this.ressID = id
      this.isDeleteShow = true
    },
    determineRess() {
      this.$http.delete('user/withdraw/address?id=' + this.ressID).then(res => {
        if (res.data.status == 200) {
          this.$toast('删除地址成功')
          this.getAddress()
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    closeList(val) {
      if (val) {
        this.show = false
      }
    },
    receive(val) {
      this.coin = val.symbol
      this.fee_limit = val.out_fee_limit
      this.fee = new this.$BN(val.out_fee_ratio).multipliedBy(100)
      this.balance = val.asset
      this.show = false
    },
    //发送验证码
    gainCode() {
      if (this.codeClick) {
        if (this.all_time !== 60) {
          return
        }
        this.codeClick = false
        this.$http
          .get('user/send-code')
          .then(res => {
            this.codeClick = true
            if (res.data.status == 200) {
              this.msg_token = res.data.data.verity_token
              this.$toast('验证码已发送！')
              this.countDown()
            }
          })
          .catch(err => {
            this.codeClick = true
          })
      }
    },
    countDown() {
      //验证码倒计时
      // console.log('captcha');
      this.time = setInterval(this.countDownTime, 1000)
      this.countDownTime()
    },
    countDownTime() {
      if (this.all_time < 0) {
        clearInterval(this.time)
        this.code_text = '获取验证码'
        this.codeClick = true
        this.all_time = 60
        return false
      }
      this.code_text = this.all_time + 's后重新获取'
      this.all_time--
    },
    getFee() {
      this.$http.get('user/coins').then(res => {
        if (res.data.status == 200) {
          var list = res.data.data
          this.withdrawItem = list[0]
          list.forEach(item => {
            if (item.symbol == this.coin) {
              this.charge = item.out_fee_limit //手续费
              this.fee = new this.$BN(item.out_fee_ratio).multipliedBy(100)
              this.balance = item.asset //剩余
            }
          })

          this.outtext = `最少提现数量` + this.withdrawItem.out_min
          console.log(this.outtext)
        }
      })
    },
    //提币地址
    getAddress() {
      const data = {
        symbol: 'ydn',
        page: 100
      }
      this.$http.get('user/withdraw/address', data).then(res => {
        console.log(res)

        if (res.data.status == 200) {
          this.addressList = res.data.data.data
        }
      })
    },
    submit() {
      if (this.isClick) {
        if (!this.address) {
          this.$toast('请输入提现地址')
          return
        } else if (!this.count) {
          this.$toast('请输入提现金额')
          return
        } else if (!this.password) {
          this.$toast('请输入资金密码')
          return
        } else if (!this.msg_code) {
          this.$toast('请输入验证码')
          return
        } else {
          this.isClick = false
          this.$http
            .post('user/withdraw', {
              coin: this.coin,
              address: this.address,
              num: this.count,
              pay_pwd: this.password,
              verity_code: this.msg_code,
              verity_token: this.msg_token
            })
            .then(res => {
              this.isClick = true
              clearInterval(this.time)
              this.all_time = 60
              this.code_text = '获取验证码'
              if (res.data.status == 200) {
                this.$toast(res.data.msg)
                this.$router.push('/asset')
              }
            })
        }
      } else {
        this.$toast('请不要重复提交')
      }
    }
  },
  created() {
    this.getFee()
  },
  mounted() {
    this.getAddress()
  }
}
</script>

<style lang="less" scoped>
#bgb {
  .purchase {
    /deep/ .van-cell {
      background-color: #171818;
      padding: 0;
      margin-bottom: 0.533333rem;
    }
    /deep/ .button {
      background-color: #171818;
      border: 1px solid #00ffff;
      border-radius: 6px;
    }
    /deep/ .van-field__control {
      color: #fff;
    }
    /deep/ .van-cell {
      border: 0;
    }
  }
}
.el-dropdown {
  margin: 0 0.8rem;
}
.el-collapse .el-collapse-item .el-collapse-item__header {
  height: 12px;
}
.all {
  padding: 0px 0.8rem;
}
.main {
  margin-top: 0.8rem;
  padding: 0 0.8rem;
  background-color: #171818;
  // box-shadow: 0 2px 10px 2px #333333;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  padding-bottom: 1.333333rem;
  border-radius: 0.106667rem;
}
.item {
  padding: 1.066667rem 0;
  border-bottom: 0.053333rem solid #333333;
}
.password input {
  width: 100%;
  font-size: 0.853333rem;
  outline: none;
}
::-webkit-input-placeholder {
  color: #999;
  font-size: 0.746667rem;
}
.notice {
  margin-top: 1.6rem;
  margin-left: 1.066667rem;
  // line-height: 1.6rem;
}
.notice > div {
  color: #999999;
  font-size: 12px;
  line-height: 1.066667rem;
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
  margin-top: 1.546667rem;
}
.tishi-img {
  width: 1.066667rem;
  height: 1.066667rem;
  vertical-align: middle;
  margin-right: 8px;
}
.input-con {
  background-color: transparent;
  border: 0;
}
.address {
  display: flex;
  justify-content: space-between;

  img {
    width: 0.746667rem;
    height: 0.746667rem;
  }
  margin-bottom: 0.8rem;
  .num {
    color: #999999;
    font-size: 0.746667rem;
  }
}
.add-input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .add-whole {
    display: inline-block;
    width: 5.333333rem;
    text-align: right;
  }
  div {
    display: flex;
    float: right;
    .botton-img {
      width: 0.64rem;
      height: 0.426667rem;
      margin-top: 0.533333rem;
      margin-right: 1.066667rem;
      margin-left: 1.066667rem;
    }
    .address-img {
      width: 0.746667rem;
      height: 1.066667rem;
    }
  }
}
.el-dropdown-menu__item {
  width: 320px;
  height: 3.2rem;
  line-height: 20px;
  position: relative;
  .item_text {
    width: 100%;
    // text-align: justify;
    display: block;
    word-break: break-all;
    height: 2.24rem;
    border-bottom: 1px solid #000;
    // height: 2.133333rem;
  }
}
.el-icon-delete {
  position: absolute;
  top: 1.333333rem;
  right: 0;
}
.plus_nou {
  width: 100%;
  text-align: center;
}
.bgb .van-dialog .van-dialog__header {
  color: #f90;
}
.dialog_text {
  text-align: center;
  width: 100%;
  color: #000000;
  font-size: 1.066667rem;
  margin: 2.293333rem 0 1.28rem 0;
  font-weight: bold;
}
.dialog-text {
  width: 100%;
  text-align: center;
  color: #000;
  padding-bottom: 1.6rem;
}
.noRess {
  width: 100%;
  text-align: center;
  padding: 0.8rem;
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
    .tran_code {
      margin-top: 0.533333rem;
    }
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
.pur-btn {
  height: 2.133333rem;
  line-height: 2.133333rem;
}

.wrapper {
  position: relative;
  height: 100%;
  .container {
    background-color: #fff;
    border-radius: 0.853rem;
    width: 16.533rem;
    height: 12.333rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: #333333;
    padding: 1.227rem;
    .deselect {
      position: absolute;
      bottom: -2.667rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.707rem;
      height: 1.707rem;
      display: block;
    }
    .containe_title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-top: 1.6rem;
    }
    .containe_title2 {
      text-align: center;
      font-size: 16px;
      margin-top: 1.066667rem;
    }
    .con-btn {
      width: 6.4rem;
      height: 1.866667rem;
      border-radius: 1.6rem;
      line-height: 1.866667rem;
    }
  }
}
</style>
