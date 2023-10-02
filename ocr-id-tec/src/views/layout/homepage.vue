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
        <div class="right-box-smallbox"></div>
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
  data() {
    return {

    };
  },
  methods: {
    jump() {
      this.$router.push("/retrievalengine");
    }
  },
};
</script>
<style scoped lang="less">
.box {
  display: inline-grid;
  width: 100%;
  grid-template-columns: 2fr 1.5fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "left right"
    "left1 right1"
    "left2 right2";
  height: 100%;
}
.left {
  grid-area: left;
  display: grid;
  grid-template-rows:0.7fr 0.7fr 1fr;
  height: calc(100%);
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    margin-top: 130px;
    margin-left: 120px;
    font-family: "MicrosoftYaHei";
    font-weight: 700;
    font-size: 70px;
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    margin-left: 120px;
    font-family: "MicrosoftYaHei";
    font-size: 34px;
    line-height: 53px;
    /* identical to box height */
    color: #272727;
  }
}
::v-deep .el-button {
  margin-left: 300px;
  width: 250px !important;
  height: 100px;
  margin-top: 30px;
  background: #013480;
  border-radius: 50px;
  font-family: "MicrosoftYaHei";
  font-size: 32px;
  font-weight: 650;
  letter-spacing: 0.08em;
}
.right {
  grid-area: right;
  background-color: #EBF5FF;
  height: calc(100%);
  img {
    position: absolute;
    left: 122px;
    top: 60px;
    width: 559px;
    height: 559px;
    z-index: 100;
  }
  &-box {
    position: relative;
    width: 818px;
    height: 877px;
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 455px 455px;
    &-smallbox {
      position: absolute;
      width: 423px;
      height: 649px;
      left: 210px;
      top: 0px;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 345px 345px;
    }
  }
}
.left1 {
  grid-area: left1;
  background: #EBF5FF;
  height: calc(100%);
  justify-items: end;
  img {
    position: absolute;
    left: 130px;
    top: 70px;
    width: 559px;
    height: 559px;
    z-index: 100;
  }
  &-box {
    position: relative;
    width: 780px;
    height: 877px;
    margin-top: 8px;
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 455px 455px;
    &-smallbox {
      position: absolute;
      width: 423px;
      height: 649px;
      left: 190px;
      top: 0px;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 345px 345px;
    }
  }
}
.right1 {
  grid-area: right1;
  display: grid;
  grid-template-rows:1fr 2fr;
  height: calc(100%);
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    margin-top: 150px;
    font-weight: 700;
    font-size: 70px;
    line-height: 61px;
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    margin-top: 20px;
    font-size: 34px;
    line-height: 53px;
    /* identical to box height */
    color: #272727;
  }
}
.left2 {
  grid-area: left2;
  display: grid;
  grid-template-rows:0.7fr 1fr 1fr;
  height: calc(100%);
  width: 100%;
  background: #EBF5FF;
  margin: 0px auto;
  text-align: left;
  .text1 {
    margin-top: 100px;
    margin-left: 120px;
    font-weight: 700;
    font-size: 70px;
    line-height: 61px;
    letter-spacing: 0.1em;
    /* identical to box height */
    color: #272727;
  }
  .text2 {
    margin-left: 120px;
    font-size: 34px;
    line-height: 53px;
    /* identical to box height */
    color: #272727;
  }
}
.right2 {
  grid-area: right2;
  background-color: #EBF5FF;
  height: calc(100%);
  img {
    position: absolute;
    left: 122px;
    top: 60px;
    width: 559px;
    height: 559px;
    z-index: 100;
  }
  &-box {
    position: relative;
    width: 818px;
    height: 877px;
    background: linear-gradient(89.33deg, rgba(221, 237, 251, 0.8) 4.51%, rgba(177, 217, 254, 0.408333) 74.62%, rgba(30, 124, 210, 0) 147.72%);
    border-radius: 0px 0px 455px 455px;
    &-smallbox {
      position: absolute;
      width: 423px;
      height: 649px;
      left: 210px;
      top: 0px;
      background: linear-gradient(88.72deg, #EBF5FF -7.97%, #B0D8FC 98.8%);
      border-radius: 0px 0px 345px 345px;
    }
  }
}
</style>
