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
import { getHistoryList, setHistoryList } from '@/utils/storage'
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
          id: 1,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 2,
          title: '新医科背景下的康复医学教育改革思考',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 3,
          title: '临床医学专业新发传染病防控课程设置的思考',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 4,
          title: '基础与临床整合医学人工智能实训案例平台的开发与应用',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 5,
          title: '医学技术的人文价值',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 6,
          title: '医学生物化学与分子生物学实验教学的改革与实践 ',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 7,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 8,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 9,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 10,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 11,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        }
      ],
      hisListCopy: [
        {
          isSlected: false,
          id: 1,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 2,
          title: '新医科背景下的康复医学教育改革思考',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 3,
          title: '临床医学专业新发传染病防控课程设置的思考',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 4,
          title: '基础与临床整合医学人工智能实训案例平台的开发与应用',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 5,
          title: '医学技术的人文价值',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 6,
          title: '医学生物化学与分子生物学实验教学的改革与实践 ',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 7,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 8,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 9,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 10,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 11,
          title: '某医院血液科24种抗肿瘤药超说明书用药评价',
          date: '2021-01-01',
          time: '13:14',
        }
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
      this.matchList = [];
      this.hisList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item);
        }
      });
    },
    // 清空历史记录
    clearAll() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空hisList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除全部历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.hisList = [];
        setHistoryList([]);
        // 发起axios请求，删除所有历史记录，后台数据也要删除
        /////////////////////////////////////////////////
        this.$message({
          type: 'info',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    cancel() {
      // 取消选中的历史记录
      this.hisList.forEach((item) => {
        item.isSlected = false;
      });
    },
    deleteRecord() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空hisList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除选中的历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除选中的历史记录,并且重新渲染
        this.hisList = this.hisList.filter((item) => {
          return item.isSlected === false;
        });
        // 发起axios请求，删除所有历史记录，后台数据也要删除
        /////////////////////////////////////////////////
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 该组件的子组件historicalCard通过点击事件触发deleteThis()，调用d父组件eleteByIcon()该方法删除该组件内hisList中的该条数据，并重新渲染
    deleteByIcon(id) {
      this.$confirm('此操作将永久删除该条的历史记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.hisList = this.hisList.filter((item) => {
          return item.id !== id;
        });
        this.matchList = this.hisList;
        // 发起axios请求，删除所有历史记录，后台数据也要删除，通过id发出请求 删除后台数据
        /////////////////////////////////////////////////
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
      margin-right: 200px;
      width: 170px;
      height: 55px;
      text-align: center;
      border-radius: 7px;
      background: #013480;
      border: 1px solid #013480;
      color: #FFF;
      font-size: 22px;
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
    }
  }
  &_empty {
    margin-top: 250px;
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
  
