<template>
  <div class="home-container">
    <div class="homt-content">
      <p class="animated fadeInLeft">{{$t('comm.world')}}</p>
      <p class="animated fadeInRight">{{$t('comm.the')}}</p>
    </div>
    <div class="homt-bottom">
      <div class="hb-phone animated fadeInUp">
        <img src="../../assets/home/img/anzhuo.png" alt="" />
        <p class="f-18 ">{{$t('comm.Android')}}</p>
      </div>
      <div class="hb-phone animated fadeInUp">
        <img src="../../assets/home/img/ios.png" alt="" />
        <p class="f-18 ">{{$t('comm.ios')}}</p>
      </div>
    </div>
    <div class="return" @click="returnt">
      <img src="../../assets/home/img/top.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    returnt() {
      this.$win.scrollBy({
        top: -100000,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped lang="less">
@import url("./css/index-mb.less");
@import url("./css/index-pc.less");
.on {
  color: red;
}
.return {
  position: fixed;
  bottom: 0;
  right: 30px;
  width: 50px;
  height: 70px;
  z-index: 10;
  cursor: pointer;
}
</style>
