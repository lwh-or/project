// 充值详情页面
<template>
  <div id="details">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">{{ $route.meta.title }}</div>
    </Header>

    <!-- 展示列表 -->
    <section class="main">
      <h1 class="d_money">
        +10.23565 YDN
      </h1>
      <mu-list>
        <mu-list-item>
          <mu-list-item-title class="title f_18">{{
            1 ? "转入" : "转出"
          }}</mu-list-item-title>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>
        <mu-list-item>
          <mu-list-item-title class="title">状态</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >已完成
            </mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>
        <mu-list-item>
          <mu-list-item-title class="title">类型</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >红包资产到理财资产
            </mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>
        <mu-list-item>
          <mu-list-item-title class="title">时间</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >2020/04/20 11:50:00
            </mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>
      </mu-list>
    </section>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      isActive: true,
      Details: {},
    };
  },
  computed: {
    name: function() {
      const { status, behavior } = this.Details;
      return behavior === "withdraw" ? "提现详情" : "充值详情";
    },
  },
  created() {
    // const { params: { item } } = this.$route;
    // this.Details = JSON.parse(item)
  },
};
</script>

<style lang="less" scoped>
#details {
  width: 100%;
  height: 100%;
  color: #fff;
  .d_money {
    text-align: center;
    font-size: 1.28rem;
    font-weight: bold;
    height: 1.76rem;
    line-height: 1.76rem;
    // color: #29ACAD;
  }
  .main {
    margin-left: 1.813rem;
    margin-right: 1.92rem;
    margin-top: 1.6rem;
  }
  .title,
  .info {
    color: #ffffff;
    font-size: 0.747rem;
  }
  .title {
    width: 2.987rem;
  }
}

.mu-item-title {
  flex: 0 0 auto;
}

.mu-item-action {
  flex: 1;
}

.red {
  color: #ff4e5f;
}

.blue {
  color: #29acad;
}

.f_18 {
  font-size: 0.96rem !important;
}
</style>
