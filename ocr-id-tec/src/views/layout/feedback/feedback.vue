<template>
  <div>
    <router-view></router-view>
    <div class="right">
      <div class="right-box">
        <img src="@/assets/images/feedback.png" alt="">
        <div class="right-box-smallbox"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>
<style scoped lang="less">
.right {
  position: relative;
  height: 878px;
  margin-left: 58%;
  background-color: #EBF5FF;
  img {
    position: absolute;
    width: 700px;
    height: 700px;
    left: 70px;
    top: 80px;
    z-index: 100;
  }
  &-box {
    position: absolute;
    width: 800px;
    height: 100%;

    right: 0px;
    top: 0px;

    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 455px 455px;
    &-smallbox {
      position: absolute;
      width: 500px;
      height: 749px;
      left: 170px;
      top: 0px;

      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 345px 345px;
    }
  }
}
</style>
