<template>
  <div>
    <div class="left">
      <img src="@/assets/images/logo.png" alt="" class="logoimg">
      <div class="logo">文<div>易通</div></div>
      <img src="@/assets/images/login.png" alt="">
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
}
</script>
<style scoped lang="less">
@import "@/assets/font/font.css";
.left {
  position: absolute;
  width: 50vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: #EBF5FF;
  .logoimg {
    position: absolute;
    .px2vw(width, 65);
    .px2vh(height, 65);
    .px2vw(left, 59);
    .px2vh(top, 40);
  }
  .logo {
    position: absolute;
    .px2vw(width, 35);
    .px2vh(height, 40);
    .px2vw(left, 140);
    .px2vh(top, 37);
    font-family: "zihun";
    .px2font(30);
    .px2vh(line-height, 40);
    /* identical to box height */
    letter-spacing: 0.095em;

    color: #013480;
    div {
      position: absolute;
      .px2vw(width, 68);
      .px2vw(left, 31);
      top: 0px;
      color: #000;
    }
  }
  img {
    position: absolute;
    .px2vw(width, 810);
    .px2vh(height, 600);
    .px2vw(left, 100);
    .px2vh(top, 250);
  }
}
.right {
  position: relative;
  .px2vh(height, 686);
  margin-left: 50vw;
  background-color: #fff;
}
</style>