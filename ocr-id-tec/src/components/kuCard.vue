<template>
  <div class="kuCard" v-if="item">
    <div class="kuCard_select"><el-checkbox v-model="item.isSlected"></el-checkbox></div>
    <div class="kuCard_title">{{ item.title }}</div>
    <div class="kuCard_date">{{ item.date }}</div>
    <div class="kuCard_size">{{ item.size }} MB</div>
  </div>
</template>

<script>
export default {
  name: 'kuCard',
  components: {},
  data () {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {},
  methods: {},
  created () {},
}
</script>
<style scoped lang='less'>
.kuCard {
  height: 66px;
  width: 100%;
  border: 2px solid #F4F4F4;
  padding: 0 95px;
  &_select {
    float: left;
    width: 5%;
    height: 100%;
    ::v-deep .el-checkbox {
      margin-left: 16px;
      line-height: 66px;
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
    width: 44.6%;
    margin-left: 30px;
    height: 100%;
    line-height: 66px;
    color: #3C3C3C;
    font-size: 20px;
    letter-spacing: 1.1px;
  }
  &_date {
    float: left;
    width: 15.4%;
    height: 100%;
    line-height: 66px;
    color: #9B9595;
    font-size: 20px;
  }
  &_size {
    margin-left: 62px;
    float: left;
    width: 10%;
    height: 100%;
    line-height: 66px;
    color: #9B9595;
    font-size: 20px;
  }
}
</style>
