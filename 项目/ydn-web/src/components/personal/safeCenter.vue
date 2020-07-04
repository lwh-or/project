<template>
  <div class="bgb">
    <topBar :title="title" :url="url"></topBar>
    <div class="main f-16">
      <router-link :to="{path:'/change/password',query:{type:'login'}}" tag="div" class="item flex_between">
        <div class="icon flex_center">
          <span>登录密码</span>
        </div>
        <div class="more f-14 flex_center">
          <span>修改</span>
          <img src="../../../static/images/common/gen@2x.png" alt="">
        </div>
      </router-link>
      <router-link :to="{path:'/change/password',query:{type:'money'}}" tag="div" class="item flex_between">
        <div class="icon flex_center">
          <span>资金密码</span>
        </div>
        <div class="more f-14 flex_center">
          <span>修改</span>
          <img src="../../../static/images/common/gen@2x.png" alt="">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar'
export default {
  name: 'safeCenter',
  components: {
    topBar
  },
  data() {
    return {
      title: '安全中心',
      url: '/personal'
    }
  }
}
</script>

<style scoped>
.main {
  padding: 0 0.8rem;
  padding-bottom: 4.266667rem;
}
.icon img {
  width: 0.853333rem;
  margin-right: 0.8rem;
  display: block;
}
.more img {
  height: 0.64rem;
  margin-left: 0.533333rem;
  display: block;
}
.more span {
  color: #999999;
}
.item {
  padding: 1.333333rem 0;
  border-bottom: 0.053333rem solid #dcdcdc;
}
</style>