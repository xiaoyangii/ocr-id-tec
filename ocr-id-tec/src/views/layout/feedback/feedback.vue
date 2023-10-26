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
}
</script>
<style scoped lang="less">
.right {
  position: relative;
  .px2vh(height, 990);
  margin-left: 58%;
  background-color: #EBF5FF;
  img {
    position: absolute;
    .px2vh(height, 700);
    .px2vw(width, 700);
    .px2vh(top, 140);
    .px2vw(right, 80);
    z-index: 100;
  }
  &-box {
    position: absolute;
    .px2vh(height, 878);
    height: 100%;
    right: 0px;
    top: 0px;
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 20vw 20vw;
    &-smallbox {
      position: absolute;
      top: 0px;
      .px2vh(height, 749);
      .px2vw(width, 500);
      .px2vw(left, 170);
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 15vw 15vw;
    }
  }
}
::v-deep .el-form-item__content {
  .px2vh(line-height, 40);
}
::v-deep .el-input {
  .px2font(20);
}
</style>
