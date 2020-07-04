<template>
  <div>
    <h1>111111111111111111111111111</h1>
    <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
  </div>
</template>
<script>
export default {
  namt: "echarts",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        series: [
          {
            name: "列表",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, },
              { value: 310, },
              { value: 234, },
              { value: 135, },
              { value: 1548,},
            ],
          },
        ],
      });
    },
  },
};
</script>
<style lang="less"></style>
