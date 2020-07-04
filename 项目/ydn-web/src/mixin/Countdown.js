export default {
  methods: {
    showPic () {
      this.$toast('短信验证码已发送!');
      // 
      if (this.getPicAuth(this.phone)) return;
      this.countDown()
      this.show = true;
    },
    countDown () { //验证码倒计时
      this.time = setInterval(this.countDownTime, 1000);
      this.countDownTime();
    },
    countDownTime () {
      if (this.all_time < 0) {
        clearInterval(this.time);
        this.code_text = '发送验证码';
        this.all_time = 60;
        this.show = false;
        return;
      }
      this.code_text = this.all_time + 's后重新获取';
      this.all_time--;
    },
    getPicAuth (account) {
      if (!account) {
        this.$toast('请输入手机号!');
        return true
      } else {
        this.$http.post('/register/send-code', {
          account,
          type: 1
        })
          .then(res => {
            const { data: { verity_token }, status } = res.data
            if (status === 200) {
              this.verity_token = verity_token
              localStorage.setItem('_token_ydn', verity_token)
            }
          })
      }

    },
  }
}