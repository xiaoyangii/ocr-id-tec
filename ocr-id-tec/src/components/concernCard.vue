<template>
  <div class="concernCard" v-if="item">
    <div class="card_left">
      <el-avatar :src="avatar"></el-avatar>
    </div>
    <div class="card_middle">
      <div class="card_middle_name">{{ item.name }}</div>
      <div class="card_middle_adr">{{ item.affiliatedInstitution }}</div>
      <div class="card_middle_decs">{{ item.researchField }}</div>
    </div>
    <div class="card_right">
      <button class="card_right_concern" @click="deleteConcern(item)">取消关注</button>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/images/avatarbig.png';
export default {
  name: 'concernCard',
  data () {
    return {
      avatar
    }
  },
  computed: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  inject: ["fatherDeleteMethod"],
  methods: {
    deleteConcern(item) {
      this.fatherDeleteMethod(item.id)
    }
  },
  created () {},
}
</script>
<style scoped lang='less'>
.concernCard {
  .px2vw(width, 578);
  .px2vh(height, 120);
}
.card_left {
  float: left;
  height: 100%;
  .px2vw(width, 100);
}
.card_middle {
  float: left;
  .px2vw(margin-left, 15);
  height: 100%;
  .px2vw(width, 360);
  &_name {
    .px2vh(margin-top, 5);
    color: #000;
    .px2font(26);
    font-weight: 700;
    cursor: pointer;
  }
  &_adr {
    .px2vh(margin-top, 5.5);
    color: #000;
    .px2font(18);
  }
  &_decs {
    .px2vh(margin-top, 5.5);
    color: #000;
    .px2font(18);
  }
}
.card_right {
  float: right;
  height: 100%;
  .px2vw(width, 100);
  .px2vh(line-height, 121);
  &_concern {
    border: none;
    .px2vw(width, 100);
    .px2vh(height, 49);
    .px2vw(padding-right, 6);
    .px2vw(padding-left, 6);
    .px2vh(padding-bottom, 1);
    .px2vh(padding-top, 1);
    .px2vw(border-radius, 21);
    background: #EBF5FF;
    color: #013480;
    .px2font(18);
    font-weight: 700;
    cursor: pointer;
  }
}
::v-deep .el-avatar {
  .px2vh(height, 113);
  .px2vw(width, 100);
}
</style>
