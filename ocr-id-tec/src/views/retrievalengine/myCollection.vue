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
      <collection v-for="(item, index) in matchList" :key="index" :item="item"></collection>
    </div>
  </div>
</template>

<script>
import collection from '@/components/myCollection.vue'
import { getColle, deleteColle } from '@/api/myCollection.js'
export default {
  name: 'myCollection',
  components: { collection },
  data () {
    return {
      colList: [
        {
          id: "1",
          author: "张家菁 黎可盈 魏振东",
          title: "以人为对象的医学科学试验的伦理分析",
          desc: "随着医学技术的不断进步，以人为对象的科学试验研究中出现了一些违背伦理原则的现象。以人体试验研究的类型为切入点，通过对不同类型的人体试验研究进行伦理分析及评价，得出在人体试验研究中应坚持人道主义原则..."
        },
        {
          id: "5",
          author: "徐光宪    冯春    马飞",
          title: "基于UNet的医学图像分割综述",
          desc: "UNet作为卷积神经网络（CNN）中最重要的语义分割框架之一，广泛地应用于医学图像的分类、分割和目标检测等图像处理任务。本文对UNet的结构原理进行了阐述，并对基于UNet网络及变体模型进行了全面综述，从..."
        },
        {
          id: "6",
          author: "吴娜",
          title: "医学叙事能力中共情能力与文学阅读的审美路径",
          desc: "共情能力是医学叙事能力的核心之一，相较于外感知与内感知，共情是理解陌生他者的关键方式，高层次共情能力可以借助后天的训练提升。文学除了可以提供共情资源外，审美移情与共情在对象的性质、主客间的关系、发..."
        },
        {
          id: "7",
          author: "黄鑫 朱健康 尹军祥",
          title: "医学领域颠覆性技术发展现状、问题及展望",
          desc: "近年来，人工智能、基因编辑、生物3D打印、诱导多能干细胞、合成生物学等新兴技术备受关注，并逐步运用至临床医学领域，给许多疾病的诊治带来了新方法。这些技术因其独特的优势正在取代或者已经取代传统医疗技术..."
        },
        {
          id: "11",
          author: "方德宇 张彬彬 张林",
          title: "基于循证医学的补肾益髓法治疗AD疗效评价",
          desc: "目的 系统评价补肾益髓中药复方治疗阿尔茨海默病的疗效。方法 检索6个国内外常用数据库，收集补肾益髓中药复方治疗阿尔茨海默病的临床随机对照试验文献，进行Meta分析。结果 共纳入文献研究12篇，共计733例患者..."
        },
        {
          id: "8",
          author: "李明",
          title: "“医家学说与学术流派”课程群构建与思考",
          desc: "为培养符合时代需求、具有创新精神的复合型中医药人才，教学团队以培养学生的核心素养为目标，从深化教学内容、精研课程设计、丰富教学方法、完善教学评价等方面，开展“医家学说与学术流派”课程群改革。通过整..."
        },
        {
          id: "14",
          author: "李璐 焦楠 袁娜",
          title: "近十年中医学课程教学方法研究热点与趋势分析",
          desc: "目的：分析近十年我国中医学课程教学方法研究现状与热点，明晰教学方法内涵，总结不同类型课程使用教学方法的规律，探索教学方法发展趋势，为后续发展提供参考。方法：以中国知网数据库为文献计量分析数据源，应..."
        },
        {
          id: "15",
          author: "农泽宁",
          title: "头疼脑热试试民间“滚蛋疗法”",
          desc: "<正>患了轻微的感冒发烧、关节肿痛、皮肤肿胀,一定要求助医生吗?非也。在民间,流传着用蛋(优选鸡蛋)在身体上来回滚动达到治疗或缓解疾病的做法，俗称“滚蛋疗法”。其操作简便,效果较显著。现介绍如下,以飨读者。..."
        },
        {
          id: "16",
          author: "吴娜",
          title: "医学叙事能力中共情能力与文学阅读的审美路径",
          desc: "共情能力是医学叙事能力的核心之一，相较于外感知与内感知，共情是理解陌生他者的关键方式，高层次共情能力可以借助后天的训练提升。文学除了可以提供共情资源外，审美移情与共情在对象的性质、主客间的关系、发..."
        },
        {
          id: "17",
          author: "徐光宪    冯春    马飞",
          title: "基于UNet的医学图像分割综述",
          desc: "UNet作为卷积神经网络（CNN）中最重要的语义分割框架之一，广泛地应用于医学图像的分类、分割和目标检测等图像处理任务。本文对UNet的结构原理进行了阐述，并对基于UNet网络及变体模型进行了全面综述，从..."
        },
      ],
      matchList: [],
      dateValue: '',
      keyWord: '',
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.colList
      } else {
        this.getMachlist()
      }
    },
  },
  methods: {
    pickerOptions() {
      
    },
    // 文字匹配，先清空Lis，数据暂存ListCopy，通过keyword和dateValue进行匹配，筛选出与keyword匹配的数据，再筛选出在dateValue之前的数据，再将筛选出的数据push到recycleList中
    getMachlist() {
      this.matchList = []
      this.colList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        } else if(item.desc.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        } else if(item.author.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        }
      })
    },
    async getCollectionList() {
      await getColle(localStorage.getItem('loginId'))
      .then(res => {
        console.log(res)
        // this.colList = res
        this.$message({
          message: '获取收藏列表成功',
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: '获取收藏列表失败' + err,
          type: "error"
        })
      })
    },
    async deleteCollection(id) {
      // 删除colList中的对应id数据
      this.colList = this.colList.filter(item => item.id !== id)
      this.matchList = this.colList
      this.$message({
        type: 'success',
        message: '取消收藏成功'
      })
      // await deleteColle(id, localStorage.getItem('loginId'))
      // .then(res => {
      //   console.log(res)
      //   this.$message({
      //     type: 'success',
      //     message: '取消收藏成功'
      //   })
      // })
      // .catch(err => {
      //   this.$message({
      //     type: 'error',
      //     message: '取消收藏失败' + err
      //   })
      // })
    },
  },
  provide() {
    return {
      fatherDeleteMethod: this.deleteCollection
    };
  },
  created () {
    this.getCollectionList()
    this.matchList = this.colList
  },
}
</script>
<style scoped lang='less'>
.mycollection {
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
    ::v-deep .el-input {
      .px2vh(height, 99);
      .px2vh(line-height, 103);
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
.mycollection_head {
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
.mycollection_content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 3vh 11.5vw;
  .px2vh(height, 777);
  .px2vw(padding-right, 110);
  .px2vw(padding-left, 115);
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  .px2vh(padding-top, 20);
  .px2vh(padding-bottom, 50);
}
</style>
