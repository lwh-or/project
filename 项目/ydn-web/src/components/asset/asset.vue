<template>
  <div id="asset">
    <div class="asset">
      <Header>
        <div slot="title" style="color:#fff;">资产</div>
      </Header>

      <!--  -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) of swiperAsset" :key="index" style="background: url(/static/images/asset/card@2x.png) no-repeat;background-size: cover;">
            <div class="ynd_content">
              <div class="slide_top">
                <p class="totalPice">{{ item.name }}(YDN)</p>

                <img @click="showObj[index].show = !showObj[index].show" :src="
                    showObj[index].show
                      ? `/static/images/asset/icon-backup-on4@2x.png`
                      : `/static/images/asset/icon-backup4@2x.png`
                  " />

              </div>
              <div class="slide_pice">
                {{ showObj[index].show ? asset.total || "0" : "******" }}
              </div>
              <div class="slide_bottom">
                <div :class="isShowSilde ? 'slide_box' : 'slide_total2' ">
                  <div class="slide_total">
                    <!-- {{
                      showObj[index].show ? asset.total_bonus || "0" : "******"
                    }} -->
                    {{slide_num}}<span v-if="!isShowSilde"> YDN</span>
                  </div>
                  <div class="yesterday">{{slide_title}}</div>
                </div>
                <div class="slide_box">
                  <div class="slide_total" v-if="index === 0">
                    {{
                      showObj[index].show
                        ? asset.yesterday_bonus || "0"
                        : "******"
                    }}
                  </div>
                  <div class="yesterday" v-if="index === 0">昨日释放(YDN)</div>
                </div>
              </div>
              <!-- 定位图标 -->
              <img v-if="item.id === 1" @click="showList = true" class="ynd_logo" src="/static/images/asset/cake@2x.png" />
              <span class="ynd_logo ynd_logo_r" @click="$router.push('/rpacket')" style="width:2.56rem;height:.907rem;display:block;" v-if="item.id === 2">购买红包</span>
              <span class="ynd_logo ynd_logo_r" @click="$router.push('/investment')" v-if="item.id === 3">购买理财</span>
              <span class="ynd_logo ynd_logo_r" @click="$router.push('/miner')" v-if="item.id === 4">购买矿机</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 充值，提币，划转 -->
      <div class="crads">
        <div class="crad_item" v-for="item of trade_list" :key="item.id" @click="$router.push(`${item.link}`)">
          <img class="pic" :src="item.url" />
          <p>{{ item.title }}</p>
        </div>
      </div>

      <!-- main -->
      <!-- 这里会根据其value 选择性的跳转页面 -->
      <!--  @load="onLoad" -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <mu-list class="asset_list" v-show="!isModel">
          <!--  -->
          <mu-list-item style="margin-top:0.373333rem;">
            <mu-list-item-title style="color:#fff">{{ name }}</mu-list-item-title>
            <mu-list-item-action>
              <mu-list-item-after-text style="color:#fff" @click="isModel = !isModel">
                <img :src="
                  isModel
                    ? `/static/images/asset/filtrate-on@2x.png`
                    : `/static/images/asset/filtrate@2x.png`
                " class="filtrate_icon" />
              </mu-list-item-after-text>
            </mu-list-item-action>
          </mu-list-item>
          <van-divider :style="{ borderColor: '#333333', padding: '0 16px' }"></van-divider>

          <template v-if="log.length">
            <div class="item" v-for="(item,index2) of log" :key="index2">
              <!-- data -->
              <mu-list-item button :value="item">
                <mu-list-item-content>
                  <mu-list-item-title class="t_b">
                    {{ item.behavior }}</mu-list-item-title>

                  <mu-list-item-sub-title class="t_time">
                    {{
                    showObj[item.id].show
                      ? formatTime(item.createtime)
                      : "************"
                  }}
                  </mu-list-item-sub-title>

                  <mu-list-item-sub-title class="t-newTime" style="text-indent: 2.5em;">
                    时间
                  </mu-list-item-sub-title>
                </mu-list-item-content>

                <mu-list-item-content>
                  <mu-list-item-title></mu-list-item-title>

                  <mu-list-item-sub-title class="t-sub-title">
                    {{ showObj[item.id].show ? item.quantity : "************" }}
                  </mu-list-item-sub-title>

                  <mu-list-item-sub-title class="t-sub-count" style="text-indent: 2.5em;">
                    数量
                  </mu-list-item-sub-title>
                </mu-list-item-content>

                <mu-list-item-content class="item_content">
                  <mu-list-item-title v-if="(index === 2 && item.behavior_id === 0) ? false : true" class="t-sub-info" style="text-align: right;" @click=" index === 2 ? $router.push(`/orderDetails?id=${item.behavior_id}`) :
              $router.push(
                '/details/' + encodeURIComponent(JSON.stringify(item))
              )
            ">详情
                    <img src="../../../static/images/asset/genduo.png" />
                  </mu-list-item-title>
                  <template v-if="item.status === 0">
                    <mu-list-item-sub-title class="finish" style="color:#29ACAD">
                      待处理
                    </mu-list-item-sub-title>
                  </template>
                  <template v-if="item.status === 1">
                    <mu-list-item-sub-title class="finish" style="color:#FF4E5F">
                      已完成
                    </mu-list-item-sub-title>
                  </template>
                  <template v-if="item.status === 2">
                    <mu-list-item-sub-title class="finish" style="color:#F7B500">
                      失败
                    </mu-list-item-sub-title>
                  </template>
                  <mu-list-item-sub-title class="status">
                    状态
                  </mu-list-item-sub-title>
                </mu-list-item-content>
              </mu-list-item>
              <van-divider :style="{ borderColor: '#333333', padding: '0 16px' }"></van-divider>
            </div>
          </template>
          <template v-else>
            <BlankPage class="BlankPage" :height="height">
              <img class="img" src="../../../static/images/RedPack/undraw@2x.png" slot="img" />
              <p slot="text">没有更多了</p>
            </BlankPage>
          </template>
          <!--  -->
        </mu-list>
      </van-list>
      <!-- 筛选弹出层 -->

      <van-popup v-model="isModel" round position="bottom">
        <div class="list">
          <div class="model_top">
            <div class="title">资产流水</div>
            <img class="filtrate_icon" @click="isModel = !isModel" src="/static/images/asset/filtrate-on@2x.png" />
          </div>
          <div class="van-hairline--bottom" style="background: #333333; height:.053rem;"></div>
          <div class="btn_list" v-if="option.length">
            <button v-for="item of option" :key="item.type" :class="['van_btn', item.type === type ? 'active' : '']" @click="filter(item.type)">
              {{ item.text }}
            </button>
          </div>
        </div>
      </van-popup>
    </div>
    <!-- 列表展示 -->
    <van-overlay :show="showList" class="asset_code">
      <div class="war">
        <div class="sess_case case">
          <Echarts :list="echartList" />
          <div class="bottom_log">
            <div>
              <div class="green"></div>
              <p class="es_text">理财:{{ invest }}%</p>
            </div>
            <div>
              <div class="ye"></div>
              <p class="es_text">矿机:{{ miner }}%</p>
            </div>
            <div>
              <div class="red"></div>
              <p class="es_text">红包:{{ canby }}%</p>
            </div>
          </div>
          <img @click="showList = false" class="clome" src="../../../static/images/miner/clome@2x.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import { mapState } from 'vuex'
import Vue from 'vue'
import Echarts from '../find/echarts'
import BlankPage from '../BlankPage'
import { List, Col } from 'vant'
Vue.use(List)
export default {
  name: 'asset',
  components: {
    Echarts,
    BlankPage
  },
  data() {
    return {
      selects: [], // 列表数据
      isModel: false,
      trade_list: [
        {
          title: '充值',
          url: '../../../static/images/asset/recharge@2x.png',
          link: '/recharge',
          id: '1'
        },
        {
          title: '提币',
          url: '../../../static/images/asset/specimen@2x.png',
          link: '/withdraw',
          id: '2'
        },
        {
          title: '划转',
          url: '../../../static/images/asset/transfer@2x.png',
          link: '/transfer',
          id: '3'
        }
      ],
      type: '',
      name: '资产流水',
      loading: false,
      finished: false,
      asset: {}, // ---------------------
      log: [],
      option: [], //
      banner: [],
      list: [],
      swiperAsset: [
        { name: '总资产', id: 1, desc: '资产流水' },
        { name: '红包资产', id: 2, desc: '红包流水' },
        { name: '理财资产', id: 3, desc: '理财流水' },
        { name: '矿机资产', id: 4, desc: '矿机流水' }
      ],
      //-------------------
      allpage: 0, // 第几页
      candypage: 1, // 红包页码
      investpage: 1,
      //------------------
      upLoading: true, // 是否加载数据
      index: 0,
      total: '0.0000',
      showObj: [{ show: true }, { show: true }, { show: true }, { show: true }],
      assets: {
        red_package: [],
        investment: [],
        conversion_total: ''
      },
      height: '10.667rem',
      showList: false,
      yesterday_bonus: '',
      total_bonus: '',
      assembleList: [],
      echartList: [],
      canby: 0.0, //红包比率
      invest: 0.0, //理财比率
      miner: 0.0, //矿机比率
      slide_title: '',
      slide_num: '',
      isShowSilde: true,
      inter: [] //中介者
    }
  },
  watch: {
    index() {
      if (this.index === 0) {
        this.slide_title = '累计释放(YDN)'
        this.slide_num = this.asset.total_bonus
        this.isShowSilde = true
      } else if (this.index === 1) {
        this.slide_title = '可用 : '
        this.slide_num = this.asset.asset_all.quantity
        this.isShowSilde = false
      } else {
        this.slide_title = '昨日收益 : '
        this.slide_num = this.asset.yesterday_bonus
        this.isShowSilde = false
      }
    }
  },
  methods: {
    formatTime(timestamp) {
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
      return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    sliderMove(index) {
      this.index = index
      this.name = this.swiperAsset[index].desc
      let self = this
      switch (index) {
        case 0:
          self.wallet()
          break
        case 1:
          self.wallet('candy')
          break
        case 2:
          self.wallet('invest')
          break
        case 3:
          self.wallet('miner')
          break
        default:
          break
      }

      this.page = 1
    },
    onLoad() {
      this.wallet()
    },
    wallet(prop, option) {
      var _map = function(data, id) {
        return data.map(item => {
          item.id = id
          return item
        })
      }

      if (prop && !option) {
        // 只有prop
        console.log('111----------------')
        // 红包，矿机,理财全部
        this.$http.get(`/wallet/asset?account=${prop}`).then(res => {
          console.log(res)

          if (res.data.status == 200) {
            var data = res.data.data
            this.asset = data.asset

            let log = data.log
            this.option = data.option
            if (prop === 'candy') {
              this.log = _map(log.data, 1)
            } else if (prop === 'invest') {
              this.log = _map(log.data, 2)
            } else if (prop === 'miner') {
              this.log = _map(log.data, 3)
            }
          }
        })
      } else if (!prop && option) {
        // 只有option
        console.log('222-------------------')
        // 首页资产指定option
        this.log = []
        this.$http.get(`/wallet/asset?option=${option}`).then(res => {
          if (res.data.status == 200) {
            var data = res.data.data
            this.asset = data.asset
            console.log(data.log)

            let log = data.log
            this.option = data.option
            this.log = _map(log.data, 0)
          }
        })
      } else if (prop && option) {
        // 两个都有
        console.log('333-----------------')
        // 指定在那个板块下，指定option向上刷
        this.log = []
        this.$http
          .get(`/wallet/asset?account=${prop}&option=${option}`)
          .then(res => {
            if (res.data.status == 200) {
              var data = res.data.data
              this.asset = data.asset
              let log = data.log
              this.option = data.option
              if (prop === 'candy') {
                this.log = _map(log.data, 3)
              } else if (prop === 'invest') {
                this.log = _map(log.data, 1)
              } else if (prop === 'miner') {
                this.log = _map(log.data, 2)
              }
            }
          })
      } else if (!prop && !option) {
        // 两个都没有
        console.log('4444--------------')

        // 首页资产
        this.allpage++
        this.$http.get(`/wallet/asset?page=${this.allpage}`).then(res => {
          if (res.data.status == 200) {
            var data = res.data.data
            this.loading = false
            this.asset = data.asset
            let logData = data.log.data
            // this.log = [...this.log,...logData]

            if (logData.length === 0) {
              this.log = this.inter
              this.finished = true
              return
            }

            this.option = data.option
            let list = _map(logData, 0)
            this.inter = [...this.log, ...list]
            this.log = this.inter

            this.slide_title = '累计释放(YDN)'
            this.slide_num = this.asset.total_bonus
          }
        })
      }
    },
    filter(type) {
      const { index } = this
      this.type = type
      switch (index) {
        case 0:
          this.wallet(null, type)
          break
        case 1:
          this.wallet('candy', type)
          break
        case 2:
          this.wallet('invest', type)
          break
        case 3:
          this.wallet('miner', type)
          break
        default:
          break
      }
      this.isModel = false
    },
    _initSwiper() {
      let self = this
      this.$nextTick(() => {
        this.swiper = new Swiper('.swiper-container', {
          slidesPerView: 'auto', // 默认显示 slide 的数量
          spaceBetween: 15, // 设置每一个 slide 间距
          centeredSlides: true, // active slide会居中，而不是默认状态下的居左。
          on: {
            slideChange: function() {
              self.sliderMove(this.activeIndex)
            }
          }
        })
      })
    },
    setAsset() {
      this.$http.get(`/wallet/asset`).then(res => {
        console.log(res)

        if (res.data.status == 200) {
          this.asset = res.data.data.asset
        }
      })
    }
  },
  created() {
    this._initSwiper() // 初始化
    this.wallet() // 首页钱包
    this.setAsset()
  },
  mounted() {
    //别删  列表数据
    setTimeout(() => {
      let miner = {}
      let quantity = {}
      let invest = {}
      // miner["value"] = Number(this.asset.asset_all.miner_quantity);
      // quantity["value"] = Number(this.asset.asset_all.quantity);
      // invest["value"] = Number(this.asset.asset_all.invest_quantity);
      miner['value'] = Number(this.asset.ratio.miner)
      quantity['value'] = Number(this.asset.ratio.candy)
      invest['value'] = Number(this.asset.ratio.invest)
      this.echartList.push(miner)
      this.echartList.push(quantity)
      this.echartList.push(invest)

      this.canby = (Number(this.asset.ratio.candy) * 100).toFixed(2)
      this.invest = (Number(this.asset.ratio.invest) * 100).toFixed(2)
      this.miner = (Number(this.asset.ratio.miner) * 100).toFixed(2)
    }, 1000)
  },
  computed: {
    ...mapState(['conversion_total'])
  }
}
</script>
<style lang="less" scoped>
@import '../../../static/css/swiper.css';

.swiper-container {
  touch-action: none;
}

/deep/ .item {
  li {
    height: 3.04rem;
    margin-top: 1.066667rem;
  }
}
#asset {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.067rem;
  /deep/ .header {
    height: 3.413333rem;
  }
}
.filtrate_icon {
  margin-top: 0.213rem;
}

.title {
  color: #ffffff;
  font-size: 0.853rem;
}
.asset_list {
  width: 17.867rem;
  background: rgba(23, 24, 24, 1);
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  margin: 0 auto;
  font-size: 0.64rem;
  margin-top: 2.027rem;
}
.van-popup--bottom {
  background-color: #171818;
}
//------------

.sess_case .bottom_log {
  width: 100%;
  height: 1.6rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.76rem;
  padding-bottom: 3.466667rem;
  div {
    display: flex;
    margin-right: 5px;
    .green {
      background-color: #0be2b6;
      width: 0.64rem;
      height: 0.64rem;
      margin-top: 0.16rem;
    }
    .ye {
      background-color: #f7b500;
      width: 0.64rem;
      height: 0.64rem;
      margin-top: 0.16rem;
    }
    .red {
      background-color: #ff4e5f;
      width: 0.64rem;
      height: 0.64rem;
      margin-top: 0.16rem;
    }
    .es_text {
      width: 75px;
      // margin-left: 0.533333rem;
      height: 1.066667rem;
      color: #666666;
      font-size: 10px;
      margin-top: 0;
      margin-bottom: 0;
      // text-align: center;
    }
  }
}
.asset_code {
  .war {
    .sess_case {
      // background-color: red;
      background: url('') white;
      border-radius: 16px;
      width: 305px;
      margin: 6.4rem auto 0;
      position: relative;
      img {
        width: 1.706667rem;
        height: 1.706667rem;
        margin: auto;
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

//------------------

/* list */
.list {
  padding: 0 1.867rem;
  padding-bottom: 1.6rem;
}

.popup {
  height: 50px;
}

.model_top {
  margin-top: 1.173rem;
  margin-bottom: 0.747rem;
  display: flex;
  justify-content: space-between;
}

.btn_list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0.427rem;
}

.t-sub-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 0.587rem;
    height: 0.533rem;
    display: block;
    margin-left: 0.213rem;
  }
}

.van_btn {
  width: 4.587rem;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 0.747rem;
  border: 1px solid transparent;
  background: rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  margin-top: 0.8rem;
  margin-right: 0.8rem;
  &:nth-child(3n + 3) {
    margin-right: 0px;
  }
}

.van_btn.active {
  color: #0be2b6;
  // border-color: #0be2b6;
  border: 1px solid #0be2b6;
}

[class*='van-hairline']::after {
  border-color: #333333;
}

#asset {
  /deep/ .van-list__finished-text {
    padding: 1.6rem 0;
  }
  /deep/ .disabled {
    .mu-item {
      height: 25px;
    }
  }
}
.t-sub-count {
  text-align: left;
  text-indent: 1rem;
}
.slide_total2 {
  display: flex;
  flex-direction: row-reverse;
}
</style>
