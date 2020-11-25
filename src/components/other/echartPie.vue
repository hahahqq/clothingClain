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
    pieData: {
      type: Object,
      default: {
        title: "饼状图demo",
        legend: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        series: [
          { value: 235, name: "视频广告" },
          { value: 274, name: "联盟广告" },
          { value: 310, name: "邮件营销" },
          { value: 335, name: "直接访问" },
          { value: 400, name: "搜索引擎" }
        ]
      }
    },
    unit: {
      type: String,
      default: "元"
    }
  },
  watch: {
    isChangePropsState(v) {
      this.drawLine();
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      let unit = this.unit;
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.pieData.title
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "70%",
          y: "15%",
          data: [...this.pieData.legend],
          left: "left",
          itemWidth: 10,
          itemHeight: 10,
          selectedMode: false, //禁止点击
          textStyle: {
            fontSize: 14,
            color: "#999"
          },
          formatter: function(name) {
            return name.length > 9 ? name.slice(0, 9) + "..." : name;
          }
        },
        grid: {
          left: "13%",
          right: "4%",
          bottom: "30",
          containLabel: false,
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: this.pieData.title,
            type: "pie",
            radius: "55%",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function(params) {
                    var name = params.name; //名字
                    var percent = params.percent; //占比
                    var value = params.value; //数量
                    if (name.length > 8) {
                      return (
                        name.slice(0, 7) +
                        "..." +
                        "\n" +
                        "(" +
                        value +
                        unit +
                        ")" +
                        percent +
                        "%"
                      );
                    } else {
                      return (
                        name + "\n" + "(" + value + unit + ")" + percent + "%"
                      );
                    }
                  }
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: [...this.pieData.series],
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>