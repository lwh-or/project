<template>
  <div class="bg">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">理财产品</div>
      <div
        slot="right"
        style="color:#fff;width: 1.066667rem;height: 1.173333rem;"
        @click="$router.push('/order')"
      >
        <img
          src="../../../static/images/miner/licai-icon2@2x.png"
          alt=""
          style="width:100%;heigth:100%"
        />
      </div>
    </Header>
    <van-tabs
      swipeable
      background="#000"
      color="#29ACAD"
      title-inactive-color="#fff"
      title-active-color="#fff"
      @click="toogleType"
    >
      <van-tab v-for="tab of type_list" :key="tab.type" :title="tab.title">
        <div
          :class="['conduct', item.status ? '' : 'active']"
          v-for="item of list"
          :key="item.id"
        >
          <div class="con-text">
            <div class="con-text-l">
              <p>{{ item.rate }}<span>%</span></p>
              <p>定存利率</p>
            </div>
            <div class="con-text-r">
              <p>最高可得:</p>
              <p>{{ item.investment_num }}</p>
              <p>周期：{{ item.month_num }}个月</p>
            </div>
          </div>
          <div class="con-btn" @click="purchase(item.id)">购买</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "investment",
  data() {
    return {
      index: 0,
      type_list: [],
      list: [],
      asset: {
        asset_total: "",
        yestoday_total: "",
        yestoday_profit: "",
        total_profit: "",
      },
      id: 0,
      show: true,
      titleList: ["全部", "挖矿中", "已完成"],
      isClick: true,
    };
  },
  computed: {
    ...mapState(["conversion_total"]),
  },
  methods: {
    //购买
    purchase(id) {
      this.$router.push({ path: "/purchase", query: { id } });
    },
    // 切换tab
    toogleType(name) {
      let index = this.type_list[name].type;
      this.getList(index);
    },
    // 请求理财类型
    getTypes() {
      this.$http.get("/invest/types").then((res) => {
        if (res.data.status == 200) {
          this.type_list = res.data.data;
        }
      });
    },
    // 请求理财列表
    getList(id) {
      this.$http
        .get("/invest/index", {
          params: {
            type: id,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.list = res.data.data;
          }
        });
    },
  },
  created() {
    // this.$http('/user/inves/myprofittotal').then(response => {
    //   this.asset = response.data.data
    // })
  },
  mounted() {
    this.getTypes();
    this.getList(3);
  },
};
</script>

<style lang="less" scoped>


.van-grid {
  &-item {
    &__content {
      background-color: transparent !important;
    }

    &__icon {
      font-size: 12px !important;
    }
  }
}

/deep/ .van-tab{
  /deep/ .van-tab__text{
    font-size: .96rem;
  }
}

.text--right {
  text-align: right !important;
  position: initial !important;
}

.bg {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.067rem;
}
.top {
  width: 100%;
  height: 2.346667rem;
  background: white;
  position: relative;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
}
.order img {
  width: 0.746667rem;
  display: block;
  margin-right: 0.266667rem;
}
.order {
  color: #0d6096;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  white-space: nowrap;
}
.month {
  width: 100%;
  background: #f8f8f8;
  border-bottom: 1px solid #dcdcdc;
  color: #999999;
}
.month > div {
  flex: 1;
  line-height: 2.346667rem;
  text-align: center;
}

.main {
  padding: 0 0.8rem;
  height: 78%;
  overflow: scroll;
}
.rate {
  color: #999999;
  margin-bottom: 0.533333rem;
}
.item {
  padding: 0.8rem 0;
  border-bottom: 1px solid#DCDCDC;
}
.item > div:first-child {
  width: 25%;
  border-right: 1px solid #dcdcdc;
}
.item > div:last-child {
  width: 75%;
  align-items: flex-end;
  padding-left: 0.8rem;
}
.purchase > button {
  width: 2.986667rem;
  height: 1.066667rem;
  border: 0;
  text-align: center;
  border-radius: 0.533333rem;
  background: #0d6096;
  color: white;
  outline: none;
}
.conduct {
  position: relative;
  width: 335px;
  height: 89px;
  margin: auto;
  background: rgba(23, 24, 24, 1);
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.8rem;
  &.active::before {
    content: "\200B";
    position: absolute;
    right: 0;
    top: 0;
    width: 3.147rem;
    height: 3.147rem;
    background: url("../../../static/images/asset/Sold.png") no-repeat;
    background-size: cover;
  }
  &.active {
    .con-btn {
      color: #575757;
    }
  }
}
.con-text {
  width: 70%;
  display: flex;
  justify-content: space-between;
  color: white;
}
.con-text-l {
  width: 50%;
  text-align: center;
}
.con-text-l p:first-of-type {
  color: #29acad;
  font-size: 1.333rem;
}
.con-text-l p:first-of-type span {
  font-size: 12px;
}

.con-text-l p:last-of-type {
  color: #999999;
}
.con-text-r {
  width: 50%;
  text-align: left;
  border-left: 1px solid #333333;
  text-indent: 0.746666rem;
  p {
    color: #e4e4e4;
  }
  p {
    &:last-of-type {
      color: #999999;
    }
  }
}
.con-btn {
  width: 66px;
  height: 26px;
  background-image: url("../../../static/images/miner/biankuan32@2x.png");
  background-size: 100% 100%;
  text-align: center;
  line-height: 26px;
  color: white;
}

.bg {
  /deep/ [class*="van-hairline"]::after {
    border: none;
  }
}
</style>
