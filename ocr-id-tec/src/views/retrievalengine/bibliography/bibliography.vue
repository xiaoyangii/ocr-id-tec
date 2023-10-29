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
        <button class="bar_button_left" @click="isImg ? getImgMatch() : getMachlist()">查询</button>
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
              <button class="content_list_box_bar_box_rightbutton" @click="textorimgList($event)" ref="img">图片</button>
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
import { getArticle, searchImg } from '@/api/article.js'
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
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "基于UNet的医学图像分割综述",
          author: "作者： " + "叶晓滨",
          details: "源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        },
        {
          id: "2",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄在肾脏病中的应用研究进展",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "3",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄研究简史",
          author: "作者： " + "焦科兴; 董美佳; 李艺清; 侯胜田",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "4",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄类药对组成规律的基础研究—麻黄石膏药对血药动力学",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        }
      ],
      articleList1: [
        {
          id: "1",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "基于UNet的医学图像分割综述",
          author: "作者： " + "叶晓滨",
          details: "源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "中医研究"
        },
        {
          id: "2",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄在肾脏病中的应用研究进展",
          author: "作者： " + "叶晓滨",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "3",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄研究简史",
          author: "作者： " + "焦科兴; 董美佳; 李艺清; 侯胜田",
          details: "麻黄源自麻黄科草麻黄、中麻黄或木贼麻黄的干燥草质茎,常用药对可以总结为同类相须（如麻黄-桂枝）、异类相使（如麻黄-附子）、升降相宜（如麻黄-苦杏仁）、寒热相制（如麻黄-生石膏）和散补兼施（如麻黄-甘草）5个方面。药对配伍后,化学成分发生了改变,如麻黄-桂枝配伍后,有效成分含量下降,并且产生...",
          date: "2021",
          name: "刊名： " + "实用临床医药杂志"
        },
        {
          id: "4",
          title: "【期刊】<i class='el-icon-document' style='color:#1559DD;'></i>" + "麻黄类药对组成规律的基础研究—麻黄石膏药对血药动力学",
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
          pictureName: "木麻黄人工林树高结构分布图",
          picture: require('@/assets/images/img1.png')
        },
        {
          id: 2,
          pictureName: "不同海岸线距离木麻黄净光合速率的日变化",
          picture: require('@/assets/images/img2.png')
        },
        {
          id: 3,
          pictureName: "不同海岸线距离木麻黄净光合速率的光响应曲线",
          picture: require('@/assets/images/img3.png')
        },
        {
          id: 4,
          pictureName: "底物浓度对d-伪麻黄碱产量的影响",
          picture: require('@/assets/images/img4.png')
        },
        {
          id: 5,
          pictureName: "12名志愿者单次口服受试制剂后伪麻黄碱平均血药浓度-时间曲线",
          picture: require('@/assets/images/img5.png')
        },
        {
          id: 6,
          pictureName: "温度对转化d-伪麻黄碱产量的影响",
          picture: require('@/assets/images/img6.png')
        },
        {
          id: 7,
          pictureName: "木麻黄小枝蒸腾速率日变化",
          picture: require('@/assets/images/img7.png')
        },
        {
          id: 8,
          pictureName: "短枝木麻黄DRIS营养诊断图",
          picture: require('@/assets/images/img8.png')
        }
      ],
      imgList1: [
        {
          id: 1,
          pictureName: "木麻黄人工林树高结构分布图",
          picture: require('@/assets/images/img1.png')
        },
        {
          id: 2,
          pictureName: "不同海岸线距离木麻黄净光合速率的日变化",
          picture: require('@/assets/images/img2.png')
        },
        {
          id: 3,
          pictureName: "不同海岸线距离木麻黄净光合速率的光响应曲线",
          picture: require('@/assets/images/img3.png')
        },
        {
          id: 4,
          pictureName: "底物浓度对d-伪麻黄碱产量的影响",
          picture: require('@/assets/images/img4.png')
        },
        {
          id: 5,
          pictureName: "12名志愿者单次口服受试制剂后伪麻黄碱平均血药浓度-时间曲线",
          picture: require('@/assets/images/img5.png')
        },
        {
          id: 6,
          pictureName: "温度对转化d-伪麻黄碱产量的影响",
          picture: require('@/assets/images/img6.png')
        },
        {
          id: 7,
          pictureName: "木麻黄小枝蒸腾速率日变化",
          picture: require('@/assets/images/img7.png')
        },
        {
          id: 8,
          pictureName: "短枝木麻黄DRIS营养诊断图",
          picture: require('@/assets/images/img8.png')
        }
      ],
      imgMatchList: []
    }
  },
  computed: {
    queryKeyword() {
      if(this.$route.query)
        return this.$route.query.keyWord
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "" && this.isImg === false) {
        this.getMachlist()
      } else if(this.keyWord === "" && this.isImg === true) {
        this.getImgMatch()
      }
    },
    checked(value) {
      if(value === true && this.isImg === false) {
        this.getMachlist()
      } else if(value === true && this.isImg === true) {
        this.getImgMatch()
      }
    },
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
        this.keyWord = ""
        this.isImg = false
        this.articleList = this.articleList1
      } else if(e.target.innerText == "图片") {
        this.keyWord = ""
        this.isImg = true
        this.getImgList()
        this.getImgMatch()
      }
    },
    handleTabClick() {

    },
    changeTeamList() {

    },
    pickerOptions() {
      
    },
    // 模糊查询 高亮匹配imgList中的title
    getImgMatch() {
      this.imgMatchList = []
      this.imgList = this.imgList1 // 获取一次数据
      // 去除恶意输入代码片段的可能
      let value = this.keyWord.replace(/<.*?>/gi, "")
      if(this.keyWord === '') {
        this.imgList = this.imgList1
        return 
      }
      
      // 修改高亮文案
      let dataList = []
      // 声明正则校验  (正则表达式,"匹配模式")  /gi(全文查找、忽略大小写)
      const reg = new RegExp(value, "gi")
      // 循环遍历 使用数据进行渲染  resultList 使用只符合条件的数据
      if(this.checked === true) {
        this.imgList.forEach((item) => {
          if(!(item.pictureName.match(reg)))
          {
            return
          }
          let obj = {
            id: item.id,
            picture: item.picture,
            pictureName: item.pictureName.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            )
          }
          dataList.push(obj)
        })
      } else {
        this.imgList.forEach((item) => {
          if(!(item.pictureName.match(reg)))
          {
            return
          }
          dataList.push(item)
        })
      }
      // 赋值
      this.imgMatchList = dataList
      this.imgList = dataList
    },
    // 模糊查询 高亮匹配
    getMachlist() {
      this.matchlist = []
      this.articleList = this.articleList1;// 获取一次数据
      // 去除恶意输入代码片段的可能
      let value = this.keyWord.replace(/<.*?>/gi, "")
      if(this.keyWord === '') {
        this.articleList = this.articleList1
        return 
      }
      
      // 修改高亮文案
      let dataList = []
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
        })
      }
      // 赋值
      this.matchlist = dataList
      this.articleList = this.matchlist
    },
    async getImgKeyword(queryKeyword) {
      this.$refs.img.click()
      await searchImg(queryKeyword)
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
    },
    async searchImg() {
      await searchImg(this.queryKeyword)
      .then(res => {
        res.title = "【期刊】<i class='el-icon-document' style='color:#1559DD;margin: 0px 10px'></i>" + res.title
        this.articleList.push(res)
        this.$route.query.keyWord = ''
        this.$message({
          message: "检索图片成功",
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: "检索图片失败" + err,
          type: "error"
        })
      })
    }
  },
  created () {
    if(this.queryKeyword) {
      this.searchImg()
    } else {
      this.getArticleList()
      this.getMachlist()
    }
  },
  mounted() {
  },
}
</script>
<style scoped lang='less'>
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
}
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 0;
}
::v-deep .el-input__icon {
  .px2vw(width, 25);
  text-align: center;
  transition: all .3s;
}
::v-deep .el-input__prefix {
  .px2vw(left, 5);
}
.content {
  display: flex;
  .px2vh(height, 892);
  width: 100%;
  flex-direction: row;
  background: #EBF5FF;
  &_asideBar {
    height: 100%;
    .px2vw(width, 310);
    background: #EBF5FF;
    &_box {
      .px2vw(width, 280);
      .px2vh(height, 863);
      margin: 16px auto;
      .px2vh(margin-top, 16);
      .px2vh(margin-bottom, 16);
      .px2vw(border-radius, 9);
      background-color: #FFF;
    }
  }
  &_list {
    height: 100%;
    width: 56%;
    &_box {
      width: 97%;
      .px2vh(height, 863);
      margin: 16px auto;
      .px2vh(margin-top, 16);
      .px2vh(margin-bottom, 16);
      .px2vw(margin-left, 10);
      .px2vw(border-radius, 9);
      background-color: #FFF;
      &_bar {
        .px2vh(height, 97);
        ::v-deep .el-tabs__nav-wrap {
          .px2vh(height, 97);
        }
        ::v-deep .el-tabs__item {
          padding: 0;
          text-align: center;
          .px2vw(width, 150)!important;
          .px2vh(line-height, 95);
          .px2vh(height, 95);
          .px2font(26);
          &:first-child {
            .px2vw(margin-left, 10);
          }
        }
        ::v-deep .el-tabs__active-bar {
          color: #1559DD;
          .px2vw(width, 80)!important;
          text-align: center;
          .px2vw(left, 36);
          .px2vw(border-radius, 4.5);
          .px2vh(height, 5);
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
      .px2vh(height, 863);
      margin: 16px auto;
      .px2vh(margin-top, 16);
      .px2vh(margin-bottom, 16);
      margin-left: 0;
      &_top {
        width: 100%;
        .px2vh(height, 485);
        .px2vw(border-radius, 10);
        background: #FFF;
        &_title {
          float: left;
          .px2vw(margin-left, 45);
          .px2vw(width, 150);
          .px2vh(margin-top, 15);
          .px2font(26);
          color: #000;
        }
        img {
          float: left;
          .px2vw(margin-left, 150);
          .px2vw(width, 24);
          .px2vh(height, 27);
          .px2vh(margin-top, 18);
          cursor: pointer;
        }
        &_change {
          float: left;
          .px2vw(margin-left, 20);
          .px2vh(margin-top, 18);
          color: #9B9595;
          .px2font(17);
          letter-spacing: 0.1vw;
          cursor: pointer;
        }
      }
      &_bottom {
        width: 100%;
        .px2vh(height, 370);
        .px2vh(margin-top, 8);
        .px2vw(border-radius, 10);
        background: #FFF;
        &_title {
          float: left;
          .px2vh(margin-top, 15);
          .px2vw(margin-left, 45);
          .px2vw(width, 150);
          color: #000;
          .px2font(26);
        }
        img {
          float: left;
          .px2vw(margin-left, 150);
          .px2vw(width, 24);
          .px2vh(height, 27);
          .px2vh(margin-top, 15);
          cursor: pointer;
        }
        &_change {
          float: left;
          .px2vw(margin-left, 20);
          .px2vh(margin-top, 15);
          color: #9B9595;
          .px2font(17);
          letter-spacing: 0.1vw;
          cursor: pointer;
        }
      }
    }
  }
}
::v-deep .el-tabs__content {
  overflow-y: scroll;
  .px2vh(height, 740) !important;
  &::-webkit-scrollbar {
		display: none
	}
}
.content_list_box_bar_box {
  float: right;
  .px2vh(height, 97);
  .px2vh(line-height, 97);
  width: 30%;
  background-color: #fff;
  border-bottom: 0.15vw solid #F0F0F0;
  .px2vw(border-top-right-radius, 9);
  ::v-deep .el-checkbox {
    float: left;
    .px2vh(height, 97);
    .px2vh(line-height, 97);
    .px2font(14);
    &__input {
      .px2vh(line-height, 19);
    }
    &__inner {
      .px2vw(width, 24);
      .px2vh(height, 24);
      text-align: center;
      .px2font(16);
      // font-size: 16px;
      .px2vw(border-radius, 3);
      border: 0.1vw solid #000;
      background-color: #FFF;
      &::after {
        .px2vh(height, 15);
        .px2vw(left, 7);
        top: 0px;
        border-color: #000;
        .px2vw(border-width, 3);
        .px2vw(width, 4);
      }
    }
    &__label {
      display: inline;
      .px2vh(line-height, 18);
      .px2vw(padding-left, 10);
      color: #000;
      text-align: center;
      .px2font(17);
    }
  }
  &_leftbutton {
    .px2vw(width, 54);
    .px2vh(height, 35);
    .px2vw(margin-left, 25);
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(line-height, 35);
    border-radius: 0.7vw 0px 0px 0.7vw;
    background: #013480;
    border: none;
    color: #FFF;
    .px2font(14);
    cursor: pointer;
    z-index: 1000;
  }
  &_rightbutton {
    .px2vw(width, 54);
    .px2vh(height, 35);
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(line-height, 35);
    text-align: center;
    border-radius: 0px 0.7vw 0.7vw 0px;
    background: #EBF5FF;
    border: none;
    color: #013480;
    .px2font(14);
    cursor: pointer;
    z-index: 1000;
  }
}
::v-deep .el-tabs__nav-wrap::after {
  .px2vh(height, 2);
}
::v-deep .el-tabs__nav-scroll {
  .px2vh(height, 97);
}
::v-deep .el-tabs__nav {
  .px2vh(height, 97);
  .px2vh(line-height, 75);
}
::v-deep .el-tabs__header {
  .px2vh(margin-bottom, 15);
}
.colrow {
  column-count: 3; /* 调整列数 */
  .px2vw(column-gap, 8); /* 调整列间距 */
  column-fill: balance; /* 平衡填充 */
}
</style>
