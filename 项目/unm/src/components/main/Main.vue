<template>
  <div class="start">
    <div class="start-header">
      <h1>{{$t('lang.begins')}}</h1>
    </div>
    <div class="start-box">
      <div class="big-box">
        <div class="start-nav">
          <h2>UME Network</h2>
          <span>{{$t('lang.through')}}</span>
        </div>
        <div class="start-mob">{{$t('lang.technical')}}</div>
        <div class="start-mob padd">{{$t('lang.busines')}} </div>
      </div>
      <div class="start-img"><img src="../../assets/images/car.png" alt="car" /></div>
    </div>
    <div class="start-code"><img src="../../assets/images/car.png" alt="car" /></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
@import './css/main-phone.scss';
// @media only screen and (min-width:790px){
.start {
  height: 900px;
  background: #000000;
  text-align: center;
  box-sizing: border-box;
  margin-top: 0;
  .start-code {
    display: none;
  }
  .start-header {
    line-height: 34px;
    padding-top: 73px;
    h1 {
      font-size: 36px;
      font-family: 'FZLanTingHei-B-GBK';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .start-box {
    display: flex;
    justify-content: center;
    // align-items: flex-start;
  }
  .big-box {
    width: 648px;
    padding-top: 180px;
    .start-nav {
      font-family: 'PingFang SC';
      font-weight: 400;
      color: #1a66c9;
      display: flex;
      line-height: 60px;
      justify-content: left;
      margin-left: 30px;
      h2 {
        font-size: 36px;
        margin-right: 15px;
      }
      span {
        font-size: 20px;
      }
    }
    .start-mob {
      font-size: 14px;
      font-family: 'pingfang';
      font-weight: 500;
      color: #ffffff; 
      text-align: start;
      line-height: 40px;
      margin-left: 30px;
    }
    .padd {
      margin-top: 75px;
    }
  }
  .start-img {
    padding-top: 200px;
  }
}
@media only screen and (max-width: 1135px) {
  .start .start-box .big-box .start-nav h2 {
    // font-size: 30px;
  }
  .start .start-box .big-box {
    // padding-top: 90px;
  }
}
@media only screen and (max-width: 1230px) {
  .home-container .start .start-img img {
    display: inline-block;
    width: 90%;
  }
}
</style>