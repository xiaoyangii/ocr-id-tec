<template>
  <div class="subscription">
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
    <div class="subscription_head">
      <div class="subscription_head_title">我的订阅</div>
    </div>
    <div class="subscription_content">
      <subCard v-for="(item, index) in matchList" :key="index" :item="item"></subCard>
    </div>
  </div>
</template>

<script>
import subCard from '@/components/subCard.vue'
import { getSubs, deleteSubs } from '@/api/mySubscribe.js' 
export default {
  name: 'mySubscription',
  components: { subCard },
  data () {
    return {
      dateValue: '',
      keyWord: '',
      subList: [
        {
          id: 1,
          title: "中医药学研究",
          desc: "中药学是研究中药的基本理论和临床应用的学科，是中医药各专业的基础学科之一。内容包括中药、中药学的概念...",
          img: require('@/assets/images/subs1.png')
        },
        {
          id: 2,
          title: "口腔医学",
          desc: "《中国防治慢性病中长期规划（2017-2025年）》规划指出慢性病主要包括心脑血管疾病、肿瘤、慢性...",
          img: require('@/assets/images/subs2.png')
        },
        {
          id: 3,
          title: "中药学的实践研究",
          desc: "中药学是研究中药的基本理论和临床应用的学科，是中医药各专业的基础学科之一。内容包括中药、中药学的概念...",
          img: require('@/assets/images/subs3.png')
        },
        {
          id: 4,
          title: "口腔护理标准化实践",
          desc: "口腔护理一直是现代人离不开的课题,尤其是在现代医院中护理标准化的建设中,基于此本文研究口腔护理标准化建...",
          img: require('@/assets/images/subs4.png')
        },
        {
          id: 5,
          title: "慢性肾衰",
          desc: "慢性肾功能衰竭（CRF）是各种慢性肾脏病持续进展的结局。目前临床上西医主要是以保守治疗或肾脏替代疗法为...",
          img: require('@/assets/images/subs5.png')
        },
        {
          id: 6,
          title: "中成药治疗标准",
          desc: "中成药是中医药的重要组成部分，其质量直接影响临床用药的安全性和有效性。中成药质量标准是保证中成药质...",
          img: require('@/assets/images/subs6.png')
        },
        {
          id: 7,
          title: "肿瘤微环境",
          desc: "肿瘤微环境由各类细胞和非细胞组分构成，其中免疫细胞在肿瘤发生发展的过程中扮演了关键的角色。与在正常组...",
          img: require('@/assets/images/subs7.png')
        },
        {
          id: 8,
          title: "如何正确认识麻醉",
          desc: "麻醉可以帮助患者达到无痛的目的，麻醉药品对人体影响较小，是可逆性药物，手术后可经人体完全代谢排出...",
          img: require('@/assets/images/subs8.png')
        },
        {
          id: 9,
          title: "生命教育",
          desc: "生命教育是教育体系中的重要组成部分，其有效开展对学生理解生命、关爱生命、尊重生命、保护生命有积极影响",
          img: require('@/assets/images/subs9.png')
        },
        {
          id: 10,
          title: "儿科临床药师",
          desc: ":通过开展儿科专科药学门诊、床旁用药教育、社区儿童用药宣教和线上服务等创新药学服务项目,探讨儿科专科临...",
          img: require('@/assets/images/subs10.png')
        },
        {
          id: 11,
          title: "口腔护理标准化实践",
          desc: "口腔护理一直是现代人离不开的课题,尤其是在现代医院中护理标准化的建设中,基于此本文研究口腔护理标准化建...",
          img: require('@/assets/images/subs4.png')
        },
        {
          id: 12,
          title: "口腔医学",
          desc: "《中国防治慢性病中长期规划（2017-2025年）》规划指出慢性病主要包括心脑血管疾病、肿瘤、慢性...",
          img: require('@/assets/images/subs2.png')
        },
      ],
      matchList: [],
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.subList
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
      this.subList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        } else if(item.desc.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        }
      })
    },
    async getSubList() {
      await getSubs(localStorage.getItem('loginId'))
      .then(res => {
        console.log(res)
        // this.subList = res
        this.$message({
          message: '获取订阅列表成功',
          type: "success"
        })
      })
      .catch(err => {
        console.log(err)
        this.$message({
          message: '获取订阅列表失败' + err,
          type: "error"
        })
      })
    },
    async deleteSubs(title) {
      // 删除subList中的对应title数据
      this.subList = this.subList.filter(item => item.title !== title)
      this.matchList = this.subList
      this.$message({
        type: 'success',
        message: '取消订阅成功'
      })
      // await deleteSubs(title, localStorage.getItem('loginId'))
      // .then(res => {
      //   console.log(res)
      //   this.$message({
      //     type: 'success',
      //     message: '取消订阅成功'
      //   })
      // })
      // .catch(err => {
      //   this.$message({
      //     type: 'error',
      //     message: '取消订阅失败' + err
      //   })
      // })
    }
  },
  provide() {
    return {
      fatherDeleteMethod: this.deleteSubs
    };
  },
  created () {
    this.matchList = this.subList
    this.getSubList()
  },
}
</script>
<style scoped lang='less'>
.subscription {
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
.subscription_head {
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
.subscription_content {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
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
