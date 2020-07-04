<template>
  <div id="real2">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">实名验证</div>
    </Header>

    <!-- 验证信息 -->
    <div class="real_con">
      <div @click="coun">
        <p>请选择你的国家</p>
        <p>{{ country }}</p>
        <img src="../../../static/images/miner/right-icon@2x.png" alt="" />
      </div>
      <div class="real_input">
        <p>姓氏</p>
        <input v-model="surname" type="text" placeholder="验证后不可更改" />
      </div>
      <div class="real_input">
        <p>名字</p>
        <input v-model="name" type="text" placeholder="验证后不可更改" />
      </div>
    </div>

    <!-- 身份验证 -->
    <div class="tication">
      <div class="tication_input">
        <p>身份证件</p>
        <input type="text" v-model="cardName" placeholder="请输入你的身份证件号，认证后不可更改" />
      </div>

      <div class="file">
        <van-uploader class="loader" preview-image :after-read="onRead" preview-full-image :before-read="beforeRead" v-model="img_front" :before-delete="dele" ResultType="file" multiple name="img_front">
          <van-button v-show="isShowBtn" type="primary">证件正面</van-button>
        </van-uploader>
        <van-uploader class="loader" preview-image :after-read="onRead2" preview-full-image :before-read="beforeRead2" v-model="img_back" :before-delete="dele2" multiple ResultType="file" name="img_back">
          <van-button v-show="isShowBtn2" type="primary">证件背面</van-button>
        </van-uploader>
        <van-uploader class="loader" preview-image :after-read="onRead3" preview-full-image :before-read="beforeRead3" v-model="img_hold" :before-delete="dele3" ResultType="file" multiple name="img_hold">
          <van-button v-show="isShowBtn3" type="primary">手持证件面</van-button>
        </van-uploader>
      </div>
      <div class="example" @click="caseShow = true">查看示例</div>

      <van-button class="real_btn" color="linear-gradient(180deg,rgba(11,226,182,1) 0%,rgba(41,172,173,1) 100%)" slot="button" block @click.prevent="submitVerify" style="font-size:.853rem;">提交验证</van-button>
    </div>

    <van-action-sheet v-model="show" title="请选择国家或地区">
      <van-area v-model="country" columns-num="1" title="国家" :area-list="areaList" @confirm="countryFirm" />
    </van-action-sheet>

    <Popout :caseShow="caseShow" @inform="inform" />
  </div>
</template>
<script>
import { authentication } from '../../tool/verify'
import Popout from '../Popout'
export default {
  name: 'real',
  data() {
    return {
      show: false,
      country: '', // 国家
      name: '', // 名字
      surname: '', // 姓
      cardName: '', // 身份证
      img_front: [], // 正面
      img_back: [], // 背面
      img_hold: [], // 手持
      areaList: null,
      isShowBtn: true,
      isShowBtn2: true,
      isShowBtn3: true,
      caseShow: false,
      state_id: null // 地区id
    }
  },
  components: {
    Popout
  },
  methods: {
    submitVerify() {
      // 国家,姓名,姓式,身份证号
      const { country, name, surname, cardName } = this
      let res = authentication({ country, name, surname, cardName }, this)
      if (!res) {
        // 验证不通过,就挂壁
        return
      }

      // 收集图片
      let img_front = this.img_front[0].content
      let img_back = this.img_back[0].content
      let img_hold = this.img_hold[0].content
      let data = {
        state_id: this.state_id || 1,
        type: 1, // 证件类型(1：身份证，2：护照，3：驾驶证)
        name: this.name,
        number: this.cardName,
        img_front: img_front,
        img_back: img_back,
        img_hold: img_hold
      }

      console.log(data, '提交数据------?')

      if (
        !(this.img_front.length && this.img_back.length && this.img_hold.length)
      ) {
        this.$toast('请放置证件照')
        return
      }

      this.$http.post('/auth/submit', data).then(res => {
        if (res.data.status === 200) {
          this.$router.replace('/personal')
          this.$toast('等待后台审查')
        }
      })
    },
    coun() {
      console.log(6666666666666)

      this.show = true
    },
    countryFirm(arr) {
      this.state_id = arr[0].code // 地区id
      this.country = arr[0].name // 国家
      this.show = false
    },
    afterRead(file, detail) {
      console.log(file)

      return true
    },
    beforeRead(file) {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      ) {
        this.isShowBtn = false
        return true
      } else {
        this.$toast('请上传格式正确的图片')
        return false
      }
    },
    beforeRead2(file) {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      ) {
        this.isShowBtn2 = false
        return true
      } else {
        this.$toast('请上传格式正确的图片')
        return false
      }
    },
    beforeRead3(file) {
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      ) {
        this.isShowBtn3 = false
        return true
      } else {
        this.$toast('请上传格式正确的图片')
        return false
      }
    },
    onRead(file) {
      return true
    },
    dele() {
      this.isShowBtn = true
      return true
    },
    onRead2(file) {
      return true
    },
    onRead3(file) {
      return true
    },
    dele2() {
      this.isShowBtn2 = true
      return true
    },
    dele3() {
      this.isShowBtn3 = true
      return true
    },
    //通知
    inform(val) {
      this.caseShow = val
    },
    // 获取地区信息
    getArea() {
      let area = {}
      this.$http.get('/area').then(res => {
        if (res.data.status === 200) {
          var arr = res.data.data
          Array.from(arr).forEach((item, i) => {
            area[item.id] = item.state_china
          })
          let obj = {
            province_list: area
          }
          this.areaList = obj
        }
      })
    }
  },
  mounted() {
    this.getArea()
  }
}
</script>
<style lang="less" scoped>
// @import "../../../static/css/login.less";
#real2 {
  // padding-top: 40px;
  height: 100%;
  overflow-y: scroll;
  .real_con {
    width: 17.866667rem;
    margin: auto;
    background-color: #171818;
    height: 9.066667rem;
    padding-top: 1.066667rem;
    border-radius: 0.32rem;
    // margin-top: 20px;
    div {
      display: flex;
      width: 16.266667rem;
      height: 1.173333rem;
      font-size: 0.853333rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 1.173333rem;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid #333333;
      margin: auto;
      justify-content: space-between;
      img {
        margin-top: 0.266667rem;
        width: 0.533333rem;
        height: 0.853333rem;
      }
    }
    .real_input {
      margin-top: 0.853333rem;
      input {
        width: 13.333333rem;
        height: 1.333333rem;
        background-color: #171818;
        border: 0;
      }
    }
  }

  .tication {
    width: 17.866667rem;
    background: rgba(23, 24, 24, 1);
    border-radius: 0.32rem;
    margin: auto;
    margin-top: 1.066667rem;
    padding-bottom: 1.6rem;
    .tication_input {
      width: 90%;
      padding-bottom: 0.533333rem;
      border-bottom: 1px solid #333333;
      margin: auto;
      p {
        font-size: 0.853333rem;
      }
      input {
        width: 100%;
        height: 1.173333rem;
        background-color: #171818;
        border: 0;
      }
    }
    .file {
      .loader {
        .van-uploader__wrapper {
          .van-uploader__preview {
            .van-uploader__preview-image {
              width: 7.2rem;
              height: 4.8rem;
            }
            .van-image {
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .example {
      width: 100%;
      text-align: center;
      color: #e4e4e4;
      font-size: 0.64rem;
    }

    .van-uploader__preview-image {
      width: 100%;
      height: 4.8rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .van-uploader__preview {
      margin: 0;
    }
    .real_btn {
      margin: 1.6rem auto 0;
    }
    .real_btn {
      width: 16.266667rem;
      border-radius: 0.32rem;
      background: linear-gradient(
        180deg,
        rgba(11, 226, 182, 1) 0%,
        rgba(41, 172, 173, 1) 100%
      );
    }
  }

  .createdeal {
    width: 335px;
    margin: auto;
    text-align: center;
    .van-field {
      text-align: center;
      color: white;
      font-size: 0.853333rem;
    }
  }
}
.file {
  width: 17.866667rem;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.8rem;

  .loader {
    width: 7.306667rem;
    height: 4.8rem;
    border: 0.053333rem solid #333333;
    margin-bottom: 0.8rem;
    .van-button--normal {
      background-color: rgba(0, 0, 0);
      border: 0;
    }
    .van-uploader__wrapper {
      margin: auto;
      .van-uploader__input-wrapper {
        margin: auto;
        height: 64px;
        margin-top: 0.64rem;
        .van-button {
          height: 100%;
          // margin-top: 0.64rem;
          // margin: 9px 0 0 25px;
          text-align: center;
          line-height: 3.413333rem;
          color: #e4e4e4;
          font-size: 0.64rem;
          // background: url('../../../static/images/miner/kuan@2x.png') no-repeat;
          background: url('../../../static/images/miner/kuan@2x.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  /deep/ .van-uploader__preview-image {
    width: 100%;
    height: 4.8rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .van-uploader__input-wrapper {
    margin: auto;
    height: 64px;
    margin-top: 0.64rem;
  }
}
</style>
