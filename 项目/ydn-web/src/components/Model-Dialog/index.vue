// 对话模态框
<template>
  <van-overlay :show="Show">
    <div class="wrapper" @click.self="cloneShow">
      <div class="container">
        <slot name="title"></slot>
        <slot name="conent"></slot>
        <!-- x -->
        <img
          class="deselect"
          @click="cloneShow"
          src="../../../static/images/RedPack/deselect@2x.png"
        />
      </div>
    </div>
  </van-overlay>
</template>
<script>
export default {
  name: "Model",
  props: ["boolean"],
  data() {
    return {
      Show: false,
    };
  },
  methods: {
    cloneShow() {
      console.log(111);
      
      this.Show = false;
      this.$emit("hideFn", this.Show);
      this.$emit('refresh')
    },
  },
  mounted() {
    this.Show = this.boolean;
  },
};
</script>
<style scoped lang="less">
.wrapper {
  position: relative;
  height: 100%;
  .container {
    background-color: #fff;
    border-radius: 0.853rem;
    width: 16.533rem;
    height: 17.333rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    color: #333333;
    padding: 1.227rem;
    .deselect {
      position: absolute;
      bottom: -2.667rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1.707rem;
      height: 1.707rem;
      display: block;
    }
  }
}
</style>
