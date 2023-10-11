<template>
  <div>
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
    <div class="content">
      <div class="content_asideBar">
        <div class="content_asideBar_box">
          <classifyBar></classifyBar>
        </div>
      </div>
      <div class="content_list">
        <div class="content_list_box">
          <div class="content_list_box_bar">
            <div class="content_list_box_bar_box">
              <el-checkbox v-model="checked">查看高亮</el-checkbox>
              <button class="content_list_box_bar_box_leftbutton" @click="textorimgList($event)" >文本</button>
              <button class="content_list_box_bar_box_rightbutton" @click="textorimgList($event)" >图片</button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane label="推荐文献" name="first">
                <articleCard v-for="(item, index) in articleList" :key="'a'+index" :item="item" v-show="!isImg"></articleCard>
                <div class="colrow">
                  <imgCard v-for="(item, index) in imgList" :key="index" :item="item" v-show="isImg"></imgCard>
                </div>
              </el-tab-pane>
              <el-tab-pane label="关注" name="second">
                <articleCard v-for="(item, index) in concernList" :key="'b'+index" :item="item" ></articleCard>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="content_right_bigbox">
          <div class="content_right_bigbox_top">
            <h2 class="content_right_bigbox_top_title">推荐团队</h2>
            <!-- card -->
            <teamCard v-for="(item, index) in teamList" :key="index" :item="item" ></teamCard>
            <img src="@/assets/images/change.png" alt="" @click="changeTeamList()">
            <div class="content_right_bigbox_top_change" @click="changeTeamList()">
              换一换
            </div>
          </div>
          <div class="content_right_bigbox_bottom">
            <h2 class="content_right_bigbox_bottom_title">推荐用户</h2>
            <poeCard v-for="item in peoList" :key="item.id" :item="item"></poeCard>
            <img src="@/assets/images/change.png" alt="" @click="changeTeamList()">
            <div class="content_right_bigbox_bottom_change" @click="changeTeamList()">
              换一换
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classifyBar from '@/views/retrievalengine/bibliography/classifyBar.vue'
import articleCard from '@/components/articleCard.vue'
import imgCard from '@/components/imgCard.vue'
import teamCard from '@/components/teamCard.vue'
import poeCard from '@/components/poeCard.vue'
import a1 from '@/assets/images/avatar1.png'
import a2 from '@/assets/images/avatar2.png'
import a3 from '@/assets/images/avatar3.png'
import a4 from '@/assets/images/avatar4.png'
import a5 from '@/assets/images/avatar5.png'
import a6 from '@/assets/images/avatar6.png'
import a7 from '@/assets/images/avatar7.png'
import a8 from '@/assets/images/avatar8.png'
import { getArticle } from '@/api/article.js'
import { getImg } from '@/api/img.js'
export default {
  name: 'Bibliography',
  components: {
    classifyBar,
    articleCard,
    teamCard,
    poeCard,
    imgCard
  },
  data () {
    return {
      timeLineHeight: "",
      checked: true,
      activeName: 'first',
      keyWord: "", //搜索框输入的值
      dateValue: "",
      isImg: false,
      articleList: [
      ],
      copyList: [
        {
          id: "1",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "基于UNet的医学图像分割综述",
          author: "作者： " + "叶晓滨",
          details: "源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        },
        {
          id: "2",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄在肾脏病中的应用研究进展",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "3",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄研究简史",
          author: "作者： " + "焦科兴; 董美佳; 李艺清; 侯胜田",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "4",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄类药对组成规律的基础研究—麻黄石膏药对血药动力学",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        }
      ],
      articleList1: [
      {
          id: "1",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "基于UNet的医学图像分割综述",
          author: "作者： " + "叶晓滨",
          details: "源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        },
        {
          id: "2",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄在肾脏病中的应用研究进展",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "3",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄研究简史",
          author: "作者： " + "焦科兴; 董美佳; 李艺清; 侯胜田",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "4",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄类药对组成规律的基础研究—麻黄石膏药对血药动力学",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        }
      ],
      teamList: [
        {
          avatar: [a1, a2, a3, a4],
          name: "中医药文献交流群",
          desc: "湖南医疗文献交流群，欢迎有兴趣的朋友加入",
          info: "1210",
          member: "529"
        },
        {
          avatar: [a5, a6, a7, a8],
          name: "X大医药交流群",
          desc: "湖南医是大大大大疗文献交流群，欢迎有兴趣的朋友加入",
          info: "1210",
          member: "529"
        },
        {
          avatar: [a1, a6, a4, a8],
          name: "老年人医药活动中心",
          desc: "湖南医疗文献交流群，欢迎有兴趣的朋友加入",
          info: "1210",
          member: "529"
        }
      ],
      concernList: [
      {
          id: "1",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "基于UNet的医学图像分割综述",
          author: "作者： " + "叶晓滨",
          details: "源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        },
        {
          id: "2",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄在肾脏病中的应用研究进展",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "3",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄研究简史",
          author: "作者： " + "焦科兴; 董美佳; 李艺清; 侯胜田",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "4",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + "麻黄类药对组成规律的基础研究—麻黄石膏药对血药动力学",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        }
      ],
      peoList: [
        {
          id: 1,
          avatar: a1,
          name: "王乐鹏",
          school: "北京中医药大学",
          major: "中医学;外国语言文字;高等教育"
        },
        {
          id: 2,
          avatar: a2,
          name: "何雪",
          school: "宁夏医药大学",
          major: "中医学"
        },
        {
          id: 3,
          avatar: a3,
          name: "黄所以",
          school: "福建医科大学",
          major: "医学"
        },
      ],
      matchlist: [], // 匹配列表
      imgList: [
        {
          id: 1,
          title: "木麻黄人工林树高结构分布图",
          img: require('@/assets/images/img1.png')
        },
        {
          id: 2,
          title: "不同海岸线距离木麻黄净光合速率的日变化",
          img: require('@/assets/images/img2.png')
        },
        {
          id: 3,
          title: "不同海岸线距离木麻黄净光合速率的光响应曲线",
          img: require('@/assets/images/img3.png')
        },
        {
          id: 4,
          title: "底物浓度对d-伪麻黄碱产量的影响",
          img: require('@/assets/images/img4.png')
        },
        {
          id: 5,
          title: "12名志愿者单次口服受试制剂后伪麻黄碱平均血药浓度-时间曲线",
          img: require('@/assets/images/img5.png')
        },
        {
          id: 6,
          title: "温度对转化d-伪麻黄碱产量的影响",
          img: require('@/assets/images/img6.png')
        },
        {
          id: 7,
          title: "木麻黄小枝蒸腾速率日变化",
          img: require('@/assets/images/img7.png')
        },
        {
          id: 8,
          title: "短枝木麻黄DRIS营养诊断图",
          img: require('@/assets/images/img8.png')
        }
      ]
    }
  },
  computed: {},
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.getMachlist()
      }
    },
    checked(value) {
      if(value === true) {
        this.getMachlist()
      }
    }
  },
  methods: {
    async getArticleList() {
      await getArticle()
      .then(res => {
        console.log(res)
        this.articleList = this.copyList
        this.$message({
          message: "获取文章列表成功",
          type: "success"
        })
      })
      .catch(err => {
        console.log(err)
        this.$message({
          message: "获取文章列表失败" + err,
          type: "error"
        })
      })
      // this.articleList = res.data
    },
    async getImgList() {
      await getImg()
      .then(res => {
        console.log(res)
        this.$message({
          message: "获取图片列表成功",
          type: "success"
        })
      })
      .catch(err => {
        console.log(err)
        this.$message({
          message: "获取图片列表失败" + err,
          type: "error"
        })
      })
      // this.articleList = res.data
    },
    textorimgList(e) {
      var left = document.getElementsByClassName('content_list_box_bar_box_leftbutton')
      var right = document.getElementsByClassName('content_list_box_bar_box_rightbutton')
      left[0].style.backgroundColor = '#EBF5FF'
      right[0].style.backgroundColor = '#EBF5FF'
      left[0].style.color = '#013480'
      right[0].style.color = '#013480'
      e.target.style.color = '#FFF'
      e.target.style.backgroundColor = '#013480'
      if(e.target.innerText == "文本") {
        this.isImg = false
        this.articleList = this.articleList1
      } else if(e.target.innerText == "图片") {
        this.isImg = true
        this.getImgList()
      }
    },
    handleTabClick() {

    },
    changeTeamList() {

    },
    pickerOptions() {
      
    },
    // 模糊查询 高亮匹配
    getMachlist() {
      this.matchlist = [];
      this.articleList = this.articleList1;// 获取一次数据
      // 去除恶意输入代码片段的可能
      let value = this.keyWord.replace(/<.*?>/gi, "")
      if(this.keyWord === '') {
        this.articleList = this.articleList1
        return 
      }
      // 模糊查询 只保留符合条件的数据
      let resultList = []
      this.articleList.forEach((item) => {
        if (
          //  英文大小写数据进行判断 toUpperCase 大写  toLowerCase 小写
          item.title.indexOf(value.toUpperCase()) > -1 ||
          item.title.indexOf(value.toLowerCase()) > -1,
          item.author.indexOf(value.toUpperCase()) > -1 ||
          item.author.indexOf(value.toLowerCase()) > -1,
          item.details.indexOf(value.toUpperCase()) > -1 ||
          item.details.indexOf(value.toLowerCase()) > -1,
          item.name.indexOf(value.toUpperCase()) > -1 ||
          item.name.indexOf(value.toLowerCase()) > -1
        ) {
          resultList.push(item)
        }
      });
      
      // 修改高亮文案
      let dataList = [];
      // 声明正则校验  (正则表达式,"匹配模式")  /gi(全文查找、忽略大小写)
      const reg = new RegExp(value, "gi");
      // 循环遍历  this.articleList 使用数据进行渲染  resultList 使用只符合条件的数据
      if(this.checked === true) {
        this.articleList.forEach((item) => {
          if(!(item.details.match(reg) || item.title.match(reg) || item.author.match(reg) || item.name.match(reg)))
          {
            return
          }
          let obj = {
            id: item.id,
            date: item.date,
            title: item.title.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            ),
            author: item.author.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            ),
            details: item.details.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            ),
            name: item.name.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            ),
          };
          if(this.keyWord === '') {
            obj.details = item.details
          }
          dataList.push(obj)
        });
      } else {
        this.articleList.forEach((item) => {
          if(!(item.details.match(reg) || item.title.match(reg) || item.author.match(reg) || item.name.match(reg)))
          {
            return
          }
          dataList.push(item)
        });
      }
      // 赋值
      this.matchlist = dataList
      this.articleList = this.matchlist
    },
  },
  created () {
    this.getMachlist()
    this.getArticleList()
  },
  mounted() {
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
      cursor: pointer;
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
.content {
  display: flex;
  height: 791px;
  width: 100%;
  flex-direction: row;
  background: #EBF5FF;
  &_asideBar {
    height: 100%;
    width: 310px;
    background: #EBF5FF;
    &_box {
      width: 280px;
      height: 758px;
      margin: 18px auto;
      border-radius: 9px;
      background-color: #FFF;
    }
  }
  &_list {
    height: 100%;
    width: 56%;
    &_box {
      width: 97%;
      height: 758px;
      margin: 18px auto;
      margin-left: 10px;
      border-radius: 9px;
      background-color: #FFF;
      &_bar {
        height: 86px;
        ::v-deep .el-tabs__nav-wrap {
          height: 86px;
        }
        ::v-deep .el-tabs__item {
          padding: 0;
          text-align: center;
          line-height: 86px;
          height: 86px;
          width: 150px !important;
          font-size: 26px;
          &:first-child {
            margin-left: 10px;
          }
        }
        ::v-deep .el-tabs__active-bar {
          color: #1559DD;
          width: 80px !important;
          text-align: center;
          left: 36px;
          height: 5px;
          border-radius: 4.5px;
        }
        ::v-deep .el-tabs__nav-wrap::after {
          background: #F0F0F0;
        }
        ::v-deep .el-tabs__header {
          width: 70%;
        }
      }
    }
  }
  &_right {
    height: 100%;
    width: 25%;
    &_bigbox {
      width: 97%;
      height: 758px;
      margin: 18px auto;
      margin-left: 0;
      &_top {
        width: 100%;
        height: 430px;
        border-radius: 10px;
        background: #FFF;
        &_title {
          float: left;
          margin-left: 45px;
          margin-top: 20px;
          width: 150px;
          color: #000;
          font-size: 26px;
        }
        img {
          float: left;
          margin-left: 150px;
          margin-top: 14px;
          cursor: pointer;
        }
        &_change {
          float: left;
          margin-top: 14px;
          margin-left: 25px;
          color: #9B9595;
          font-size: 16px;
          letter-spacing: 1.12px;
          cursor: pointer;
        }
      }
      &_bottom {
        width: 100%;
        height: 320px;
        margin-top: 8px;
        border-radius: 10px;
        background: #FFF;
        &_title {
          float: left;
          margin-left: 45px;
          margin-top: 20px;
          width: 150px;
          color: #000;
          font-size: 26px;
        }
        img {
          float: left;
          margin-left: 150px;
          margin-top: 14px;
          cursor: pointer;
        }
        &_change {
          float: left;
          margin-top: 14px;
          margin-left: 25px;
          color: #9B9595;
          font-size: 16px;
          letter-spacing: 1.12px;
          cursor: pointer;
        }
      }
    }
  }
}
::v-deep .el-tabs__content {
  overflow-y: scroll;
  height: 640px;
  &::-webkit-scrollbar {
		display: none
	}
}
.content_list_box_bar_box {
  float: right;
  height: 86px;
  line-height: 86px;
  width: 30%;
  background-color: #fff;
  border-bottom: 2px solid #F0F0F0;
  ::v-deep .el-checkbox {
    float: left;
    line-height: 86px;;
    &__input {
      line-height: 19px;
    }
    &__inner {
      width: 21px;
      height: 21px;
      text-align: center;
      font-size: 16px;
      border-radius: 3px;
      border: 1px solid #000;
      background-color: #FFF;
      &::after {
        height: 15px;
        left: 7px;
        top: 0px;
        border-color: #000;
        border-width: 3px;
      }
    }
    &__label {
      display: inline;
      line-height: 17px;
      color: #000;
      text-align: center;
      font-size: 17px;
    }
  }
  &_leftbutton {
    margin-left: 25px;
    width: 54px;
    height: 33px;
    line-height: 33px;
    border-radius: 12px 0px 0px 12px;
    background: #013480;
    border: none;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
    z-index: 1000;
  }
  &_rightbutton {
    width: 51px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    border-radius: 0px 12px 12px 0px;
    background: #EBF5FF;
    border: none;
    color: #013480;
    font-size: 14px;
    cursor: pointer;
    z-index: 1000;
  }
}
.colrow {
  column-count: 3; /* 调整列数 */
  column-gap: 20px; /* 调整列间距 */
  column-fill: balance; /* 平衡填充 */
  // display: flex;
  // align-items: baseline;
  // flex-wrap: wrap;
  // justify-content: space-between;
}
</style>
