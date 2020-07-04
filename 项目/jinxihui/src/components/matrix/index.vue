<template>
  <div class="martix-container">
    <div class="martix-conten">
      <p>{{$t('comm.matrix')}}</p>
      <div class="brands-slides">
        <!-- 溢出隐藏 -->
        <div class="scroll_container">
          <!-- 最大宽度 -->
          <div class="infinite-slides">
            <!-- 浮动 -->
            <div class="infinite-slides_content1">
              <img
                class="img"
                alt="品牌logo"
                src="https://qimg.xiaohongshu.com/85d96b30-c93c-11e9-ae1e-e1dc7a61299f-1y3pkk?imageMogr2/format/webp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "matrix",
  data() {
    return {
	  headerNav: ["首页", "严选", "品牌", "入驻", "招商", "联系我们"],
	  intervalId:null
    };
  },
  mounted() {
    this._picScroll();
  },
  methods: {
    _picScroll() {
      let imgDom = document.querySelector(".infinite-slides_content1"); // 获取图片包裹元素
      let infiniteDom = document.querySelector(".infinite-slides"); // 包裹
      let Wrapper = document.querySelector(".scroll_container"); // 最外层包裹

      infiniteDom.appendChild(imgDom.cloneNode(true)); // 克隆一份,并插入

      let childrens = document.querySelectorAll(".infinite-slides_content1");

      //   计算最外层元素宽度
      let width = childrens[0].offsetWidth * childrens.length;

      infiniteDom.style.width = width + "px";

      // 定时器

      this.intervalId = setInterval(run, 50);

      //定时函数

      function run() {
        Wrapper.scrollLeft += 2;
        //判断临界点
        if (Wrapper.scrollLeft+10 >= width / 2) {
          Wrapper.scrollLeft = 0; 
        }
      }
      Wrapper.onmouseover = ()=>{
        clearInterval(this.intervalId)
      }
      Wrapper.onmouseout = ()=>{
        this.intervalId = setInterval(run, 10);
      }
    }
  },
  beforeDestroy(){
	  clearInterval(this.intervalId)
  }
};
</script>
<style scoped lang="less">
@import url("./css/matrix-mb.less");
@import url("./css/matrix-pc.less");
</style>
