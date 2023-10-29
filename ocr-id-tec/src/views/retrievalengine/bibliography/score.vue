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
import RadarChart from '@/components/RadarChart.vue'
import _ from 'lodash'
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
    .px2vh(height, 100);
    width: 100%;
    margin: auto;
    .el-icon-arrow-left {
      position: absolute;
      .px2vh(top, 45);
      .px2vw(left, 45);
      .px2font(35);
      line-height: 2;
      cursor: pointer;
    }
    &_title {
      position: absolute;
      .px2vh(top, 61);
      .px2vw(left, 115);
      color: #000;
      .px2font(28);
      font-weight: 700;
    }
  }
}
.score_body {
  float: left;
  width: 100%;
  .px2vh(height, 877);
  &_radar {
    float: left;
    .px2vh(margin-top, 110);
  }
  &_box {
    float: left;
    .px2vh(margin-top, 120);
    .px2vh(padding-top, 70);
    .px2vh(height, 729);
    .px2vw(width, 730);
    span {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      .px2vh(margin-bottom, 52);
      color: #000;
      .px2font(32);
      font-weight: 700;
    }
  }
  &_total {
    float: right;
    .px2vw(margin-right, 210);
    .px2font(60);
    font-weight: 700;
    &_score {
      float: right;
      .px2vw(padding-right, 40);
      color: #013480;
    }
  }
}

::v-deep .el-progress {
  display: inline-block;
  margin: 0 25px;
  .px2vw(margin-right, 25);
  .px2vw(margin-left, 25);  
  .px2vh(margin-top, 5);
  .px2vh(height, 32);
  .px2vw(width, 350);
}

::v-deep .el-progress-bar {
  .px2vh(height, 32);
}
::v-deep .el-progress-bar__outer {
  .px2vh(height, 32)!important;
  background-color: #EBF5FF;
}
</style>
