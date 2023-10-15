<template>
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
</template>

<script>
export default {
  name: 'searchBar',
  components: {},
  data () {
    return {
      keyWord: "", //搜索框输入的值
      dateValue: "",
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
  methods: {
    pickerOptions() {
      
    },
    // 模糊查询 高亮匹配
    getMachlist() {
      this.matchlist = [];
      this.articleList = this.articleList1;// 获取一次数据
      // 去除恶意输入代码片段的可能
      let value = this.keyWord.replace(/<.*?>/gi, "");
      if(this.keyWord === '') {
        this.articleList = this.articleList1;
        return ;
      }
      // 模糊查询 只保留符合条件的数据
      let resultList = [];
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
          resultList.push(item);
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
            return;
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
            author: item.author.replace(
              reg,
              //筛选出来的文字加样式
              (val) => `<span style='background-color:#F4F92B'>${val}</span>`
            ),
          };
          if(this.keyWord === '') {
            obj.details = item.details
          }
          dataList.push(obj);
        });
      } else {
        this.articleList.forEach((item) => {
          if(!(item.details.match(reg) || item.title.match(reg) || item.author.match(reg) || item.name.match(reg)))
          {
            return;
          }
          dataList.push(item);
        });
      }
      // 赋值
      this.machlist = dataList;
      this.articleList = this.machlist;
    },
  },
  created () {
    this.getMachlist();
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
</style>
