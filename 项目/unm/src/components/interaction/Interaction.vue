<template>
  <div class="interaction" id="interaction">
    <div class="interaction-top">UME RoadMap</div>
    <div class="interaction-container">
      <div class="interaction-dist">
        <ul class="interaction-top-list">
          <li v-for="(item,index) in list" :key="index">{{item}}</li>
        </ul>
        <div class="interaction-img">
          <img src="../../assets/images/juxing2.png" alt style="display: inline-block;width: 1111px;" />
          <div class="loadin-big">
            <div class="loding" id="loading" style="animation-duration:1s;animation-delay:1s;animation-iteration-count:1;animation-fill-mode:both;">
              <img src="../../assets/images/liandian.png" alt />
            </div>
            <div class="loding" id="loading2" style="animation-duration:1s;animation-delay:2s;animation-iteration-count:1;animation-fill-mode:both;">
              <img src="../../assets/images/liandian.png" alt />
            </div>
            <div class="loding" id="loading3" style="animation-duration:1s;animation-delay:3s;animation-iteration-count:1;animation-fill-mode:both;">
              <img src="../../assets/images/liandian.png" alt />
            </div>
            <div class="loding" id="loading4" style="animation-duration:1s;animation-delay:4s;animation-iteration-count:1;animation-fill-mode:both;">
              <img src="../../assets/images/liandian.png" alt />
            </div>
          </div>
          <div class="interaction-box">
            <ul class="interaction-ul" id="pox" style="animation-duration:1s;animation-delay:1s;animation-iteration-count:1;animation-fill-mode:both;">
              <li>
                2018.09
                <p>{{$t('lang.discussing')}}</p>
              </li>
            </ul>
            <ul class="interaction-ul" id="interaction" style="animation-duration:1s;animation-delay:2s;animation-iteration-count:1;animation-fill-mode:both;">
              <li>
                2018.12
                <p>{{$t('lang.concept')}}</p>
              </li>
            </ul>
            <ul class="interaction-ul" id="intera" style="animation-duration:1s;animation-delay:3s;animation-iteration-count:1;animation-fill-mode:both;">
              <li class="animated fadeInUp">
                2019.01
                <p>{{$t('lang.research')}}</p>
              </li>
              <li class="animated fadeInUp">
                2019.06
                <p>{{$t('lang.first')}}</p>
              </li>
              <li class="animated fadeInUp">
                2019.10
                <p>{{$t('lang.began')}}</p>
              </li>
              <li class="animated fadeInUp">
                2019.12
                <p>{{$t('lang.resear')}}</p>
              </li>
            </ul>
            <ul class="interaction-ul" id="addC" style="animation-duration:1s;animation-delay:4s;animation-iteration-count:1;animation-fill-mode:both;">
              <li>
                2020.01
                <p>{{$t('lang.bership')}}</p>
              </li>
              <li>
                2020.02
                <p>{{$t('lang.determined')}}</p>
              </li>
              <li>
                2020.03
                <p>{{$t('lang.officially')}}</p>
              </li>
              <li>
                2020.05
                <p>{{$t('lang.novative')}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['开始', '2018', '2019', '2020'],
      top: ''
    }
  }
}
</script>

<style lang='scss' scoped>
@import './css/interaction_pwd.scss';
// @media only screen and (min-width:1126px){
.interaction {
  height: 900px;
  // background: papayawhip;
  text-align: center;
  .interaction-top {
    font-size: 30px;
    font-family: 'FZLanTingHei-B-GBK';
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    width: 48%;
    height: 150px;
    line-height: 150px;
  }
  .interaction-container {
    width: 100%;
    .interaction-dist {
      width: 1120px;
      margin: 0 auto;
    }
    .interaction-top-list {
      display: flex;
      text-align: left;
      margin-left: 5px;
      line-height: 16px;
      li {
        width: 288px;
      }
    }
    .interaction-img {
      margin: 0 auto;
      position: relative;
    }
    .loadin-big {
      margin-top: -50px;
      z-index: 100;
      display: flex;
      .loding {
        text-align: left;
        display: inline-block;
        width: 280px;
      }
    }
    .interaction-box {
      display: flex;
      justify-content: space-between;
      .interaction-ul {
        margin-top: -26px;
        font-size: 12px;
        width: 280px;

        li {
          text-align: left;
          height: 64px;
          border-left: 1px solid #999999;
          padding: 45px 10px;
          font-family: 'FZLanTingHei-B-GBK';
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          position: relative;
          margin-left: 20px;
          p {
            line-height: 16px;
            font-family: 'PingFang SC';
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
          }
          &::after {
            content: '';
            display: inline-block;
            width: 7px;
            height: 7px;
            background: black;
            border-radius: 50%;
            position: absolute;
            left: -4px;
            top: 88px;
          }
        }
      }
    }
  }
}
// }
</style>