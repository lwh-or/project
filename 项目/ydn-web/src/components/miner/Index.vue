<template>
  <div id="miner">
    <Header>
      <img
        @click="$router.push('/')"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">矿机</div>
      <div
        slot="right"
        style="color:#fff;width: 1.066667rem;height: 1.173333rem;margin-bottom: .8rem;"
        @click="$router.push('/miner/list')"
      >
        <img
          src="../../../static/images/miner/phone@2x.png"
          alt=""
          style="width:100%;heigth:100%"
        />
      </div>
    </Header>
    <van-circle
      class=""
      :rate="rate"
      color="#0BE2B6"
      v-model="radio"
      size="138px"
      :stroke-width="60"
      text="5000"
    >
      <div class="cir-btn">
        <span class="cir-text">{{ dashboard[1].value }}</span>
        <span class="cir-leiji">累计产出</span>
      </div>
    </van-circle>
    <div class="miner-con">
      <div class="miner-produce">
        <!-- <p>10.000</p> -->
        <p>{{ dashboard[0].value }}</p>
        <p>昨日产出(YDN)</p>
      </div>
      <div class="miner-produce">
        <!-- <p>10.000</p> -->
        <p>{{ dashboard[2].value }}</p>
        <p>团队矿机数(台)</p>
      </div>
    </div>

    <!-- 我的团队 -->
    <div class="mine-myteam">
      <div class="mine-team-top">我的矿机团队</div>
      <div class="mine-team-con">
        <div class="mine-team-text">
          <div>{{ recommendedMiner[0].micro }}</div>
          <!-- <div class="mine-team-centest">
            <p>昨日产出：{{ recommendedMiner[1].micro_yesterday }}YDN</p>
            <p>累计产出：{{ recommendedMiner[2].micro_count }}YDN</p>
          </div> -->
          <div class="mine-shan"></div>
        </div>
        <div class="mine-team-text">
          <div>{{ this.recommendedMiner[0].small }}</div>
          <!-- <div class="mine-team-centest">
            <p>昨日产出：{{ recommendedMiner[1].small_yesterday }}YDN</p>
            <p>累计产出：{{ recommendedMiner[2].small_count }}YDN</p>
          </div> -->
          <div class="mine-shan"></div>
        </div>
        <div class="mine-team-text">
          <div>{{ recommendedMiner[0].medium }}</div>
          <!-- <div class="mine-team-centest">
            <p>昨日产出：{{ recommendedMiner[1].medium_yesterday }}YDN</p>
            <p>累计产出：{{ recommendedMiner[2].medium_count }}YDN</p>
          </div> -->
          <div class="mine-shan"></div>
        </div>
        <div class="mine-team-text">
          <div>{{ recommendedMiner[0].large }}</div>
          <!-- <div class="mine-team-centest">
            <p>昨日产出：{{ recommendedMiner[1].micro_yesterday }}YDN</p>
            <p>累计产出：{{ recommendedMiner[2].large_count }}YDN</p>
          </div> -->
          <div class="mine-shan"></div>
        </div>
      </div>
    </div>

    <div class="miner">
      <p>矿机</p>
    </div>
    <!-- 矿机 -->
    <div class="miner-content">
      <div class="miner-content-item" v-for="item in list" :key="item.id">
        <div class="mc-item-left">
          <img :src="item.image.url" alt="" />
          <div class="mc-item-left-text">
            <p class="f-12">{{ item.price }}</p>
            <p class="f-12">{{ item.name }}</p>
          </div>
        </div>
        <div class="mc-item-right">
          <div class="mc-item-right-text">
            <p class="f-12">
              日产：<span>{{ item.nissan }}</span>
            </p>
            <p class="f-12">产能{{ item.capacity }}天</p>
          </div>
          <div class="kuan" @click="$router.push(`/purchase/${item.id}`)">
            购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    dashboard: [
      {
        text: '昨日产出',
        value: '',
        unit: 'YDN'
      },
      {
        text: '累计产出',
        value: '',
        unit: 'YDN'
      },
      {
        text: '团队矿机数',
        value: '',
        unit: '台'
      }
    ],
    recommendedMiner: [
      {
        micro: '微矿机 0 台',
        small: '小矿机 0 台',
        medium: '中矿机 0 台',
        large: '大矿机 0 台'
      },
      {
        micro_yesterday: 0,
        small_yesterday: 0,
        medium_yesterday: 0,
        large_yesterday: 0
      },
      {
        micro_count: 0,
        small_count: 0,
        medium_count: 0,
        large_count: 0
      }
    ],
    list: [],
    refreshing: false,
    loading: false,
    finished: false,
    error: false,
    pagination: {
      page: 1,
      limit: 10
    },
    rate: 60,
    currentRate: 100,
    radio: 0 //仪表盘比率
  }),
  created() {
    //仪表盘数据
    this.$http.get('/miner/dashboard').then(response => {
      //miner_recom_count

      const data = response.data.data
      this.dashboard[0].value = data.yesterday_output //昨日产出
      this.dashboard[1].value = data.cumulative_output //累计产出
      this.dashboard[2].value = data.miner_team_count //团队矿机数
      if (data.radio <= 0) {
        this.radio = 0
      } else {
        this.radio = data.radio *= 1 //仪表盘比率
      }
      this.recommendedMiner[0].micro = `微型矿机 ${data.miner_recom_count.miner1} 台`
      this.recommendedMiner[0].small = `小型矿机 ${data.miner_recom_count.miner2} 台`
      this.recommendedMiner[0].medium = `中型矿机 ${data.miner_recom_count.miner3} 台`
      this.recommendedMiner[0].large = `大型矿机 ${data.miner_recom_count.miner4} 台`

      this.recommendedMiner[1].micro_yesterday =
        data.miner_recom_count.miner1_yesterday
      this.recommendedMiner[1].small_yesterday =
        data.miner_recom_count.miner2_yesterday
      this.recommendedMiner[1].medium_yesterday =
        data.miner_recom_count.miner3_yesterday
      this.recommendedMiner[1].large_yesterday =
        data.miner_recom_count.miner4_yesterday

      this.recommendedMiner[2].micro_count = data.miner_recom_count.miner1_count
      this.recommendedMiner[2].small_count = data.miner_recom_count.miner2_count
      this.recommendedMiner[2].medium_count =
        data.miner_recom_count.miner3_count
      this.recommendedMiner[2].large_count = data.miner_recom_count.mine4_count
    }),
      this.$http
        .get('/miner', {
          //款机数据列表
          params: this.pagination
        })
        .then(response => {
          this.loading = false
          if (response.data.data.length) {
            response.data.data.map(item => {
              this.list.push(item)
            })
            this.pagination.page++
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
  },
  methods: {




    
    buy() {
      this.$router.push({ path: '/miner/${item.id}/buy' })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push('/miner/list')
    },



    onLoad() {
      this.$http
        .get('/miner', {
          params: this.pagination
        })
        .then(response => {
          this.loading = false
          if (response.data.data.length) {
            response.data.data.map(item => {
              this.list.push(item)
            })
            this.pagination.page++
          } else {
            this.finished = true
          }
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

<style scoped lang="less">
#miner {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  /deep/ .header {
    height: 3.413333rem;
  }
}

.van-panel__header {
  padding: 10px;
}

.van-panel--miner .el-table__row .van-cell {
  padding: 0;
}

.van-panel .van-panel__content .van-cell {
  font-size: 12px;
}
.van-circle {
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 1.493333rem;
}
.cir-btn {
  margin-top: 50px;
}
.cir-btn > .cir-text {
  font-size: 0.96rem;
  font-weight: bold;
  color: white;
  display: block;
  line-height: 20px;
}
.cir-btn > .cir-leiji {
  font-size: 14px;
  font-weight: bold;
  color: #999999;
}
.miner-con {
  width: 100%;
  color: white;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.miner-produce p:first-child {
  font-size: 16px;
  font-weight: bold;
}
.miner-produce p:last-child {
  color: #999999;
}
.mine-myteam {
  width: 17.866667rem;
  height: 12.266667rem;
  margin: auto;
  border: 0.053333rem solid #333333;
  margin-top: 1.066667rem;
  box-shadow: 0 2px 10px 2px #333333;
  border-radius: 0.266667rem;
  background-color: #171818;
}
.mine-team-top {
  width: 100%;
  height: 2.773333rem;
  color: white;
  font-size: 16px;
  padding-left: 0.8rem;
  line-height: 2.773333rem;
  border-bottom: 1px solid #333333;
}
.mine-team-con {
  width: 100%;
  height: 8.373333rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.mine-team-text {
  width: 8.853333rem;
  height: 3.213333rem;
  
  padding-left: 0.8rem;
  border-bottom: 1px solid #333333;
  position: relative;
}
.mine-team-text div:first-child {
  margin-top: 0.8rem;
  font-size: 14px;
}
.mine-team-text .mine-team-centest {
  font-size: 10px;
  color: #999999;
}
.mine-shan {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 21px;
  height: 21px;
  background: url('../../../static/images/miner/Combined.png') no-repeat;
  background-size: 100% 100%;
}
.miner {
  width: 50px;
  color: white;
  margin: 20px 0 15px 35px;
  font-size: 18px;
  letter-spacing: 0.16rem;
}
.miner-content {
  width: 335px;
  margin: auto;
}
.miner-content-item {
  width: 335px;
  height: 3.733333rem;
  box-shadow: 0 2px 10px 2px #333333;
  display: flex;
  margin-bottom: 1.066667rem;
  background-color: #171818;
  border-radius: .32rem;
}
.mc-item-left {
  width: 139px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // border-right: 0.08rem dashed #333333;
  border-right: 0.08rem solid #333333;
}
.mc-item-left-text {
  text-align: center;
  line-height: 20px;
}
.mc-item-left-text p:first-child {
  color: #29acad;
}
.mc-item-left-text p {
  color: white;
}
.mc-item-left img {
  width: 35px;
  height: 33px;
}
.mc-item-right {
  width: 195px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.mc-item-right-text {
  text-align: left;
  line-height: 20px;
}
.mc-item-right-text p:first-child {
  color: #29acad;
}
.mc-item-right-text p {
  color: white;
}
.kuan {
  width: 3.626667rem;
  height: 1.813333rem;
  background: url('../../../static/images/miner/kuan37@3x.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 1.653333rem;
  color: white;
}
</style>
