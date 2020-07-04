<template>
  <div class="bgb">
    <!-- 我的订单 -->
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">我的订单</div>
    </Header>
    <!--  @load="onLoad" -->
    <!-- :immediate-check="false" -->
    <van-list v-model="loading" :error.sync="error" :finished="finished" error-text="请求失败，点击重新加载" @load="onLoad">
      <van-tabs swipeable background="#000" color="#29ACAD" title-inactive-color="#fff" title-active-color="#fff">
        <van-tab title="全部">
          <div class="order-con" v-if="oredrList.length">
            <div class="order-item" v-for="item of oredrList" :key="item.id">
              <div>
                <p>数量(YDN)</p>
                <p>{{ item.quantity }}</p>
              </div>
              <div>
                <p>利率</p>
                <p>{{ item.rate }}%</p>
              </div>
              <div>
                <p>下单时间</p>
                <p>{{ item.createtime | formatData }}</p>
              </div>
              <div>
                <p>到期时间</p>
                <p>{{ item.finishtime | formatData }}</p>
              </div>
              <div>
                <p>周期</p>
                <p>{{ item.cycle }}</p>
              </div>
              <div>
                <p>状态</p>
                <p class="on-r" @click="
                    $router.push({
                      path: '/orderDetails',
                      query: { id: item.id },
                    })
                  ">
                  {{ item.status ? "已完成" : "进行中"
                  }}<img src="../../../static/images/miner/right-icon@2x.png" />
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <BlankPage>
              <p class="slot_text" slot="text">暂无记录</p>
              <img class="undraw_img" slot="img" src="../../../static/images/miner/undraw_noted.png" alt="" />
            </BlankPage>
          </div>
        </van-tab>
        <van-tab title="进行中">
          <div class="order-con" v-if="inProgress.length">
            <div class="order-item" v-for="item of inProgress" :key="item.id">
              <div>
                <p>数量(YDN)</p>
                <p>{{ item.quantity }}</p>
              </div>
              <div>
                <p>利率</p>
                <p>{{ item.rate }}</p>
              </div>
              <div>
                <p>下单时间</p>
                <p>{{ item.createtime }}</p>
              </div>
              <div>
                <p>到期时间</p>
                <p>{{ item.finishtime }}</p>
              </div>
              <div>
                <p>周期</p>
                <p>{{ item.cycle }}</p>
              </div>
              <div>
                <p>状态</p>
                <p class="on-r" @click="
                    $router.push({
                      path: '/orderDetails',
                      query: { id: item.id },
                    })
                  ">
                  {{ item.status ? "已完成" : "进行中"
                  }}<img src="../../../static/images/miner/right-icon@2x.png" />
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <BlankPage>
              <p class="slot_text" slot="text">暂无记录</p>
              <img class="undraw_img" slot="img" src="../../../static/images/miner/undraw_noted.png" alt="" />
            </BlankPage>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="order-con" v-if="completed.length">
            <div class="order-item" v-for="item of completed" :key="item.id">
              <div>
                <p>数量(YDN)</p>
                <p>{{ item.quantity }}</p>
              </div>
              <div>
                <p>利率</p>
                <p>{{ item.rate }}</p>
              </div>
              <div>
                <p>下单时间</p>
                <p>{{ item.createtime }}</p>
              </div>
              <div>
                <p>到期时间</p>
                <p>{{ item.finishtime }}</p>
              </div>
              <div>
                <p>周期</p>
                <p>{{ item.cycle }}</p>
              </div>
              <div>
                <p>状态</p>
                <p class="on-red" @click="
                    $router.push({
                      path: '/orderDetails',
                      query: { id: item.id },
                    })
                  ">
                  {{ item.status ? "已完成" : "进行中"
                  }}<img src="../../../static/images/miner/right-icon@2x.png" />
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <BlankPage>
              <p class="slot_text" slot="text">暂无记录</p>
              <img class="undraw_img" slot="img" src="../../../static/images/miner/undraw_noted.png" alt="" />
            </BlankPage>
          </div>
        </van-tab>
      </van-tabs>
    </van-list>
  </div>
</template>

<script>
import topBar from '../common/topBar'
import BlankPage from '../../components/BlankPage'
export default {
  name: 'order',
  components: {
    topBar,
    BlankPage
  },
  watch: {
    $route(to, from) {
      this.getRecord()
    }
  },
  data() {
    return {
      title: '我的订单',
      finished: false,
      page_num: 0,
      page_all: 3,
      List: [],
      titleList: ['全部', '进行中', '已完成'],
      oredrList: [], // 全部
      inProgress: [], // 进行中
      completed: [], // 已完成
      error: false,
      loading: false
    }
  },
  methods: {
    // 时间格式化
    getRecord() {
      this.$http
        .get('/invest/orders', {
          params: {
            page: this.page_num,
            page_size: 3
          }
        })
        .then(res => {
          // 加载状态结束
          this.loading = false
          if (res.data.status === 200) {
            let arr = res.data.data.data
            if (arr.length == 0) {
              this.finished = true
              return
            }
            this.orderList = arr // 存储在实例
            this.oredrList.push(...arr)

            arr.forEach(item => {
              if (item.status === 0) {
                this.inProgress.push(item)
              } else if (item.status === 1) {
                this.completed.push(item)
              }
            })

            // this.inProgress = Array.from(arr).filter((item) => {
            //   console.log(item);

            //   return item.status === 0
            // })

            // this.completed = Array.from(arr).filter(
            //   (item, i) => item.status === 1
            // )
          }
        })
    },
    onLoad() {
      console.log('ok')
      this.page_num++
      this.getRecord()
    },
    goDetail(id) {
      this.$router.push({ path: '/order/details', query: { id } })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding: 0 0.8rem;
}
.item {
  padding: 0.8rem 0;
  border-bottom: 1px solid #dcdcdc;
}
.item .f-12 {
  color: #999;
}
.item img {
  width: 0.373333rem;
  display: block;
}
.item > div:first-child {
  width: 93%;
}
.data > div:first-child {
  margin-bottom: 0.533333rem;
}
.set > div {
  width: 40%;
  padding: 0 0.266667rem;
  line-height: 0.96rem;
}
.set > div:last-child {
  width: 20%;
  /* text-align: right; */
}
.order-con {
  width: 17.866667rem;
  margin: auto;
  height: 26.533333rem;
  overflow-y: scroll;
  padding-bottom: 3.2rem;
  .order-item{
    width: 100%;
    height: 10.666667rem;
    border-radius: 5px;
    background-color: #171818;
    margin-bottom: 0.8rem;
    padding: 0 0.8rem;
    box-shadow: 0px 10px 10px -10px #ccc;
    div {
      display: flex;
      justify-content: space-between;
      // padding-top: 0.64rem;
      padding-top: 0.533333rem;

      p {
        font-size: 14px;
        color: #e4e4e4;

        img {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
      }
      .on-r {
        color: #29acad;
      }
      .on-red {
        color: red;
      }
    }
  }
}
.more {
  width: 3.733333rem;
  height: 1.066667rem;
  margin: 1.6rem auto 0;
  img {
    width: 100%;
    height: 100%;
  }
}

.bgb {
  /deep/ [class*='van-hairline']::after {
    border: none;
  }
}

.slot_text {
  font-size: 20px;
  color: #666666;
  text-align: center;
}
.undraw_img {
  margin-top: 4.8rem;
  width: 4.746667rem;
  height: 4.266667rem;
}
</style>
