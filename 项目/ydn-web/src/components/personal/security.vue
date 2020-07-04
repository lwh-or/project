<template>
  <div>
    <Header>
      <img @click="$router.go(-1)"
           src="/static/images/asset/icon-arrows@2x.png"
           slot="left"
           style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title"
           style="color:#fff;">账户安全 </div>
    </Header>
    <div class="f_main">
      <div class="f_idn f_identity f_all">
        <div class="f_idn_left">
          <img src="../../../static/images/center/s_uodate_pwd.png"
               alt="">
          <p>修改密码</p>
        </div>
        <div class="f_idn_right"
             @click="$router.push('/changePwd')">
          <img src="../../../static/images/center/right-icon@2x.png"
               alt="">
        </div>
      </div>
      <div class="f_idn f_identity f_all">
        <div class="f_idn_left">
          <img src="../../../static/images/center/s_pran_pwd.png"
               alt="">
          <p>修改交易码</p>
        </div>
        <div class="f_idn_right"
             @click="$router.push('/Createdeal')">
          <img src="../../../static/images/center/right-icon@2x.png"
               alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'securitys',
  components: {
    // topBar
  },
  data () {
    return {
      title: '安全中心',
      url: '/personal'
    }
  }
}
</script>

<style scoped lang="less">
.aaa {
  width: 100px;
  height: 100px;
  background-color: #f90;
}
.f_main {
  width: 335px;
  margin: 0.8rem auto 0;
  .f_ma {
    margin-bottom: 15px;
  }
  .f_idn {
    width: 100%;
    height: 62px;
    // background-color: #171818;
    padding: 0 14px;
  }
  .f_all {
    border-bottom: 1px solid #333333;
  }
  .f_identity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .f_idn_left {
      display: flex;
      img {
        width: 25px;
        height: 33px;
        margin-right: 15px;
      }
      p {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(228, 228, 228, 1);
        line-height: 33px;
      }
    }
    .f_idn_right {
      display: flex;
      p {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(228, 228, 228, 1);
        line-height: 20px;
      }
      img {
        margin-top: 0.106667rem;
        margin-left: 15px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
/* .main {
  padding: 0 0.8rem;
  padding-bottom: 4.266667rem;
}
.icon img {
  width: 0.853333rem;
  margin-right: 0.8rem;
  display: block;
}
.more img {
  height: 0.64rem;
  margin-left: 0.533333rem;
  display: block;
}
.more span {
  color: #999999;
}
.item {
  padding: 1.333333rem 0;
  border-bottom: 0.053333rem solid #dcdcdc;
} */
</style>