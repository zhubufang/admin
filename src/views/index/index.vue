<template>
  <div style="width:100%;height:300px;border:1px solid red">首页</div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          num: "9"
        }
      ],
      counts: [
        {
          icon: "el-icon-user-solid",
          desc: "关注人数(个)",
          num: "30",
          color: "bg-primary"
        },
        {
          icon: "el-icon-s-finance",
          desc: "订单总数(笔)",
          num: "120",
          color: "bg-success"
        },
        {
          icon: "el-icon-s-order",
          desc: "今日订单总金额(元)",
          num: "4183.80",
          color: "bg-danger"
        },
        {
          icon: "el-icon-s-data",
          desc: "本月销量(笔)",
          num: "100",
          color: "bg-warning"
        }
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "待回复", value: "10" },
            { name: "库存预警", value: "0" },
            { name: "仓库中", value: "3" }
          ]
        },
        {
          title: "交易提示",
          desc: "需要立即处理的交易订单",
          list: [
            { name: "待付款", value: "0" },
            { name: "待发货", value: "10" },
            { name: "已发货", value: "0" },
            { name: "已收货", value: "3" },
            { name: "退款中", value: "3" },
            { name: "待售后", value: "3" }
          ]
        }
      ]
    };
  },
  filters: {
    getCol(total) {
      return `col-${12 / total}`;
    }
  },
  // dom渲染完毕
  mounted() {
    // 画统计图
    //this.drawLine()
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      // 配置参数
      myChart.setOption({
        title: {},
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>
