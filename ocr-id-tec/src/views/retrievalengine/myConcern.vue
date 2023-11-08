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
    <div class="concern_content" v-if="isempty">
      <concernCard v-for="(item, index) in matchList" :key="index" :item="item"></concernCard>
    </div>
    <div class="concern_content_empty" v-else>
      <img src="@/assets/images/recycle.png" alt="">
      <div>当前收藏记录为空😃</div>
    </div>
  </div>
</template>

<script>
import concernCard from '@/components/concernCard.vue';
import { getConcern, deleteConcern } from '@/api/myConcern.js';
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
          name: "蒋建东",
          affiliatedInstitution: "中国医学科学院医药生物技术研究所",
          researchField: "新降血脂信号通路、抗病毒机理、抗肿瘤药物..."
        },
        {
          id: 2,
          name: "叶晓滨",
          affiliatedInstitution: "厦门市思明区筼筜街道社区卫生服务中心",
          researchField: "中药学;中医学;药学"
        },
        {
          id: 3,
          name: "田金洲",
          affiliatedInstitution: "北京中医药大学东直门医院",
          researchField: "中医学;精神病学;中药学"
        },
        {
          id: 4,
          name: "朱兆云",
          affiliatedInstitution: "云南白药集团股份有限公司",
          researchField: "中药研发"
        },
        {
          id: 5,
          name: "肖伟",
          affiliatedInstitution: "江苏康缘药业股份有限公司",
          researchField: "中成药智能制造"
        },
        {
          id: 6,
          name: "邬堂春",
          affiliatedInstitution: "华中科技大学公共卫生学院",
          researchField: "环境病因、防控策略"
        },
        {
          id: 7,
          name: "高鸿魁",
          affiliatedInstitution: "中山大学眼科中心",
          researchField: "眼科、视觉科学、眼底新生血管疾病"
        },
        {
          id: 8,
          name: "高峰",
          affiliatedInstitution: "四川大学华西口腔医院",
          researchField: "口腔颌面外科、口腔颌面肿瘤、口腔种植..."
        },
        {
          id: 9,
          name: "赵玉沛",
          affiliatedInstitution: "天津医科大学总医院创伤骨科中心",
          researchField: "创伤骨科、骨与软骨修复再生"
        },
        {
          id: 10,
          name: "陈万青",
          affiliatedInstitution: "上海交通大学附属瑞金医院肿瘤研究所",
          researchField: "肿瘤、肿瘤免疫、肿瘤转移"
        },
        {
          id: 11,
          name: "肖伟",
          affiliatedInstitution: "江苏康缘药业股份有限公司",
          researchField: "中成药智能制造"
        },
        {
          id: 12,
          name: "蒋建东",
          affiliatedInstitution: "中国医学科学院医药生物技术研究所",
          researchField: "新降血脂信号通路、抗病毒机理、抗肿瘤药物..."
        },
      ],
      matchList: []
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.concernList
      } else {
        this.getMachlist()
      }
    },
  },
  computed: {
    isempty() {
      if(this.matchList.length == 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    pickerOptions() {
      
    },
    getMachlist() {
      this.matchList = []
      this.concernList.forEach((item) => {
        if(item.researchField.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        } else if(item.name.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        } else if(item.affiliatedInstitution.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        }
      })
    },
    async deleteConcern(id) {
      // 删除concernList中的对应id数据
      this.concernList = this.concernList.filter(item => item.id !== id)
      this.matchList = this.concernList
      this.$message({
        type: 'success',
        message: '取消关注成功'
      })
      // await deleteConcern(id, localStorage.getItem('loginId'))
      // .then(res => {
      //   console.log(res)
      //   this.$message({
      //     type: 'success',
      //     message: '取消关注成功'
      //   })
      // })
      // .catch(err => {
      //   this.$message({
      //     type: 'error',
      //     message: '取消关注失败' + err
      //   })
      // })
    },
    async getConcern() {
      await getConcern(localStorage.getItem('loginId'))
      .then(res => {
        console.log(res)
        // this.concernList = res
        this.$message({
          type: 'success',
          message: '获取关注列表成功'
        })
      })
      .catch(err => {
        this.$message({
          type: 'error',
          message: '获取关注列表失败' + err
        })
      })
    }
  },
  provide() {
    return {
      fatherDeleteMethod: this.deleteConcern
    };
  },
  created () {
    this.getConcern()
    this.matchList = this.concernList
  },
}
</script>
<style scoped lang='less'>
.concern {
  background-color: #fff;
}
.bar {
  display: flex;
  .px2vh(height, 99);
  .px2vh(line-height, 99);
  width: 100%;
  flex-direction: row;
  &_search {
    background-color: #fff;
    display: inline-flex;
    flex-direction: row;
    ::v-deep .el-input {
      .px2vh(height, 99);
      .px2vh(line-height, 98);
      .px2vw(margin-left, 114);
      .px2vw(margin-right, 20);
    }
    ::v-deep .el-input__inner {
      .px2vh(height, 57);
      .px2vw(width, 829);
      .px2vw(border-radius, 8);
      border: 0.1vw solid #D9D9D9;
      color: #9B9595;
      .px2font(20);
      .px2vw(padding-left, 70);
    }
    ::v-deep .el-input__icon.el-icon-search {
      scale: 2;
      margin: 0 15px;
      .px2vw(margin-left, 15);
      .px2vw(margin-right, 15);
      .px2vh(height, 86)!important;
      .px2vh(line-height, 86);
      .px2vw(width, 40);
      .px2font(16);
    }
  }
  &_time {
    background-color: #fff;
    display: inline-flex;
    flex-direction: row;
    .el-date-editor {
      .px2vw(width, 300);
      margin: 0 25px;
      .px2vw(margin-left, 15);
      .px2vw(margin-right, 25);
    }
    ::v-deep .el-input__inner {
      border: 0.1vw solid #D9D9D9;
      .px2vw(padding-left, 60);
      .px2vh(height, 57);
      .px2vh(line-height, 86);
      .px2vw(border-radius, 8);
      color: #9B9595;
      .px2font(20);
    }
    ::v-deep .el-icon-date {
      scale: 2;
      margin: 0 15px;
      .px2vw(margin-left, 15);
      .px2vw(margin-right, 15);
      .px2vh(height, 86)!important;
      .px2vh(line-height, 86);
      .px2font(16);
    }
  }
}
.concern_head {
  width: 100%;
  .px2vh(height, 113.5);
  &_title {
    float: left;
    .px2vh(margin-top, 40);
    .px2vw(margin-left, 115);
    color: #000;
    .px2font(28);
    font-weight: 700;
  }
}
.concern_content {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 4vh 11vw;
  width: 100%;
  .px2vh(height, 777);
  .px2vw(padding-right, 110);
  .px2vw(padding-left, 115);
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  .px2vh(padding-top, 20);
  .px2vh(padding-bottom, 50);
  &_empty {
    width: 100%;
    height: 70vh;
    .px2vh(padding-top, 35);
    text-align: center;
    color: #000;
    .px2font(36);
    font-weight: 700;
    img {
      margin: 0 20vw;
      .px2vw(width, 605);
      .px2vh(height, 425);
    }
    div {
      .px2vh(margin-top, 34);
      color: #74ADFD;
      .px2font(38);
      letter-spacing: 0.2vw;
    }
  }
}
</style>
