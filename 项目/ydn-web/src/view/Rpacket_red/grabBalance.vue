<template>
  <van-overlay :show="balanceShow">
    <div class="wrapper">
      <div class="red_case case balance">
        <p>你的账户余额不足2000，请充值</p>
        <div class="red_case_btn">
          <button class="red_case_btn_c red_case_btn_l"
                  @click="cloneShow">
            暂不充值
          </button>
          <button class="red_case_btn_c red_case_btn_r"
                  @click="cloneShow">
            前往充值
          </button>
        </div>

        <img @click="cloneShow"
             class="clome"
             src="../../../static/images/miner/clome@2x.png"
             alt="" />
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default {
  name: 'balance',
  props: ['balance'],
  data () {
    return {
      balanceShow: false
    }
  },
  methods: {
    cloneShow () {
      this.balanceShow = false
      this.$emit('balancegtab', this.balanceShow)
    }
  },
  mounted () {
    this.balanceShow = this.balance
  }
}
</script>
<style lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .case {
    width: 12.106667rem;
    height: 17.333333rem;
    position: relative;
  }
  .balance {
    background: url("../../../static/images/miner/balance.png") no-repeat;
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
    height: 28px;
    width: 100%;
    position: absolute;
    bottom: 24px;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: space-around;
    .red_case_btn_l {
      width: 88px;
      height: 28px;
      background: rgba(255, 245, 225, 1);
      border-radius: 27px;
      border: 0;
      color: rgba(249, 221, 48, 1);
    }
    .red_case_btn_r {
      width: 88px;
      height: 28px;
      background: linear-gradient(
        180deg,
        rgba(249, 221, 48, 1) 0%,
        rgba(236, 183, 19, 1) 100%
      );
      border-radius: 27px;
      border: 0;
      margin-right: 8px;
    }
  }
  .red_case {
    p:first-of-type {
      font-size: 18px;
      color: #000000;
      text-align: center;
      width: 10.506667rem;
      margin: 25% auto 0;
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
</style>
