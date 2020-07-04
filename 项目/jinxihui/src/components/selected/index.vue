<template>
  <div class="select-container">
    <div class="select-t">
      <div class="select-text" id="select">
        <p>{{$t('comm.selete.title')}}</p>
        <p>Carefully selected</p>
      </div>
      <p class="f-18">
        {{$t('comm.selete.text_01')}}
      </p>
      <p class="f-18">{{$t('comm.selete.text_02')}}</p>
    </div>
    <div class="select-content">
      <div class="select-content-title">{{$t('comm.selete.namy')}}</div>
      <ul class="content-container">
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/lei-@01.png" alt="foods">
          <span>{{$t('comm.food')}}</span>
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/lei-@02.png" alt="foods">
          <span>{{$t('comm.clothing')}}</span>
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/lei-@03.png" alt="foods">
          <span>{{$t('comm.makeup')}}</span>
        </li>
        <li class="content-container-item">
         <img src="../../assets/home/img/sle/lei-@04.png" alt="foods">
          <span>{{$t('comm.appliances')}}</span>
        </li>

      </ul>
    </div>
    <div class="select-content">
      <div class="select-content-title">{{$t('comm.selete.cai')}}</div>
      <ul class="content-container">
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/cai-@1.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/cai-@2.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/cai-@3.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/cai-@4.png" alt="foods">
        </li>

      </ul>
    </div>
      <div class="select-content">
      <div class="select-content-title">{{$t('comm.selete.pai')}}</div>
      <ul class="content-container">
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/pai-@1.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/pai-@2.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/pai-@3.png" alt="foods">
        </li>
        <li class="content-container-item">
          <img src="../../assets/home/img/sle/pai-@4.png" alt="foods">
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    namt:"selected"
  }
</script>

<style scoped lang="less">
  @import url('./css/selected-mp.less');
  @import url('./css/selected-pc.less');
</style>