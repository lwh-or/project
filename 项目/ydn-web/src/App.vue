<template>
  <div id="app">
    <div v-show="isShow"
         class="app">
      <keep-alive include="asset">
        <router-view />
      </keep-alive>
      <keep-alive>
        <router-view name="footBar"
                     v-show="isModel"></router-view>
      </keep-alive>
    </div>
    <div v-show="!isShow"
         class="loading-app">
      <img src="../static/images/loading/loading.gif">
    </div>
  </div>

</template>

<script>
import dayjs from "dayjs";
export default {
  name: "App",
  data () {
    return {
      time: null,
      isShow: false
    };
  },
  computed: {
    // 是否显示tarBar
    isModel () {
      const {
        meta: { isShowfooterBar },
      } = this.$route;
      if (isShowfooterBar === false) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted () {
    this.timeId = setTimeout(() => {
      this.isShow = true;
    }, 2000)
  },
  beforeDestroy () {
    clearTimeout(this.timeId)
  }
};
</script>

<style lang="less">
@font-face {
  font-family: "PingFangBold";
  src: url("../static/ttf/PingFang_Medium.ttf");
}
@font-face {
  font-family: "PingFangBold2";
  src: url("../static/ttf/PingFangBold2.ttf");
}
.loading-app {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.van-nav-bar {
  &__left {
    left: 5px !important;

    .van-nav-bar__text {
      margin-left: -26px !important;
    }
  }

  &__right {
    .van-nav-bar__text {
      margin: 0 -22px !important;
    }
  }
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #040606;
  touch-action: none;
}
#app,
.app {
  width: 100%;
  height: 100%;
  background-color: #040606;
  color: #fff;
  font-family: "PingFangBold";
}
/* common tool */
.flex_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bgb {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.btn {
  height: 2.4rem;
  background: #0d6096;
  color: white;
  border-radius: 1.2rem;
  margin-top: 1.6rem;
}
.f-12 {
  font-size: 0.64rem;
}
.f-14 {
  font-size: 0.746667rem;
}
.f-16 {
  font-size: 0.853333rem;
}
.f-18 {
  font-size: 0.96rem;
}
.f-20 {
  font-size: 1.066667rem;
}
.f-22 {
  font-size: 1.173333rem;
}
.f-24 {
  font-size: 1.28rem;
}
.f-26 {
  font-size: 1.386667rem;
}

.filtrate_icon {
  width: 1.173rem;
  height: 1.067rem;
  display: block;
}

.main_blankpage {
  width: 17.867rem;
  margin: 0 auto;
  background-color: #171818;
  box-shadow: 0px 2px 4px 0px rgba(51, 51, 51, 1);
  border-radius: 0.32rem;
}

.history {
  width: 1.28rem;
  height: 1.227rem;
  // margin-top: -1.707rem;
  display: block;
}

[class*="van-hairline"]::after {
  border: none;
}

.BlankPage {
  display: flex;
  flex-direction: column;
  img {
    width: 4.587rem;
    height: 3.68rem;
    display: block;
  }
  p {
    margin-top: 0.8rem;
    font-size: 1.067rem;
    color: #666666;
  }
}
</style>
