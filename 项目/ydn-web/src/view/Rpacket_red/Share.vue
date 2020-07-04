<template>
  <van-overlay :show="balanceShow">
    <div class="wrapper"
         @click.self="cloneShow">
      <div class="container">
        <h3 class="title">邀请码</h3>
        <div class="code">
          <qrcode-vue :value="qrcodeurl"
                      :size="size"
                      level="H"></qrcode-vue>
        </div>
        <div class="text">
          {{ qrcodeurl }}
        </div>
        <p class="copy_href"
           v-copy="qrcodeurl">复制链接</p>
        <!--  -->
        <img class="deselect"
             @click="cloneShow"
             src="../../../static/images/RedPack/deselect@2x.png">
      </div>
    </div>
  </van-overlay>
</template>
<script>
import QrcodeVue from "qrcode.vue";
export default {
  name: 'Share',
  props: ['code', 'qrcodeurl'],
  components: { QrcodeVue },
  data () {
    return {
      balanceShow: false,
      size: 138,
    }
  },
  watch: {
    qrcodeurl () {
      this.qrcodeurl = this.qrcodeurl;
    }
  },
  methods: {
    cloneShow () {
      this.balanceShow = false
      this.$emit('balancegtab', this.balanceShow)
    },
    qrcodesize () {
      var qrcodeSize = "";
      //得到手机屏幕的宽度
      var htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth; // 375
      //设置二维码大小
      qrcodeSize = Math.ceil((htmlWidth / 20) * 10.7);
      this.size = qrcodeSize;
    },
  },
  mounted () {
    this.balanceShow = this.code;
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: relative;
  height: 100%;
  .container {
    background-color: #fff;
    border-radius: 0.853rem;
    width: 16.533rem;
    height: 17.333rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    .title {
      color: #000000;
      font-size: 0.96rem;
      text-align: center;
      margin-top: 1.653rem;
      margin-bottom: 1.067rem;
    }
    .code {
      display: inline-block;
      // width: 7.36rem;
      // height: 7.36rem;
    }
    .text {
      display: inline-block;
      width: 10.987rem;
      height: 1.813rem;
      font-size: 0.64rem;
      color: #333333;
      margin-top: 0.747rem;
    }
    .copy_href {
      color: #000;
      font-size: 0.747rem;
      margin-top: 0.533rem;
    }
    .deselect {
      position: absolute;
      bottom: -2.667rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.707rem;
      height: 1.707rem;
      display: block;
    }
  }
}
</style>
