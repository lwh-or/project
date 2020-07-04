<template>
  <div class="transfer">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">资金划转</div>
      <img slot="right" class="history" src="../../../static/images/Transferred/histroy@2x.png" @click="$router.push('/transfers')" />
    </Header>
    <!--  -->
    <div class="main">
      <mu-card>
        <mu-card-header>
          <van-row>
            <van-col @click="onCancel" :span="8" align="center">从
              <span ref="from">
                {{ switchTo ? leftName : rightName  }}
              </span>
              <img class="icon_right" src="../../../static/images/Transferred/icon15@2x.png" />
            </van-col>
            <van-col :span="8" style="text-align: center" @click="replace(true)">
              <img class="img_box" src="../../../static/images/Transferred/transfer@2x.png" />
            </van-col>
            <van-col :span="8" style="text-align: right">到
              <span ref="to">
                {{  !switchTo ? leftName : rightName}}
              </span>
              <!-- <img class="icon_right" src="../../../static/images/Transferred/icon15@2x.png" /> -->
            </van-col>
          </van-row>
        </mu-card-header>
      </mu-card>

      <mu-card>
        <mu-card-text>
          <div class="mu-form">
            <div class="trans_box">
              <div class="coin">
                <h3>币种</h3>
                <div>{{ asset.coin }}</div>
              </div>
              <div class="transfer_cont">
                <div>
                  <h3>划转数量</h3>
                  <p>可用：<span ref="count">{{ assetNum }}</span> YDN</p>
                </div>
                <input type="text" maxlength="30" v-model="amount" />
                <span @click="amount = $refs.count.innerText">全部</span>
              </div>
            </div>

            <!-- </mu-form-item> -->

            <van-button class="button" color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)" block ref="link" @click="submit">确认划转</van-button>
            <!--  -->
            <div class="card_t">
              <p class="card_text">* 划转不收取任何费用</p>
              <p class="card_text">
                * 相应资产操作需要转移到对应的账户方可进行
              </p>
            </div>
          </div>
        </mu-card-text>
      </mu-card>
    </div>

    <van-action-sheet v-model="show" :actions="actio" cancel-text="取消" @click-overlay="onCancel" @cancel="Cancel" @select="onSelect" />

    <!-- 模态框 -->
    <Model @refresh='refresh' @hideFn="PocketModelHide" v-show="PocketModelShow" :boolean="PocketModelShow">
      <h1 slot="title" class="title">
        资金已成功划转至理财资产账户，马上进行理财交易
      </h1>
      <div slot="conent">
        <img class="imgbox" src="../../../static/images/Transferred/asset@2x.png" />
        <section class="btn" @click="$router.replace('/investment')">
          理财交易
        </section>
      </div>
    </Model>
    <Model @refresh='refresh' @hideFn="mineModelHide" v-show="mineModelShow" :boolean="mineModelShow">
      <h1 slot="title" class="title">
        资金已成功划转至矿机资产账户，马上进行矿机交易
      </h1>
      <div slot="conent">
        <img class="imgbox" src="../../../static/images/Transferred/asset@2x.png" />
        <section class="btn" @click="$router.replace('/miner')">
          矿机交易
        </section>
      </div>
    </Model>
    <Model @refresh='refresh' @hideFn="quantityModelHide" v-show="reEnvelopes" :boolean="reEnvelopes">
      <h1 slot="title" class="title">
        资金已成功划转至红包资产账户，马上进行红包交易
      </h1>
      <div slot="conent">
        <img class="imgbox" src="../../../static/images/Transferred/asset@2x.png" />
        <section class="btn" @click="$router.replace('/rpacket')">
          红包交易
        </section>
      </div>
    </Model>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Form, ActionSheet } from 'vant'
Vue.use(Field)
Vue.use(Form)
Vue.use(ActionSheet)
import Model from '../../components/Model-Dialog'
export default {
  name: 'Transfer',
  data: () => ({
    switchTo: true, // 默认是从红包资产到理财资产
    switchText: '',
    assetAccounts: [],
    asset: {
      id: '',
      user_id: '',
      coin: '',
      freeze: '',
      quantity: '',
      address: '',
      invest_quantity: '',
      invest_freeze: '',
      miner_quantity: '',
      miner_freeze: ''
    },
    loading: false,
    key: '',
    form: {
      from: 'quantity',
      to: 'invest_quantity',
      amount: ''
    },
    popup: {
      show: false
    },
    activeNames: ['1'],
    submitting: false,
    coin: '', // 币种
    amount: '', // 转化数量
    show: false,
    actions: [],
    PocketModelShow: false,
    mineModelShow: false,
    reEnvelopes: false,
    leftName: '红包资产',
    rightName: '理财资产',
    nooeleftName: '' || '红包资产',
    nodeRightName: '' || '理财资产',
    assetNum: 0, //划转可用金额
    actio: []
  }),
  components: {
    Model
  },
  computed: {
    from() {
      return this.assetAccounts.find(item => item.name === this.form.from)
    },
    to() {
      return this.assetAccounts.find(item => item.name === this.form.to)
    }
  },
  mounted() {
    this.assetsTransfer(true)
  },
  methods: {
    refresh() {
      this.amount = ''
      this.assetsTransfer(false)
    },
    PocketModelHide(e) {
      if (!e) {
        this.PocketModelShow = e
        return
      }
    },
    mineModelHide(e) {
      if (!e) {
        this.mineModelShow = e
        return
      }
    },
    quantityModelHide(e) {
      if (!e) {
        this.reEnvelopes = e
        return
      }
    },
    submit() {
      const { amount } = this
      var _charCodeAt = (newProp, oldProp) => {
        let len = newProp.length
        for (let i = 0; i < len; i++) {
          return newProp.charCodeAt(i) === oldProp.charCodeAt(i)
        }
      }

      this.$nextTick(() => {
        let nooeleftName = this.$refs.from.innerText // 开始
        let nodeRightName = this.$refs.to.innerText // 结束

        let left, rigth

        if (_charCodeAt(nooeleftName, '红包资产')) {
          left = 'quantity'
        } else if (_charCodeAt(nooeleftName, '矿机资产')) {
          left = 'miner_quantity'
        } else if (_charCodeAt(nooeleftName, '理财资产')) {
          left = 'invest_quantity'
        }

        if (_charCodeAt(nodeRightName, '红包资产')) {
          rigth = 'quantity'
        } else if (_charCodeAt(nodeRightName, '矿机资产')) {
          rigth = 'miner_quantity'
        } else if (_charCodeAt(nodeRightName, '理财资产')) {
          rigth = 'invest_quantity'
        }

        let obj = {
          from: left,
          to: rigth,
          amount
        }

        this.$http.post('/assets/transfer', obj).then(response => {
          console.log(response.data.status)
          if (response.data.status === 200) {
            if (obj.to === 'miner_quantity') {
              // 矿机
              this.mineModelShow = true
            } else if (obj.to === 'invest_quantity') {
              // 理财
              this.PocketModelShow = true
            } else if (obj.to === 'quantity') {
              //理财到红包
              this.reEnvelopes = true
            }
          }
        })
      })
    },
    chooseAssets(key) {
      this.key = key
      this.popup.show = true
    },
    replace(deter) {
      this.$nextTick(() => {
        //清空表单
        this.amount = null
        let nooeleftName = this.$refs.to.innerText // 开始
        var _charCodeAt = (newProp, oldProp) => {
          let len = newProp.length
          for (let i = 0; i < len; i++) {
            return newProp.charCodeAt(i) === oldProp.charCodeAt(i)
          }
        }
        if (_charCodeAt(nooeleftName, '红包资产')) {
          this.assetNum = this.asset.quantity
        } else if (_charCodeAt(nooeleftName, '矿机资产')) {
          this.assetNum = this.asset.miner_quantity
        } else if (_charCodeAt(nooeleftName, '理财资产')) {
          this.assetNum = this.asset.invest_quantity
        }
      })
      if (deter) {
        this.switchTo = !this.switchTo
      }
    },
    determine() {
      this.$nextTick(() => {
        //清空表单
        this.amount = null
        let nooeleftName = this.$refs.from.innerText // 开始
        var _charCodeAt = (newProp, oldProp) => {
          let len = newProp.length
          for (let i = 0; i < len; i++) {
            return newProp.charCodeAt(i) === oldProp.charCodeAt(i)
          }
        }
        if (_charCodeAt(nooeleftName, '红包资产')) {
          this.assetNum = this.asset.quantity
        } else if (_charCodeAt(nooeleftName, '矿机资产')) {
          this.assetNum = this.asset.miner_quantity
        } else if (_charCodeAt(nooeleftName, '理财资产')) {
          this.assetNum = this.asset.invest_quantity
        }
      })
    },
    async assetsTransfer(tale) {
      await this.$http.get('/assets/transfer').then(response => {
        const { asset, assetAccounts } = response.data
        let arr = Array.from(assetAccounts)
        this.actions = arr.map(prop => {
          let attr = prop.name
          prop.name = prop.text
          prop.text = attr
          return prop
        })
        this.asset = asset
        if (tale) {
          this.assetNum = this.asset.quantity
        } else {
          this.determine()
        }
      })
    },
    onCancel() {
      let nodeRightName = this.$refs.to.innerText // 结束
      var _charCodeAt = (newProp, oldProp) => {
        let len = newProp.length
        for (let i = 0; i < len; i++) {
          return newProp.charCodeAt(i) === oldProp.charCodeAt(i)
        }
      }
      this.actio = this.actions.filter(item => {
        return !_charCodeAt(item.name, nodeRightName)
      })
      this.filter = !this.filter
      this.show = !this.show
      const { switchTo, amount } = this
    },
    Cancel() {
      this.filter = !this.filter
    },
    onSelect(action, index) {
      
      console.log(action, index)
      this.filter = this.show = false
      console.log(this.switchTo);
      
      if(this.switchTo){
        this.leftName = action.name
      }else{
        this.rightName = action.name
      }
      
      
      this.nooeName = action.text
      this.nooeleftName = action.name

      this.$nextTick(() => {
        //清空表单
        this.amount = null
        let nooeleftName = this.$refs.from.innerText // 开始

        var _charCodeAt = (newProp, oldProp) => {
          let len = newProp.length
          for (let i = 0; i < len; i++) {
            return newProp.charCodeAt(i) === oldProp.charCodeAt(i)
          }
        }

        if (_charCodeAt(nooeleftName, '红包资产')) {
          this.assetNum = this.asset.quantity
        } else if (_charCodeAt(nooeleftName, '矿机资产')) {
          this.assetNum = this.asset.miner_quantity
        } else if (_charCodeAt(nooeleftName, '理财资产')) {
          this.assetNum = this.asset.invest_quantity
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  color: #000000;
  font-size: 0.96rem;
  text-align: center;
}
.imgbox {
  width: 4.96rem;

  height: 5.547rem;
  margin: 1.387rem auto;
  margin-bottom: 2.027rem;
  display: block;
}

.btn {
  width: 5.333rem;
  height: 1.707rem;
  margin: 0 auto;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 1.44rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.747rem;
  color: #fff;
}

// ------------------
.van-popup {
  background-color: rgba(23, 24, 24, 1) !important;
}
.van-action-sheet__item {
  border-top: 1px solid #333;
  background-color: rgba(23, 24, 24, 1) !important;
  color: #fff;
  width: 90%;
  font-size: 0.64rem;
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
.button {
  width: 16.267rem;
  height: 2.133rem;
  margin: 0 auto;
  margin-top: 1.547rem;
  font-size: 0.853rem;
  border-radius: 0.32rem;
}

.history {
  width: 1.28rem;
  height: 1.227rem;
  display: block;
}
.transfer {
  .main {
    width: 17.867rem;
    margin: 0 auto;
    border-radius: 0.32rem;
    .trans_box {
      width: 100%;
      color: #fff;
      font-size: 0.747rem;
      .coin {
        h3 {
          margin-bottom: 0.64rem;
        }
        input {
          padding: 0.32rem 0;
        }
        padding-bottom: 14px;
        border-bottom: 1px solid #333333;
      }
      .transfer_cont {
        margin-top: 0.853rem;
        position: relative;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            color: #999999;
            font-size: 0.747rem;
          }
        }
        > span {
          position: absolute;
          right: 0;
          top: 50%;
        }
        input {
          padding: 0.533rem 0;
        }
      }
    }
    .img_box {
      width: 1.173rem;
      height: 0.96rem;
      display: inline-block;
    }
    .icon_right {
      width: 0.373rem;
      height: 0.64rem;
    }
  }
}

.mu-card-header {
  background-color: #171818;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  padding: 1.6rem 0.853rem;
}

.mu-card-text {
  padding: 0;
  width: 17.867rem;
  background-color: #171818;
  margin-top: 0.8rem;
}

.mu-card {
  background-color: transparent;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
}

.mu-form {
  padding: 0.8rem 0.8rem;
  // margin-top: 0.8rem;
}

.mu-form-item {
  /deep/ .mu-form-item-label {
    color: #fff;
  }
}

.mu-input-content {
  /deep/ .mu-input-line {
    background-color: #171818;
  }
}
input[type='text'] {
  outline: 0;
  border: 0;
  background-color: transparent;
  border-bottom: 1px solid #333333;
  width: 100%;
}
input[type='text']::placeholder {
  color: #fff;
}
.card_t {
  margin-top: 1.6rem;
  .card_text {
    font-size: 0.64rem;
    color: #999999;
  }
}

.transfer {
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
  /deep/ .van-hairline--top:after{
    border-top-width : 0
  }
}
.main {
  /deep/ .van-col {
    width: 30.3%;
  }
  /deep/ .van-row {
    padding-left: 25px;
  }
}
</style>
