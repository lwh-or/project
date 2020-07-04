<template>
  <div class="amount">
    <div style="display:flex;justify-content: space-evenly;padding:56px 0px">
      <div class="amount-main">
        <div class="amount-t">{{$t('lang.billion')}}</div>
        <div class="amount-b">{{$t('lang.mining')}}</div>
      </div>
      <div class="amount-right">
        <!-- <div class=""><img src="../../assets/images/model.png" alt=""></div>
         <div class="amount-r">
             <h6>基金会质押10%     1亿枚      </h6>
             <p>  质押锁定在Dream Building Fund基金会中，后期逐步释放后，
                    考虑用于接收UME未来战略投资机构，维护UME市值健康发展。 </p>
        </div>-->
      </div>
      <div></div>
      <div></div>
    </div>
    <div style="display:flex;justify-content: center;padding:0px 178px">
      <div class="amount-left">
        <img src="../../assets/images/bingdu.png" alt />
      </div>
      <div class="amount-container">
        <div style="display:flex;justify-content: space-evenly;">
          <div class="amount-h">
            <h6>{{$t('lang.pledged')}}</h6>
            <p>{{$t('lang.investment')}}</p>
          </div>
        </div>
        <div style="display:flex;justify-content: space-evenly;padding-top:78px">
          <div class="amount-h">
            <h6>{{$t('lang.team')}}</h6>
            <p>{{$t('lang.distributed')}}</p>
          </div>
        </div>
        <div style="display:flex;justify-content: space-evenly;padding-top:108px">
          <div class="amount-h">
            <h6>{{$t('lang.were')}}</h6>
            <p>{{$t('lang.safe')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
// @media only screen and (min-width:790px){
@import './css/amout-web.scss';
.amount {
  margin-top: 39px;
  height: 900px;
  background: black;
  background-image: url('../../assets/images/back.png');
  background-repeat: no-repeat;
  background-size: cover;
  .amount-main {
    .amount-t {
      font-size: 30px;
      font-family: 'FZLanTingHei-B-GBK';
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .amount-b {
      font-size: 15px;
      color: rgba(255, 255, 255, 1);
    }
  }
  .amount-right {
    display: flex;
    .amount-r {
      margin-left: 20px;
      p {
        width: 416px;
        height: 47px;
        line-height: 38px;
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
      h6 {
        width: 227px;
        height: 19px;
        font-size: 20px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 6px;
      }
    }
  }
  .amount-container {
    padding-left: 20px;
    margin-top: -72px;
    .amount-h {
      padding-left: 20px;
      h6 {
        font-size: 20px;
        font-family: 'PingFang SC';
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      p {
        width: 409px;
        height: 80px;
        font-size: 14px;
        font-family: 'PingFang SC';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 38px;
      }
    }
  }
}
// }
</style>