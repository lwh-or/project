<template>
  <div class="ship-container" >
		<div class="ship-top" id="container">
      <p>{{$t('comm.click')}}</p>
      <p>Entrepreneurship</p>
		</div>
    <div class="ship-con">
      <div class="con-t" id="comm-left">
        <div>
          <p>{{$t('comm.than_lyi')}}</p>
          <p>{{$t('comm.than_yit')}}</p>
        </div>
        <div>
          <p>{{$t('comm.chao')}}</p>
          <p>{{$t('comm.chao_h')}}</p>
          <p>{{$t('comm.chao_m')}}</p>
          <p>{{$t('comm.chao_y')}}</p>
        </div>
      </div>
       <div class="con-t" id="comm-right">
        <div>
          <p>{{$t('comm.diversity')}}</p>
          <p>{{$t('comm.spirits')}}</p>
        </div>
        <div>
          <p>{{$t('comm.over')}}%</p>
          <p>{{$t('comm.after')}}</p>
          <p>{{$t('comm.air')}}</p>
        </div>
      </div>
      <div class="phone-img">
        <img src="../../assets/home/img/phone.png" alt="">
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
	name:"ship",
}
</script>
<style scoped lang="less">
  @import url('./css/ship-mp.less');
  @import url('./css/ship-pc.less');
</style>
