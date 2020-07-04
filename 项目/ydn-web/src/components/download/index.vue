<template>
  <!-- 下载界面 -->
  <div class="download">
    <div class="f-16 pur-btn" @click="download">立即下载YDN2.0</div>
  </div>
</template>
<script>
export default {
  name: 'Download',
  computed: {
    ...mapState(['open_url'])
  },
  methods: {
    download() {
      const { open_url } = this
      window.open(open_url, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.download {
  width: 100%;
  height: 100%;
  background: url('../../../static/images/miner/download.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .pur-btn {
    position: absolute;
    left: 50%;
    bottom: 1.493333rem;
    width: 10.666667rem;
    transform: translateX(-50%);
    text-align: center;
    height: 2.666667rem;
    background: linear-gradient(
      180deg,
      rgba(11, 226, 182, 1) 0%,
      rgba(41, 172, 173, 1) 100%
    );
    border-radius: 1.333333rem;
    margin: auto;
    line-height: 2.666667rem;
    color: white;
    margin-top: 1.546667rem;
  }
}
</style>