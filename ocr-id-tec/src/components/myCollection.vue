<template>
  <div class="collectionCard" v-if="item">
    <div class="card_left">
      <el-avatar :src="avatar"></el-avatar>
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
  .px2vw(width, 572);
  .px2vh(height, 176);
}
.card_left {
  float: left;
  height: 100%;
  line-height: 100%;
  .px2vw(width, 65.3);
  ::v-deep .el-avatar {
    .px2vw(width, 65.3);
    .px2vw(height, 65.3);
  }
}
.card_right {
  float: right;
  height: 100%;
  .px2vw(width, 481);
  &_head {
    .px2vh(height, 35);
    width: 100%;
    .px2vh(line-height, 35);
    .px2vh(margin-top, 1);
    &_author {
      float: left;
      height: 100%;
      .px2vw(width, 401);
      color: #000;
      .px2font(22);
      font-weight: 700;
      cursor: pointer;
    }
    .el-icon-star-on {
      float: right;
      .px2font(30);
      color: yellow;
      cursor: pointer;
    }
    &_colle {
      float: right;
      height: 100%;
      .px2vw(width, 40);
      color: #BAABAB;
      .px2font(18);
      text-align: right;
      cursor: pointer;
    }
  }
  &_title {
    float: left;
    .px2vh(height, 34);
    .px2vh(line-height, 34);
    width: 100%;
    color: #000;
    .px2font(18);
  }
  &_desc {
    float: left;
    .px2vh(height, 99);
    width: 100%;
    color: #9B9595;
    .px2font(16);
  }
}
</style>
