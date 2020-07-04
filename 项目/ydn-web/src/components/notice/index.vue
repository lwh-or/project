<template>
  <div id="nocite">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">系统公告</div>
    </Header>

    <div class="nocite_con" v-for="item in noticeList" :key="item.id">
      <div class="nc_time">{{item.createtime | formatData}}</div>
      <div class="nc_con">
        <div class="nc_con_titme">
          {{item.title}}
        </div>
        <div class="nc_con_text">
          {{item.content}}
        </div>
        <div class="ne_con_bottom" @click="$router.push(`/noticeDetails/${item.id}`)">
          <p>查看详情</p>
          <img src="../../../static/images/miner/right-icon@2x.png" alt="">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Notice',
  data() {
    return {
      noticeList: []
    }
  },
  mounted() {
    this.setNotice()
  },
  methods: {
    setNotice() {
      this.$http.get('notice/list').then(res => {
        if (res.status === 200) {
          this.noticeList = res.data.data.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#nocite {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 3.2rem;
  .nocite_con {
    width: 18.293333rem;
    margin: 1.066667rem auto 0;
    width: 18.293333rem;

    .nc_time {
      text-align: center;
      color: #525253;
      font-size: 12px;
      margin-left: 0.8rem;
      margin-bottom: 0.533333rem;
    }
    .nc_con {
      margin-left: 0.8rem;
      background-color: #171818;
      border-radius: 0.32rem;
      padding-left: 0.8rem;
      position: relative;
      height: 9.066667rem;
      .nc_con_titme {
        color: #c9caca;
        font-size: 0.853333rem;
        height: 2.426667rem;
        border-bottom: 1px solid #0e0e0e;
        line-height: 2.426667rem;
      }
      .nc_con_text {
        margin-top: 0.693333rem;
        font-size: 0.746667rem;
        color: #616268;
      }
      .ne_con_bottom {
        position: absolute;
        right: 0.8rem;
        bottom: 0.96rem;
        display: flex;
        p {
          color: #29acad;
          font-size: 0.746667rem;
          margin-right: 0.64rem;
        }
        img {
          margin-top: 0.16rem;
          width: 10px;
          height: 16px;
        }
      }
    }
  }
}
</style>