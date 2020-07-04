<template>
  <div class="bgb">
    
    <topBar :title="title"
            :url="url"></topBar>
    <div class="title flex_center f-16">
      <router-link :to="{path:item.link,query:{type:item.value}}"
                   tag="span"
                   v-for="item in router_list"
                   :key="item.id">{{item.label}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import topBar from '../common/topBar'
export default {
  name: 'assetRecord',
  components: {
    topBar,
  },
  data () {
    return {
      title: '资产记录',
      url: '/asset',
      router_list: [
      ]
    }
  },
  methods: {
    getLogType () {
      this.$http.get('user/asset/log-type')
        .then(res => {
          if (res.data.status == 200) {
            this.router_list = res.data.data;
          }
        })
    }
  },
  created () {
    this.getLogType();
  }
}
</script>

<style scoped>
.title {
  border-bottom: 0.053333rem solid #dcdcdc;
  background: #f8f8f8;
  color: #999999;
}
.title > span {
  flex: 1;
  line-height: 2.4rem;
  text-align: center;
}
.router-link-exact-active {
  position: relative;
  color: #0d6096;
}
.router-link-exact-active::after {
  display: block;
  content: "";
  position: absolute;
  width: 0.96rem;
  height: 0.106667rem;
  background: #0d6096;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
</style>