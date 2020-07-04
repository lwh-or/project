<template>
  <div class="advert">
    <div class="info flex_center f-14">
      <div class="info_box">
        <van-swipe :autoplay="3000"
                   :show-indicators="false"
                   vertical
                   width="100%"
                   height="30px;">
          <van-swipe-item v-for="item of textList"
                          :key="item.time">{{ item.account }}中了{{item.quantity}}YDN</van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  name: "Rollover",
  props: {
    list: Array
  },
  data () {
    return {
      textList: []
    }
  },
  watch: {
    list () {
      this.textList = this.list
    }
  },
};
</script>

<style scoped>
.advert {
  margin: 0 auto;
}


.info_box {
  display: flex;
  align-items: center;
  height: 1.85rem;
  border-radius: 0.32rem;
  overflow: hidden;
  width: 100%;
}

.advert img {
  width: 17.867rem;
  height: 13.12rem;
  display: block;
}

.recommend {
  color: white;
  padding: 0.8rem;
}
.recommend span {
  padding: 0 0.426667rem;
  line-height: 0.96rem;
  border-radius: 0.48rem;
}
.info {
  margin-top: -2rem;
  color: #e0e0e0;
  font-size: 0.64rem;
  display: flex;
  justify-content: space-between;
}

.horn img {
  width: 1.013rem;
  height: 0.853rem;
  display: block;
}
.horn {
  z-index: 999;
  margin-right: 0.4rem;
}
.info >>> .van-swipe {
  width: 100%;
  height: 2.133333rem;
}
.info >>> .van-swipe__track {
  height: 2.133333rem !important;
}
.info >>> .van-swipe-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  text-align: center;
}
</style>
