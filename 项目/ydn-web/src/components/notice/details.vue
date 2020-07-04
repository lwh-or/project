<template>
  <div id="details">
    <Header>
      <img @click="$router.go(-1)" src="/static/images/asset/icon-arrows@2x.png" slot="left" style="width: 1.387rem; height: 1.387rem; display:block;" />
      <div slot="title" style="color:#fff;">公告详情</div>
    </Header>
    <div class="main">
      <div class=" t_name">{{name}}</div>
      <div class="f-12 t_time">{{time}}</div>
      <div class="f-14 content" ref="desc" v-html="content">{{content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  data() {
    return {
      title: '公告详情',
      name: '',
      time: '',
      content: '',
      id: ''
    }
  },
  methods: {
    formatTime(timestamp) {
      var time = new Date(timestamp * 1000)
      var y = time.getFullYear()
      var M = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var m = time.getMinutes()
      var s = time.getSeconds()
      if (M < 10) {
        M = '0' + M
      }
      if (d < 10) {
        d = '0' + d
      }
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    getDetail() {
      this.$http.get(`notice/detail?id=${this.$route.params.id}`).then(res => {
        if (res.data.status == 200) {
          var data = res.data.data
          this.name = data.title
          this.time = this.formatTime(data.createtime)
          this.content = data.content
          this.$nextTick(() => {
            this.$refs.desc.querySelectorAll('img').forEach(el => {
              el.style.maxWidth = '100%'
            })
          })
        }
      })
    }
  },
  mounted() {
    this.getDetail()
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
  }
}
</script>
<style lang="less" scoped>
#details {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 3.2rem;
}
.main {
  height: 100%;
  overflow-y: scroll;
  padding: 0.8rem;
  .t_name {
    color: #c9caca;
    font-size: 0.853333rem;
    font-weight: bold;
  }
  .t_time {
    margin: 1.066667rem 0;
    color: #525253;
    font-size: 12px;
  }
  .content {
    font-size: 14px;
    color: #616268;
  }
}
</style>
