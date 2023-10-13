<template>
  <div class="history">
    <div class="bar">
    <div class="bar_search">
      <el-input
        placeholder="搜索历史记录"
        prefix-icon="el-icon-search"
        @keyup.enter="getMachlist()"
        v-model="keyWord">
      </el-input>
    </div>
    <div class="bar_time">
      <el-date-picker
        v-model="dateValue"
        align="right"
        type="date"
        placeholder="按时间筛选"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="bar_button">
      <button class="bar_button_left" @click="clearAll()">全部清空</button>
    </div>
    </div>
    <div class="content">
      <div class="content_title">全部记录</div>
      <div class="content_boxx" v-show="hasSlected">
        <button class="content_boxx_button2" @click="cancel()">取消</button>
        <button class="content_boxx_button1" @click="deleteRecord()">删除</button>
        <div class="content_boxx_num">已选 <span>{{ total }}</span> 项</div>
      </div>
      <div class="content_List" v-if="isempty">
        <historicalCard v-for="(item) in matchList" :key="item.id" :item="item"></historicalCard>
      </div>
      <div class="content_empty" v-else>当前历史记录为空！😃😃😃</div>
    </div>
  </div>
</template>

<script>
import historicalCard from '@/components/historicalCard.vue';
import '@/assets/style/confirm.less'
import { getHisList, deleteAllHistory, deleteOneHistory, deleteMultiHistory } from '@/api/history.js'
export default {
  name: 'historicalBrowsing',
  components: {
    historicalCard
  },
  data () {
    return {
      keyWord: "", //搜索框输入的值
      dateValue: "",
      hisList: [
        {
          isSlected: false,
          articleId: 1,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-02-25',
          time: '13:54',
        },
        {
          isSlected: false,
          articleId: 2,
          title: '新医科背景下的康复医学教育改革思考',
          date: '2021-01-01',
          time: '15:54',
        },
        {
          isSlected: false,
          articleId: 3,
          title: '临床医学专业新发传染病防控课程设置的思考',
          date: '2021-12-11',
          time: '11:14',
        },
        {
          isSlected: false,
          articleId: 4,
          title: '基础与临床整合医学人工智能实训案例平台的开发与应用',
          date: '2021-07-01',
          time: '13:53',
        },
        {
          isSlected: false,
          articleId: 5,
          title: '医学技术的人文价值',
          date: '2021-01-01',
          time: '18:74',
        },
        {
          isSlected: false,
          articleId: 6,
          title: '医学生物化学与分子生物学实验教学的改革与实践 ',
          date: '2022-04-27',
          time: '13:14',
        },
        {
          isSlected: false,
          articleId: 7,
          title: '全科医生在高血压领域研究的知识图谱分析',
          date: '2021-10-21',
          time: '14:42',
        },
        {
          isSlected: false,
          articleId: 8,
          title: '实验动物智能化综合管理系统开发及应用',
          date: '2021-11-21',
          time: '14:57',
        },
        {
          isSlected: false,
          articleId: 9,
          title: '中医药治疗老年性黄斑变性的研究进展',
          date: '2021-02-11',
          time: '13:44',
        },
        {
          isSlected: false,
          articleId: 10,
          title: 'SWOT视角下医学出版的数字化转型研究',
          date: '2021-01-01',
          time: '18:11',
        },
        {
          isSlected: false,
          articleId: 11,
          title: '基础与临床整合医学人工智能实训案例平台的开发与应用',
          date: '2021-02-20',
          time: '13:14',
        },
        {
          isSlected: false,
          articleId: 12,
          title: '医学人文视域下医学史的学科价值和发展路径探析',
          date: '2021-09-11',
          time: '12:24',
        },
        {
          isSlected: false,
          articleId: 13,
          title: '医学技术的人文价值',
          date: '2021-11-08',
          time: '18:14',
        },
        {
          isSlected: false,
          articleId: 14,
          title: '医学生物化学与分子生物学实验教学的改革与实践',
          date: '2022-12-01',
          time: '20:14',
        }
      ],
      hisListCopy: [
      ],
      matchList: [],
      deleteList: [],
    }
  },
  computed: {
    // 监视hisList每个对象的isSlected值,统计数量，更新到total
    total() {
      let count = 0;
      this.hisList.forEach((item) => {
        if(item.isSlected === true) {
          count++;
        }
      });
      return count;
    },
    // 监视hisList每个对象的isSlected是否为true，如果有一个为true，hasSlected为true
    hasSlected() {
      let flag = false;
      this.hisList.forEach((item) => {
        if(item.isSlected === true) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    // 监视hisList是否为空，如果为空，isempty为false
    isempty() {
      if(this.hisList.length == 0) {
        return false;
      }
      return true;
    },
    listId() {
      let arr = []
      this.hisList.forEach((item) => {
        if(item.isSlected === true) {
          arr.push(item.articleId)
        }
      })
      return arr
    },
    AllId() {
      let arr = []
      this.hisList.forEach((item) => {
          arr.push(item.articleId)
      })
      return arr
    }
  },
  watch: {
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.hisList;
      } else {
        this.getMachlist();
      }
    },
  },
  methods: {
    pickerOptions() {
      
    },
    // 文字匹配，先清空hisLis，数据暂存hisListCopy，通过keyword和dateValue进行匹配，筛选出与keyword匹配的数据，再筛选出在dateValue之前的数据，再将筛选出的数据push到hisList中
    getMachlist() {
      this.matchList = []
      this.hisList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        }
      });
    },
    async getHistory() {
      await getHisList(localStorage.getItem('loginId'))
      .then(res => {
        // this.hisList = res
        // 给每个对象添加isSlected属性，用于判断是否选中
        // this.hisList.forEach((item) => {
        //   item.isSlected = false;
        // })
        this.$store.commit('myhistory/setHistory', this.hisList)
        this.$message({
          message: '获取历史记录成功',
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: '获取历史记录失败' + err,
          type: "error"
        });
      })
    },
    // 清空历史记录
    clearAll() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空hisList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除全部历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.hisList = []
        this.matchList = []
        this.$store.commit('myhistory/setHistory', [])
        this.$message({
          type: 'success',
          message: '删除全部历史记录成功'
        })
        // await deleteAllHistory(localStorage.getItem('loginId'), this.AllId)
        // .then((res) => {
        //   console.log(res)
        //   this.$message({
        //     type: 'success',
        //     message: '删除全部历史记录成功'
        //   })
        //   this.hisList = []
        //   this.$store.commit('myhistory/setHistory', [])
        // })
        // .catch((err) => {
        //   this.$message({
        //     type: 'error',
        //     message: '删除全部历史记录失败' + err
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    cancel() {
      // 取消选中的历史记录
      this.hisList.forEach((item) => {
        item.isSlected = false
      });
    },
    deleteRecord() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空hisList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除选中的历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.hisList = this.hisList.filter((item) => {
          return item.isSlected === false
        })
        this.$store.commit('myhistory/setHistory', this.hisList)
        this.matchList = this.hisList
        this.$message({
          type: 'success',
          message: '删除选中的历史记录成功'
        })
        // await deleteMultiHistory(localStorage.getItem('loginId') ,this.listId)
        // .then((res) => {
        //   console.log(res)
        //   this.$message({
        //     type: 'success',
        //     message: '删除选中的历史记录成功'
        //   })
        //   this.hisList = this.hisList.filter((item) => {
        //     return item.isSlected === false
        //   })
        //   this.$store.commit('myhistory/setHistory', this.hisList)
        // })
        // .catch((err) => {
        //   this.$message({
        //     type: 'error',
        //     message: '删除选中的历史记录失败' + err
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 该组件的子组件historicalCard通过点击事件触发deleteThis()，调用d父组件eleteByIcon()该方法删除该组件内hisList中的该条数据，并重新渲染
    deleteByIcon(articleId) {
      this.$confirm('此操作将永久删除该条的历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.hisList = this.hisList.filter((item) => {
          return item.articleId !== articleId
        })
        this.matchList = this.hisList
        this.$store.commit('myhistory/setHistory', this.hisList)
        this.$message({
          type: 'success',
          message: '删除该条的历史记录成功'
        })
        // await deleteOneHistory(localStorage.getItem('loginId'), articleId)
        // .then((res) => {
        //   console.log(res)
        //   this.$message({
        //     type: 'success',
        //     message: '删除该条的历史记录成功'
        //   })
        //   this.hisList = this.hisList.filter((item) => {
        //     return item.articleId !== articleId
        //   })
        //   this.matchList = this.hisList
        //   this.$store.commit('myhistory/setHistory', this.hisList)
        // })
        // .catch((err) => {
        //   this.$message({
        //     type: 'error',
        //     message: '删除该条的历史记录失败' + err
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    
  },
  provide() {
    return {
      fatherDeleteMethod: this.deleteByIcon
    };
  },
  created () {
    this.matchList = this.hisList;
    this.getHistory()
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
      margin-left: 25px;
      margin-right: 200px;
      width: 170px;
      height: 55px;
      text-align: center;
      border-radius: 8px;
      background: #013480;
      border: 1px solid #013480;
      color: #FFF;
      font-size: 22px;
      cursor: pointer;
    }
  }
}
.content {
  float: left;
  padding: 0 115px;
  width: 100%;
  height: 791px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  background-color: #fff;
  &_title {
    float: left;
    width: 60%;
    height: 10%;
    margin-top: 35px;
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
  &_boxx {
    float: left;
    width: 40%;
    height: 10%;
    margin-top: 35px;
    padding-right: 70px;
    &_num {
      height: 44px;
      line-height: 44px;
      float: right;
      color: #000;
      font-size: 22px;
      text-align: center;
      span {
        color: #1559DD;
      }
    }
    &_button1 {
      float: right;
      margin-left: 20px;
      width: 69px;
      height: 44px;
      border-radius: 6px;
      border: none;
      background: #013480;
      color: #FFF;
      font-size: 18px;
      cursor: pointer;
    }
    &_button2 {
      float: right;
      margin-left: 10px;
      width: 69px;
      height: 44px;
      border-radius: 6px;
      background: #D9D9D9;
      border: none;
      color: #FFF;
      font-size: 18px;
      cursor: pointer;
    }
  }
  &_empty {
    margin-top: 300px;
    text-align: center;
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }
  &_List {
    height: calc(100% - 114px);
    width: 100%;
    padding-left: 50px;
    margin-top: 120px;
  }
}


</style>
  
