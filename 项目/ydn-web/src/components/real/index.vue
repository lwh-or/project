<template>
  <div id="real">
    <!-- 实名验证 -->
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">实名验证</div>
    </Header>
    <Form class="createdeal">
      <van-field v-model="country" :clearable="true" label-align="left" label="请选择国家" disabled right-icon="../../../static/images/miner/right-icon@2x.png" @click-right-icon="coun">
      </van-field>

      <van-field v-model="surname" :clearable="true" icon-prefix="my" label="姓式" placeholder="验证后不可更改" slot="note">
      </van-field>

      <van-field v-model="name" :clearable="true" icon-prefix="my" label="名字" placeholder="验证后不可更改" slot="NewPassword">
      </van-field>

      <van-field v-model="cardName" :clearable="true" icon-prefix="my" label="身份证件" placeholder="请输入你的身份证件号，认证后不可更改" slot="NewPassword">
      </van-field>

      <div class="cardName">
        请点击上传你的身份证件
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
    </Form>
    <van-action-sheet v-model="show" title="请选择国家或地区">
      <van-area v-model="country" columns-num="1" title="国家" :area-list="areaList" @confirm="countryFirm" />
    </van-action-sheet>
    <!-- 弹框 -->

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
<style lang="less">
@import '../../../static/css/login.less';
#real {
  .createdeal {
    width: 335px;
    margin: auto;
    text-align: center;
    .van-field {
      text-align: center;
      color: white;
      font-size: 0.853333rem;
    }
    .file {
      .loader {
        .van-uploader__wrapper {
          .van-uploader__preview {
            .van-uploader__preview-image {
              width: 132px;
              height: 90px;
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
  }

  .van-cell {
    background-color: #000;
  }

  .van-button--block {
    width: 305px;
    // margin: 1.547rem auto 0.533rem;
  }

  .cardName {
    margin: 20px 0 0 30px;
    font-size: 16px;
  }

  .file {
    width: 335px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0.8rem;

    .loader {
      width: 137px;
      height: 90px;
      border: 0.053333rem solid #333333;
      margin-bottom: 15px;
      .van-button--normal {
        background-color: rgba(0, 0, 0);
        border: 0;
      }
      .van-uploader__wrapper {
        .van-uploader__input-wrapper {
          margin: auto;
          height: 64px;
          // margin-top: 12px;
          .van-button {
            height: 100%;
            margin-top: 0.64rem;
            // margin: 9px 0 0 25px;
            text-align: center;
            line-height: 64px;
            color: #e4e4e4;
            font-size: 12px;
            // background: url('../../../static/images/miner/kuan@2x.png') no-repeat;
            background: url('../../../static/images/miner/kuan@2x.png')
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .example {
    width: 100%;
    text-align: center;
    color: #e4e4e4;
    font-size: 12px;
  }

  .van-uploader__preview-image {
    width: 100%;
    height: 90px;

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
}
</style>