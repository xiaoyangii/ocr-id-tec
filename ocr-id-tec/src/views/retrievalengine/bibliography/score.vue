<template>
  <div class="score">
    <div class="score_header">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <div class="score_header_title">文献得分情况</div>
    </div>
    <div class="score_body">
      <RadarChart ref="radar" class="score_body_radar"/>
      <div class="score_body_box">
        <span>{{ contentScore }}/60<el-progress :show-text="false" :stroke-width="32" :percentage="contentPercentage" color="#013480"></el-progress>内容相关性</span>
        <span>{{ clickScore }}/30<el-progress :show-text="false" :stroke-width="32" :percentage="clickPercentage" color="#013480"></el-progress>文献点击率</span>
        <span>{{ likeScore }}/10<el-progress :show-text="false" :stroke-width="32" :percentage="likePercentage" color="#013480" class="last"></el-progress>用户反馈点赞数</span>
        <div class="score_body_total">总得分
          <div class="score_body_total_score">{{ total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from '@/components/RadarChart.vue';
import _ from 'lodash';
export default {
  name: 'score',
  components: {
    RadarChart
  },
  data () {
    return {
      contentScore: 58,
      clickScore: 26,
      likeScore: 4,
    }
  },
  computed: {
    contentPercentage() {
      return this.contentScore/60*100;
    },
    clickPercentage() {
      return this.clickScore/30*100;
    },
    likePercentage() {
      return this.likeScore/10*100;
    },
    total() {
      return this.contentScore + this.clickScore + this.likeScore;
    }
  },
  methods: {
    
  },
  mounted() {
    // window.addEventListener(
    //   'resize',
    //   _.debounce(() => {
    //     this.$refs.radar.resize();
    //   }, 500)
    // )
  },
  created () {},
}
</script>
<style scoped lang='less'>
.score {
  width: 100%;
  height: 100%;
  background-color: #FFF;
  &_header {
    position: relative;
    top: 0;
    height: 100px;
    width: 100%;
    margin: auto;
    .el-icon-arrow-left {
      position: absolute;
      top: 40px;
      left: 40px;
      font-size: 35px;
      line-height: 2;
    }
    &_title {
      position: absolute;
      top: 53px;
      left: 115px;
      color: #000;
      font-size: 28px;
      font-weight: 700;
    }
  }
}
.score_body {
  float: left;
  width: 100%;
  height: calc(100% - 100px);
  &_radar {
    float: left;
    margin-top: 120px;
  }
  &_box {
    float: left;
    margin-top: 120px;
    padding-top: 70px;
    height: calc(80% - 120px);
    width: calc(100% - 900px);
    span {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 52px;
      color: #000;
      font-size: 32px;
      font-weight: 700;
    }
  }
  &_total {
    float: right;
    margin-right: 180px;
    font-size: 60px;
    font-weight: 700;
    &_score {
      float: right;
      padding-left: 40px;
      color: #013480;
    }
  }
}

::v-deep .el-progress {
  display: inline-block;
  margin: 0 25px;
  margin-top: 5px;
  height: 32px;
  width: 350px;
}

::v-deep .el-progress-bar {
  height: 32px;
}
::v-deep .el-progress-bar__outer {
  height: 32px !important;
  background-color: #EBF5FF;
}
</style>
