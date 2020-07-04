<template>
  <div id="LotteryDetails">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">{{ $route.meta.title }}</div>
    </Header>
    <!--  -->
    <div class="main">
      <header class="header">
        <span>期号：{{histryItem.number}}</span>
        <span>{{histryItem.open_time | formatData}}</span>
      </header>

      <ul class="list" v-if="list.length">
        <li class="item" v-for="(item,index) in list" :key="index">
          <div><span>{{item.level}}等奖</span><span>{{item.number}}</span></div>
          <div>
            <span>奖金：{{item.quantity}}</span>
            <div v-if="item.user.length > 0">
              获奖者:
              <p v-for="(item2,index) in item.user" :key="index">{{item2}}</p>
              <!-- <p v-else >--</p> -->
            </div>
            <div v-else>
              获奖者:--
            </div>
          </div>
        </li>
      </ul>
      <div v-else>
        <BlankPage>
          <img class="undraw_img" slot="img" src="../../../../static/images/miner/undraw_noted.png" alt="" />
          <p class="slot_text" slot="text">暂无记录</p>
        </BlankPage>
      </div>
    </div>
  </div>
</template>

<script>
import BlankPage from '../../../components/BlankPage'
export default {
  name: 'LotteryDetails',
  data() {
    return {
      histryItem: {},
      list: []
    }
  },
  mounted() {
    this.prizepoolDetails()
  },
  methods: {
    prizepoolDetails() {
      this.$http
        .get(`prize-pool/details?id=${this.histryItem.id}`)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            this.list = res.data.data
          }
        })
    }
  },
  created() {
    const {
      params: { item }
    } = this.$route
    this.histryItem = JSON.parse(item)
  }
}
</script>

<style lang="less" scoped>
#LotteryDetails {
  .main {
    width: 17.813rem;
    background-color: #171818;
    margin: 0 auto;
    margin-top: 1.653rem;
    border-radius: 0.32rem;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.747rem;
      color: #0be2b6;
      padding: 0 0.853rem;
      padding: 0.747rem;
      border-bottom: 1px solid #333333;
    }
    .list {
      padding: 0.853rem;
      .item {
        font-size: 0.64rem;
        color: #ffffff;
        border-bottom: 1px solid #333333;
        > div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          span:nth-child(1) {
            color: #0be2b6;
            font-size: 0.747rem;
          }
        }
        > div:nth-child(2) {
          margin-top: 0.3rem;
          margin-bottom: 1.44rem;
          display: flex;
          justify-content: space-between;
          > div {
            text-align: right;
            .active {
              color: #f7b500;
            }
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .slot_text {
    font-size: 20px;
    color: #666666;
    text-align: center;
  }
  .undraw_img {
    display: block;
    margin: 4.8rem auto 0;
    width: 4.746667rem;
    height: 4.266667rem;
  }
}
</style>
