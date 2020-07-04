<template>
  <div class="Transfers">
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title"
           style="color:#fff;">划转记录</div>
    </Header>
    <div class="main"
         v-if="list.length">
      <van-list v-model="loading"
                :finished="finished"
                :error.sync="error"
                :immediate-check="false"
                @load="onLoad"
                class="van-list--transfers">
        <div class="item"
             v-for="(item,index) of list"
             :key="index"
             @click="$router.push('/transferdetails')">
          <h2>{{ item.coin }}</h2>
          <p><span>时间</span><span>{{ item.createtime | formatData }}</span></p>
          <p><span>数量</span><span>{{ item.quantity }}</span></p>
          <p><span>类型</span><span>红包资产到理财资产</span></p>
        </div>
      </van-list>
    </div>
    <div class="main main_blankpage"
         v-else>
      <BlankPage />
    </div>

    <div style="color:#999999; text-align: center;margin:1.6rem 0; font-size:.747rem;"
         v-show="genduo">
      没有更多了
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import BlankPage from '../../components/BlankPage'
export default {
  name: "Transfers",
  data: () => ({
    list: [],
    refreshing: false,
    loading: false,
    finished: false,
    error: false,
    genduo: true,
    pagination: {
      page: 1,
      limit: 10
    },
    assetAccounts: {
      quantity: '红包资产',
      invest_quantity: '理财资产',
      miner_quantity: '矿机资产',
    }
  }),
  components: {
    BlankPage
  },
  methods: {

    onLoad () {

      this.$http.get('/assets/transfers', {
        params: this.pagination
      }).then(response => {
        var data = response.data.data
        this.loading = false;
        if (data.length) {

          if (!data.length) this.genduo = true
          this.list = [...this.list, ...data]


          this.pagination.page++;
        } else {
          this.finished = true;
        }
      }).catch(() => {
        this.loading = false;
        this.error = true;
      })
    },
  },

  mounted () {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>
.Transfers {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

.van-list--transfers {
  .van-cell__title {
    color: #fff;
  }
}

.van-list--transfers {
  .van-cell {
    font-size: 12px;
  }
}
.main {
  width: 17.867rem;
  margin: 0 auto;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 6px;
  background-color: #171818;
  padding: 0.747rem;
  .item {
    border-bottom: 2px solid rgba(51, 51, 51, 1);
    padding-top: 0.533rem;
    h2 {
      font-size: 0.853rem;
      margin-bottom: 0.533rem;
    }
    p {
      font-size: 0.64rem;
      color: #cccccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
    }
  }
}
</style>
