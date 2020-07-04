<template>
  <div id="Service">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">客服中心</div>
    </Header>

    <div class="s_top">
      <img src="../../../static/images/miner/service.png" alt="">
      <div class="s_top_text">
        <p>如有疑问，请按如下格式提交工单。我们将有专人和你联系</p>
      </div>
    </div>

    <div class="question">
      <div class="q_title">
        <p><span class="q_icon"></span>问题标题</p>
        <input type="text" v-model="title" placeholder="请输入问题标题">
      </div>
      <div class="q_title ">
        <p><span class="q_icon"></span>问题描述</p>
        <textarea class="q_text" v-model="text" rows="3" cols="20" maxlength='200' placeholder="请输入问题详情">
        </textarea>
        <span class="qt_num">{{textLength}}/200</span>
      </div>
    </div>
    <div class="q_but">
      <button :class="shouBut ? 'deter_but' : 'neg_but'" @click="leace">确定</button>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Service',
  data() {
    return {
      noticeList: [],
      title: '',
      text: '',
      textLength: 0,
      shouBut: false //按钮状态
    }
  },
  watch: {
    title() {
      if (this.text && this.title) {
        this.shouBut = true
      } else if (!this.title == '') {
        this.shouBut = false
      } else {
        this.shouBut = false
      }
    },
    text() {
      if (this.title && this.text) {
        this.shouBut = true
      } else if (this.text == '') {
        this.shouBut = false
      } else {
        this.shouBut = false
      }
      this.textLength = this.text.length
    }
  },
  methods: {
    leace() {
      if (this.shouBut) {
        this.$http
          .post('user/leave-a-message', {
            title: this.title,
            message: this.text
          })
          .then(res => {
            if (res.data.status === 200) {
              this.$toast('您已留言成功')
              this.$router.back()
            }else{
              this.$toast(res.data.msg)
            }
          })
      }
    }
  }
}
</script>
<style lang="less" scoped>
#Service {
  height: 100%;
  overflow-y: scroll;
  // padding-bottom: 3.2rem;
  .s_top {
    width: 18.293333rem;
    height: 11.466667rem;
    margin: auto;
    img {
      height: 6.666667rem;
      width: 100%;
    }
    .s_top_text {
      height: 4.8rem;
      font-size: 0.8rem;
      color: #807f7f;
      text-align: center;
      margin: auto;
      background-color: #171818;
      border-radius: 6px;
      padding-top: 1.333333rem;
      p {
        width: 299px;
        margin: auto;
      }
    }
  }
  .question {
    width: 18.293333rem;
    margin: 1.333333rem auto 0;
    div:last-child {
      margin-top: 1.333333rem;
    }
    .q_title {
      position: relative;
      p {
        .q_icon {
          width: 3px;
          height: 14px;
          display: inline-block;
          background: rgba(11, 226, 182, 1);
          margin: 0 5px;
          line-height: 24px;
        }
        color: #cacaca;
        font-size: 0.853333rem;
      }
      input {
        width: 100%;
        height: 2.346667rem;
        background-color: #171818;
        border: 0;
        border-radius: 6px;
        padding-left: 0.8rem;
        margin-top: 0.533333rem;
      }
      .q_text {
        width: 100%;
        height: 6.4rem;
        background-color: #171818;
        border: 0;
        padding-left: 0.8rem;
        margin-top: 0.533333rem;
      }
      .qt_num {
        position: absolute;
        font-size: 12px;
        color: #4e4e4f;
        bottom: 10px;
        right: 20px;
      }
    }
  }
  .q_but {
    width: 18.293333rem;
    margin: 2.133333rem auto 0;
    .neg_but {
      width: 18.293333rem;
      height: 2.56rem;
      background: rgba(61, 62, 62, 1);
      border-radius: 6px;
      border: 0;
    }
    .deter_but {
      width: 18.293333rem;
      height: 2.56rem;
      border-radius: 6px;
      border: 0;
      background: linear-gradient(
        0deg,
        rgba(11, 226, 182, 1),
        rgba(41, 172, 173, 1)
      );
    }
  }
}
</style>