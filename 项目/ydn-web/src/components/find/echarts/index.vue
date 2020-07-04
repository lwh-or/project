<template>
  <div>
    <div id="myChart" :style="{ width: '250px', height: '250px' }"></div>
  </div>
</template>
<script>
export default {
  namt: "Echarts",
  prop: ["list"],
  data() {
    return {
      setValue: [],
    };
  },
  mounted() {
    setTimeout(() => {
      
      this.setValue = this.$attrs.list;
      this.drawLine();
    }, 2000);
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
            data: this.setValue,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = ["#F7B500", "#FF4E5F", "#0BE2B6"];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>
<style lang="less">
#myChart {
  margin: auto;
}
</style>
