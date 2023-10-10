<template>
  <div class="collectionCard" v-if="item">
    <div class="card_left">
      <el-avatar :size="65" :src="avatar"></el-avatar>
    </div>
    <div class="card_right">
      <div class="card_right_head">
        <div class="card_right_head_author">{{ item.author }}</div>
        <div class="card_right_head_colle" @click="deleteCollection(item)">收藏</div>
        <i class="el-icon-star-on" @click="deleteCollection(item)"></i>
      </div>
      <div class="card_right_title">{{ item.title }}</div>
      <div class="card_right_desc">{{ item.desc }}</div>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/images/avatar10.png';
export default {
  name: 'collectionCard',
  data () {
    return {
      avatar
    }
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
    deleteCollection(item) {
      this.fatherDeleteMethod(item.id)
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.collectionCard {
  width: 570px;
  height: 155px;
}

.card_left {
  float: left;
  height: 100%;
  width: 65px;
}
.card_right {
  float: right;
  height: 100%;
  width: 480px;
  &_head {
    height: 30px;
    width: 100%;
    line-height: 30px;
    margin-top: 10px;
    &_author {
      float: left;
      height: 100%;
      width: 400px;
      color: #000;
      font-size: 22px;
      font-weight: 700;
    }
    .el-icon-star-on {
      float: right;
      font-size: 30px;
      color: yellow;
      cursor: pointer;
    }
    &_colle {
      float: right;
      height: 100%;
      width: 40px;
      color: #BAABAB;
      font-size: 18px;
      text-align: right;
      cursor: pointer;
    }
  }
  &_title {
    float: left;
    height: 30px;
    line-height: 30px;
    width: 100%;
    color: #000;
    font-size: 18px;
  }
  &_desc {
    float: left;
    height: 97px;
    width: 100%;
    color: #9B9595;
    font-size: 16px;
  }
}
</style>
