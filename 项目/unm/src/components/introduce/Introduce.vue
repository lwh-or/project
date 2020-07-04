<template>
  <div class="introduce">
    <div class="introduce-top">Activate the World in UME</div>
    <div class="introduce-main">{{$t('lang.foundation')}}</div>
    <div class="introduce-container" id="introduce-big">
      <div class="introduce-big">
        <div class="introduce-img"><img src="../../assets/images/ioto.png" alt="ioto" /></div>
        <div class="introduce-u">U-IOTOS</div>
        <div class="introduce-into">{{$t('lang.Internet')}}</div>
      </div>
      <div class="introduce-big ">
        <div class="introduce-img"><img src="../../assets/images/jiedian2.png" alt="ioto" /></div>
        <div class="introduce-u">V-EdgeOS</div>
        <div class="introduce-into">{{$t('lang.platform')}}</div>
      </div>
      <div class="introduce-big">
        <div class="introduce-img"><img src="../../assets/images/chanpinfangan--yunwangluoanqua.png" alt="ioto" /></div>
        <div class="introduce-u">U-MORSE</div>
        <div class="introduce-into">{{$t('lang.makes')}}</div>
      </div>
      <div class="introduce-big ">
        <div class="introduce-img"><img src="../../assets/images/dds2.png" alt="ioto" /></div>
        <div class="introduce-u big_ggg">{{$t('lang.storage')}}</div>
        <div class="introduce-into">{{$t('lang.decentralized')}}</div>
      </div>
      <div class="introduce-big">
        <div class="introduce-img"><img src="../../assets/images/fuhuaqi2.png" alt="ioto" /></div>
        <div class="introduce-u">UME Ventures</div>
        <div class="introduce-into">{{$t('lang.incubator')}}</div>
      </div>
      <div class="introduce-big">
        <div class="introduce-img"><img src="../../assets/images/icn_gonglian_grey2.png" alt="ioto" /></div>
        <div class="introduce-u">UMEChain </div>
        <div class="introduce-into">{{$t('lang.chain')}}</div>
      </div>
    </div>
    <div class="title">
      {{$t('lang.infinite')}}
    </div>
    <div class="title-s">
      {{$t('lang.deep')}}
    </div>
    <div class="title-z" id="title-z">
      <div class="title-img f-width">
        <h6> {{$t('lang.agriculture')}}</h6>
        <p>Intelligent Agriculture</p>
      </div>
      <div class="back-img f-width">
        <h6>{{$t('lang.city')}}</h6>
        <p>Intelligent City</p>
      </div>
      <div class="back-img-two f-width">
        <h6>{{$t('lang.medical')}}</h6>
        <p>Intelligent Medical</p>
      </div>
    </div>
    <div class="title-z" id="title-z2">
      <div class="back-img-three f-width">
        <h6>{{$t('lang.business')}}</h6>
        <p>Intelligent Business</p>
      </div>
      <div class="back-img-four f-width">
        <h6>{{$t('lang.factory')}}</h6>
        <p>Digital Factory</p>
      </div>
      <div class="back-img-fix f-width">
        <h6>{{$t('lang.things')}}</h6>
        <p>Intelligent Internet of Things</p>
      </div>
    </div>
    <div class="back">
      <div class="back-left">
        <div class="back-left-t">{{$t('lang.exchange')}}</div>
        <div class="back-left-m"> {{$t('lang.fully')}}</div>
      </div>
      <div class="back-right"><img src="../../assets/images/ziyuan.png" alt=""></div>
    </div>
    <div class="ecological">
      <div class="ecological-left"></div>
      <div class="ecological_text">
        <h4>{{$t('lang.civilization')}}</h4>
        <p>{{$t('lang.introducing')}}</p>
        <p>{{$t('lang.massive')}}</p>
        <p>{{$t('lang.similar')}}</p>
        <p>{{$t('lang.whole')}}</p>

      </div>
      <div class="ecological-right" style="width:29%"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
@import './css/introduce-web.scss';
@import './css/introduce-phone.scss';
// @media only screen and (min-width:790px){
.introduce {
  text-align: center;
  .introduce-top {
    font-size: 30px;
    font-family: 'langting';
    color: rgba(0, 0, 0, 1);
    padding-top: 70px;
    // font-weight: bold;
  }
  .introduce-main {
    padding-top: 20px;
    width: 682px;
    margin: 0 auto;
    font-size: 14px;
    font-family: 'pingfang';
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 35px;
  }
  .introduce-container {
    display: flex;
    width: 72%;
    margin: 0 auto;
    flex-wrap: wrap;
    line-height: 20px;
    .introduce-big {
      width: 349px;
      margin: 0 auto;
      padding-top: 100px;
      .introduce-img {
        width: 90px;
        height: 90px;
        border: 1px solid #999999;
        border-radius: 50%;
        text-align: center;
        line-height: 123px;
        margin: 0 auto;
      }
      .introduce-u {
        height: 46px;
        font-size: 18px;
        font-family: 'pingfang';
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 46px;
        margin: 0 auto;
      }
      .introduce-into {
        width: 100%;
        height: 82px;
        font-size: 14px;
        font-family: 'pingfang';
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 29px;
      }
    }
  }
  .title {
    font-size: 30px;
    font-family: 'langting';
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 25px;
    line-height: 82px;
    padding-top: 80px;
  }
  .f-width {
    width: 300px;
    height: 100px;
  }
  .title-s {
    font-size: 28px;
    font-family: 'pingfang';
    color: rgba(0, 0, 0, 1);
    line-height: 29px;
    padding-bottom: 66px;
  }
  .title-z {
    display: flex;
    padding: 30px 60px;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 85%;
    justify-content: space-around;
    h6 {
      font-size: 18px;
      font-family: 'langting';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 70px;
    }
    p {
      font-size: 14px;
      font-family: 'pingfang';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0px;
    }
    .back-img {
      background-image: url('../../assets/images/background-img5.png');
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
    .title-img {
      background-image: url('../../assets/images/background-img3.png');
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
    .back-img-two {
      background-image: url('../../assets/images/background-img2.png');
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
    .back-img-three {
      background-image: url('../../assets/images/background-img6.png');
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 68px;
      &:hover {
        transform: scale(1.1);
      }
    }
    .back-img-four {
      background-image: url('../../assets/images/background-img4.png');
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
    .back-img-fix {
      background-image: url('../../assets/images/background-img1.png');
      background-repeat: no-repeat;
      background-size: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .back {
    display: flex;
    align-items: center;
    background: black;
    justify-content: space-evenly;
    height: 330px;
    .back-left {
      text-align: center;
      .back-left-t {
        text-align: left;
        font-size: 30px;
        font-family: 'langting';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        padding-bottom: 40px;
      }
      .back-left-m {
        width: 619px;
        font-size: 14px;
        font-family: 'pingfang';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 44px;
      }
    }
  }
}
.ecological {
  display: flex;
  background: #666666;
  height: 400px;
  justify-content: space-between;
  .ecological-left {
    width: 29%;
    background-image: url('../../assets/images/ba.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .ecological_text {
    width: 44%;
  }

  .ecological-right {
    background-image: url('../../assets/images/ba2.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  h4 {
    text-align: right;
    font-size: 30px;
    font-family: 'langting';
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 25px;
  }
  p {
    text-align: right;
    font-size: 13px;
    font-family: 'pingfang';
    font-weight: 300;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }
}
// }

@media only screen and (max-width: 1145px) {
  .introduce .back .back-left .back-left-t[data-v-ad258aa2] {
    text-align: center;
  }
}
@media only screen and (max-width: 1390px) {
  .ecological h4 {
    font-size: 18px;
    margin: 20px;
  }
  .ecological p {
    line-height: 30px;
  }
}
</style>