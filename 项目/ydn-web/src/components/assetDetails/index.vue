// 资产提币-转入-转出-封装单个页面
<template>
  <div id="details">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">{{ name }}</div>
    </Header>

    <!-- 展示列表 -->
    <section class="main">
      <h1 :class="['d_money', isActive ? 'red' : 'blue']">
        {{ isActive ? "-" : "+" }}10.23565 ETH
      </h1>
      <mu-list>
        <mu-list-item>
          <mu-list-item-title class="title">状态</mu-list-item-title>
          <mu-list-item-action>
            <mu-list-item-after-text class="info"
              >已完成
            </mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <van-divider
          :style="{ borderColor: '#333333', padding: '0 16px' }"
        ></van-divider>
      </mu-list>
    </section>
  </div>
</template>

<script>
// 假设 1=== 提币， 2=== 转入， 3=== 转出
export default {
  name: "assetDetails",
  props: ["id"],
  data() {
    return {
      isActive: true,
    };
  },
  computed: {
    name: function() {
      const { id } = this;
      let name = "";
      if (id == 1) {
        name = "提币详情";
        this.isActive = true;
      } else if (id == 2) {
        name = "转入详情";
        this.isActive = false;
      } else if (id == 3) {
        name = "转出详情";
        this.isActive = false;
      }
      return name || "详情";
    },
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
