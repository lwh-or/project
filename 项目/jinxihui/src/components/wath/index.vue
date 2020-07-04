<template>
  <div class="wath-container">
    <div class="w-top" id="wath-le">
      <p>惊喜汇是什么？</p>
      <p>What Is JingXiHui？</p>
    </div>
    <div class="w-content f-18">
      <p>{{$t('comm.text.w_text01')}}</p>
      <p>{{$t('comm.text.w_text02')}}</p>
      <p>{{$t('comm.text.w_text03')}}</p>
      <div class="padding-t">
        <p >{{$t('comm.text.w_text04')}}</p>
        <p>{{$t('comm.text.w_text05')}}</p>
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