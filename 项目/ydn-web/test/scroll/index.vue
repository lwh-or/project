<template>
  <!-- 下拉刷新案例 -->
  <div id="app">
    <header>vue-better-scroll demo</header>
    <main class="position-box">
      <!-- 需要一个创建一个父容器 组件高度默认等于父容器的高度 -->
      <vue-better-scroll
        class="wrapper"
        ref="scroll"
        :scrollbar="scrollbarObj"
        :pullUpLoad="pullUpLoadObj"
        :startY="parseInt(startY)"
        @pulling-up="onPullingUp"
      >
        <ul class="list-content">
          <li class="list-item" v-for="(item, index) in list" :key="index">
            {{ item.miner.name }}
          </li>
        </ul>
      </vue-better-scroll>
    </main>
    <p>{{ list.length }}</p>
  </div>
</template>
<script>
export default {
  name: "ScrollDemo",
  data() {
    return {
      scrollTo() {
        this.$refs.scroll.scrollTo(
          this.scrollToX,
          this.scrollToY,
          this.scrollToTime
        );
      },
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: false,
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了",
        },
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 7000,
      items: [],
      list: [],
      pagination: {
        //分页
        page: 1,
        limit: 10,
      },
    };
  },
  mounted() {
    this.onPullingUp();
  },
  methods: {
    onPullingUp() {
      this.$http
        .get("/miner-orders", {
          params: this.pagination,
        })
        .then((response) => {
          if (response.data.data.length) {
            response.data.data.map((item) => {
              this.list.push(item);
            });
            this.pagination.page++;
            this.$refs.scroll.forceUpdate(true);
          } else {
            
          }
          if (response.data.data.length != 10) {
            this.$refs.scroll.forceUpdate(false);
          }
        });
    },
  },
};
</script>

<style>
.position-box {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
}
.list-item {
  /* margin: 50px 0; */
}
</style>
