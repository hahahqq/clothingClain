<template>
  <div>
    <div id="myChart" class="full-width" :style="{minWidth: '300px', height: '300px'}"></div>
  </div>
</template>
<script>
import MIXINS_INDEX from "@/mixins/index";
import echarts from "echarts";
export default {
  mixins: [MIXINS_INDEX.IS_SHOW_POPUP],
  props: {
    lineData: {
      type: Object,
      default: {
        title: "折线图demo",
        legend: ["销售金额", "毛利润"],
        xAxis: [
          "2018-10-19",
          "2018-10-20",
          "2018-10-21",
          "2018-10-22",
          "2018-10-23",
          "2018-10-24",
          "2018-10-25"
        ],
        series: [[0, 1, 1, 4, 0, 8, 0], [0, 11, 11, 14, 10, 8, 10]]
      }
    },
    unit:{
      type:String,default:'元'
    }
  },
  data() {
    return {
      seriesArr: [],
      xAxisArr: []
    };
  },
  watch: {
    isChangePropsState(v) {
      console.log(v);
      let arr = [];
      for (let i = 0; i < this.lineData.legend.length; i++) {
        arr.push({
          name: this.lineData.legend[i],
          type: "line",
          smooth: false,
          data: [...this.lineData.series[i]]
        });
      }
      this.xAxisArr = [...this.lineData.xAxis];
      this.seriesArr = [...arr];
      console.log(this.lineData);
      this.drawLine();
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      let unit = "单位："+this.unit;
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.lineData.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          x: "center",
          y: "30",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#000" // 图例文字颜色
          },
          data: [...this.lineData.legend]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30",
          containLabel: false
        },
        toolbox: {
          feature: {
            saveAsImage: { }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisArr
        },
        yAxis: {
          type: "value",
          name: unit
        },
        areaStyle: { color: "rgba(148, 226, 238, 1)" },
        series: [...this.seriesArr]
      });
    }
  }
};
</script>

