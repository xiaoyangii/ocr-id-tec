<template>
  <div class="card" v-if="item">
    <div class="card_left">
      <div class="card_left_avatar">
        <el-avatar :size="57" :src="item.avatar"></el-avatar>
      </div>
    </div>
    <div class="card_middle">
      <div class="card_middle_name">{{ item.name }}</div>
      <div class="card_middle_school">{{ item.school }}</div>
      <div class="card_middle_major">{{ item.major }}</div>
    </div>
    <div class="card_right">
      <div class="card_right_button" @click="concern()">
        <button >+关注</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'poeCard',
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
  methods: {
    concern() {

    },
  },
}
</script>
<style scoped lang='less'>
.card {
  float: left;
  width: 100%;
  height: 72px;
  border-bottom: 2px solid #F0F0F0;
  &_left {
    float: left;
    width: 27%;
    height: 57px;
    &_avatar {
      float: right;
      margin-top: 8px;
    }
  }
  &_middle {
    float: left;
    margin-left: 20px;
    width: 50%;
    height: 100%;
    &_name {
      margin-top: 5px;
      width: 100%;
      color: #000;
      font-size: 16px;
      font-weight: 700;
    }
    &_school {
      width: 50%;
      margin-top: 3px;
      color: rgba(0, 0, 0, 0.68);
      font-size: 12px;
    }
    &_major {
      float: left;
      margin-top: 3px;
      color: #B4AEAE;
      font-size: 10px;
    }
  }
  &_right {
    float: left;
    height: 100%;
    width: 12%;
    button {
      margin: 23px 0;
      width: 45px;
      height: 20px;
      text-align: center;
      border-radius: 9.5px;
      background: #EBF5FF;
      border: 1px solid #EBF5FF;
      font-size: 10px;
    }
  }
}
</style>
