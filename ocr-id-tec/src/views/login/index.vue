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
  width: 950px;
  height: 958px;
  left: 0px;
  top: 0px;
  background: #EBF5FF;
  border-radius: 0px;
  .logoimg {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 59px;
    top: 25px;
    width: 65px;
    height: 65px;
  }
  .logo {
    position: absolute;
    width: 35px;
    height: 40px;
    left: 140px;
    top: 37px;
    font-family: "zihun";
    font-size: 30px;
    line-height: 40px;
    /* identical to box height */
    letter-spacing: 0.095em;

    color: #013480;
    div {
      position: absolute;
      left: 31px;
      top: 0px;
      width: 68px;
      color: #000;
    }
  }
  img {
    position: absolute;
    width: 810px;
    height: 600px;
    left: 100px;
    top: 160px;
  }
}
.right {
  position: relative;
  height: 686px;
  margin-left: 950px;
  background-color: #fff;
}
</style>