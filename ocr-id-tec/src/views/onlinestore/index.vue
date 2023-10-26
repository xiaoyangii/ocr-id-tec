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
}
</script>
<style scoped lang='less'>
.onlinestore {
  width: 100vw;
  height: 91.5vh;
  background: url('../../assets/images/onlineshop.png') no-repeat;
  background-size: cover;
}
.onlinestore_head {
  float: left;
  width: 100vw;
  .px2vh(height, 320);
  text-align: center;
  &_title {
    .px2vh(margin-top, 130);
    color: #D8AA69;
    .px2font(70);
    font-weight: 700;
  }
  &_stitle {
    .px2vh(margin-top, 40);
    color: #FFF;
    .px2font(40);
  }
}
.onlinestore_content {
  float: left;
  width: 100vw;
  .px2vh(height, 180);
  text-align: center;
  .el-icon-shop {
    position: relative;
    .px2vh(top, 40);
    left: 0;
    background: url('@/assets/images/shopicon.png') center center no-repeat;
    background-size: cover;
    .px2vh(height, 120);
    .px2vw(width, 100);
  }
  &_line1 {
    position: absolute;
    .px2vh(height, 4);
    .px2vw(width, 504);
    .px2vh(top, 50);
    .px2vw(left, -650);
    background: url('@/assets/images/Line1.png') center center no-repeat;
    background-size: cover;
  }
  &_line2 {
    position: absolute;
    .px2vh(height, 4);
    .px2vw(width, 504);
    .px2vh(top, 50);
    .px2vw(left, 250);
    background: url('@/assets/images/Line2.png') center center no-repeat;
    background-size: cover;
  }
}
.onlinestore_foot {
  float: left;
  width: 100vw;
  .px2vh(height, 360);
  text-align: center;
  &_btn {
    position: relative;
    .px2vh(top, 60);
    left: 0;
    .px2vh(height, 112);
    .px2vw(width, 398);
    .px2vh(border-radius, 65.5);
    background: linear-gradient(90deg, #D8AA69 26.01%, #E5A03D 90.33%);
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
    border: none;
    color: #FFF;
    .px2font(42);
    font-weight: 700;
  }
  &_text {
    position: relative;
    .px2vh(top, 100);
    left: 0;
    width: 100%;
    .px2vh(height, 50);
    color: #D8AA69;
    .px2font(40);
    font-weight: 700;
  }
}
</style>
