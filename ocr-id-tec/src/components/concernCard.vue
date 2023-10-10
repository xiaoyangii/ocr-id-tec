<template>
  <div class="concernCard" v-if="item">
    <div class="card_left">
      <el-avatar :size="100" :src="avatar"></el-avatar>
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
  width: 570px;
  height: 100px;
}
.card_left {
  float: left;
  height: 100%;
  width: 100px;
}
.card_middle {
  float: left;
  margin-left: 10px;
  height: 100%;
  width: 360px;
  &_name {
    margin-top: 7px;
    color: #000;
    font-size: 26px;
    font-weight: 700;
  }
  &_adr {
    margin-top: 5px;
    color: #000;
    font-size: 18px;
  }
  &_decs {
    margin-top: 5px;
    color: #000;
    font-size: 18px;
  }
}
.card_right {
  float: right;
  height: 100%;
  width: 100px;
  line-height: 105px;
  &_concern {
    border: none;
    width: 100px;
    height: 42px;
    border-radius: 21px;
    background: #EBF5FF;
    color: #013480;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>
