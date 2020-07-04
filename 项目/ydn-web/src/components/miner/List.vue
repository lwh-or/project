<template>
  <div id="list">
    <Header>
      <img @click="$router.push('/miner')" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">我的矿机</div>
    </Header>

    <van-tabs swipeable background="#000" color="#29ACAD" title-inactive-color="#fff" title-active-color="#fff" @click="tabs">
      <van-tab title="全部">
        <div class="miner-list" v-if="list.length">
          <div class="miner-item" v-for="item in list" :key="item.id">
            <div class="item-top">
              <p>
                {{ item.miner.name }}&nbsp;&nbsp;&nbsp;<span>{{
                  item.number
                }}</span>
              </p>
              <div @click="$router.push(`/miner/${item.id}`)">
                <p :class="item.status === 1 ? 'on' : 'red'">
                  {{ minerOrderStatus[item.status] }}
                </p>
                <img src="../../../static/images/miner/right-icon@2x.png" alt="" />
              </div>
            </div>
            <div class="item-con">
              <img :src="item.miner.image.url" alt="" />
              <div>
                <p style="color: #0be2b6;">{{ item.cumulative_output }}</p>
                <p>累计产出</p>
              </div>
              <div>
                <p>{{ item.miner.nissan }}</p>
                <p>日产出</p>
              </div>
              <div>
                <p>{{ item.surplus_capacity }}天</p>
                <p>剩余产能</p>
              </div>
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
      <van-tab title="挖矿中">
        <div class="miner-list" v-if="list2.length">
          <div class="miner-item" v-for="item in list2" :key="item.id">
            <div class="item-top">
              <p>
                {{ item.miner.name }}&nbsp;&nbsp;&nbsp;<span>{{
                  item.number
                }}</span>
              </p>
              <div @click="$router.push(`/miner/${item.id}`)">
                <p class="on">
                  {{ minerOrderStatus[1] }}
                </p>
                <img src="../../../static/images/miner/right-icon@2x.png" alt="" />
              </div>
            </div>
            <div class="item-con">
              <img :src="item.miner.image.url" alt="" />
              <div>
                <p style="color: #0be2b6;">{{ item.cumulative_output }}</p>
                <p>累计产出</p>
              </div>
              <div>
                <p>{{ item.miner.nissan }}</p>
                <p>日产出</p>
              </div>
              <div>
                <p>{{ item.surplus_capacity }}天</p>
                <p>剩余产能</p>
              </div>
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
      <van-tab title="已停产">
        <div class="miner-list" v-if="list3.length">
          <div class="miner-item" v-for="item in list3" :key="item.id">
            <div class="item-top">
              <p>
                {{ item.miner.name }}&nbsp;&nbsp;&nbsp;<span>{{
                  item.number
                }}</span>
              </p>
              <div @click="$router.push(`/miner/${item.id}`)">
                <p class="red">
                  {{ minerOrderStatus[0] }}
                </p>
                <img src="../../../static/images/miner/right-icon@2x.png" alt="" />
              </div>
            </div>
            <div class="item-con">
              <img :src="item.miner.image.url" alt="" />
              <div>
                <p style="color: #0be2b6;">{{ item.cumulative_output }}</p>
                <p>累计产出</p>
              </div>
              <div>
                <p>{{ item.miner.nissan }}</p>
                <p>日产出</p>
              </div>
              <div>
                <p>{{ item.surplus_capacity }}天</p>
                <p>剩余产能</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <BlankPage>
            <img class="undraw_img" slot="img" src="../../../static/images/miner/undraw_noted.png" alt="" />
            <p class="slot_text" slot="text">暂无记录</p>
          </BlankPage>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BlankPage from '../../components/BlankPage'
export default {
  name: 'List',
  components: {
    BlankPage
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.$http
  //       .get('/miner-orders', {
  //         params: this.pagination
  //       })
  //       .then(response => {
  //         console.log(response);

  //         if (response.data.data.length) {
  //           response.data.data.map(item => {
  //             this.list.push(item)
  //           })
  //           this.pagination.page++
  //         } else {
  //           this.finished = true
  //         }
  //         console.log(response)
  //       })
  //   }
  // },
  data: () => ({
    list: [],
    list2: [],
    list3: [],
    refreshing: false,
    loading: false,
    finished: false,
    error: false,
    pagination: {
      page: 1,
      limit: 10000
    },
    pagination2: {
      page: 1,
      limit: 10000,
      status: 1
    },
    pagination3: {
      page: 1,
      limit: 10000,
      status: 0
    },
    minerOrderStatus: ['已停产', '挖矿中'],
    titleList: ['全部', '挖矿中', '已停产']
  }),
  mounted() {
    this.setList()
  },
  methods: {
    setList() {
      this.$http
        .get('/miner-orders', {
          params: this.pagination
        })
        .then(response => {
          console.log(response)

          if (response.data.data.length) {
            response.data.data.map(item => {
              this.list.push(item)
            })

            this.pagination.page++
          } else {
            this.finished = true
          }
          console.log(response)
        })
    },
    tabs(name) {
      //挖矿中
      if (name === 1) {
        this.list2 = []
        this.$http
          .get('/miner-orders', {
            params: this.pagination2
          })
          .then(response => {
            this.loading = false

            if (response.data.data.length) {
              response.data.data.map(item => {
                this.list2.push(item)
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
      } else if (name === 2) {
        this.list3 = []
        this.$http
          .get('/miner-orders', {
            params: this.pagination3
          })
          .then(response => {
            this.loading = false

            if (response.data.data.length) {
              response.data.data.map(item => {
                this.list3.push(item)
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
}
</script>

<style scoped lang="less">
#list {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  /deep/ .van-hairline--top-bottom:after {
    border-width: 0;
  }
  /deep/ .van-tabs__wrap {
    border: 0;
  }
}

.van-panel--list .van-panel__header .van-panel__header--subtitle {
  font-size: 12px;
}
.miner-list {
  width: 335px;
  margin: auto;
  height: 26.533333rem;
  overflow-y: scroll;
  padding-bottom: 3.2rem;
  .miner-item {
    width: 100%;
    height: 106px;
    background-color: #171818;
    padding: 0.8rem;
    box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
    margin-bottom: 0.8rem;
    border-radius: 6px;
    .item-top {
      display: flex;
      justify-content: space-between;
      p {
        color: #e4e4e4;
        font-size: 14px;
        span {
          font-size: 12px;
          color: #999999;
        }
      }
      div {
        vertical-align: middle;
        display: flex;
        line-height: 20px;

        .on {
          color: #29acad;
        }
        .red {
          color: red;
        }
        img {
          width: 0.8rem;
          height: 0.8rem;
          vertical-align: super;
          margin-top: 0.106667rem;
          margin-left: 0.266667rem;
        }
      }
    }
    .item-con {
      display: flex;
      justify-content: space-between;
      margin-top: 17px;

      img {
        width: 1.973333rem;
        height: 1.813333rem;
      }
      div {
        p:first-child {
          font-size: 14px;
          color: #e4e4e4;
        }
        p:last-child {
          font-size: 12px;
          color: #999999;
        }
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
  margin-top: 4.8rem;
  width: 4.746667rem;
  height: 4.266667rem;
}
</style>
