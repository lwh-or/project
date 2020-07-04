// 空白页封装
<template>
  <div class="miner_no"
       :style="{height:height?height:''}">
    <div class="min">
      <slot name="img"></slot>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlankPage',
  props: ['height']
}
</script>

<style lang="less" scoped>
.miner_no {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>