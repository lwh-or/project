<template>
  <div class="histryAward">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title"
           style="color:#fff;">历史开奖</div>
    </Header>
    <div class="main">
      <el-card class="box-card"
               v-for="item in histroyList"
               :key="item.id">
        <div slot="header"
             class="clearfix">
          <span class="private">期号：{{item.number}}</span>
        </div>
        <div class="list">
           <div>
            <p>奖池金额</p>
            <p>中奖总金额</p>
            <p>开奖时间</p>
          </div>
          <div>
            <p>{{item.show_proportion}} YDN</p>
            <p>{{item.winning_quantity ? item.winning_quantity : '--'}} YDN</p>
            <!-- <span>22222 YDN</span> -->
            <p>{{item.open_time | formatData}}</p>
          </div>
         
          <!-- 这里需要将一个投注期数id转递过去 -->
          <div @click="toLottery(item)">
            <span>查看详情</span>
            <img src="/static/images/cathectic/gen@2x.png" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Card } from "element-ui";
Vue.use(Card);
export default {
  name: "histryAward",
  data () {
    return {
      histroyList: [],
    };
  },
  mounted () {
    this.prizePoollog();
  },
  methods: {
    toLottery (item) {
      var arr = JSON.stringify(item)
      this.$router.push('/lotterydetails/' + encodeURIComponent(arr));
    },
    prizePoollog () {
      this.$http
        .get(`/prize-pool/log`)
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res.data.data)
            this.histroyList = res.data.data
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.history {
  width: 4.512rem;
  height: 1.381rem;
  display: block;
  background-color: #171818;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.743rem;
}
.histryAward {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 1.067rem;
  .main {
    width: 17.813rem;
    margin: 0 auto;
    .box-card {
      width: 17.813rem;
      background-color: #171818;
      margin: 0 auto;
      margin-top: 1.067rem;
    }
    .list {
      div {
        margin-top: 0.353rem;
        // display: flex;
      }
      display: flex;
      justify-content: space-around;
      position: relative;
      padding-bottom: 26px;
      
      > div:nth-child(1) {
        color: #0be2b6;
        font-size: 0.747rem;
        // display: flex;
        width: 100px;
        // justify-content: space-around;
        // flex-direction: column;
         p{
          //  display: inline-block;
          //  width: 58.933333rem;
          width: 100%;
           text-align: left;
           color: white;
           line-height: 30px;
        }
      }
      > div:nth-child(2) {
        width: 150px;
        color: #ffffff;
        font-size: 0.64rem;
        display: flex;
        // justify-content: space-around;
        flex-direction: column;
        p{
           line-height: 30px;
          color: #0be2b6;
          font-size: 14px;
          text-align: right;
        }
      }
      > div:nth-child(3) {
        position: absolute;
        bottom: 5px;
        right: 0;
        color: #0be2b6;
        font-size: 0.747rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          width: 0.373rem;
          height: 0.587rem;
          display: block;
          margin-left: 0.373rem;
          margin-right: 0.48rem;
        }
      }
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 0.107rem 0.853rem;
}

.el-card {
  background-color: transparent;
  border: none;
}

.clearfix {
  padding: 0 0.8rem;
}

.private {
  color: #fff;
  font-size: 0.64rem;
}

.el-card /deep/ .el-card__header {
  border-color: #333333;
  padding: 0.533rem 0rem;
}

.el-card /deep/ .el-card__body {
  padding: 0;
}
</style>
