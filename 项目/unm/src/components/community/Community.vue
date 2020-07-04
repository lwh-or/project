<template>
  <div class="community">
    <div class="ume-community">
      <h2>{{$t('lang.mmunity')}}</h2>
      <ul class="community-number" id="community" style="animation-duration:1s;animation-delay:0.5s;animation-iteration-count:1;animation-fill-mode:both;">
        <li id="box">
          1,000,00+
          <p>{{$t('lang.contributor')}}</p>
        </li>
        <li>
          500+
          <p>{{$t('lang.Technical')}}</p>
        </li>
        <li>
          98+
          <p>{{$t('lang.member')}}</p>
        </li>
        <li>
          120+
          <p>{{$t('lang.partners')}}</p>
        </li>
      </ul>
      <ul class="community-number" id="community-number" style="animation-duration:1s;animation-delay:0.5s;animation-iteration-count:1;animation-fill-mode:both;">
        <li class="number_li">
          <p></p>
        </li>
        <li>
          198,45
          <p>{{$t('lang.network')}}</p>
        </li>
        <li>
          40
          <p>{{$t('lang.node')}}</p>
        </li>
        <li class="number_li">
          <p></p>
        </li>
      </ul>
    </div>
    <div class="community-cooperation">
      <h2>{{$t('lang.cooperativePartner')}}</h2>
      <div class="community-img">
        <div class="community-t">
          <img src="../../assets/images/ee.png" alt style="width:12%;height:10%" />
          <img src="../../assets/images/chuanbo.png" alt />
          <img src="../../assets/images/amazon.png" alt />
          <img src="../../assets/images/wangyi.png" alt />
          <img src="../../assets/images/caijing.png" alt />
        </div>
        <div class="community-t">
          <img src="../../assets/images/36kr.png" alt />
          <img id="padd_img" class="left_img" src="../../assets/images/ecological2.png" alt />
          <img src="../../assets/images/jinse.png" alt />
          <img src="../../assets/images/babite.png" alt />
          <img src="../../assets/images/shijie2.png" alt />
        </div>
      </div>

      <div class="p_comm-img">
        <div class="none_code"><img src="../../assets/images/ee.png" alt /></div>
        <div><img src="../../assets/images/chuanbo.png" alt /></div>
        <div><img src="../../assets/images/amazon.png" alt /></div>
        <div><img src="../../assets/images/wangyi.png" alt /></div>
        <div><img src="../../assets/images/caijing.png" alt /></div>
        <div><img src="../../assets/images/36kr.png" alt /></div>
        <div><img id="padd_img" class="left_img" src="../../assets/images/ecological2.png" alt /></div>
        <div><img src="../../assets/images/jinse.png" alt /></div>
        <div><img src="../../assets/images/babite.png" alt /></div>
        <div><img src="../../assets/images/shijie2.png" alt /></div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang='scss' scoped>
@import './css/communit-phonw.scss';
@import './css/community-web.scss';

// @media only screen and (min-width:790px){
.community {
  background-color: #666666;
  height: 900px;
  text-align: center;
  .ume-community {
    height: 490px;
    background: #000000;
    h2 {
      font-size: 30px;
      font-family: 'langting';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      padding-top: 60px;
    }
    .community-number {
      display: flex;
      justify-content: space-evenly;
      padding-top: 70px;
      li {
        font-size: 28px;
        font-family: 'FZLanTingHei-B-GBK';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        p {
          font-size: 14px;
          font-family: 'PingFang SC';
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .community-cooperation {
    height: 410px;
    background-image: url('../../assets/images/beijing.png');
    width: 80%;
    margin: 0 auto;
    h2 {
      padding: 40px 0;
      font-size: 30px;
      font-family: 'FZLanTingHei-B-GBK';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .community-img {
      // display: flex;
      // justify-content: space-evenly;
      .community-t {
        display: flex;
        justify-content: space-between;
        padding: 39px 31px;
        .left_img {
          padding-left: 112px;
        }
      }
    }
    .p_comm-img {
      display: none;
    }
  }
}
// }
</style>