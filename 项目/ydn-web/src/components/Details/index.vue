// 理财，矿机，资产，红包，详情
<template>
  <div id="details">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">{{ Details.behavior }}</div>
    </Header>

    <!-- 展示列表 -->
    <section class="main">
      <!-- <h1 :class="['d_money', isActive ? 'red' : 'blue']">
        {{ isActive ? "-" : "+" }}10.23565 ETH
      </h1> -->
      <h1 class="d_money">{{ Details.quantity }} YDN</h1>
      <mu-list>
        <mu-list-item>
          <mu-list-item-title class="title">状态</mu-list-item-title>
          <mu-list-item-action>
            <template v-if="Details.status === 0">
              <mu-list-item-after-text class="info" style="color:#29ACAD">
                待处理
              </mu-list-item-after-text>
            </template>
            <template v-if="Details.status === 1">
              <mu-list-item-after-text class="info" style="color:#FF4E5F">
                已完成
              </mu-list-item-after-text>
            </template>
            <template v-if="Details.status === 2">
              <mu-list-item-after-text class="info" style="color:#F7B500">
                失败
              </mu-list-item-after-text>
            </template>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>
        <mu-list-item v-if="Details.status">
          <mu-list-item-title class="title">区块确认</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >15/30
            </mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          v-if="Details.status"
          :style="{ borderColor: '#333333', padding: '0 8px' }"
        ></van-divider>

        <template v-if="Details.address">
          <mu-list-item>
            <mu-list-item-title class="title">地址</mu-list-item-title>
            <mu-list-item-action>
              <mu-list-item-after-text class="info"
                >{{ Details.address ? Details.address : "暂无" }}
              </mu-list-item-after-text>
            </mu-list-item-action>
          </mu-list-item>
          <van-divider
            :style="{ borderColor: '#333333', padding: '0 8px' }"
          ></van-divider>
        </template>

        <template v-if="Details.recharge_hash">
          <mu-list-item v-if="Details.status">
            <mu-list-item-title class="title">TxID</mu-list-item-title>
            <mu-list-item-action>
              <mu-list-item-after-text class="info"
                >{{ Details.recharge_hash ? Details.recharge_hash : "暂无" }}
              </mu-list-item-after-text>
            </mu-list-item-action>
          </mu-list-item>
          <van-divider
            v-if="Details.status"
            :style="{ borderColor: '#333333', padding: '0 8px' }"
          ></van-divider>
        </template>

        <mu-list-item>
          <mu-list-item-title class="title">时间</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >{{ Details.createtime | formatData }}
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
  computed: {},
  created() {
    const {
      params: { item },
    } = this.$route;
    this.Details = JSON.parse(item);
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
</style>
