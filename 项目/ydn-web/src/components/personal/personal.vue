<template>
  <div id="personal">
    <!-- 头部 -->
    <Header>
      <div slot="title" style="color:#fff;">我的</div>
    </Header>
    <!-- 个人中心 -->
    <div class="f_center">
      <div class="f_log">
        <img src="../../../static/images/center/f_log.png" alt="" />
      </div>
      <div class="f_user">
        <p class="f_user_phone">{{ userInfo.account }}</p>
        <p class="f_user_uid">UID：{{ userInfo.id }}</p>
      </div>
      <!-- 邀请好礼 -->
      <div class="f_gift" @click="$router.push('/invitation')">
        <img src="../../../static/images/center/f_gift.png" alt="" />
      </div>
    </div>

    <!-- 各种验证设置 -->
    <div class="f_main">
      <div class="f_idn f_identity f_ma" @click="Authentication">
        <div class="f_idn_left">
          <img src="../../../static/images/center/c_identity.png" alt="" />
          <p>身份认证</p>
        </div>
        <div class="f_idn_right">
          <p>{{ userInfo.authMsg }}</p>
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div>

      <div class="f_idn f_identity f_all" @click="$router.push('/security')">
        <div class="f_idn_left">
          <img src="../../../static/images/center/f_security.png" alt="" />
          <p>账号安全</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div>
      <div class="f_idn f_identity f_all" @click="$router.push('/setup')">
        <div class="f_idn_left">
          <img src="../../../static/images/center/f_setUp.png" alt="" />
          <p>使用设置</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div>
      <!-- <div class="f_idn f_identity f_all" @click="$router.push('/aboutus')">
        <div class="f_idn_left">
          <img src="../../../static/images/center/f_about.png" alt="" />
          <p>关于我们</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div> -->
      <div class="f_idn f_identity f_all" @click="$router.push('/service')">
        <div class="f_idn_left">
          <img src="../../../static/images/center/f_about.png" alt="" />
          <p>关于我们</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div>
      <div class="f_idn f_identity f_all" @click="$router.push('/notice')">
        <div class="f_idn_left">
          <img src="../../../static/images/miner/notice_cion.png" alt="" />
          <p>系统公告</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div>
      <!-- <div class="f_idn f_identity f_all" @click="$router.push('/service')">
        <div class="f_idn_left">
          <img src="../../../static/images/miner/notice_cion.png" alt="" />
          <p>客服中心</p>
        </div>
        <div class="f_idn_right">
          <img src="../../../static/images/center/right-icon@2x.png" alt="" />
        </div>
      </div> -->
      <div class="f_padding"></div>
    </div>

    <Popout :successShow="successShow" @inform="inform" />
  </div>
</template>

<script>
// 复制张贴插件
import { mapState } from 'vuex'
import clipboard from 'clipboard'
import Popout from '../Popout'
export default {
  name: 'personal',
  data() {
    return {
      list: [],
      userInfo: {}, // 用户信息
      link: '',
      account: '',
      level: '',
      wechat: 'YDNyidelian1341',
      service: false,
      successShow: false //成功提示状态
      // authmsg: '' // 已认证 | 未认证
    }
  },
  methods: {
    // 身份认证
    Authentication() {
      let msg = this.userInfo.auth_status
      var obj = {
        0: '未认证',
        1: '已认证',
        2: '等待认证',
        3: '认证未成功'
      }
      // if (!msg) {
      //   this.$toast("身份信息不存在");
      //   return;
      // }
      if (msg === 0) {
        this.$router.push('/real2')
        return
      } else if (msg === 1) {
        this.successShow = true
        return
      } else if (msg === 2) {
        this.$toast('等待认证')
        return
      } else if (msg === 3) {
        this.$router.push('/real2')
      }
    },
    format(a) {
      // var a = this.user_info.username;
      if (a.indexOf('@') >= 0) {
        var b = a.indexOf('@')
        if (b >= 4) {
          var c = b - 4
        } else {
          var c = b
        }
        var d = this.user_info.email.length
        a = a.slice(0, c) + '****' + a.slice(b, d)
        this.account = a
      } else {
        this.account = a.slice(0, 3) + '****' + a.slice(7, 11)
      }
    },
    goWhere(item) {
      if (item.link) {
        this.$router.push(item.link)
      }
    },
    getUserInfo() {
      this.$http.get('/user/info').then(res => {
        if (res.data.status == 200) {
          this.userInfo = res.data.data
        }
      })
    },
    copy() {
      this.btn = new clipboard(this.$refs.link)
      this.btn.on('success', e => {
        // console.log(this)
        this.$toast('复制成功！')
      })
    },
    logout() {
      this.$http.get('/login-out').then(res => {
        this.$toast('退出成功！')
        this.$store.commit('LOGOUT')
        this.$router.push('/login')
      })
    },
    //通知
    inform(val) {
      this.successShow = val
    }
  },
  created() {
    // this.getUserInfo()
  },
  mounted() {
    // this.copy()
    this.getUserInfo()
  },
  components: {
    Popout
  }
}
</script>

<style scoped lang="less">
#personal {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 1.067rem;
}
.f_center {
  width: 100%;
  .f_log {
    height: 4.906667rem;
    width: 4.906667rem;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .f_user {
    margin-top: 0.533333rem;
    text-align: center;
    .f_user_phone {
      height: 25px;
      font-size: 18px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
    }
    .f_user_uid {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(228, 228, 228, 1);
      line-height: 20px;
    }
  }
  .f_gift {
    width: 335px;
    height: 67px;
    margin: auto;
    margin-top: 1.066667rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.f_main {
  width: 335px;
  margin: 0.8rem auto 0;
  .f_padding {
    padding-bottom: 30px;
    background-color: #171818;
    border-radius: 6px;
  }
  .f_ma {
    margin-bottom: 15px;
  }
  .f_idn {
    width: 100%;
    height: 46px;
    background-color: #171818;
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
        width: 24px;
        height: 23px;
        margin-right: 15px;
      }
      p {
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(228, 228, 228, 1);
        line-height: 20px;
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

.top {
  width: 100%;
  height: 7.733333rem;
  background: linear-gradient(to bottom, #0d6096, #2e157a);
}
.head_pic img {
  width: 3.2rem;
  height: 3.2rem;
  display: block;
}
.user_info {
  width: 11.733333rem;
  height: 3.2rem;
  margin-left: 0.8rem;
  position: relative;
}
.account {
  color: white;
  position: absolute;
  left: 0;
  top: 0.746667rem;
}
.level {
  width: 3.2rem;
  height: 1.066667rem;
  border-radius: 0.533333rem;
  border: 1px solid #0da8ba;
  /* background: rgb(117, 22, 1,.4); */
  color: rgb(255, 255, 255, 0.6);
  text-align: center;
  line-height: 1.066667rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
.line {
  width: 100%;
  height: 0.106667rem;
  background: #10cee4;
}
.flag img {
  height: 1.333333rem;
  display: block;
}
.flag {
  position: absolute;
  top: 0;
  left: 10.666667rem;
}
.main {
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
}
.popwrap {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 2000;
}
.pop_content {
  width: 80%;
  padding: 1.066667rem;
  background: white;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ques {
  color: #999;
}
.copy {
  padding: 1.386667rem 0;
}
.copy img {
  height: 0.8rem;
  display: block;
  margin-right: 0.266667rem;
}
.copy span {
  color: #0d6096;
}
.sure {
  text-align: right;
}
.sure span {
  padding: 0.266667rem 1.066667rem;
  background: #0d6096;
  border-radius: 4px;
  color: white;
}
</style>
