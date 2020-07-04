<template>
  <div
    style="padding-top: 46px; height: 100%"
    :style="{
      backgroundImage: `url(${miner.bg.url})`,
      backgroundSize: 'contain',
    }"
    class="miner--buy"
  >
    <van-nav-bar
      title="购买矿机"
      left-text="返回"
      left-arrow
      fixed
      :border="false"
      @click-left="onClickLeft"
    />
    <div class="purchase-top">
      <img src="../../../static/images/miner/log.png" alt="" />
    </div>
    <van-cell-group :border="false">
      <van-cell title="矿机模型" :border="false" :value="miner.name" />
      <van-cell
        title="产能(天)"
        :border="false"
        :value="`${miner.capacity} 天`"
      />
      <van-cell
        title="日产出"
        :border="false"
        :value="`${miner.nissan} ${miner.symbol}`"
      />
      <van-cell title="购买日期" :border="false" :value="miner.buy_at" />
      <van-cell title="到期日期" :border="false" :value="miner.expired_at" />
      <van-cell
        title="需支付"
        :border="false"
        :value="`${miner.price} ${miner.symbol}`"
      />
    </van-cell-group>
    <van-field
      v-model="password"
      type="password"
      name="请输入资金密码"
      label="资金密码"
      placeholder="请输入资金密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <!-- 判断资产是否足够购买 -->
    <!-- :disabled="Number(asset.miner_quantity) < Number(miner.price)" -->
    <div class="van-address-list__bottom">
      <van-button
        type="info"
        size="large"
        round
        :loading="loading"
        text="立即购买"
        @click="buy"
      />
    </div>
  </div>
</template>
<script>
// import bg from "../../assets/images/604e47e368a30a9aeaf5c1e937077b86820080d51db1a-j4eNZc_slices/604e47e368a30a9aeaf5c1e937077b86820080d51db1a-j4eNZc@2x.png";

export default {
  name: "Buy",
  data: () => ({
    miner: {
      id: "",
      number: "",
      name: "",
      price: "",
      capacity: "",
      nissan: "",
      symbol: "",
      status: 1,
      reward: "",
      buy_at: "",
      expired_at: "",
      bg: {
        uri: "",
        url: "",
      },
    },
    asset: {
      miner_quantity: "",
      coin: "",
    },
    loading: false,
    // bg,
    password: "  ",
  }),
  created() {
    this.$http.get(`/miner/${this.$route.params.id}/buy`).then((response) => {
      const { miner, asset } = response.data;
      this.miner = miner;
      this.asset = asset;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    buy() {
      this.loading = true;
      this.$http
        .post(`/miner/${this.$route.params.id}/buy`)
        .then((response) => {
          this.loading = false;
          this.$toast({
            message: response.data.msg,
            position: "bottom",
          });
          if (response.data.status === 200) {
            this.$router.push("/miner/list");
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            this.$toast({
              message: errors[Object.keys(errors)[0]][0],
              position: "bottom",
            });
          }
        });
    },
  },
};
</script>

<style lang="less">
.miner--buy {
  /deep/ .van-field__control {
    color: #fff;
  }
}

.miner--buy {
  .van-nav-bar {
    background: transparent;

    &__title,
    &__arrow,
    &__text {
      color: #ffffff;
    }
  }

  .van-cell-group,
  .van-cell,
  .van-address-list__bottom {
    background: transparent;
  }

  .van-cell__title {
    color: white;
  }
}
.purchase-top {
  width: 335px;
  height: 176px;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-cell {
  border-bottom: 1px solid white;
  width: 335px;
  margin: auto;
}
.van-address-list__bottom {
  // margin: auto;

  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border-radius: 6px;
}
.van-button--info {
  // background-color: white;
  background: linear-gradient(
    180deg,
    rgba(11, 226, 182, 1) 0%,
    rgba(41, 172, 173, 1) 100%
  );
  border: 1px solid rgba(11, 226, 182, 1);
}
.van-button--round {
  border-radius: 5px;
}
</style>
