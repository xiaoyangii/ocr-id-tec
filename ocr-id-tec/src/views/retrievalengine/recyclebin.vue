<template>
  <div class="recyclebin">
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
          @change="pickerdate">
        </el-date-picker>
      </div>
      <div class="bar_clear">
        <button class="bar_clear_btn" @click="clearAll()">全部删除</button>
      </div>
    </div>
    <div class="content">
      <div class="content_title">全部记录</div>
      <div class="content_boxx" v-show="hasSlected">
        <button class="content_boxx_button2" @click="cancel()">取消</button>
        <button class="content_boxx_button1" @click="deleteRecord()">还原</button>
        <div class="content_boxx_num">已选 <span>{{ total }}</span> 项</div>
      </div>
      <div class="content_List" v-if="isempty">
        <downCard v-for="(item) in matchList" :key="item.id" :item="item"></downCard>
      </div>
      <div class="content_empty" v-else>
        <img src="@/assets/images/recycle.png" alt="">
        <div>当前回收站记录为空😃</div>
      </div>
    </div>
  </div>
</template>

<script>
import downCard from '@/components/downCard.vue'
import '@/assets/style/confirm.less'
import { getRecyclebin, deleteAllRecyclebin, deleteMultiRecyclebin, deleteOneRecyclebin } from '@/api/recyclebin.js'
export default {
  name: 'recyclebin',
  components: { downCard },
  data () {
    return {
      dateValue: '',
      keyWord: '',
      matchList: [],
      recycleList: [
      {
          isSlected: false,
          articleId: 1,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2020-11-21',
          time: '10:14',
        },
        {
          isSlected: false,
          articleId: 2,
          title: '新医科背景下的康复医学教育改革思考',
          date: '2022-01-15',
          time: '11:19',
        },
        {
          isSlected: false,
          articleId: 3,
          title: '实验动物智能化综合管理系统开发及应用',
          date: '2020-07-24',
          time: '13:14',
        },
        {
          isSlected: false,
          articleId: 4,
          title: '医学人文视域下医学史的学科价值和发展路径探析',
          date: '2022-06-12',
          time: '16:54',
        },
        {
          isSlected: false,
          articleId: 5,
          title: '医学生物化学与分子生物学实验教学的改革与实践',
          date: '2021-02-11',
          time: '14:23',
        },
        {
          isSlected: false,
          articleId: 6,
          title: 'SWOT视角下医学出版的数字化转型研究',
          date: '2021-03-17',
          time: '17:24',
        },
        {
          isSlected: false,
          articleId: 7,
          title: '临床医学专业新发传染病防控课程设置的思考 ',
          date: '2022-10-21',
          time: '08:35',
        },
      ],
      recycleListCopy: [],
      recycleListId: []
    }
  },
  computed: {
    // 监视recycleList每个对象的isSlected值,统计数量，更新到total
    total() {
      let count = 0;
      this.recycleList.forEach((item) => {
        if(item.isSlected === true) {
          count++
        }
      });
      return count;
    },
    // 监视recycleList每个对象的isSlected是否为true，如果有一个为true，hasSlected为true
    hasSlected() {
      let flag = false
      this.recycleList.forEach((item) => {
        if(item.isSlected === true) {
          flag = true
          return
        }
      })
      return flag
    },
    // 监视recycleList是否为空，如果为空，isempty为false
    isempty() {
      if(this.recycleList.length == 0) {
        return false
      }
      return true
    },
    listId() {
      let arr = []
      this.recycleList.forEach((item) => {
        if(item.isSlected === true) {
          arr.push(item.articleId)
        }
      })
      return arr
    },
    AllId() {
      let arr = []
      this.recycleList.forEach((item) => {
          arr.push(item.articleId)
      })
      return arr
    }
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.recycleList
      } else {
        this.getMachlist()
      }
    },
  },
  methods: {
    pickerdate(val) {
      // 从hisListCopy筛选出date与dateValue相等的数据
      if(val == null) {
        this.matchList = this.recycleList
        return;
      }
      let month = val.getMonth() >=9 ? val.getMonth() + 1 : '0' + (val.getMonth() + 1)
      let day = val.getDate() >= 10 ? val.getDate() : '0' + val.getDate()
      let date = val.getFullYear() + '-' + month + '-' + day
      let dataList = []
      this.recycleList.forEach((item) => {
        if(item.date === date) {
          dataList.push(item)
        }
      })
      this.matchList = []
      this.matchList = dataList
    },
    // 文字匹配，先清空recycleList，数据暂存Copy，通过keyword和dateValue进行匹配，筛选出与keyword匹配的数据，再筛选出在dateValue之前的数据，再将筛选出的数据push到List中
    getMachlist() {
      this.matchList = [];
      this.recycleList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item)
        }
      })
    },
    async getRecyclebin() {
      await getRecyclebin(localStorage.getItem('loginId'))
      .then(res => {
        // this.recycleList = res
        // 给每个对象添加isSlected属性，用于判断是否选中
        // this.recycleList.forEach((item) => {
        //   item.isSlected = false;
        // });
        this.$store.commit('myrecyclebin/setRecyclebin', this.recycleList)
        this.$message({
          message: '获取回收站记录成功',
          type: "success"
        })
      })
      .catch(err => {
        this.$message({
          message: '获取回收站记录失败' + err.msg,
          type: "error"
        });
      })
    },
    // 清空回收站记录
    clearAll() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空recycleList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除全部回收站记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.recycleList = []
        this.matchList = []
        this.$store.commit('myrecyclebin/setRecyclebin', [])
        this.$message({
          message: "删除全部回收站记录成功",
          type: "success"
        })
        // await deleteAllRecyclebin(localStorage.getItem('loginId'), this.AllId)
        // .then(res => {
        //   console.log(res)
        //   this.$message({
        //     message: "删除全部回收站记录成功",
        //     type: "success"
        //   })
        //   this.recycleList = []
        //   this.$store.commit('myrecyclebin/setRecyclebin', [])
        // })
        // .catch(err => {
        //   this.$message({
        //     message: "删除全部回收站记录失败" + err,
        //     type: "error"
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
      // 取消选中的回收站记录
      this.recycleList.forEach((item) => {
        item.isSlected = false;
      });
    },
    deleteRecord() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空recycleList,并发起请求，删除后台数据
      this.$confirm('此操作将还原选中的回收站记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.recycleList = this.recycleList.filter((item) => {
          return item.isSlected === false
        })
        this.matchList = this.recycleList
        this.$store.commit('myrecyclebin/setRecyclebin', this.recycleList)
        this.$message({
          message: "还原选中的回收站记录成功",
          type: "success"
        })
        // 发起axios请求，删除所有历史记录，后台数据也要删除
        // await deleteMultiRecyclebin(localStorage.getItem('loginId'), this.listId)
        // .then(res => {
        //   console.log(res)
        //   this.$message({
        //     message: "删除选中的回收站记录成功",
        //     type: "success"
        //   })
        //   // 删除选中的历史记录,并且重新渲染
        //   this.recycleList = this.recycleList.filter((item) => {
        //     return item.isSlected === false;
        //   })
        //   this.$store.commit('myrecyclebin/setRecyclebin', this.recycleList)
        // .catch(err => {
        //   this.$message({
        //     message: "删除选中的回收站记录失败" + err,
        //     type: "error"
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消还原'
        });          
      });
    },
    // 该组件的子组件historicalCard通过点击事件触发deleteThis()，调用d父组件eleteByIcon()该方法删除该组件内recycleList中的该条数据，并重新渲染
    deleteByIcon(articleId) {
      this.$confirm('此操作将永久删除该条的回收站记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.recycleList = this.recycleList.filter((item) => {
          return item.articleId !== articleId
        })
        this.matchList = this.recycleList
        this.$store.commit('myrecyclebin/setRecyclebin', this.recycleList)
        this.$message({
          message: "删除该条回收站记录成功",
          type: "success"
        })
        // await deleteOneRecyclebin(localStorage.getItem('loginId'), articleId)
        // .then(res => {
        //   console.log(res)
        //   this.$message({
        //     message: "删除该条回收站记录成功",
        //     type: "success"
        //   })
        //   this.recycleList = this.recycleList.filter((item) => {
        //     return item.articleId !== articleId
        //   })
        //   this.matchList = this.recycleList
        //   this.$store.commit('myrecyclebin/setRecyclebin', this.recycleList)
        // })
        // .catch(err => {
        //   this.$message({
        //     message: "删除该条回收站记录失败" + err,
        //     type: "error"
        //   })
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
  },
  provide() {
    return {
      fatherDeleteMethod: this.deleteByIcon
    }
  },
  created () {
    this.matchList = this.recycleList
    this.getRecyclebin()
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
.content {
  .px2vw(padding-right, 115.5);
  .px2vw(padding-left, 115.5);
  width: 100%;
  .px2vh(height, 892);
  overflow-y: scroll;
  &::-webkit-scrollbar {
		display: none
	}
  background-color: #fff;
  &_title {
    float: left;
    width: 60%;
    height: 10%;
    .px2vh(margin-top, 40);
    color: #000;
    .px2font(28);
    font-weight: 700;
  }
  &_boxx {
    float: left;
    width: 40%;
    height: 10%;
    .px2vh(margin-top, 40);
    .px2vw(padding-right, 70);
    &_num {
      .px2vh(height, 50);
      .px2vh(line-height, 50);
      float: right;
      color: #000;
      .px2font(22);
      text-align: center;
      span {
        color: #1559DD;
      }
    }
    &_button1 {
      float: right;
      .px2vw(margin-left, 20);
      .px2vw(width, 70);
      .px2vh(height, 50);
      .px2vw(border-radius, 7);
      .px2vw(padding-right, 6);
      .px2vw(padding-left, 6);
      .px2vh(padding-top, 1);
      .px2vh(padding-bottom, 1);
      border: none;
      background: #013480;
      color: #FFF;
      .px2font(18);
      cursor: pointer;
    }
    &_button2 {
      float: right;
      .px2vw(margin-left, 10);
      .px2vw(width, 70);
      .px2vh(height, 50);
      .px2vw(border-radius, 7);
      .px2vw(padding-right, 6);
      .px2vw(padding-left, 6);
      .px2vh(padding-top, 1);
      .px2vh(padding-bottom, 1);
      background: #D9D9D9;
      border: none;
      color: #FFF;
      .px2font(18);
      cursor: pointer;
    }
  }
  &_empty {
    width: 100%;
    height: 70vh;
    .px2vh(padding-top, 120);
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
  &_List {
    .px2vh(height, 755);
    width: 100%;
    .px2vw(padding-left, 50);
    .px2vh(margin-top, 137);
    .px2vh(padding-bottom, 50);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none
    }
  }
}
</style>
