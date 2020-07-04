// 邀请好礼首页
<template>
  <div class="warpper" ref="scroll">
    <div class="scroll">
      <div id="Invitation">
        <Header>
          <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
          <div slot="title" style="color:#fff;">邀请好友</div>
          <div slot="right" @click="$router.push('/invitationlist')">
            <img class="history" src="../../../static/images/cathectic/ask@2x.png" />
          </div>
        </Header>
        <div class="main">
          <!--  -->
          <div class="step">
            <div class="s_p">
              <img src="../../../static/images/cathectic/invite@2x.png" />
              <p>发送邀请给好友</p>
            </div>
            <div class="s_p">
              <img src="../../../static/images/cathectic/shape2x(2).png" />
              <p>好友完成注册并进行购买矿机理财等操作</p>
            </div>
            <div class="s_p">
              <img src="../../../static/images/cathectic/award@2x.png" />
              <p>获得相应比例奖励</p>
            </div>
          </div>
          <!--  -->
          <div class="copy_inv">
            <div class="inv">
              <h3>我的邀请链接</h3>
              <p ref="link">
                <span>{{ link }}</span>
                <img v-copy="link" src="../../../static/images/cathectic/copy.png" />
              </p>
            </div>
            <div class="inv">
              <h3>我的邀请码</h3>
              <p ref="code">
                <span>{{ code }}</span>
                <img v-copy="code" src="../../../static/images/cathectic/copy.png" />
              </p>
            </div>
            <section class="btn" @click="showModel = true">面对面邀请</section>
          </div>
          <!--  -->
          <div class="me_inve">
            <div class="m_i" @click="$router.push('/invitationlist')">
              <h3>我的邀请</h3>
              <img src="../../../static/images/cathectic/gen@2x.png" />
            </div>
            <div class="m_c">
              <div class="item">
                <span>{{invitationCon.total}}人</span>
                <span>邀请人数</span>
              </div>
              <div class="item">
                <span>{{invitationCon.remaining}}YDN</span>
                <span>奖励金额</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->

    <Model :boolean="showModel" @hideFn="hideFn" v-show="showModel">
      <h3 slot="title" class="title">面对面邀请</h3>
      <div class="code" slot="conent">
        <qrcode-vue :value="qrcode" :size="size" level="H"></qrcode-vue>
      </div>
    </Model>
  </div>
</template>

<script>
import Model from '../Model-Dialog'
import Vue from 'vue'
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'Invitation',
  components: {
    Model,
    QrcodeVue
  },
  data() {
    return {
      code: '',
      link: 'https://www.ydncoln.cc/',
      showModel: false,
      qrcode: 'this is dog',
      size: 0,
      invitationCon: {} //邀请总信息
    }
  },
  mounted() {
    this.$http.get('user/invite/total').then(res => {
      if (res.data.status === 200) {
        this.invitationCon = res.data.data
      }
    })
    this.$http.get('user/info').then(res => {
      if (res.data.status === 200) {
        this.code = res.data.data.invite_code
      }
    })
  },
  created() {
    this.getInfo()
    this.qrcodesize()
  },
  methods: {
    hideFn(val) {
      this.showModel = val
    },
    qrcodesize() {
      var qrcodeSize = ''
      //得到手机屏幕的宽度
      var htmlWidth =
        document.documentElement.clientWidth || document.body.clientWidth
      //设置二维码大小
      qrcodeSize = Math.ceil((htmlWidth / 20) * 12.3)
      this.size = qrcodeSize
    },
    getInfo() {
      this.$http.get('/user/info').then(res => {
        if (res.data.status == 200) {
          var data = res.data.data
          this.qrcode =
            this.$store.state.url +
            '/#/register?type=invite&invitation_code=' +
            data.invite_code
          this.link = this.qrcode
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.history {
  width: 1.067rem;
  height: 1.067rem;
  display: block;
}
.warpper {
  background: url('../../../static/images/cathectic/invitation_back@2x.png')
    #f8f8f8 no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  /deep/ .header {
    background: rgba(0, 0, 0, 0);
  }
  /deep/ .van-nav-bar__placeholder {
    background: rgba(0, 0, 0, 0);
  }
  /deep/.van-nav-bar__placeholder .van-nav-bar {
    border-top: 20px solid rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
  }
}
#Invitation {
  height: 100%;
  .main {
    .step {
      width: 17.867rem;
      height: 4.48rem;
      margin: 0 auto;
      margin-top: 12.107rem;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(224, 224, 224, 1);
      border-radius: 0.32rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .s_p {
        display: flex;
        // flex: 1;
        flex-direction: column;
        align-items: center;
        font-size: 0.533rem;
        color: #333333;
        text-align: center;
        position: relative;
        &:nth-child(1) {
          width: 2.667rem;
        }
        &:nth-child(2) {
          width: 4.8rem;
        }
        &:nth-child(3) {
          width: 2.667rem;
        }
        &::before {
          content: '\200B';
          position: absolute;
          left: 6.147rem;
          top: 0.48rem;
          width: 0.427rem;
          height: 0.533rem;
          background: url('../../../static/images/cathectic/arrows.png')
            no-repeat;
          background-size: cover;
        }

        &:first-child::before {
          left: 3.467rem;
        }

        &:last-child::before {
          display: none;
        }
      }
      img {
        width: 1.173333rem;
        height: 1.066667rem;
        display: block;
        margin-bottom: 0.373333rem;
      }
    }
    .copy_inv {
      color: #333333;
      font-size: 0.747rem;
      width: 17.867rem;
      height: 7.573rem;
      margin: 0 auto;
      margin-top: 0.8rem;
      padding: 0.8rem;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(224, 224, 224, 1);
      border-radius: 0.32rem;
      .inv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 0.747rem;
          height: 0.747rem;
          display: block;
          margin-left: 0.48rem;
        }
        p {
          display: flex;
          align-items: center;
          max-width: 9.92rem;
          span {
            text-align: right;
            &:nth-child(1) {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 9.92rem;
            }
          }
        }

        &:nth-child(1) {
          margin-bottom: 0.747rem;
        }
      }
    }
    .me_inve {
      width: 335px;
      height: 114px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 4px 0px rgba(224, 224, 224, 1);
      border-radius: 6px;
      margin: 0 auto;
      margin-top: 0.8rem;
      color: #333333;
      font-size: 0.64rem;
      box-sizing: border-box;
      padding: 0.8rem;
      .m_i {
        font-size: 0.747rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8rem;
        img {
          width: 0.533rem;
          height: 0.853rem;
          display: block;
        }
      }
      .m_c {
        border-top: 0.053rem solid #e4e4e4;
        display: flex;
        align-items: center;
        .item {
          padding-top: 0.747rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      }
    }
  }
}

.btn {
  width: 8.213rem;
  height: 2.24rem;
  background: linear-gradient(
    180deg,
    rgba(249, 221, 48, 1) 0%,
    rgba(236, 183, 19, 1) 100%
  );
  border-radius: 1.44rem;
  margin: 0 auto;
  font-size: 0.96rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
}

.title {
  font-size: 0.96rem;
  color: #000000;
  text-align: center;
}
.code {
  margin-top: 1.067rem;
  display: flex;
  justify-content: center;
}
</style>
