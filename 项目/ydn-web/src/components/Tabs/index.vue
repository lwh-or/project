// 抽离组件tabs
<template>
  <van-tabs swipeable
            background="#000"
            color="#29ACAD"
            title-inactive-color="#fff"
            title-active-color="#fff"
            @click="onClick">
    <van-tab :title="Names.title1">
      <div class="miner-list"
           v-if="list.length">
        <!--  -->
        <div v-for="item of list"
             :key="item.id">
          <div class="miner-item">
            <div class="i_lfet">
              <p class="info_1">
                <span>{{ item.coin }}</span>
                <span style="margin-left:2.133rem;">{{ item.quantity }}</span>
              </p>
              <p class="info_2">{{ item.createtime | formatData }}</p>
            </div>
            <!-- 点击进入详情页 -->
            <div class="i_right"
                 @click="goDetails(item)">
              <span>{{ item.status ? "成功" : "失败" }}</span>
              <img src="../../../static/images/recharge/gen@2x.png" />
            </div>
          </div>
          <van-divider :style="{ borderColor: '#333333', margin: '13px 0' }" />
        </div>
        <!--  -->
      </div>
      <div v-else
           class="miner-list miner_no">

        <div class="min">
          <img src="../../../static/images/Transferred/undraw3@2x.png">
          <p>暂无记录</p>
        </div>

      </div>
    </van-tab>
    <van-tab :title="Names.title2">
      <div class="miner-list"
           v-if="arr.length">
        <!--  -->
        <div v-for="item of arr"
             :key="item.id">
          <div class="miner-item">
            <div class="i_lfet">
              <p class="info_1">
                <span>{{ item.coin }}</span>
                <span style="margin-left:2.133rem;">{{ item.quantity }}</span>
              </p>
              <p class="info_2">{{ item.createtime | formatData }}</p>
            </div>
            <div class="i_right"
                 @click="goDetails(item)">
              <span>{{ item.status ? "成功" : "失败" }}</span>
              <img src="../../../static/images/recharge/gen@2x.png" />
            </div>
          </div>
          <van-divider :style="{ borderColor: '#333333', margin: '13px 0' }" />
        </div>

        <!--  -->
      </div>
      <div v-else
           class="miner_no">

        <div class="min">
          <img src="../../../static/images/Transferred/undraw3@2x.png">
          <p>暂无记录</p>
        </div>

      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Divider } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Divider);
export default {
  name: "Tabs",
  data () {
    return {
      list: [],
      names: {},
      arr: []
    };
  },
  props: {
    List: Array,
    Arr: Array,
    Names: Object,
  },
  mounted () { },
  watch: {
    List () {
      this.list = this.List; // 数组数据
    },
    Arr () {
      this.arr = this.Arr; // 数组数据
    },
  },
  methods: {
    onClick (name, title) {
      // this.$emit('update', name)
      // name ? this.arr()
    },
    goDetails (item) {
      var arr = JSON.stringify(item)
      this.$router.push('/details/' + encodeURIComponent(arr));
    },
  },
};
</script>

<style lang="less" scoped>
.miner-list {
  padding: 0.907rem 0.8rem;
  padding-bottom: 0px;
  .miner-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .i_lfet {
      font-size: 0.853rem;
      color: #fff;
      .info_2 {
        font-size: 0.64rem;
        color: #e4e4e4;
        margin-top: 0.373rem;
      }
    }
    .i_right {
      font-size: 0.853rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      img {
        margin-left: 0.267rem;
        display: block;
      }
    }
  }
}
.miner_no {
  height: 28.10666rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .min {
    img {
      width: 4.64rem;
      height: 4.267rem;
      display: block;
      margin: 0 auto;
    }
    p {
      margin-top: 0.8rem;
      font-size: 1.067rem;
      color: #666666;
      text-align: center;
    }
  }
}
</style>
