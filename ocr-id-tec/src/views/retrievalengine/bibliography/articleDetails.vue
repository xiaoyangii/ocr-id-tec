<template>
  <div class="details">
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
    <div class="details_header">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <div class="details_header_iconbox">
        <div class="details_header_iconbox_tag" title="标记"></div>
        <div class="details_header_iconbox_collect" title="收藏"></div>
        <div class="details_header_iconbox_share" title="分享"></div>
        <div class="details_header_iconbox_cite" title="引用"></div>
      </div>
    </div>
    <div class="details_body">
      <div class="details_body_wrap">
        <div class="article_header">
          <button class="article_header_score" @click="watchScore(articleId)">查看命中得分</button>
          <div class="article_header_title" v-html="article.title"></div>
          <div class="article_header_box">
            <span class="article_header_box_author" v-for="author in article.author" :key="author">{{ author }}</span>
          </div>
          <div class="article_header_box">
            <span class="article_header_school" v-for="school in article.school" :key="school">{{ school }}</span>
          </div>
        </div>
        <div class="article_body">
          <div class="article_body_summary" v-html="article.summary"></div>
          <div class="article_body_key" v-html="article.key"></div>
          <div class="article_body_album" v-html="article.album" ></div>
          <div class="article_body_special" v-html="article.special" ></div>
          <div class="article_body_number"><span style='font-weight:700;'>分类号：</span>{{ article.number }}</div>
        </div>
        <div class="article_footer">
          <div class="article_footer_buttonbox">
            <button class="article_footer_buttonbox_online" @click="$router.push(`/home/retrievalengine/bibliography/${ articleId }/online`)">在线阅读</button>
            <button class="article_footer_buttonbox_download">PDF下载</button>
            <button class="article_footer_buttonbox_pigeonhole">文献归档</button>
          </div>
          <div class="article_footer_data">
            <div class="article_footer_data_download">下载量：{{ article.downloads }}</div>
            <div class="article_footer_data_size">大小：{{ article.size }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleDetails',
  components: {
  },
  data () {
    return {
      keyWord: "", //搜索框输入的值
      dateValue: "",
      article:{
        id: 1,
        title: "中医药创新发展的逻辑与策略探讨",
        author: ["焦科兴", "董美佳", "李艺清", "侯胜田"],
        school: ["北京中医药大学管理学院", "北京中医药大学国家中医药发展与战略研究院"],
        summary: "<span style='font-weight:700;'>摘要：</span>" + "中医药事业发展正迎来前所未有的机遇，但也面临复杂严峻的挑战。突破中医药传承创新发展瓶颈逐渐成为中医药创新发展的关键一步。深入梳理分析中医药创新发展的内在逻辑，并提出中医药创新发展需要解放思想，摈弃路径依赖，切实落实中医药发展战略定位；促进中医医疗服务事业与中医药健康服务业共同发展；走出医院和药店，积极融入大健康产业；把握中医药健康旅游行业发展，推进中医药健康旅游目的地建设等创新发展策略。通过一系列战略行动实现中医药传承创新发展战略目标。",
        key: "<span style='font-weight:700;'>关键词：</span>" + "中医药；创新发展；策略探讨",
        album: "<span style='font-weight:700;'>专辑：</span>" + "医药卫生科技",
        special: "<span style='font-weight:700;'>专题：</span>" + "中医学",
        number: "R2-03",
        downloads: 121,
        size: "390k",
        date: "2021"
      },
      articleOri:{
        id: 1,
        title: "中医药创新发展的逻辑与策略探讨",
        author: ["焦科兴", "董美佳", "李艺清", "侯胜田"],
        school: ["北京中医药大学管理学院", "北京中医药大学国家中医药发展与战略研究院"],
        summary: "<span style='font-weight:700;'>摘要：</span>" + "中医药事业发展正迎来前所未有的机遇，但也面临复杂严峻的挑战。突破中医药传承创新发展瓶颈逐渐成为中医药创新发展的关键一步。深入梳理分析中医药创新发展的内在逻辑，并提出中医药创新发展需要解放思想，摈弃路径依赖，切实落实中医药发展战略定位；促进中医医疗服务事业与中医药健康服务业共同发展；走出医院和药店，积极融入大健康产业；把握中医药健康旅游行业发展，推进中医药健康旅游目的地建设等创新发展策略。通过一系列战略行动实现中医药传承创新发展战略目标。",
        key: "<span style='font-weight:700;'>关键词：</span>" + "中医药；创新发展；策略探讨",
        album: "<span style='font-weight:700;'>专辑：</span>" + "医药卫生科技",
        special: "<span style='font-weight:700;'>专题：</span>" + "中医学",
        number: "R2-03",
        downloads: 121,
        size: "390k",
        date: "2021"
      },
      matchArticle: {

      },
    }
  },
  computed: {
    articleId () {
      return this.$route.params.id;
    }
  },
  methods: {
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
          copy.key.indexOf(value.toUpperCase()) > -1 ||
          copy.key.indexOf(value.toLowerCase()) > -1,
          copy.album.indexOf(value.toUpperCase()) > -1 ||
          copy.album.indexOf(value.toLowerCase()) > -1,
          copy.special.indexOf(value.toUpperCase()) > -1 ||
          copy.special.indexOf(value.toLowerCase()) > -1
        ) {
          result = copy;
        }
      // 修改高亮文案
      let data = [];
      // 声明正则校验  (正则表达式,"匹配模式")  /gi(全文查找、忽略大小写)
      const reg = new RegExp(value, "gi");
      // 循环遍历  this.article 使用数据进行渲染  result 使用只符合条件的数据
      if(!(copy.special.match(reg) ||  copy.album.match(reg) || copy.summary.match(reg) || copy.title.match(reg) ||  copy.key.match(reg)))
      {
        return;
      }
      let obj = {
        id: copy.id,
        date: copy.date,
        number: copy.number,
        downloads: copy.downloads,
        size: copy.size,
        author: copy.author,
        school: copy.school,
        title: copy.title.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        album: copy.album.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        summary: copy.summary.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        special: copy.special.replace(
          reg,
          //筛选出来的文字加样式
          (val) => `<span style='background-color:#F4F92B'>${val}</span>`
        ),
        key: copy.key.replace(
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
    watchScore(id) {
      this.$router.push(`/home/retrievalengine/bibliography/${ id }/score`);
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
    this.getMachlist()
  },
}
</script>
<style scoped lang='less'>
.bar {
  display: flex;
  height: 86px;
  width: 100%;
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
      margin: 0 25px;
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
  &_button {
    background-color: #fff;
    height: 86px;
    line-height: 91px;
    &_left {
      margin-left: 15px;
      width: 129px;
      height: 55px;
      text-align: center;
      border-radius: 7px;
      background: #013480;
      border: 1px solid #013480;
      color: #FFF;
      font-size: 22px;
    }
    &_right {
      float: right;
      width: 184px;
      color: #000;
      font-size: 22px;
      .el-icon-arrow-right {
        margin-left: 5px;
      }
      &:hover {
        color: #000;
      }
    }
  }
}
.details {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #F5FAFF;
  &_header {
    float: left;
    height: 60px;
    width: 95%;
    margin: auto;
    .el-icon-arrow-left {
      font-size: 35px;
      line-height: 2;
      margin-left: 10px;
    }

    &_iconbox {
      float: right;
      margin-right: 30px;
      height: 100%;
      width: 18%;
      &_cite {
        float: right;
        margin-top: 10px;
        height: 30px;
        width: 30px;
        scale: 1.1;
        background: url('@/assets/images/引用.png') no-repeat;
      }
      &_share {
        float: right;
        margin-top: 10px;
        margin-left: 22px;
        height: 30px;
        width: 30px;
        scale: 1.1;
        background: url('@/assets/images/分享.png') no-repeat;
      }
      &_collect {
        float: right;
        margin-top: 10px;
        margin-left: 22px;
        height: 30px;
        width: 30px;
        scale: 1.1;
        background: url('@/assets/images/收藏.png') no-repeat;
      }
      &_tag {
        float: right;
        margin-left: 25px;
        margin-top: 13px;
        height: 30px;
        width: 30px;
        scale: 1.1;
        background: url('@/assets/images/tag.png') no-repeat;
      }
    }
  }
  &_body {
    float: left;
    width: 100%;
    height: calc(100% - 146px);
    &_wrap {
      height: 100%;
      width: 88%;
      margin: 0 auto;
    }
  }
}
.article_header {
  position: relative;
  top: 0;
  height: 131px;
  width: 100%;
  text-align: center;
  &_score {
    position: absolute;
    top: 0;
    right: 0;
    width: 146px;
    height: 45px;
    border-radius: 10px;
    border: none;
    background: #013480;
    margin-top: 3px;
    color: #FFF;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
  &_title {
    padding: 10px auto;
    color: #000;
    font-size: 38px;
    font-weight: 700;
  }
  &_box {
    margin: 0 auto;
    padding-top: 16px;
    &_author {
      margin-right: 60px;
      color: #9B9595;
      font-size: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &_school {
    margin-right: 25px;
    color: #676363;
    font-size: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.article_body {
  width: 100%;
  height: 475px;
  font-size: 28px;
  letter-spacing: 1.26px;
  &_key, &_album, &_special, &_number {
    margin-top: 15px;
  }
  &_summary {
    padding-top: 35px;
    padding-bottom: 10px;
    overflow: hidden;
  }
}
.article_footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  height: 125px;
  &_buttonbox {
    &_online, &_download, &_pigeonhole {
      width: 132px;
      height: 44px;
      border-radius: 7px;
      border: none;
      margin-right: 13px;
      font-size: 18px;
    }
    &_online {
      background: #013480;
      color: #FFF;
    }
    &_download {
      background: #BDDFFF;
      color: #000;
    }
    &_pigeonhole {
      background: #DCE3ED;
      color: #000;
      margin-right: 0;
    }
  }
  &_data {
    color: #BDBDBD;
    font-size: 16px;
    padding-top: 23px;
    &_download, &_size {
      float: left;
    }
    &_download {
      margin-right: 37px;
    }
  }
}
</style>
