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
  .px2vh(height, 86);
  .px2vh(line-height, 90);
  width: 100%;
  flex-direction: row;
  &_search {
    background-color: #fff;
    ::v-deep .el-input {
      .px2vw(margin-left, 114);
      .px2vw(margin-left, 16);
    }
    ::v-deep .el-input__inner {
      .px2vh(height, 55);
      .px2vw(width, 829);
      .px2vw(border-radius, 8);
      border: 0.1vw solid #D9D9D9;
      color: #9B9595;
      .px2font(20);
      .px2vw(padding-left, 60);
    }
    ::v-deep .el-input__icon.el-icon-search {
      scale: 2;
      margin: 0 15px;
      .px2vw(margin-left, 15);
      .px2vw(margin-right, 15);
      .px2vh(height, 86)!important;
      .px2vh(line-height, 85);
    }
  }
  &_time {
    background-color: #fff;
    .el-date-editor {
      .px2vw(width, 300);
      margin: 0 25px;
      .px2vw(margin-left, 15);
      .px2vw(margin-right, 25);
    }
    ::v-deep .el-input__inner {
      .px2vw(padding-left, 55);
      .px2vh(height, 55);
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
      .px2vh(line-height, 82);
    }
    ::v-deep .el-input__prefix {
      .px2vh(top, -2);
    }
  }
  &_button {
    background-color: #fff;
    .px2vh(height, 86);
    .px2vh(line-height, 91);
    &_left {
      .px2vh(height, 55);
      .px2vh(line-height, 82);
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
</style>
