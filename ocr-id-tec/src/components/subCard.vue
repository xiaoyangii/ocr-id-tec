<template>
  <div class="subscription_card" v-if="item">
    <div class="card_left">
      <img :src="item.img" alt="">
    </div>
    <div class="card_right">
      <div class="card_right_title">{{ item.title }}</div>
      <div class="card_right_desc">{{ item.desc }}</div>
      <button class="card_right_subs" @click="deleteSubs(item)">取消订阅</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'subCard',
  data () {
    return {}
  },
  computed: {},
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
    deleteSubs(item) {
      this.fatherDeleteMethod(item.title)
    },
  },
  created () {},
}
</script>
<style scoped lang='less'>
.subscription_card {
  .px2vw(width, 572);
  .px2vh(height, 175);
}
.card_left {
  float: left;
  .px2vw(width, 255);
  height: 100%;
  img {
    .px2vw(width, 255);
    .px2vh(height, 167);
    .px2vw(border-radius, 20);
  }
}
.card_right {
  float: right;
  .px2vw(width, 276);
  height: 100%;
  &_title {
    .px2vh(height, 39);
    width: 100%;
    color: #000;
    .px2font(24);
  }
  &_desc {
    .px2vh(height, 110);
    width: 100%;
    color: #9B9595;
    .px2font(18);
    overflow: hidden;
  }
  &_subs {
    float: right;
    .px2vw(width, 64);
    .px2vh(height, 29);
    .px2vw(border-radius, 11);
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(padding-bottom, 1);
    .px2vh(padding-top, 1);
    background: #EBF5FF;
    border: none;
    color: #013480;
    .px2font(11);
    cursor: pointer;
  }
}
</style>
