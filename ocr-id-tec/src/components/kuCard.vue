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
  .px2vh(height, 66);
  .px2vh(line-height, 66);
  width: 100%;
  border: 2px solid #F4F4F4;
  .px2vw(padding-left, 95);
  .px2vw(padding-right, 95);
  &_select {
    float: left;
    width: 5%;
    height: 100%;
    ::v-deep .el-checkbox {
      .px2vw(margin-left, 16);
      .px2vh(line-height, 66);
      &__input {
        .px2vh(line-height, 19);
      }
      &__inner {
        .px2vh(height, 32);
        .px2vw(width, 30);
        text-align: center;
        .px2font(20);
        border-radius: 0.22vw;
        border: 0.1vw solid #000;
        background-color: #FFF;
        &::after {
          .px2vw(left, 12);
          .px2vh(height, 22);
          top: 0px;
          border-color: #000;
          .px2vw(border-width, 4);
        }
      }
    }
  }
  &_title {
    float: left;
    width: 44.6%;
    .px2vw(margin-left, 30);
    .px2vh(line-height, 66);
    height: 100%;
    color: #3C3C3C;
    .px2font(20);
    letter-spacing: 1.1px;
  }
  &_date {
    float: left;
    width: 15.4%;
    height: 100%;
    .px2vh(line-height, 66);
    color: #9B9595;
    .px2font(20);
  }
  &_size {
    .px2vw(margin-left, 62);
    float: left;
    width: 10%;
    height: 100%;
    .px2vh(line-height, 66);
    color: #9B9595;
    .px2font(20);
  }
}
.el-checkbox {
  .px2vh(height, 62);
}
</style>
