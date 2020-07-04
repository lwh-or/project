<template>
  <div class="footer">
    <div class="footer-top">
      <h4>{{ $t("lang.rises") }}</h4>
      <h3>{{ $t("lang.cosystem") }}</h3>
      <div class="footer_gif" v-show="showGif">
        <img src="../../assets/video/sequence.gif" alt="">
      </div>

      <video id="v2" v-if="isVideo" loop muted autoplay x-webkit-airplay x5-playsinline x5-video-player-type="h5" x5-video-orientation="portraint" webkit-playsinline playsinline>
        <source src="../../assets/video/hhh.mp4" type="video/mp4" v-if="!videoSrc" />
        <source src="../../assets/video/hhh.mp4" type="video/mp4" v-if="videoSrc" />
      </video>
    </div>
    <div class="footer-bottom">
      <div class="footer-img">
        <img src="../../assets/images/UME-metwork.png" alt />
      </div>
      <div class="footer-container">
        <h6>{{ $t("lang.vision") }}</h6>
        <p>{{ $t("lang.digital") }}</p>
        <h6>{{ $t("lang.leads") }}</h6>
        <p>{{ $t("lang.intelligence") }}</p>
      </div>
      <div class="footer-p">
        <p>关注我们</p>
        <ul class="footer-ul margin-l">
          <li>
            <img src="../../assets/icon/facebook.png" alt />
            <p>Face book</p>
          </li>
          <li>
            <img src="../../assets/icon/twitter.png" alt />
            <p>Twitter</p>
          </li>
          <li>
            <img src="../../assets/icon/lin.png" alt />
            <p>Linkedin</p>
          </li>
          <li>
            <img src="../../assets/icon/git.png" alt />
            <p>Github</p>
          </li>
        </ul>
        <ul class="footer-ul footer-top">
          <li>
            <img src="../../assets/icon/red.png" alt />
            <p>Reddit</p>
          </li>
          <li>
            <img src="../../assets/icon/youtube.png" alt />
            <p>Youtube</p>
          </li>
          <li>
            <img src="../../assets/icon/medium.png" alt />
            <p>Medium</p>
          </li>
          <li>
            <img src="../../assets/icon/weibo.png" alt />
            <p>Weibo</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-icon">
      <p>Singapore | Silicon Valley | Shanghai | Seoul | Zug | Moscow |</p>
      <p>©2020 UME Network</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: true
    }
  },
  created() {
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
      // con.style.cssText = "display:block";
      if (browser.versions.android) {
        this.showGif = true
      } else if (
        browser.versions.ios ||
        browser.versions.iPhone ||
        browser.versions.iPad
      ) {
        this.isVideo = true
      }
      // window.location.href= 'http://c.pc.qq.com/middle.html?pfurl=https://www.rencaiyoujia.com/appdown/index.html';
    } else if (browser.versions.android) {
      // 此处写Andoird 的下载地址
      this.showGif = true
      // this.isVideo = true
      // window.location = "https://www.w3h5.com/w3h5.apk";
    } else if (
      browser.versions.ios ||
      browser.versions.iPhone ||
      browser.versions.iPad
    ) {
      this.isVideo = true
      //TODO 此处写ios的下载地址
      // window.location = "https://www.w3h5.com/w3h5.ipa";
    } else {
      this.isVideo = true
      // window.location = "https://www.w3h5.com/w3h5.apk";
    }
  },
  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize, false)
    this.$nextTick(() => {
      const videoFooter = document.getElementById('v2')
      // 一般情况下，这样就可以自动播放了，但是一些奇葩iPhone机不可以
      videoFooter.play()
      // 必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
      document.addEventListener('WeixinJSBridgeReady', this.play, false)
    })
  },
  beforeDestroy() {
    document.removeEventListener('WeixinJSBridgeReady', this.play, false)
    document.removeEventListener('WeixinJSBridgeReady', this.resize, false)
  },
  methods: {
    resize() {
      const screenWidth =
        document.documentElement.clientWidth || window.innerWidth
      this.videoSrc = screenWidth < 750
    },
    play() {
      const videoFooter = document.getElementById('v2')
      videoFooter.play()
    }
  }
}
</script>

<style lang="scss">
@import './css/footer.scss';
@import './css/footer-phone.scss';
// @media only screen and (min-width:790px){
.footer {
  height: 900px;
  background: #161616;
  position: relative;
  z-index: -111;
  video {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    min-width: 100%;
    min-height: 78%;
    height: auto;
    width: auto;
    z-index: -11;
  }
  .footer-top {
    height: 600px;
    text-align: center;

    h4 {
      font-size: 48px;
      font-family: 'FZLanTingHei-B-GBK';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding-top: 218px;
      line-height: 100px;
    }
    h3 {
      font-size: 38px;
      font-family: 'PingFang SC';
      font-weight: 200;
      color: rgba(255, 255, 255, 1);
    }
  }
  .footer-bottom {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #161616;
    // padding-top: 44px;
    .footer-img {
      img {
        padding-top: 26px;
      }
    }
    .footer-container {
      h6 {
        font-size: 16px;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      p {
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        font-family: 'PingFang SC';
        text-align: center;
        line-height: 15px;
      }
    }
    .footer-p {
      font-size: 16px;
      font-family: 'PingFang SC';
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      width: 250px;
      height: 50px;
    }
    .footer-ul {
      display: flex;
      justify-content: space-around;
      height: 50px;
      li {
        font-size: 13px;
        text-align: center;
        p {
          line-height: 5px;
          margin-top: -10px;
        }
      }
    }
  }
  .footer-icon {
    padding-top: 60px;
    background: #161616;
    p {
      font-size: 12px;
      font-family: 'PingFang SC';
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
      text-align: center;
      line-height: 16px;
    }
  }
}
.footer-top {
  margin-top: 14px;
}
.margin-l {
  margin-left: -12px;
}
// }
</style>
