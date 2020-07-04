<template>
  <div class="bgb">
    <topBar :title="title"></topBar>
    <div class="main">
      <div class="title flex_center f-16">推广码</div>
      <div class="qr flex_center">
        <qrcode-vue :value='link'
                    :size='size'
                    level='H'></qrcode-vue>
      </div>
      <div class="link f-12">{{link}}</div>
      <div class="copy f-14"
           @click="copy"
           ref='link'
           :data-clipboard-text='link'>复制链接</div>
    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar'
import QrcodeVue from 'qrcode.vue'
import clipboard from 'clipboard'
export default {
  name: 'invite',
  components: {
    topBar,
    QrcodeVue
  },
  data () {
    return {
      title: '我的邀请',
      size: 230,
      link: '',
    }
  },
  methods: {
    qrcodesize () {
      var qrcodeSize = '';
      //得到手机屏幕的宽度
      var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
      //设置二维码大小
      qrcodeSize = Math.ceil(htmlWidth / 20 * 12.3);
      this.size = qrcodeSize;
    },
    copy () {
      this.btn = new clipboard(this.$refs.link);
      this.btn.on('success', (e) => {
        // console.log(this)
        this.$toast('复制成功！');
      })
    },
    getInfo () {
      this.$http.get('user/info')
        .then(res => {
          if (res.data.status == 200) {
            var data = res.data.data;
            this.link = this.$store.state.url + '/#/register?type=invite&invitation_code=' + data.invite_code;
          }
        })
    }
  },
  mounted () {
    this.copy();
  },
  created () {
    this.getInfo();
    this.qrcodesize();
  }
}
</script>

<style scoped>
.main {
  width: 90%;
  margin: 0.8rem auto;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.title {
  height: 2.346667rem;
  background: #f8f8f8;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.qr {
  padding: 2.133333rem 0;
}
.link {
  width: 90%;
  margin: 0 auto;
  padding: 0.533333rem;
  background: #f8f8f8;
  text-align: center;
}
.copy {
  text-align: center;
  color: #0d6096;
  padding: 0.8rem 0;
}
</style>