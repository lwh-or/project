<template>
  <div class="umePhone">
    <div class="umePhone-container">
      <div class="umePhone-left">
        <div class="phone-money">{{$t('lang.downloa')}}</div>
        <div class="phone-new">{{$t('lang.reliable')}}</div>
        <div class="phone-next">{{$t('lang.toStart')}}</div>
        <ul class="phone-ul">
          <li>
            <a href="https://wws.lanzous.com/iAERjdfq1fa" target="view_window">
              <img src="../../assets/images/ios2.png" alt />
              {{$t('lang.Idownload')}}
            </a>
          </li>
          <li>
            <a href="https://wws.lanzous.com/iA7jddfuj5c" target="view_window">
              <img src="../../assets/images/anzhuo2.png" alt />
              {{$t('lang.Adownload')}}
            </a>
          </li>
        </ul>
      </div>
      <div class="umePhone-right">
        <img src="../../assets/images/umephone.png" alt />
      </div>
    </div>
    <div class="model">
      <div class="model-big">
        <div class="model-top">{{$t('lang.EconomicModels')}}</div>
        <div class="model-d">
          <div class="model-foo">
            <div class="model-img">
              <img src="../../assets/images/ic_pocket2.png" alt />
            </div>
            <p>{{$t('lang.saving')}}</p>
          </div>
          <div class="model-foo">
            <div class="model-img" style="margin-left:10px">
              <img src="../../assets/images/wakuangmoren.png" alt />
            </div>
            <p style="width:184px;margin-left:-29px">{{$t('lang.condition')}}</p>
          </div>
          <div class="model-foo">
            <div class="model-img">
              <img src="../../assets/images/xinyong2.png" alt />
            </div>
            <p>{{$t('lang.credit')}}</p>
          </div>
          <div class="model-foo">
            <div class="model-img">
              <img src="../../assets/images/qukuailian2.png" alt />
            </div>
            <p>{{$t('lang.knowledge')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import './css/umePhone.scss';
@import './css/umePhone-web.scss';
// @media only screen and (min-width:790px){
.umePhone {
  height: 900px;
  // background: darkkhaki;
  margin: 0 auto;
  .umePhone-container {
    // line-height: 525px;
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 94px;
    .umePhone-left {
      box-sizing: border-box;
      padding-top: 100px;
      .phone-money {
        font-size: 36px;
        font-family: 'FZLanTingHei-B-GBK';
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .phone-new {
        font-size: 32px;
        font-family: 'PingFang SC';
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .phone-next {
        font-size: 18px;
        font-family: 'PingFang SC';
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 96px;
      }
      .phone-ul {
        display: flex;
        justify-content: space-between;
        text-align: center;
        cursor: pointer;
        li {
          width: 180px;
          height: 40px;
          line-height: 40px;
          border: 1px solid rgba(0, 0, 0, 1);
          border-radius: 4px;
          margin-right: 43px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          a {
            text-decoration: none;
            width: 100%;
            display: flex;
            justify-content: space-around;
          }
          img {
            display: inline-block;
            line-height: 40px;
            // display: inline-block;
            width: 23px;
            height: 25px;
            padding-top: 6px;
          }
        }
      }
    }
    .umePhone-right {
      padding-top: 80px;
      .umePhone-box {
        .umePhone-img-l {
          position: relative;
        }
        .umePhone-a {
          position: absolute;
          right: 156px;
        }
      }
    }
  }
  .model {
    margin-top: 96px;
    height: 375px;
    background: rgba(245, 244, 244, 1);
    text-align: center;
    width: 100%;
    margin: 0 auto;
    .model-big {
      width: 70%;
      margin: 0 auto;
    }
  }
  .model-top {
    font-size: 30px;
    font-family: 'FZLanTingHei-B-GBK';
    font-weight: 400;
    color: rgba(1, 1, 1, 1);
    line-height: 104px;
  }
  .model-d {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    .model-foo {
      width: 100px;
      height: 100px;
      .model-img {
        width: 100%;
        height: 100%;
        background-image: url('../../assets/images/tuoyuan.png');
        background-repeat: no-repeat;
        background-size: cover;
        // margin-left: 14px;
        img {
          padding-top: 25px;
          display: inline-block;
        }
      }
      p {
        padding-top: 12px;
        width: 130px;
        height: 51px;
        font-size: 18px;
        font-family: 'PingFang SC';
        // font-weight:bold;
        color: rgba(0, 0, 0, 1);
        margin-left: -14px;
        line-height: 32px;
      }
    }
  }
}
// }
@media only screen and (max-width: 1145px) {
  .umePhone .model-d .model-foo p {
    font-size: 14px;
  }
}
@media only screen and (max-width: 1502px) {
  .umePhone .umePhone-container .umePhone-left .phone-money {
    // font-size: 26px;
  }
  .umePhone .umePhone-container .umePhone-left .phone-new {
    font-size: 24px;
  }
  .umePhone .umePhone-container .umePhone-left .phone-next {
    font-size: 16px;
  }
}
</style>