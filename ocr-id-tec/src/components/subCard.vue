<template>
  <div class="subscription_card" v-if="item">
    <div class="card_left">
      <img src="" alt="">
    </div>
    <div class="card_right">
      <div class="card_right_title">{{ item.title }}</div>
      <div class="card_right_desc">{{ item.desc }}</div>
      <button class="card_right_subs">取消订阅</button>
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
  methods: {},
  created () {},
}
</script>
<style scoped lang='less'>
.subscription_card {
  width: 570px;
  height: 155px;
  background-color: blue;
}
.card_left {
  float: left;
  width: 250px;
  height: 100%;
}
.card_right {
  float: right;
  width: 275px;
  height: 100%;
  &_title {
    height: 35px;
    width: 100%;
    color: #000;
    font-size: 24px;
  }
  &_desc {
    height: 97px;
    width: 100%;
    color: #9B9595;
    font-size: 18px;
    overflow: hidden;
  }
  &_subs {
    float: right;
    width: 64px;
    height: 24px;
    border-radius: 11px;
    background: #EBF5FF;
    border: none;
    color: #013480;
    font-size: 11px;
  }
}
</style>
