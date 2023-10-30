<template>
  <div class="downCard" v-if="item" :class="bgc(item.isSlected)">
    <div class="downCard_slect"><el-checkbox v-model="item.isSlected"></el-checkbox></div>
    <div class="boxxx">
      <div class="downCard_title">{{ item.title }}</div>
      <div class="downCard_link" @click="openFile()">在文件夹中显示</div>
    </div>
    <div class="downCard_deleteicon"><i class="el-icon-close" @click="deleteThis(item)"></i></div>
    <div class="downCard_date">
      <div class="downCard_date_time">{{ item.date }}</div>
      <div class="downCard_date_time">{{ item.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'downCard',
  components: {},
  data () {
    return {

    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  inject: ["fatherDeleteMethod"],
  methods: {
    // 触发点击事件deleteThis($event),将当前点击的对象的id值传递给父组件，调用父组件的deleteByIcon(id)方法
    deleteThis(item) {
      this.fatherDeleteMethod(item.id)
    },
    openFile() {
      console.log('打开文件')
    },
    bgc() {
      if (this.item.isSlected) {
        return 'slected'
      }
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.downCard {
  &:hover {
    background-color: #f3f3f3;
  }
  .px2vh(height, 94.5);
  width: 95%;
  .px2vh(margin-bottom, 18);
  .px2vw(border-radius, 7);
  &_slect {
    float: left;
    width: 5%;
    height: 100%;
    ::v-deep .el-checkbox {
      .px2vw(margin-left, 16);
      .px2vh(line-height, 60);
      .px2font(14);
      &__inner {
        .px2vw(width, 30);
        .px2vh(height, 33);
        text-align: center;
        .px2font(16);
        border-radius: 0.2vw;
        border: 0.1vw solid #000;
        background-color: #FFF;
        &::after {
          .px2vh(height, 23);
          .px2vw(width, 4);
          .px2vw(left, 12);
          top: 0px;
          border-color: #000;
          .px2vw(border-width, 5);
        }
      }
    }
  }
  &_title {
    float: left;
    width: 100%;
    height: 60%;
    .px2vh(line-height, 60);
    text-align: left;
    color: #3C3C3C;
    .px2font(20);
    letter-spacing: 0.02vw;
  }
  &_link {
    float: left;
    height: 40%;
    color: #1559DD;
    .px2font(16);
    .px2vw(letter-spacing, 0.72);
    cursor: pointer;
  }
  &_date {
    float: right;
    width: 22%;
    height: 100%;
    &_time {
      float: left;
      &:first-child {
        width: 50%;
      }
      width: 40%;
      height: 100%;
      .px2vh(line-height, 60);
      text-align: left;
      color: #9B9595;
      .px2font(20);
      letter-spacing: 0.02vw;
    }
  }
  &_deleteicon {
    float: right;
    width: 10%;
    height: 100%;
    text-align: center;
    ::v-deep .el-icon-close {
      .px2vh(margin-top, 16.5);
      .px2font(26);
      cursor: pointer;
    }
  }
}
.boxxx {
  float: left;
  width: 63%;
  height: 100%;
  .px2vw(padding-left, 30);
}
.slected {
  .px2vw(border-radius, 7);
  background: #EBF5FF;
}
</style>
