<template>
  <div>
    <!-- <div id="container" v-if="ists">
      <div
        style="position:relative;padding-top:100px;color:#333;font-size: 22px;text-align: center;"
      >
        <i
          style="position: absolute;top: 10px;right: 10px;font-size: 100px"
          class="iconfont icon-jiantou"
        ></i>
        <p style="font-weight: 600;">请点击屏幕右上角 [ ··· ]</p>
        <p>
          在
          <i
            style="font-size: 60px;color: #1487F0"
            class="iconfont icon-browser"
          ></i>
          浏览器打开
        </p>
      </div>
    </div> -->
    <!-- <Hello v-if="isHolle" /> -->
    <Hello />
  </div>
</template>
<script>
import Hello from '../components/Hello'
export default {
  components: {
    Hello
  },
  data() {
    return {
      isHolle: true,
      ists: false
    }
  },
  created() {
    /*
     * 智能手机浏览器版本信息:
     */
    var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion
          return {
            //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile:
              !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            wx: u.indexOf('MicroMessenger') > 0 //是否是微信
          }
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      },
      con = document.getElementById('container')
    if (browser.versions.wx) {
      if (browser.versions.android) {
        this.ists = true
        this.isHolle = false
      }
      // window.location.href= 'http://c.pc.qq.com/middle.html?pfurl=https://www.rencaiyoujia.com/appdown/index.html';
    }
  }
}
</script>

<style lang="scss" scoped></style>
