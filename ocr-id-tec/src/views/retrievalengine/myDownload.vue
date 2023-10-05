<template>
  <div class="download">
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
      <div class="bar_clear">
        <button class="bar_clear_btn" @click="clearAll()">全部删除</button>
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
        <downCard v-for="(item) in matchList" :key="item.id" :item="item"></downCard>
      </div>
      <div class="content_empty" v-else>当前下载记录为空！😃😃😃</div>
    </div>
  </div>
</template>

<script>
import downCard from '@/components/downCard.vue';
import { getDownloadList, setDownloadList } from '@/utils/storage'
export default {
  name: 'myDownload',
  components: { downCard },
  data () {
    return {
      dateValue: '',
      keyWord: '',
      matchList: [],
      downList: [
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
          title: '实验动物智能化综合管理系统开发及应用',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 4,
          title: '医学人文视域下医学史的学科价值和发展路径探析',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 5,
          title: '医学生物化学与分子生物学实验教学的改革与实践',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 6,
          title: 'SWOT视角下医学出版的数字化转型研究',
          date: '2021-01-01',
          time: '13:14',
        },
        {
          isSlected: false,
          id: 7,
          title: '临床医学专业新发传染病防控课程设置的思考 ',
          date: '2021-01-01',
          time: '13:14',
        },
      ],
      downListCopy: [],
    }
  },
  computed: {
    // 监视downList每个对象的isSlected值,统计数量，更新到total
    total() {
      let count = 0;
      this.downList.forEach((item) => {
        if(item.isSlected === true) {
          count++;
        }
      });
      return count;
    },
    // 监视downList每个对象的isSlected是否为true，如果有一个为true，hasSlected为true
    hasSlected() {
      let flag = false;
      this.downList.forEach((item) => {
        if(item.isSlected === true) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    // 监视downList是否为空，如果为空，isempty为false
    isempty() {
      if(this.downList.length == 0) {
        return false;
      }
      return true;
    },
  },
  watch: {
    // 文字清空时调用
    keyWord() {
      if (this.keyWord === "") {
        this.matchList = this.downList;
      } else {
        this.getMachlist();
      }
    },
  },
  methods: {
    pickerOptions() {

    },
    // 文字匹配，先清空hisLis，数据暂存downListCopy，通过keyword和dateValue进行匹配，筛选出与keyword匹配的数据，再筛选出在dateValue之前的数据，再将筛选出的数据push到downList中
    getMachlist() {
      this.matchList = [];
      this.downList.forEach((item) => {
        if(item.title.indexOf(this.keyWord) > -1) {
          this.matchList.push(item);
        }
      });
    },
    // 清空下载记录
    clearAll() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空downList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除全部下载记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.downList = [];
        setDownloadList([]);
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
      // 取消选中的下载记录
      this.downList.forEach((item) => {
        item.isSlected = false;
      });
    },
    deleteRecord() {
      // 利用elementUI弹出消息确认框询问是否确定删除,如果确定，清空downList,并发起请求，删除后台数据
      this.$confirm('此操作将永久删除选中的下载记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除选中的历史记录,并且重新渲染
        this.downList = this.downList.filter((item) => {
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
    // 该组件的子组件historicalCard通过点击事件触发deleteThis()，调用d父组件eleteByIcon()该方法删除该组件内downList中的该条数据，并重新渲染
    deleteByIcon(id) {
      this.$confirm('此操作将永久删除该条的下载记录, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.downList = this.downList.filter((item) => {
          return item.id !== id;
        });
        this.matchList = this.downList;
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
    this.matchList = this.downList;
  },
}
</script>
<style scoped lang='less'>
.bar {
  display: flex;
  height: 86px;
  width: 100vw;
  flex-direction: row;
  flex-wrap: wrap;
  line-height: 90px;
  background-color: #fff;
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
    .el-date-editor {
      width: 300px;
      margin: 0 50px;
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
  &_clear {
    width: 303px;
    height: 86px;
    &_btn {
      border: none;
      width: 172px;
      height: 55px;
      border-radius: 8px;
      background: #013480;
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
