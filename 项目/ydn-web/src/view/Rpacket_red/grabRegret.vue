<template>
  <div id='regret'>
    <van-overlay :show="regret">
      <div class="wrapper">
        <div class="red_case case">
          <p>当前很遗憾，请再接再厉，补仓后更大机会</p>
          <button class="red_case_btn" @click="cloneShow">
            确定
          </button>
          <img @click="cloneShow" class="clome" src="../../../static/images/miner/clome@2x.png" alt="" />
        </div>
      </div>
    </van-overlay>
  </div>

</template>
<script>
export default {
  name: 'regret',
  props: ['regret'],
  data() {
    return {
      regretShow: false
    }
  },
  methods: {
    cloneShow() {
      this.regretShow = false
      this.$emit('regretgtab', this.regretShow)
    }
  },
  mounted() {
    this.regretShow = this.regret
  }
}
</script>
<style lang="less">
#regret {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .case {
      width: 12.106667rem;
      height: 17.333333rem;
      position: relative;
      background: url('../../../static/images/miner/envelopes.png') no-repeat;
      background-size: 100% 100%;
    }
    .clome {
      width: 1.706667rem;
      height: 1.706667rem;
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
    }
    .red_case_btn {
      width: 88px;
      height: 28px;
      background: linear-gradient(
        180deg,
        rgba(249, 221, 48, 1) 0%,
        rgba(236, 183, 19, 1) 100%
      );
      border-radius: 27px;
      border: 0;
      position: absolute;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
    }
    .red_case {
      p:first-of-type {
        font-size: 18px;
        color: #000000;
        text-align: center;
        width: 9.88rem;
        margin: 50% auto 0;
        font-weight: 400;
      }
      .zic {
        width: 100%;
        font-size: 14px;
        color: #999999;
        text-align: center;
        margin: 5.866667rem auto 0;
      }
      .money {
        font-size: 3.2rem;
        color: rgba(235, 50, 25, 1);
        width: 100%;
        height: 70px;
        font-weight: bold;
        text-align: center;
        line-height: 20px;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
