<template>
  <div class="card" v-if="item">
    <div class="card_left">
      <div class="card_left_avatar">
        <div v-for="avatarUrl in item.avatar" :key="avatarUrl" class="card_left_avatar_box">
          <el-avatar :size="33" :src="avatarUrl"></el-avatar>
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
  height: 108px;
  border-bottom: 2px solid #F0F0F0;
  &:first-child {
    margin-top: 55px;
  }
  &_left {
    float: left;
    margin-left: 45px;
    margin-top: 16px;
    width: 75px;
    height: 75px;
    &_avatar_box {
      float: left;
      height: 33px;
      width: 33px;
      margin: 2px 2px;
    }
  }
  &_right {
    float: right;
    width: 64%;
    height: 100%;
    &_name {
      float: left;
      margin-top: 16px;
      height: 22px;
      color: #000;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }
    &_desc {
      float: left;
      margin-top: 5px;
      color: rgba(0, 0, 0, 0.68);
      font-size: 12px;
    }
    &_info {
      float: left;
      margin-top: 5px;
      color: #B4AEAE;
      font-size: 8px;
    }
    &_member {
      float: left;
      margin-top: 5px;
      margin-left: 10px;
      color: #B4AEAE;
      font-size: 8px;
    }
  }
}
</style>
