<template>
  <div class="total" id="total">
    <div class="total_text">
      <h1>{{$t('lang.total')}}:{{$t('lang.yuan')}}</h1>
      <div>
        <p>{{$t('lang.cycle')}}</p>
        <p>{{$t('lang.mining')}}</p>
      </div>
    </div>
    <div class="total_con" id="tata_top">
      <div class="total_con_log">
        <img src="./img/total1.png" alt="">
      </div>
      <div class="total_con_text ">
        <p>{{$t('lang.foun')}}</p>
        <p>
          {{$t('lang.deramLocked')}}
        </p>
      </div>
    </div>
    <div class="total_con">
      <div class="total_con_log">
        <img src="./img/total2.png" alt="">
      </div>
      <div class="total_con_text">
        <p>{{$t('lang.operation')}}</p>
        <p>
          {{$t('lang.orderlyManner')}}
        </p>
      </div>
    </div>
    <div class="total_con">
      <div class="total_con_log">
        <img src="./img/total3.png" alt="">
      </div>
      <div class="total_con_text">
        <p>{{$t('lang.outpuyMillion')}}</p>
        <p>
          {{$t('lang.greenMillion')}}
        </p>
      </div>
    </div>

    <div class="total_con_bottom">
      <img src="./img/total4.png" alt="">
      <div class="t_con_text t_text_1">
        <p>挖矿共产出85%</p>
      </div>
      <div class="t_con_text t_text_2">
        <p>基金会质押10%</p>
      </div>
      <div class="t_con_text t_text_3">
        <p>运营团队比例5%</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'total'
}
</script>
<style scoped lang="scss">
@import './css/total-web.scss';
@import './css/total_phone.scss';
.total {
  display: none;
}
</style>