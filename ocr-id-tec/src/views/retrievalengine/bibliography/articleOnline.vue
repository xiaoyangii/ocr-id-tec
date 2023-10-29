<template>
  <div class="online">
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
      <div class="bar_button">
        <button class="bar_button_left" @click="getMachlist()">查询</button>
        <el-link class="bar_button_right" :underline="false">高级检索<i class="el-icon-arrow-right"></i> </el-link>
      </div>
    </div>
    <div class="online_header">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <button class="online_header_button" @click="cooperation()">协作</button>
    </div>
    <div class="online_body">
      <div class="online_body_header">
        <div class="online_body_header_title" v-html="article.title"></div>
        <div class="online_body_header_box">
          <span class="online_body_header_box_author" v-for="author in article.author" :key="author" v-html="author"></span>
        </div>
        <div class="online_body_header_line"></div>
        <div class="online_body_header_box">
          <span class="online_body_header_school" v-for="school in article.school" :key="school" v-html="school"></span>
        </div>
      </div>
      <div class="online_body_content">
        <div class="online_body_content_summary" v-html="article.summary"></div>
        <div class="online_body_content_text" v-html="article.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
export default {
  name: 'articleOnline',
  data () {
    return {
      keyWord: "", //搜索框输入的值
      dateValue: "",
      article: {
        id: 1,
        title: "中医药创新发展的逻辑与策略探讨",
        author: ["焦科兴", "董美佳", "李艺清", "侯胜田"],
        school: ["1.北京中医药大学管理学院", "2.北京中医药大学国家中医药发展与战略研究院"],
        summary: "<span style='font-weight:700;color:#000;'>摘要：</span>" + "中医药事业发展正迎来前所未有的机遇，但也面临复杂严峻的挑战。突破中医药传承创新发展瓶颈逐渐成为中医药创新发展的关键一步。深入梳理分析中医药创新发展的内在逻辑，并提出中医药创新发展需要解放思想，摈弃路径依赖，切实落实中医药发展战略定位；促进中医医疗服务事业与中医药健康服务业共同发展；走出医院和药店，积极融入大健康产业；把握中医药健康旅游行业发展，推进中医药健康旅游目的地建设等创新发展策略。通过一系列战略行动实现中医药传承创新发展战略目标。",
        text: "中医药传承创新发展瓶颈产生的原因导致中医药传承发展长期陷于困境的原因很复杂。有人认为最大问题是缺乏自信导致中医西化，具体表现为中医教育知识结构西化、中医诊断西化、中医思维西化等。也有人认为在中医与西医竞争中，中医定位认同存在偏差，没能在发展战略上实现错位竞争，协同发展。这些问题的提出没有形成共识，但意义重大，有待于进一步探讨分析。事实上，最近几年权威机构对中医药的定位已经非常清晰，中医药在治未病方面要发挥主导作用，要在重大疾病 治疗方面发挥协同作用，在疾病的康复方面要发挥核心作用。[1]在此共识下，中医药所面临 的问题不是是否需要创新发展，而是如何创新发展，如何选择中医药创新发展的路径。中医药的发展长期依托于中医医院的发展，大型医院又以事业单位为主，社会办医的大型医院占比较小。经过政府多年的支持、医院的努力、中医各界人士的奋斗，中医药事业的发展取得了一定的进展，但在如何进一步扩大服务范围，提高经济效益方面遇到瓶颈。突出 的问题是在发展模式和路径思维上存在路径依赖，导致中医药发展路径思维上囿于医院发展，重事业轻产业，重治疗轻康养。要突破这一瓶颈，在大力发展中医医疗服务的同时，要强力推进中医药健康服务业发展。</br> "+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +" 中医药健康服务业发展的思路医疗与健康其实是存在交集但又不完全重合的两个领域。从实现目标、实现目标采用的 手段和运营管理模式、从业人员的要求与专业培养等方面都存在差异。就产业管理来讲，医疗与康养需要明确区分，分别管理，才能促进医疗与康养服务业的迅速发展。</br> "+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +" 中医药具有良好的医疗服务能力，更具有突出的康养优势。中医药传承与创新发展需要 突破发展路径依赖，走出医院和药房，中医药传承创新发展瓶颈产生的原因导致中医药传承发展长期陷于困境的原因很复杂。有人认为最大问题是缺乏自信导致中医西化，具体表现为中医教育知识结构西化、中医诊断西化、中医思维西化等。也有人认为在中医与西医竞争中，中医定位认同存在偏差，没能在发展战略上实现错位竞争，协同发展。 这些问题的提出没有形成共识，但意义重大，有待于进一步探讨分析。事实上，最近几年权威机构对中医药的定位已经非常清晰，中医药在治未病方面要发挥主导作用，要在重大疾病 治疗方面发挥协同作用，在疾病的康复方面要发挥核心作用。[2]在此共识下，中医药所面临的问题不是是否需要创新发展，而是如何创新发展，如何选择中医药创新发展的路径。中医药的发展长期依托于中医医院的发展，大型医院又以事业单位为主，社会办医的大型医院占比较小。经过政府多年的支持、医院的努力、中医各界人士的奋斗，中医药事业的发展取得了一定的进展，但在如何进一步扩大服务范围，提高经济效益方面遇到瓶颈。突出的问题是在发展模式和路径思维上存在路径依赖，导致中医药发展路径思维上囿于医院发展，重事业轻产业，重治疗轻康养。要突破这一瓶颈，在大力发展中医医疗服务的同时，要强力推进中医药健康服务业发展。</br>"+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +"中医药健康服务业发展的思路医疗与健康其实是存在交集但又不完全重合的两个领域。从实现目标、实现目标采用的手段和运营管理模式、从业人员的要求与专业培养等方面都存在差异。就产业管理来讲，医疗与康养需要明确区分，分别管理。"
      },
      articleOri: {
        id: 1,
        title: "中医药创新发展的逻辑与策略探讨",
        author: ["焦科兴", "董美佳", "李艺清", "侯胜田"],
        school: ["1.北京中医药大学管理学院", "2.北京中医药大学国家中医药发展与战略研究院"],
        summary: "<span style='font-weight:700;color:#000;'>摘要：</span>" + "中医药事业发展正迎来前所未有的机遇，但也面临复杂严峻的挑战。突破中医药传承创新发展瓶颈逐渐成为中医药创新发展的关键一步。深入梳理分析中医药创新发展的内在逻辑，并提出中医药创新发展需要解放思想，摈弃路径依赖，切实落实中医药发展战略定位；促进中医医疗服务事业与中医药健康服务业共同发展；走出医院和药店，积极融入大健康产业；把握中医药健康旅游行业发展，推进中医药健康旅游目的地建设等创新发展策略。通过一系列战略行动实现中医药传承创新发展战略目标。",
        text: "中医药传承创新发展瓶颈产生的原因导致中医药传承发展长期陷于困境的原因很复杂。有人认为最大问题是缺乏自信导致中医西化，具体表现为中医教育知识结构西化、中医诊断西化、中医思维西化等。也有人认为在中医与西医竞争中，中医定位认同存在偏差，没能在发展战略上实现错位竞争，协同发展。这些问题的提出没有形成共识，但意义重大，有待于进一步探讨分析。事实上，最近几年权威机构对中医药的定位已经非常清晰，中医药在治未病方面要发挥主导作用，要在重大疾病 治疗方面发挥协同作用，在疾病的康复方面要发挥核心作用。[1]在此共识下，中医药所面临 的问题不是是否需要创新发展，而是如何创新发展，如何选择中医药创新发展的路径。中医药的发展长期依托于中医医院的发展，大型医院又以事业单位为主，社会办医的大型医院占比较小。经过政府多年的支持、医院的努力、中医各界人士的奋斗，中医药事业的发展取得了一定的进展，但在如何进一步扩大服务范围，提高经济效益方面遇到瓶颈。突出 的问题是在发展模式和路径思维上存在路径依赖，导致中医药发展路径思维上囿于医院发展，重事业轻产业，重治疗轻康养。要突破这一瓶颈，在大力发展中医医疗服务的同时，要强力推进中医药健康服务业发展。</br> "+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +" 中医药健康服务业发展的思路医疗与健康其实是存在交集但又不完全重合的两个领域。从实现目标、实现目标采用的 手段和运营管理模式、从业人员的要求与专业培养等方面都存在差异。就产业管理来讲，医疗与康养需要明确区分，分别管理，才能促进医疗与康养服务业的迅速发展。</br> "+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +" 中医药具有良好的医疗服务能力，更具有突出的康养优势。中医药传承与创新发展需要 突破发展路径依赖，走出医院和药房，中医药传承创新发展瓶颈产生的原因导致中医药传承发展长期陷于困境的原因很复杂。有人认为最大问题是缺乏自信导致中医西化，具体表现为中医教育知识结构西化、中医诊断西化、中医思维西化等。也有人认为在中医与西医竞争中，中医定位认同存在偏差，没能在发展战略上实现错位竞争，协同发展。 这些问题的提出没有形成共识，但意义重大，有待于进一步探讨分析。事实上，最近几年权威机构对中医药的定位已经非常清晰，中医药在治未病方面要发挥主导作用，要在重大疾病 治疗方面发挥协同作用，在疾病的康复方面要发挥核心作用。[2]在此共识下，中医药所面临的问题不是是否需要创新发展，而是如何创新发展，如何选择中医药创新发展的路径。中医药的发展长期依托于中医医院的发展，大型医院又以事业单位为主，社会办医的大型医院占比较小。经过政府多年的支持、医院的努力、中医各界人士的奋斗，中医药事业的发展取得了一定的进展，但在如何进一步扩大服务范围，提高经济效益方面遇到瓶颈。突出的问题是在发展模式和路径思维上存在路径依赖，导致中医药发展路径思维上囿于医院发展，重事业轻产业，重治疗轻康养。要突破这一瓶颈，在大力发展中医医疗服务的同时，要强力推进中医药健康服务业发展。</br> "+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +"中医药健康服务业发展的思路医疗与健康其实是存在交集但又不完全重合的两个领域。从实现目标、实现目标采用的手段和运营管理模式、从业人员的要求与专业培养等方面都存在差异。就产业管理来讲，医疗与康养需要明确区分，分别管理。"
      },
      matchArticle: {}
    }
  },
  computed: {
    articleId () {
      return this.$route.params.id
    }
  },
  methods: {
    cooperation() {
      console.log("协作");
    },
    pickerOptions() {
      
    },
    // 模糊查询 高亮匹配
    getMachlist() {
      this.matchArticle = {};
      this.article = this.articleOri;// 获取一次数据
      var copy = this.article;
      // 去除恶意输入代码片段的可能
      let value = this.keyWord.replace(/<.*?>/gi, "");
      if(this.keyWord === '') {
        this.article = this.articleOri;
        return ;
      }
      // 模糊查询 只保留符合条件的数据
      var result = {};
      if(
          //  英文大小写数据进行判断 toUpperCase 大写  toLowerCase 小写
          copy.title.indexOf(value.toUpperCase()) > -1 ||
          copy.title.indexOf(value.toLowerCase()) > -1,
          copy.summary.indexOf(value.toUpperCase()) > -1 ||
          copy.summary.indexOf(value.toLowerCase()) > -1,
          copy.text.indexOf(value.toUpperCase()) > -1 ||
          copy.text.indexOf(value.toLowerCase()) > -1
        ) {
          result = copy;
        }
      // 修改高亮文案
      let data = [];
      // 声明正则校验  (正则表达式,"匹配模式")  /gi(全文查找、忽略大小写)
      const reg = new RegExp(value, "gi");
      // 循环遍历  this.article 使用数据进行渲染  result 使用只符合条件的数据
      if(!(copy.summary.match(reg) || copy.title.match(reg) ||  copy.text.match(reg)))
      {
        return;
      }
      let obj = {
        id: copy.id,
        school: copy.school,
        author: copy.author,
        title: copy.title.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        // author: copy.author.filter((val) => val.replace(
        //   reg,
        //   //筛选出来的文字加样式
        //   (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        // )),
        summary: copy.summary.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        text: copy.text.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
      };
      data = obj;
      // 赋值
      this.matchArticle = data;
      this.article = this.matchArticle;
    },
    async getArticleDetails() {
      this.$message({
        type: 'success',
        message: '获取文章详情成功'
      }) 
      // await getArticleDetail(this.articleId)
      // .then(res => {
      //   console.log(res)
      //   this.article = res
      //   this.$message({
      //     type: 'success',
      //     message: '获取文章详情成功'
      //   }) 
      // })
      // .catch(err => {
      //   console.log(err)
      //   this.$message({
      //     type: 'error',
      //     message: '获取文章详情失败' + err
      //   })
      // })
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.getMachlist();
      }
    },
    checked(value) {
      if(value === true) {
        this.getMachlist();
      }
    }
  },
  created () {
    this.getArticleDetails()
    this.getMachlist()
  },
}
</script>
<style scoped lang='less'>
.bar {
  display: flex;
  .px2vh(height, 98);
  .px2vh(line-height, 99);
  width: 100%;
  flex-direction: row;
  &_search {
    background-color: #fff;
    ::v-deep .el-input {
      .px2vh(height, 99);
      .px2vh(line-height, 97);
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
  &_button {
    background-color: #fff;
    .px2vh(line-height, 99);
    .px2vh(height, 99);
    &_left {
      .px2vh(height, 55);
      .px2vw(margin-left, 15);
      .px2vw(width, 129);
      .px2vw(border-radius, 7);
      text-align: center;
      background: #013480;
      border: 0.1vw solid #013480;
      color: #FFF;
      .px2font(22);
    }
    &_right {
      float: right;
      .px2vh(line-height, 99);
      .px2vw(width, 184);
      color: #000;
      .px2font(22);
      .el-icon-arrow-right {
        .px2vw(margin-left, 5);
      }
      &:hover {
        color: #000;
      }
    }
  }
  ::v-deep .el-input__icon {
    .px2vw(width, 25) !important;
  }
}
.online {
  height: 100%;
  width: 100%;
  background-color: #FAFCFF;
  &_header {
    float: left;
    .px2vh(height, 68);
    width: 95%;
    margin: auto;
    &_button {
      float: right;
      .px2vh(margin-top, 10);
      .px2vw(width, 112);
      .px2vh(padding-top, 1);
      .px2vh(padding-bottom, 1);
      .px2vw(padding-right, 6);
      .px2vw(padding-left, 6);
      .px2vh(height, 57);
      .px2vw(border-radius, 24);
      border: none;
      background: #013480;
      color: #FFF;
      .px2font(24);
      cursor: pointer;
    }
  }
  .el-icon-arrow-left {
    .px2font(35);
    line-height: 2;
    .px2vw(margin-left, 10);
    cursor: pointer;
  }
  &_body {
    float: left;
    .px2vh(height, 825);
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none
    }
  }
}
.online_body_header {
  .px2vh(height, 168);
  width: 100%;
  text-align: center;
  &_title {
    padding: 10px auto;
    .px2vh(padding-top, 12);
    color: #000;
    .px2font(38);
    font-weight: 700;
  }
  &_box {
    margin: 0 auto;
    .px2vh(padding-top, 12.5);
    &_author {
      .px2vw(margin-right, 60);
      color: #9B9595;
      .px2font(20);
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &_school {
    .px2vw(margin-right, 25);
    color: #676363;
    .px2font(20);
    &:last-child {
      margin-right: 0;
    }
  }
  &_line {
    margin: 0 auto;
    margin-top: 10px;
    .px2vw(width, 1056);
    height: 1px;
    background: #9B9595;
  }
}
.online_body_content {
  margin: 0 auto;
  height: calc(100% - 140px);
  width: 88%;
  font-size: 24px;
  letter-spacing: 1.08px;
  &_summary, &_text {
    color: #585858;
  }
  &_text {
    text-indent: 48px;
    &:last-child {
      padding-bottom: 50px;
    }
  }
}
</style>