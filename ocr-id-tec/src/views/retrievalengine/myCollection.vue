<template>
  <div class="mycollection">
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
    <div class="mycollection_head">
      <div class="mycollection_head_title">我的收藏</div>
    </div>
    <div class="mycollection_content">
      <collection v-for="(item, index) in colList" :key="index" :item="item"></collection>
    </div>
  </div>
</template>

<script>
import collection from '@/components/myCollection.vue';
export default {
  name: 'myCollection',
  components: { collection },
  data () {
    return {
      colList: [
        {
          id: "1",
        },
        {
          id: "5",
          author: "徐光宪    冯春    马飞",
          title: "基于UNet的医学图像分割综述",
          desc: "UNet作为卷积神经网络（CNN）中最重要的语义分割框架之一，广泛地应用于医学图像的分类、分割和目标检测等图像处理任务。本文对UNet的结构原理进行了阐述，并对基于UNet网络及变体模型进行了全面综述，从..."
        },
        {
          id: "6",
        },
        {
          id: "7",
        },
        {
          id: "11",
        },
        {
          id: "8",
        },
        {
          id: "14",
        },
        {
          id: "15",
        },
        {
          id: "11",
        },
      ],
      dateValue: '',
      keyWord: '',
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
.mycollection {
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
.mycollection_head {
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
.mycollection_content {
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
