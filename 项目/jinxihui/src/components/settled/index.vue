<template>
  <div class="settled-container">
		<div class="settled-top">
      <p>{{$t('comm.invite')}}</p>
      <p>Merchants settled</p>
		</div>
    <div class="settled-text">
      <p>
        <span>{{$t('comm.Brand')}}</span>{{$t('comm.under')}}
      </p>
      <p>
        <span>{{$t('comm.Merchants')}} </span>{{$t('comm.meet')}}
      </p>
    </div>
    <div class="code" id="code">
      <img src="../../assets/home/img/code54.png" alt="">
    </div>
    <div class="settled-right">
      <div class="circular">
        <p>{{$t('comm.Featured')}}</p>
        <p>{{$t('comm.StrictAccess')}}</p>
        <p>{{$t('comm.HighQuality')}}</p>
        <p>{{$t('comm.CostEffective')}}</p>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
	name:"ship",
}
</script>
<style scoped lang="less">
  @import url('./css/settled-mp.less');
  @import url('./css/settled-pc.less');
</style>
