<template>
  <div class="card" v-if="item">
    <div class="card_left">
      <div class="card_left_avatar">
        <div v-for="avatarUrl in item.avatar" :key="avatarUrl" class="card_left_avatar_box">
          <el-avatar :src="avatarUrl"></el-avatar>
        </div>
      </div>
    </div>
    <div class="card_right">
      <div class="card_right_name">{{ item.name }}</div>
      <div class="card_right_desc">{{ item.desc }}</div>
      <span class="card_right_info">{{ item.info }}篇资料</span>
      <span class="card_right_member">{{ item.member }}名成员</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teamCard',
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
}
</script>
<style scoped lang='less'>
.card {
  float: left;
  width: 100%;
  .px2vh(height, 122);
  border-bottom: 0.2vw solid #F0F0F0;
  &_left {
    float: left;
    .px2vw(margin-left, 45);
    .px2vh(margin-top, 18);
    .px2vh(height, 83);
    .px2vh(line-height, 83);
    .px2vw(width, 75);
    &_avatar_box {
      float: left;
      .px2vh(height, 37);
      .px2vh(line-height, 37);
      .px2vw(width, 33);
      .px2vw(margin-left, 2);
      .px2vh(margin-top, 2.2);
      .px2vw(margin-right, 2);
      .px2vh(margin-bottom, 2.2);
      ::v-deep .el-avatar {
        .px2vh(height, 37);
        // .px2vh(line-height, 37);
        .px2vw(width, 33);
      }
    }
  }
  &_right {
    float: right;
    width: 64%;
    height: 100%;
    &_name {
      float: left;
      .px2vh(margin-top, 18);
      height: 22px;
      .px2vh(height, 24.7);
      color: #000;
      .px2font(16);
      font-weight: 700;
      cursor: pointer;
    }
    &_desc {
      float: left;
      .px2vh(margin-top, 6);
      color: rgba(0, 0, 0, 0.68);
      .px2font(12);
    }
    &_info {
      float: left;
      .px2vh(margin-top, 7);
      color: #B4AEAE;
      .px2font(10);
    }
    &_member {
      float: left;
      .px2vh(margin-top, 7);
      .px2vw(margin-left, 10.5);
      color: #B4AEAE;
      .px2font(10);
    }
  }
}
</style>
