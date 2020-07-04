<template>
  <div class="home-container" id="home">
    <header class="header" id="header">
      <ul class="header-right-nav">
        <div class="header-left-logo">
          <h1>
            <img src="../../assets/images/logo.png" alt="logo" />
          </h1>
        </div>
        <li class="header-right-item" @click="ison(0)" :class="{ on: 0 === code }">
          {{ $t("lang.home") }}
        </li>
        <li class="header-right-item" @click="ison(1)" :class="{ on: 1 === code }">
          {{ $t("lang.umenetwork") }}
        </li>
        <li class="header-right-item" @click="ison(2)" :class="{ on: 2 === code }">
          {{ $t("lang.Technology") }}
        </li>
        <li class="header-right-item" @click="ison(3)" :class="{ on: 3 === code }">
          {{ $t("lang.Future") }}
        </li>
        <li class="header-right-item" @click="ison(4)" :class="{ on: 4 === code }">
          {{ $t("lang.Silicon") }}
        </li>
        <li class="header-right-item" @click="ison(5)" :class="{ on: 5 === code }">
          {{ $t("lang.download") }}
        </li>
        <li class="header-right-item" @click="ison(6)" :class="{ on: 6 === code }">
          {{ $t("lang.Economic") }}
        </li>
        <li class="header-right-item" @click="ison(7)" :class="{ on: 7 === code }">
          {{ $t("lang.unity") }}
        </li>
        <li class="header-right-item" @click="ison(8)" :class="{ on: 8 === code }">
          {{ $t("lang.Part") }}
        </li>
        <li class="header-right-item" @click="ison(9)" :class="{ on: 9 === code }">
          {{ $t("lang.RoadMap") }}
        </li>
        <li class="header-right-item" @click="ison(10)" :class="{ on: 10 === code }">
          {{ $t("lang.tact") }}
        </li>
        <!-- v-for="(item,index) in headerNav"
          :key="index"
          @click="ison(index)"
          :class="{ on: index === code }" -->
        <el-dropdown size="small" @command="handleCommand">
          <el-button size="small">
            {{ $t("lang.i18") }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </ul>
    </header>
    <div class="extend" id="exten">
      <el-dropdown size="small" @command="handleCommand">
        <el-button size="small" class="text">
          <span class="text_tode">
            {{ $t("lang.i18") }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="header-left-logo" id="left-logo">
      <img src="../../assets/images/logo.png" alt="logo" />
    </div>
    <!-- <video
      id="v1"
      loop
      muted
      webkit-playsinline=""
      playsinline=""
      x5-playsinline=""
      x-webkit-airplay="allow"
      x5-video-player-type="h5-page"
      x5-video-player-fullscreen=" true"
    >
      <source src="../../assets/video/sequenceTwo.mp4" type="video/mp4" />
    </video> -->

    <!-- <video-player
      v-if="isvideoPlayer"
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player> -->

    <div class="top_gif" v-show="showGif">
      <img src="../../assets/video/unm_top_bg.gif" alt="">
    </div>

    <video id="v1" v-if="isVideo" loop muted autoplay x-webkit-airplay x5-playsinline x5-video-player-type="h5" x5-video-orientation="portraint" webkit-playsinline playsinline>
      <source src="../../assets/video/sequenceTwo.mp4" type="video/mp4" />
    </video>
    <!-- <video id="v1" width="270" loop muted src="http://www.ume.network/media/sequenceTwo.e187f9a5.mp4"></video> -->

    <!-- <canvas id="myCanvas" width="270" height="135"></canvas> -->
    <main class="main" :id="showGif ? 'main' : ''">
      <div class="main-top">Data want to move to link</div>
      <div class="main-container">BRIGHTEN DIGITAL LIFE</div>
      <div class="main-network">WITH UME Network</div>
      <ul class="main-button">
        <li>
          <button @click="openPdf">{{ $t("lang.title") }}</button>
        </li>
        <li>
          <a href="http://explorer.umechain.org/" target="view_window">
            <button>{{ $t("lang.Explorer") }}</button></a>
        </li>
        <li>
          <button @click="next">UME Wallet</button>
        </li>
        <!-- <li>
          <a href="http://www.seedplan.vip" target="view_window"><button>{{$t('lang.jihua')}}</button></a>
        </li> -->
      </ul>
      <div class="main-img">
        <img src="../../assets/images/next.png" alt="jiantou" />
      </div>
    </main>
    <Main />
    <Introduce />
    <UmePhone />
    <Amount />
    <total />
    <Community />
    <Interaction />
    <Footer />
    <div class="fixd" @click="ReturnTop">
      <img src="../../assets/images/arrow.png" alt />
    </div>
  </div>
</template>

<script>
import Main from '../main/Main.vue'
import Introduce from '../introduce/Introduce.vue'
import UmePhone from '../nmePhone/UmePhone.vue'
import Amount from '../amount-of-hair/Amount.vue'
import Community from '../community/Community.vue'
import Interaction from '../interaction/Interaction.vue'
import Footer from '../footer/Footer.vue'
import total from '../total/index.vue'
import { setItem } from '../../utils/localstorage'
export default {
  components: {
    Main,
    Introduce,
    UmePhone,
    Amount,
    Community,
    Interaction,
    Footer,
    total
  },
  data() {
    return {
      isvideoPlayer: false,
      isVideo: false,
      on: false,
      code: 0,
      scrolly: [0, 900, 1800, 2666, 3570, 4000, 4605, 5838, 6338, 6738, 8000],
      timeId: null,
      showGif: false,
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: 'http://www.ume.network/media/sequenceTwo.e187f9a5.mp4'
          }
        ],
        // poster: "../../static/images/test.jpg", //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试' //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
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
    window.addEventListener('scroll', this.scroll)
    this.$nextTick(() => {
      const videoHeader = document.getElementById('v1')
      videoHeader.play()
      // 必须在微信Weixin JSAPI的WeixinJSBridgeReady才能生效
      document.addEventListener('WeixinJSBridgeReady', this.play, false)
    })
  },
  methods: {
    play() {
      const videoHeader = document.getElementById('v1')
      videoHeader.play()
    },
    videsCanvas() {
      var v = document.getElementById('v1')
      var c = document.getElementById('myCanvas')

      var ctx = c.getContext('2d')
      console.log(ctx)

      //每20毫秒画一次图
      v.addEventListener(
        'play',
        function() {
          var i = window.setInterval(function() {
            ctx.drawImage(v, 0, 0, 270, 135)
            //打印当前视频的播放时间
            console.log(v.currentTime)
            //当视频结束的时候去掉循环
            if (v.ended) {
              clearInterval(i)
            }
          }, 20)
        },
        false
      )
      //将视频暂停，然后观察canvas里面的效果
      setTimeout(function() {
        v.pause()
      }, 4000)
      //将视频播放，然后观察canvas里面的效果
      setTimeout(function() {
        v.play()
      }, 7000)
    },
    openPdf() {
      window.open('./whitepaper.pdf')
    },
    handleCommand(command) {
      localStorage.setItem('locale', command)
      this.$i18n.locale = command
      window.scrollTo({
        left: 0,
        top: 0
      })
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    },
    ison(index) {
      window.scrollTo({
        left: 0,
        top: this.scrolly[index],
        behavior: 'smooth'
      })
    }, //点击下滑到下载
    next() {
      window.scrollTo({
        top: 4000,
        behavior: 'smooth'
      })
    },
    ReturnTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    // 滑动方法
    scroll() {
      this.code = this.scrolly.findIndex((item, index) => {
        if (index !== this.scrolly.length - 1) {
          return scrollY >= item && scrollY < this.scrolly[index + 1]
        } else {
          return scrollY >= item
        }
      })
      let top = Math.abs(Math.floor(window.scrollY) - 1)
      var box = document.getElementById('pox')
      var interaction = document.getElementById('interaction')
      var intera = document.getElementById('intera')
      var addC = document.getElementById('addC')
      var loading = document.getElementById('loading')
      var loading2 = document.getElementById('loading2')
      var loading3 = document.getElementById('loading3')
      var loading4 = document.getElementById('loading4')
      var introduce = document.getElementById('introduce-big')
      var community = document.getElementById('community')
      var communityNumber = document.getElementById('community-number')

      if (top > 5900 && top < 7100) {
        box.classList.add('animated', 'fadeInUp')
        interaction.classList.add('animated', 'fadeInUp')
        intera.classList.add('animated', 'fadeInUp')
        addC.classList.add('animated', 'fadeInUp')
        loading.classList.add('animated', 'fadeInUp')
        loading2.classList.add('animated', 'fadeInUp')
        loading3.classList.add('animated', 'fadeInUp')
        loading4.classList.add('animated', 'fadeInUp')
      }
      if (top > 1200 && top < 2000) {
        introduce.classList.add('animated', 'fadeInUp')
      }
      if (top > 5000 && top < 6200) {
        community.classList.add('animated', 'fadeInUp')
        communityNumber.classList.add('animated', 'fadeInUp')
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style scoped lang="scss">
@import './css/home-web.scss';
@import './css/home-pc.scss';
@import './css/home-phone.scss';

.text_tode {
  position: absolute;
  left: 2px;
  top: 3px;
}
.home-container {
  .vjs-custom-skin {
    .video-js {
      .vjs-big-play-button {
        display: none;
      }
    }
  }
}
</style>
