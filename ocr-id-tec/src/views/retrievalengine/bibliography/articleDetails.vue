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
        <div class="details_header_iconbox_collect" title="收藏" @click="collect($event)"></div>
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
            <span class="article_header_box_school" v-for="school in article.school" :key="school">{{ school }}</span>
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
            <button class="article_footer_buttonbox_download" @click="pdfDownload()">PDF下载</button>
            <button class="article_footer_buttonbox_pigeonhole" @click="$router.push('/home/smartcloud')">文献归档</button>
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
import { getArticleDetail, downloadArticle } from '@/api/article.js'
import { addColle } from '@/api/myCollection.js'
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
        school: ["1.北京中医药大学管理学院", "2.北京中医药大学国家中医药发展与战略研究院"],
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
        school: ["1.北京中医药大学管理学院", "2.北京中医药大学国家中医药发展与战略研究院"],
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
      return this.$route.params.id
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
    },
    async getArticleDetails() {
      this.$message({
        type: 'success',
        message: '获取文章详情成功'
      }) 
      // await getArticleDetail(this.articleId)
      // .then(res => {
      //   console.log(res)
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
    },
    async pdfDownload() {
      this.$message({
        type: 'success',
        message: '获取文件中'
      })
      await downloadArticle(this.articleId)
      .then(res => {
        const link=document.createElement('a')
        let blob =  res
        let _fileName = res.headers['content-disposition'].split(';')[1].split('=')[1]
	      link.style.display='none';
        const url = window.URL || window.webkitURL || window.moxURL
        let binaryData = []
        binaryData.push(blob)
        link.href = window.URL.createObjectURL(new Blob(binaryData))
        link.download = _fileName   //下载的文件名称
        link.click()
        window.URL.revokeObjectURL(url)
        this.$message({
          type: 'success',
          message: '下载中'
        })
      })
      .catch(err => {
        console.log(err);
        this.$message({
          type: 'error',
          message: '下载失败' + err
        })
      })
    },
    async collect(e) {
      await addColle(this.articleId)
      .then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '收藏成功'
        }) 
      })
      .catch(err => {
        this.$message({
          type: 'error',
          message: '收藏失败' + err
        })
      })
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
        this.getMachlist()
      }
    }
  },
  created () {
    this.getMachlist()
    this.getArticleDetails()
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
      .px2vh(line-height, 57);
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
.details {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #F5FAFF;
  &_header {
    float: left;
    .px2vh(height, 68);
    .px2vh(line-height, 68);
    width: 95%;
    margin: auto;
    .el-icon-arrow-left {
      .px2font(35);
      line-height: 2;
      .px2vw(margin-left, 10);
      cursor: pointer;
    }
    &_iconbox {
      float: right;
      .px2vw(margin-right, 30);
      height: 100%;
      width: 18%;
      &_cite {
        float: right;
        .px2vh(margin-top, 13.5);
        .px2vh(height, 34);
        .px2vw(width, 30);
        scale: 1.1;
        background: url('@/assets/images/引用.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
      &_share {
        float: right;
        .px2vh(margin-top, 13.5);
        .px2vw(margin-left, 22);
        .px2vh(height, 34);
        .px2vw(width, 30);
        scale: 1.1;
        background: url('@/assets/images/分享.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
      &_collect {
        float: right;
        .px2vh(margin-top, 13);
        .px2vw(margin-left, 22);
        .px2vh(height, 34);
        .px2vw(width, 30);
        scale: 1.1;
        background: url('@/assets/images/收藏.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
      &_tag {
        float: right;
        .px2vw(margin-left, 29);
        .px2vh(margin-top, 15.5);
        .px2vh(height, 34);
        .px2vw(width, 30);
        scale: 1.1;
        background: url('@/assets/images/tag.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
  &_body {
    float: left;
    width: 100%;
    .px2vh(height, 823);
    &_wrap {
      .px2vh(height, 818);
      width: 88%;
      margin: 0 auto;
    }
  }
}
.article_header {
  position: relative;
  top: 0;
  .px2vh(height, 160);
  width: 100%;
  text-align: center;
  &_score {
    position: absolute;
    top: 0;
    right: 0;
    .px2vw(width, 146);
    .px2vh(height, 53);
    .px2vh(line-height, 53);
    .px2vw(border-radius, 10);
    border: none;
    background: #013480;
    .px2vh(margin-top, 10.5);
    .px2vh(padding-top, 1);
    .px2vh(padding-bottom, 1);
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    color: #FFF;
    .px2font(20);
    font-weight: 700;
    cursor: pointer;
  }
  &_title {
    width: 100%;
    .px2vh(height, 78);
    padding: 10px auto;
    .px2vh(padding-top, 11.3);
    .px2vh(padding-bottom, 11.3);
    color: #000;
    .px2font(38);
    font-weight: 700;
  }
  &_box {
    margin: 0 auto;
    .px2vh(height, 35);
    .px2vh(line-height, 35);
    width: 100%;
    .px2vh(margin-top, 8);
    text-align: center;
    &_author {
      display: inline-block;
      .px2vw(margin-right, 60);
      color: #9B9595;
      .px2font(20);
      &:last-child {
        margin-right: 0;
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
  }
}
.article_body {
  width: 100%;
  .px2vh(height, 530);
  .px2font(28);
  letter-spacing: 0.12vw;
  &_key, &_album, &_special, &_number {
    .px2vh(margin-top, 17);
  }
  &_summary {
    .px2vh(padding-top, 25);
    overflow: hidden;
  }
}
.article_footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  .px2vh(height, 125);
  &_buttonbox {
    .px2vh(height, 60);
    .px2vw(width, 500);
    &_online, &_download, &_pigeonhole {
      float: left;
      .px2vw(width, 133);
      .px2vh(height, 53);
      .px2vw(border-radius, 8);
      .px2vh(padding-top, 1);
      .px2vh(padding-bottom, 1);
      .px2vw(padding-right, 6);
      .px2vw(padding-left, 6);
      border: none;
      .px2vw(margin-right, 15);
      .px2font(18);
    }
    &_online {
      background: #013480;
      color: #FFF;
      cursor: pointer;
    }
    &_download {
      background: #BDDFFF;
      color: #000;
      cursor: pointer;
    }
    &_pigeonhole {
      background: #DCE3ED;
      color: #000;
      margin-right: 0;
      cursor: pointer;
    }
  }
  &_data {
    .px2vw(width, 300);
    .px2vh(height, 53);
    color: #BDBDBD;
    .px2font(16);
    .px2vh(padding-top, 15);
    &_download, &_size {
      float: left;
    }
    &_download {
      .px2vw(margin-right, 55);
    }
  }
}
</style>
