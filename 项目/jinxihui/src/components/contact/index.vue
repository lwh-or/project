<template>
  <div class="wath-container">
    <div class="w-top">
      <p>{{$t('comm.contact')}}</p>
      <p>contact us</p>
    </div>
    <div class="w-content f-18"> 
      <p>{{$t('comm.Surprise')}}</p>
      <p>{{$t('comm.Exchange')}}</p>
      <div class="padding-t">
        <p >{{$t('comm.layer')}}</p>
        <p>{{$t('comm.sharing')}}</p>
      </div>
    </div>
    <div class="contact-r">
      <div class="contact-con">
        <p>{{$t('comm.bus')}}</p>
        <p>{{$t('comm.rights')}}</p>
        <p>{{$t('comm.insurance')}}</p>
      </div>
       <div class="contact-con">
        <p>{{$t('comm.Business')}}</p>
        <p>{{$t('comm.buy')}}</p>
      </div>
      <div class="contact-con">
        <p>{{$t('comm.media')}}</p>
        <p>65415655@.com</p>
      </div>
        <div class="contact-con contact-cle">
          <p class="f-12"> <img src="../../assets/home/img/weibo.png" alt="">{{$t('comm.off')}}</p>
          <p> <img src="../../assets/home/img/weixin.png" >{{$t('comm.wechat')}}</p>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    namt:"wath"
  }
</script>
<style scoped lang="less">
  @import url('./css/wath-mp.less');
  @import url('./css/wath-pc.less');
</style>