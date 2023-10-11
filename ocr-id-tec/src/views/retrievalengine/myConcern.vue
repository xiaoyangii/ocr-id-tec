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
      <concernCard v-for="(item, index) in matchList" :key="index" :item="item"></concernCard>
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
  computed: {},
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
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 42px 220px;
  width: 100%;
  height: calc(100vh - 266px);
  padding: 0 110px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
}
</style>

