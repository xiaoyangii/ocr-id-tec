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
    <div class="subscription_content" v-if="isempty">
      <subCard v-for="(item, index) in matchList" :key="index" :item="item"></subCard>
    </div>
    <div class="subscription_content_empty" v-else>
        <img src="@/assets/images/recycle.png" alt="">
        <div>当前浏览历史为空😃</div>
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
  &_clear {
    background-color: #FFF;
    .px2vh(line-height, 99);
    .px2vh(height, 99);
    &_btn {
      .px2vh(height, 63);
      .px2vw(margin-left, 25);
      .px2vw(margin-right, 136);
      .px2vw(width, 171);
      .px2vw(border-radius, 10);
      text-align: center;
      background: #013480;
      border: 0.1vw solid #013480;
      color: #FFF;
      .px2font(22);
    }
  }
}
.subscription_head {
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
.subscription_content {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 2.5vh 11.5vw;
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
