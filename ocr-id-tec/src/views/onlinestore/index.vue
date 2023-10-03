<template>
  <div class="onlinestore">
    <div class="onlinestore_head">
      <div class="onlinestore_head_title">加入文易通VIP，尊享账号等级配置权益</div>
      <div class="onlinestore_head_stitle">-新会员·新服务-</div>
    </div>
    <div class="onlinestore_content">
      <i class="el-icon-shop">
        <div class="onlinestore_content_line1"></div>
        <div class="onlinestore_content_line2"></div>
      </i>
    </div>
    <div class="onlinestore_foot">
      <button class="onlinestore_foot_btn">加入VIP</button>
      <div class="onlinestore_foot_text">海量论文、智慧分屏、超大容量...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'onlinestore',
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
}
</script>
<style scoped lang='less'>
.onlinestore {
  width: 100%;
  height: 91.5vh;
  background: url('../../assets/images/onlineshop.png') no-repeat;
}
.onlinestore_head {
  float: left;
  width: 100%;
  height: 320px;
  text-align: center;
  &_title {
    margin-top: 130px;
    color: #D8AA69;
    font-size: 70px;
    font-weight: 700;
  }
  &_stitle {
    margin-top: 40px;
    color: #FFF;
    font-size: 40px;
  }
}
.onlinestore_content {
  float: left;
  width: 100%;
  height: 180px;
  text-align: center;
  .el-icon-shop {
    position: relative;
    top: 40px;
    left: 0;
    background: url('@/assets/images/shopicon.png') center center no-repeat;
    height: 105px;
    width: 100px;
  }
  &_line1 {
    position: absolute;
    top: 50px;
    left: -650px;
    width: 504px;
    height: 4px;
    background: url('@/assets/images/Line1.png') center center no-repeat;
  }
  &_line2 {
    position: absolute;
    top: 50px;
    left: 250px;
    width: 504px;
    height: 4px;
    background: url('@/assets/images/Line2.png') center center no-repeat;
  }
}
.onlinestore_foot {
  float: left;
  width: 100%;
  height: calc(100% - 500px);
  text-align: center;
  &_btn {
    position: relative;
    top: 60px;
    left: 0;
    width: 398px;
    height: 112px;
    border-radius: 65.5px;
    background: linear-gradient(90deg, #D8AA69 26.01%, #E5A03D 90.33%);
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
    border: none;
    color: #FFF;
    font-size: 42px;
    font-weight: 700;
  }
  &_text {
    position: relative;
    top: 100px;
    left: 0;
    width: 100%;
    height: 50px;
    color: #D8AA69;
    font-size: 40px;
    font-weight: 700;
  }
}
</style>
