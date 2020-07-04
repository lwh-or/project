<template>
  <div class="">
    <Header>
      <img
        @click="$router.go(-1)"
        src="/static/images/asset/icon-arrows@2x.png"
        slot="left"
        style="width: 1.387rem; height: 1.387rem; display:block;"
      />
      <div slot="title" style="color:#fff;">我的奖励</div>
    </Header>
    <!--  -->
    <div class="title flex_center f-16">
      <span :class="{ active: index == 1 }" @click="index = 1">中奖记录</span>
      <span :class="{ active: index == 2 }" @click="index = 2"
        >中奖分红记录</span
      >
      <span :class="{ active: index == 3 }" @click="index = 3">幸运奖</span>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="item header_title">
          <div class="set flex_between bottom_border">
            <div>
              <span>时间</span>
            </div>
            <div>
              <span>金额</span>
            </div>
            <div>
              <span>状态</span>
            </div>
          </div>
          <!--  -->
          <div v-if="list.length">
            <div
              class="set flex_between margin_top"
              v-for="item in list"
              :key="item.id"
            >
              <div>
                <span>{{ format(item.createtime) }}</span>
              </div>
              <div style="width:111px">
                <span>{{ item.quantity }}</span>
              </div>
              <div>
                <span :style="{ color: 0 ? '#FF4E5F' : '#29ACAD' }">{{
                  item.status ? "成功" : "失败"
                }}</span>
              </div>
            </div>
          </div>
          <div v-else>
            <BlankPage>
              <p class="slot_text" slot="text">暂无记录</p>
              <img
                class="undraw_img"
                slot="img"
                src="../../../static/images/miner/undraw_noted.png"
                alt=""
              />
            </BlankPage>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import BlankPage from "../../components/BlankPage";
export default {
  name: "assetRecord",
  components: {
    BlankPage,
  },
  data() {
    return {
      title: "奖励记录",
      index: 1,
      url: "/",
      loading: false,
      finished: false,
      page_num: 1,
      page_all: 1,
      list: [],
    };
  },
  watch: {
    index() {
      this.list = [];
      this.page_num = 1;
      setTimeout(() => {
        this.getRecord();
      }, 500);
    },
  },
  methods: {
    format(timestamp) {
      var time = new Date(timestamp * 1000);
      var y = time.getFullYear();
      var M = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var m = time.getMinutes();
      var s = time.getSeconds();
      if (M < 10) {
        M = "0" + M;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      return M + "/" + d + " " + h + ":" + m + ":" + s;
    },
    getRecord() {
      if (this.index == 1) {
        var type = "candy";
      } else if (this.index == 2) {
        var type = "commission";
      } else {
        var type = "lucky_give";
      }
      this.$http
        .get(`/user/asset/log?log_type=${type}&page=${this.page_num}`)
        .then((res) => {
          console.log(res);

          if (res.data.status == 200) {
            var data = res.data.data;
            this.list = this.list.concat(data.data);
            this.page_all = data.last_page;
            this.page_num++;
            if (this.page_num > this.page_all) {
              this.finished = true;
            }
          }
        });
    },
    onLoad() {
      setTimeout(() => {
        this.getRecord();
        this.loading = false;
        if (this.page_num > this.page_all) {
          this.finished = true;
        }
      }, 500);
    },
  },
  created() {
    this.getRecord();
  },
};
</script>

<style scoped>
.title {
  margin-top: 1.12rem;
  border-bottom: 0.053333rem solid #040606;
  background: #040606;
  color: #ffffff;
  display: flex;
  justify-content: space-around;
}
.title > span {
  width: 5.3125rem /* 85/16 */;
  line-height: 1.387rem;
  text-align: center;
  height: 1.387rem;
  border-radius: 1.533rem;
  text-align: center;
  font-size: 0.747rem;
}
.active {
  color: #fff;
  background-color: #0be2b6;
}

.header_title span {
  display: block;
  color: #e4e4e4;
  font-size: 0.747rem;
  /* text-align: center; */
}
/* .active::after {
  display: block;
  content: "";
  position: absolute;
  width: 1.6rem;
  width: 1.6rem;
  height: 0.106667rem;
  background: #0d6096;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
} */
.main {
  width: 17.867rem;
  background-color: #171818;
  margin: 0 auto;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
  margin-top: 0.693rem;
}
.set {
  padding: 0.266667rem 0;
  align-items: flex-start;
  flex-wrap: wrap;
}
.set span {
  display: block;
}
.set > div {
  line-height: 0.96rem;
}
.set > div:last-child {
  text-align: right;
}
.item {
  padding: 0.907rem;
}

.bottom_border {
  padding-bottom: 0.747rem;
  border-bottom: 1px solid #333333;
}
.margin_top {
  margin-top: 0.8rem;
}
.set.margin_top span {
  font-size: 0.64rem;
  color: #cccccc;
}
.slot_text {
  font-size: 20px;
  color: #666666;
  text-align: center;
}
.undraw_img{
  margin-top: 4.8rem;
  width: 4.746667rem;
  height: 4.266667rem;
}
</style>
