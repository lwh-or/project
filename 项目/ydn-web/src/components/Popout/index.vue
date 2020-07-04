<template>
  <div>
    <!-- 提示案例 -->
    <van-overlay :show="caseShow">
      <div class="wrapper">
        <div class="c_case case">
          <ul class="text_list">
            <li><span class="yuan"></span>手持身份证件通过标准</li>
            <li><span class="yuan"></span>人物头像清晰</li>
            <li><span class="yuan"></span>身份证件信息清晰</li>
            <li><span class="yuan"></span>完整展示手臂持证</li>
            <li><span class="yuan"></span>包含YDN字样+申请日期</li>
          </ul>
          <img @click="showStutas('caseShow')"
               class="clome"
               src="../../../static/images/miner/clome@2x.png"
               alt="">
        </div>
      </div>
    </van-overlay>
    <!-- 成功的提示 -->
    <van-overlay :show="successShow">
      <div class="wrapper">
        <div class="sess_case case">
          <p>您的身份认证已通过</p>
          <p>证件号：4412**********4541</p>
          <button class="sess_case" @click="showStutas('successShow')">
            确定
          </button>
          <img @click="showStutas('successShow')"
               class="clome"
               src="../../../static/images/miner/clome@2x.png"
               alt="">
        </div>
      </div>
    </van-overlay>
    <!-- 失败的提示 -->
    <van-overlay :show="errorShow">
      <div class="wrapper">
        <div class="error_case case">
          <p>您的身份认证未通过，请重新上传</p>
          <p>证件号：原因：照片不清晰</p>
          <button class="sess_case">
            重新认证
          </button>
          <img @click="showStutas('errorShow')"
               class="clome"
               src="../../../static/images/miner/clome@2x.png"
               alt="">
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'Popout',
  props: ['caseShow', 'successShow', 'errorShow'],
  methods: {
    showStutas (prop) {
      if (prop === 'errorShow') {
        this.$emit('inform', false)
      }
      else if (prop === 'successShow') {
        this.$emit('inform', false)
      } else if (prop === 'caseShow') {
        this.$emit('inform', false)
      }

    }
  }
  // data () {
  //   return {
  //     caseShow: false, //提示的状态
  //     successShow: false, //成功提示状态
  //     errorShow: false //失败提示状态
  //   }
  // }
}
</script>

<style lang="less" scoped>
@import "../../../static/css/real.less";
</style>