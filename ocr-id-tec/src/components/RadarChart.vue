<template>
  <div id="myChart" :style="{width: '900px', height: '600px'}"></div>
</template>

<script>
export default {
  name: 'RarChart',
  components: {},
  data () {
    return {}
  },
  mounted(){
    setTimeout(() => { this.drawChart() }, 500)
  },
  methods: {
    drawChart() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
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
            fontSize: 32,
            padding: [12, 10],
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
              fontSize: 32,
              offset: [20, 20],
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
  //   resetCharts() {
  //     // 重置图表大小
  //     this.$echarts.init(this.$refs.myChart).resize()
  //   }
  },
  created () {
    
  },
}
</script>
<style scoped lang='less'>
</style>
