<template>
  <div class="card" v-if="item">
    <div class="card_left">
      <div class="card_left_avatar">
        <el-avatar :src="item.avatar"></el-avatar>
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
  .px2vh(height, 85);
  border-bottom: 2px solid #F0F0F0;
  &_left {
    float: left;
    width: 27%;
    .px2vh(height, 75);
    &_avatar {
      float: right;
      margin-top: 8px;
      ::v-deep .el-avatar {
        .px2vh(height, 60);
        .px2vw(width, 54.5);
      }
    }
  }
  &_middle {
    float: left;
    .px2vw(margin-left, 20);
    width: 50%;
    height: 100%;
    &_name {
      .px2vh(margin-top, 8);
      width: 100%;
      color: #000;
      .px2font(16);
      font-weight: 700;
    }
    &_school {
      width: 50%;
      .px2vh(margin-top, 4);
      color: rgba(0, 0, 0, 0.68);
      .px2font(12);
    }
    &_major {
      float: left;
      .px2vh(margin-top, 4);
      color: #B4AEAE;
      .px2font(10);
    }
  }
  &_right {
    float: left;
    height: 100%;
    width: 12%;
    button {
      margin: 23px 0;
      .px2vh(margin-top, 26);
      .px2vh(margin-bottom, 26);
      .px2vw(width, 50);
      .px2vh(height, 28);
      text-align: center;
      .px2vw(border-radius, 10);
      background: #EBF5FF;
      border: 0.1vw solid #EBF5FF;
      .px2font(12);
    }
  }
}
</style>
