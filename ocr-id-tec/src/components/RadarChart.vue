<template>
  <div id="myChart" ref="radar"></div>
</template>

<script>
export default {
  name: 'RarChart',
  components: {},
  data () {
    return {}
  },
  mounted(){
    this.drawChart();
    window.addEventListener('resize',()=>{
    	this.drawChart();
    })
  },
  methods: {
    fontSize(size) {
      let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if (!clientWidth) return;
      return  size * (clientWidth / 1920);
    },
    x(tx) {
      let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if (!clientWidth) return;
      return  tx * (clientWidth / 1920);
    },
    y(ty) {
      let clientHeight = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
      if (!clientHeight) return;
      return  ty * (clientHeight / 1080);
    },
    drawChart() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.radar)
      // 绘制图表
      var option = {
        radar: {
          name: 'score',
          shape: 'triangle',
          splitNumber: 2,
          radius: ['30%', '75%'],
          indicator: [
            { name: '内容相关性', max: 60 },
            { name: '文献点击率', max: 30 },
            { name: '用户反馈点赞数', max: 10 }
          ],
          axisName: {
            color: '#000',
            fontSize: this.fontSize(32),
            padding: [15, 10],
            fontFamily: 'Microsoft YaHei'
          },
          axisTick: {
            show: false,
            opacity: 0
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              // 使用间隔的色
              color: ['#9B9595'],
              width: 1
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [58, 26, 4],
                name: 'Allocated Budget',
                lineStyle: {
                  color: '#013480',
                  width: 2
                }
              }
            ],
            label: {
              show: true,
              position: 'top',
              distance: 50,
              fontSize: this.fontSize(32),
              offset: [this.x(20), this.y(20)],
              fontFamily: 'Microsoft YaHei',
              align: 'right',
              verticalAlign: 'top'
            }
          }
        ]
      }
      // 防止越界，重绘canvas，解决掉屏幕缩小，图表不会随之适应的缩小的方法
      window.onresize = myChart.resize;
      // 设置option
      myChart.setOption(option);
    },
  },
}
</script>
<style scoped lang='less'>
#myChart {
  .px2vh(height, 700);
  .px2vw(width, 900);
}
</style>
