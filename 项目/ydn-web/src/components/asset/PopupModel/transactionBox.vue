<template>
  <div>
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height:  1.387rem; display:block; margin-left: 1.067rem;" />
      <div slot="title" style="color:#fff;">成交详情</div>
    </Header>
    <div class="tran_title">
      <p>-{{ tran.num }} ETH</p>
    </div>
    <div class="tran_con">
      <div class="tran_con_t">
        <p>状态</p>
        <p>{{ tran.status_text }}</p>
      </div>
      <div class="tran_con_t" v-show="showNum">
        <p>区块确认</p>
        <p>转出</p>
      </div>
      <div class="tran_con_t">
        <p>地址</p>
        <p class="tran_diz">{{ tran.address }}</p>
      </div>
      <div class="tran_con_t" v-show="showNum">
        <p>TxID</p>
        <p>{{ tran.hash }}</p>
      </div>
      <div class="tran_con_t">
        <p>时间</p>
        <p>{{ tran.createtime | formatData }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'transction',
  data() {
    return {
      tran: {
        // address: "",
        // createtime: "",
        // hash: null,
        // num: "",
        // status: 0,
        // status_text: "",
      },
      showNum: false
    }
  },
  mounted() {
    //提币的详情
    this.$http
      .get(`user/withdraw/detail?id=${this.$route.params.id}`)
      .then(res => {
        if (res.data.status === 200) {
          this.tran = res.data.data
          if (this.tran.status === 1) {
            this.showNum = true
          }
        }
      })
  }
}
</script>
<style lang="less">
.tran_title {
  width: 100%;
  text-align: center;
  margin: 1.066667rem 0;
  p {
    color: rgba(41, 172, 173, 1);
    font-size: 1.28rem;
  }
}
.tran_con {
  width: 16.266667rem;
  margin: auto;

  .tran_con_t {
    padding: 0.8rem 0;
    border-bottom: 1px solid #333333;
    display: flex;
    justify-content: space-between;
  }
  .tran_diz {
    width: 80%;
    word-break: break-all;
  }
}
</style>
