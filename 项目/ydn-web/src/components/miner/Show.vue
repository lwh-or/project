<template>
  <div>
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block; margin-left: 1.067rem;"
      />
      <div slot="title" style="color:#fff;">详情</div>
    </Header>

    <div class="details">
      <div class="deta-title">
        矿机详情
      </div>
      <div class="order-con">
        <div class="order-item">
          <div>
            <p>矿机编号</p>
            <p>{{ minerOrder.number }}</p>
          </div>
          <div>
            <p>购买日期</p>
            <p>{{ minerOrder.created_at }}</p>
          </div>
          <div>
            <p>到期日期</p>
            <p>{{ minerOrder.expired_at }}</p>
          </div>
          <div>
            <p>价格/年</p>
            <p>{{ minerOrder.miner.price }}YDN</p>
          </div>
          <div>
            <p>剩余产能</p>
            <p>{{ minerOrder.surplus_capacity }}天</p>
          </div>
          <div>
            <p>日产出</p>
            <p>{{ minerOrder.yesterday_output }}YDN</p>
          </div>
          <div>
            <p>累计产出</p>
            <p>{{ minerOrder.cumulative_output }}YDN</p>
          </div>
        </div>
      </div>
    </div>

    <div class="details details-list">
      <div class="deta-title">
        矿机详情
        <div class="deta-btn" @click="$router.push(`/renews/${minerOrder.id}`)">
          续约
        </div>
      </div>
      <div class="order-con">
        <div class="order-item">
          <div class="order-title">
            <p>时间</p>
            <p class="order-z">预约费用</p>
            <p>预约产能</p>
          </div>
          <div v-for="item in list" :key="item.id">
            <p>{{ item.created_at }}</p>
            <p>{{ item.miner.price }}</p>
            <p>{{ item.miner.capacity }}天</p>
          </div>
          <p v-show="finished" class="nodata">
            暂无数据
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Show",
  data: () => ({
    minerOrder: {
      id: "",
      miner_id: "",
      user_id: "",
      parent_id: "",
      number: "",
      surplus_capacity: "",
      cumulative_output: "",
      type: "",
      status: "",
      expired_at: "",
      created_at: "",
      updated_at: "",
      miner: {
        id: "",
        name: "",
        price: "",
        nissan: "",
        number: "",
        reward: "",
        status: "",
        symbol: "",
        capacity: "",
        expired_at: "",
      },
    },
    miner: {
      id: "",
      name: "",
      price: "",
      nissan: "",
      number: "",
      reward: "",
      status: "",
      symbol: "",
      capacity: "",
    },
    asset: {
      miner_quantity: "",
      coin: "",
    },
    list: [],
    refreshing: false,
    loading: false,
    finished: false,
    error: false,
    pagination: {
      page: 1,
      limit: 10,
    },
    dialog: {
      show: false,
      loading: false,
      renewing: false,
    },
    moment,
    poShow: false,
  }),
  created() {
    this.getMinerOrder();
  },
  methods: {
    show() {
      this.poShow = !this.poShow;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push(
        `/miner/${this.minerOrder.id}/outputs?number=${this.minerOrder.miner.number}`
      );
    },
    getMinerOrder() {
      this.$http
        .get(`/miner-orders/${this.$route.params.id}`)
        .then((response) => {
          this.minerOrder = response.data;
          console.log(this.minerOrder);
        });

      this.$http
        .get(`/miner-orders/${this.$route.params.id}/renews`, {
          params: this.pagination,
        })
        .then((response) => {
          this.loading = false;
          console.log(response);

          if (response.data.data.length) {
            response.data.data.map((item) => {
              this.list.push(item);
            });

            this.pagination.page++;
          } else {
            this.finished = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    onLoad() {
      this.$http
        .get(`/miner-orders/${this.$route.params.id}/renews`, {
          params: this.pagination,
        })
        .then((response) => {
          this.loading = false;

          if (response.data.data.length) {
            response.data.data.map((item) => {
              this.list.push(item);
            });

            this.pagination.page++;
          } else {
            this.finished = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    showRenewDialog() {
      this.dialog.loading = true;
      this.$http
        .get(`/miner-orders/${this.$route.params.id}/renew`)
        .then((response) => {
          this.dialog.loading = false;
          const { miner, asset } = response.data;
          this.miner = miner;
          this.asset = asset;
          this.dialog.show = true;
        })
        .catch(() => {
          this.dialog.loading = false;
        });
    },
    renew() {
      this.dialog.renewing = true;
      this.$http
        .post(`/miner-orders/${this.$route.params.id}/renew`)
        .then((response) => {
          this.dialog.renewing = false;
          this.dialog.show = false;

          this.$toast({
            message: response.data.msg,
            position: "bottom",
          });

          this.getMinerOrder();
          this.list.unshift(response.data.data.minerOrderRenew);
        })
        .catch((error) => {
          this.dialog.renewing = false;

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
.van-panel--renew .van-panel__content .van-cell,
.van-dialog--renew .van-cell {
  font-size: 12px;
}
.van-dialog__header {
  color: #000;
}
.details {
  width: 100%;
  height: 275px;
  background: rgba(23, 24, 24, 1);
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  &.details-list {
    margin-top: 15px;
  }
  .deta-btn {
    width: 66px;
    height: 26px;
    background: url("../../../static/images/miner/btn.png") no-repeat;
    background-size: 100% 100%;
    float: right;
    text-align: center;
    line-height: 26px;
    margin-top: 10px;
  }
  .deta-title {
    width: 306px;
    margin: auto;
    height: 45px;
    color: #ffffff;
    font-size: 16px;
    border-bottom: 1px solid #333333;
    line-height: 45px;
  }
  .order-con {
    width: 306px;
    margin: auto;
    .order-item {
      width: 100%;
      height: 11.666667rem;
      border-radius: 5px;
      background-color: #171818;
      margin-bottom: 0.8rem;
      overflow-y: auto;
      .nodata {
        padding-top: 4.266667rem;
        color: #ccc;
        text-align: center;
      }
      .order-title {
        padding-left: 50px;
        .order-z {
          padding-left: 75px;
        }
      }
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
}
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
