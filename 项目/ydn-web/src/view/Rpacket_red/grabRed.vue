<template>
  <van-overlay :show="grab">
    <div class="wrapper">
      <div class="red_case case">
        <p>恭喜您抢到红包了</p>
        <p class="money">{{grabItem.quantity}}</p>
        <p class="zic">奖励已加入资产</p>
        <button class="red_case_btn" @click="cloneShow">
          确定
        </button>
        <!-- <img @click="cloneShow" class="clome" src="../../../static/images/miner/clome@2x.png" alt="" /> -->
        <img @click="cloneShow" class="clome" src="../../../static/images/miner/clome@2x.png" alt="" />
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default {
  name: 'grab',
  props: ['grab','grabItem'],
  data() {
    return {
      graShow: false, //抢到红包弹框
    }
  },
  methods: {
    cloneShow() {
      this.$emit('clonegra', this.graShow)
    }
  },
  mounted(){
    console.log(this.obj)
    // console.log(this.gart);
    
  }
}
</script>
<style lang="less" scoped>
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
      margin-top: 61px;
    }
    .zic {
      width: 100%;
      font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 5.866667rem;
    }
    .money {
      font-size: 1.866667rem;
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
</style>
