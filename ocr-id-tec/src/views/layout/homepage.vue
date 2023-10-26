<template>
  <div class="box">
    <div class="left">
      <div class="text1">一站式智能检索系统</div>
      <div class="text2">
        <p>一个为医药行业开发的平台</p>
        <p>集文献管理、图像识别、智慧云端、在线阅读等功能于一体</p>
        <p>为您打造智能检索系统</p>
      </div>
      <el-button class="jump-button" type="primary" @click="jump"
        >立即使用
      </el-button>
    </div>
    <div class="right">
      <div class="right-box">
        <img src="@/assets/images/home1.png" alt="">
        <div class="right-box-smallbox"></div>
      </div>
    </div>
    <div class="left1">
      <div class="left1-box">
        <img src="@/assets/images/home2.png" alt="">
        <div class="left1-box-smallbox"></div>
      </div>
    </div>
    <div class="right1">
      <div class="text1">满足你的个性化需求</div>
      <div class="text2">
        <p>· 海量文献库在线检索，一键添加至个人收藏</p>
        <p>· 支持多种格式文件在线阅读</p>
        <p>· 智慧云端提供个性化存储，不用担心文件丢失</p>
        <p>· 支持文献下载，满足多方位要求</p>
      </div>
    </div>
    <div class="left2">
      <div class="text1">智能打造便捷高效平台</div>
      <div class="text2">
        <p>· 关键词检索，精准查询</p>
        <p>· 智能精准读取文献关键信息，大大降低人力物力消耗</p>
        <p>· 团队协作，便捷高效</p>
        <p>· 分类归档，条理有序</p>
      </div>
      <el-button class="jump-button" type="primary" @click="jump"
        >立即使用
      </el-button>
    </div>
    <div class="right2">
      <div class="right2-box">
        <img src="@/assets/images/home3.png" alt="">
        <div class="right-box-smallbox"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  methods: {
    jump() {
      this.$router.push("/home/retrievalengine/bibliography");
    }
  },
};
</script>
<style scoped lang="less">
.box {
  display: inline-grid;
  width: 100vw;
  grid-template-columns: 2fr 1.5fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "left right"
    "left1 right1"
    "left2 right2";
  height: 100vh;
}
.left {
  grid-area: left;
  display: grid;
  grid-template-rows:0.7fr 0.7fr 1fr;
  height: 100%;
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    .px2vh(margin-top, 150);
    // margin-top: 130px;
    .px2vw(margin-left, 120);
    font-family: "MicrosoftYaHei";
    font-weight: 700;
    .px2font(70);
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    .px2vw(margin-left, 120);
    font-family: "MicrosoftYaHei";
    .px2font(34);
    .px2vw(line-height, 53);
    /* identical to box height */
    color: #272727;
  }
}
::v-deep .el-button {
  .px2vw(margin-left, 300);
  .px2vw(width, 250);
  .px2vh(height, 100);
  .px2vh(margin-top, 100);
  background: #013480;
  .px2vh(border-radius, 50);
  font-family: "MicrosoftYaHei";
  .px2font(32);
  font-weight: 650;
  letter-spacing: 0.08em;
}
.right {
  grid-area: right;
  background-color: #EBF5FF;
  height: calc(100%);
  img {
    position: absolute;
    .px2vw(left, 130);
    .px2vh(top, 80);
    .px2vw(width, 559);
    .px2vh(height, 559);
    z-index: 100;
  }
  &-box {
    position: relative;
    .px2vw(width, 818);
    .px2vh(height, 993);
    float: right;
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 20vw 20vw;
    &-smallbox {
      position: absolute;
      .px2vw(width, 423);
      .px2vh(height, 780);
      .px2vw(left, 200);
      top: 0px;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0 0 15vw 15vw;
    }
  }
}
.left1 {
  grid-area: left1;
  background: #EBF5FF;
  height: 92vh;
  justify-items: end;
  img {
    position: absolute;
    .px2vw(width, 559);
    .px2vh(height, 559);
    .px2vh(top, 100);
    .px2vw(left, 120);
    z-index: 100;
  }
  &-box {
    position: relative;
    .px2vw(width, 818);
    .px2vh(height, 990);
    .px2vh(margin-top, 8);
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 20vw 20vw;
    &-smallbox {
      position: absolute;
      .px2vw(width, 423);
      .px2vh(height, 780);
      .px2vw(left, 195);
      top: 0;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 15vw 15vw;
    }
  }
}
.right1 {
  grid-area: right1;
  display: grid;
  grid-template-rows:1fr 2fr;
  height: 100%;
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    .px2vh(margin-top, 170);
    .px2font(70);
    font-weight: 700;
    .px2vh(line-height, 120);
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    .px2vh(margin-top, 50);
    .px2vh(line-height, 53);
    .px2font(34);
    color: #272727;
  }
}
.left2 {
  grid-area: left2;
  display: grid;
  grid-template-rows: 0.7fr 1.5fr 1.4fr;
  align-items: center;
  height: calc(85%);
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    .px2vw(margin-left, 120);
    .px2vh(margin-top, 150);
    .px2vh(line-height, 80);
    .px2font(70);
    font-weight: 700;
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    .px2vh(margin-top, 50);
    .px2vw(margin-left, 120);
    .px2vh(line-height, 60);
    .px2font(34);
    /* identical to box height */
    color: #272727;
  }
  .el-button {
    margin-top: 0;
  }
}
.right2 {
  grid-area: right2;
  background-color: #EBF5FF;
  height: calc(85%);
  img {
    position: absolute;
    .px2vh(top, 70);
    .px2vw(left, 130);
    .px2vh(height, 559);
    .px2vw(width, 559);
    z-index: 100;
  }
  &-box {
    position: relative;
    .px2vh(height, 990);
    .px2vw(width, 818);
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 20vw 20vw;
    &-smallbox {
      position: absolute;
      .px2vw(left, 230);
      .px2vw(width, 423);
      .px2vh(height, 700);
      top: 0px;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 15vw 15vw;
    }
  }
}
</style>
