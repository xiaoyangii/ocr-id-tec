<template>
  <div class="concern">
    <div class="bar">
      <div class="bar_search">
        <el-input
          placeholder="输入关键字搜索"
          prefix-icon="el-icon-search"
          v-model="keyWord">
        </el-input>
      </div>
      <div class="bar_time">
        <el-date-picker
          v-model="dateValue"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>
    <div class="concern_head">
      <div class="concern_head_title">我的关注</div>
    </div>
    <div class="concern_content">
      <concernCard v-for="(item, index) in concernList" :key="index" :item="item"></concernCard>
    </div>
  </div>
</template>

<script>
import concernCard from '@/components/concernCard.vue';
export default {
  name: 'myConcern',
  components: { concernCard },
  data () {
    return {
      dateValue: '',
      keyWord: '',
      concernList: [
        {
          id: 1,
          title: "中医药学研究",
          desc: "中药学是研究中药的基本理论和临床应用的学科，是中医药各专业的基础学科之一。内容包括中药、中药学的概念..."
        },
        {
          id: 1,
          name: "口腔医学",
          desc: "《中国防治慢性病中长期规划（2017-2025年）》规划指出慢性病主要包括心脑血管疾病、肿瘤、慢性..."
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },

      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    pickerOptions() {
      
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.concern {
  background-color: #fff;
}
.bar {
  display: flex;
  height: 86px;
  width: 100vw;
  flex-direction: row;
  line-height: 90px;
  &_search {
    background-color: #fff;
    ::v-deep .el-input {
      margin-left: 114px;
      margin-right: 16px;
    }
    ::v-deep .el-input__inner {
      width: 829px;
      height: 55px;
      border-radius: 8px;
      border: 1px solid #D9D9D9;
      color: #9B9595;
      font-size: 20px;
      padding-left: 60px;
    }
    ::v-deep .el-input__icon.el-icon-search {
      scale: 2;
      margin: 0 15px;
      height: 86px !important;
      line-height: 85px;
    }
  }
  &_time {
    background-color: #fff;
    .el-date-editor {
      width: 300px;
      margin: 0 349px;
      margin-left: 15px;
    }
    ::v-deep .el-input__inner {
      padding-left: 55px;
      line-height: 86px;
      height: 55px;
      border-radius: 8px;
      color: #9B9595;
      font-size: 20px;
    }
    ::v-deep .el-icon-date {
      scale: 2;
      margin: 0 15px;
      height: 86px !important;
      line-height: 82px;
    }
    ::v-deep .el-input__prefix {
      top: -2px;
    }
  }
}
.concern_head {
  width: 100%;
  height: 100px;
  &_title {
    float: left;
    margin-top: 30px;
    margin-left: 110px;
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
}
.concern_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px 220px;
  width: 100%;
  height: calc(100vh - 266px);
  padding: 0 110px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
}
</style>

