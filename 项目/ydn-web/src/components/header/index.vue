// 顶部导航--封装插槽
<template>
  <div class="header">
    <van-nav-bar :fixed="true"
                 :placeholder="true"
                 :border="false"
                 z-index="9">
      <slot slot="left"
            class="left-arrows"
            name="left"></slot>
      <slot slot="title"
            name="title"></slot>
      <slot slot="right"
            name="right"
            class="right"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
Vue.use(NavBar);
export default {
  name: "Header",
  props: {
    bool: Boolean,
  },
};
</script>

<style lang="less" scoped>

.header{
  // height: 314px;
  // height: 3.413333rem;
  background-color: #040606;
}
/deep/ .van-nav-bar__placeholder{
  height: 0;
  // background-color: #040606;

}
.van-nav-bar__placeholder /deep/ .van-nav-bar {
  background-color: #040606;
  // margin-top: 20px;
  height: 3.413333rem;
  border-top: 20px solid #040606;
}

.title {
  font-size: 0.96rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.left-arrows {
  width: 1.387rem;
  height: 1.387rem;
  line-height: 1.387rem;
  display: block;
}

.van-nav-bar__placeholder {
  /deep/ .van-nav-bar__left {
    bottom: 0;
  }
  /deep/ .van-nav-bar__right{
    bottom: 0;
    margin-top: 12px;
  }
}
.van-nav-bar__title {
  color: #fff;
}
</style>
