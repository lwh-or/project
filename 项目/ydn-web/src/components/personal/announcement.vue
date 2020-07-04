<template>
  <div class="bgb">
    <topBar :title="title"></topBar>
    <div class="main f-14">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <router-link :to="{path:'/information',query:{id:item.id}}"
                     tag="div"
                     class="item flex_between"
                     v-for="item in list"
                     :key="item.id">
          <div class="icon">
            <div>{{item.title}}</div>
            <div class="f-12">{{formatTime(item.createtime)}}</div>
          </div>
          <div class="more">
            <img src="../../../static/images/common/gen@2x.png"
                 alt="">
          </div>
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
import topBar from '../common/topBar'
export default {
  name: 'announcement',
  components: {
    topBar,
  },
  data () {
    return {
      title: '官方公告',
      list: [],
      loading: false,
      finished: false,
      page_num: 1,
      page_all: 1,
    }
  },
  methods: {
    formatTime (timestamp) {
      var time = new Date(timestamp * 1000);
      var y = time.getFullYear();
      var M = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var m = time.getMinutes();
      var s = time.getSeconds();
      if (M < 10) {
        M = '0' + M;
      }
      if (d < 10) {
        d = '0' + d;
      }
      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }
      if (s < 10) {
        s = '0' + s;
      }
      return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    getInfo () {
      this.$http.get(`notice/list?page=${this.page_num}`)
        .then(res => {
          if (res.data.status == 200) {
            var data = res.data.data;
            this.list = this.list.concat(data.data);
            this.page_all = data.last_page;
            this.page_num++;
            if (this.page_num > this.page_all) {
              this.finished = true;
            }
          }
        })
    },
    onLoad () {
      setTimeout(() => {
        this.getInfo();
      }, 500);
      this.loading = false;
      if (this.page_num > this.page_all) {
        this.finished = true;
      }
    }
  },
  created () {
    this.getInfo();
  }
}
</script>

<style scoped>
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
  display: block;
}
.more span {
  color: #999999;
}
.item {
  padding: 0.8rem 0;
  line-height: 1.066667rem;
  border-bottom: 0.053333rem solid #dcdcdc;
}
.item .f-12 {
  color: #bbbbbb;
}
</style>