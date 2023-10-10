<template>
  <div class="historyCard" v-if="item" :class="bordercolor(item.isSlected)">
    <div class="historyCard_slect"><el-checkbox v-model="item.isSlected"></el-checkbox></div>
    <div class="historyCard_title">{{ item.title }}</div>
    <div class="historyCard_deleteicon"><i class="el-icon-close" @click="deleteThis(item)"></i></div>
    <div class="historyCard_date">
      <div class="historyCard_date_time">{{ item.date }}</div>
      <div class="historyCard_date_time">{{ item.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'historicalCard',
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
      this.fatherDeleteMethod(item.articleId);
    },
    bordercolor(slected) {
      if (slected) {
        return "border_color"
      }
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.historyCard {
  height: 55px;
  width: 95%;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 2px solid #fff;
  &_slect {
    float: left;
    width: 5%;
    height: 100%;
    ::v-deep .el-checkbox {
      margin-left: 16px;
      line-height: 55px;
      &__input {
        line-height: 19px;
      }
      &__inner {
        width: 30px;
        height: 30px;
        text-align: center;
        font-size: 16px;
        border-radius: 3px;
        border: 1px solid #000;
        background-color: #FFF;
        &::after {
          height: 22px;
          left: 12px;
          top: 0px;
          border-color: #000;
          border-width: 4px;
        }
      }
    }
  }
  &_title {
    float: left;
    width: 63%;
    height: 100%;
    line-height: 51px;
    padding-left: 30px;
    text-align: left;
    color: #3C3C3C;
    font-size: 20px;
    letter-spacing: 0.9px;
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
      line-height: 51px;
      text-align: left;
      color: #9B9595;
      font-size: 20px;
      letter-spacing: 0.9px;
    }
  }
  &_deleteicon {
    float: right;
    width: 10%;
    height: 100%;
    text-align: center;
    ::v-deep .el-icon-close {
      margin: 12.5px 0;
      font-size: 26px;
    }
  }
}
.border_color {
  border-color: #013480;
}
</style>
