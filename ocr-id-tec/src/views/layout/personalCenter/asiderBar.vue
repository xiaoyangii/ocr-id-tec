<template>
  <div class="asiderbar">
    <div class="asiderbar_head">
      <i class="el-icon-arrow-left" @click="$router.push('/home/homepage')" ></i>
      <div class="asiderbar_head_title">个人简介</div>
    </div>
    <div class="asiderbar_bar">
      <el-menu
        router
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#FFF"
        text-color="#000"
        active-text-color="#013480"
      >
        <el-menu-item index="/personalcenter/personaldata">
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="/personalcenter/homedata">
          <span slot="title">主页资料</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'asiderBar',
  computed: {
    activeIndex() {
      const route = this.$route;
      const { path } = route;
      return path;
    }
  },
}
</script>
<style scoped lang='less'>
.asiderbar {
  float: left;
  .px2vw(width, 317);
  .px2vh(height, 877);
}
.asiderbar_head {
  float: left;
  width: 100%;
  .px2vh(height, 100);
  .el-icon-arrow-left {
    .px2vw(width, 35);
    .px2vh(height, 35);
    .px2vw(margin-left, 50);
    .px2vh(line-height, 35);
    .px2vh(margin-top, 39);
    .px2font(30);
    cursor: pointer;
  }
  &_title {
    float: right;
    .px2vw(margin-right, 105);
    .px2vh(margin-top, 33);
    .px2font(28);
    color: #000;
    font-weight: 700;
  }
}
.asiderbar_bar {
  float: left;
  .px2vh(height, 777);
  width: 100%;
  text-align: center;
  .px2vh(padding-top, 30);
  ::v-deep .el-menu-item {
    .px2vh(height, 60);
    .px2vh(line-height, 55);
    .px2font(24);
    font-weight: 700;
  }
}
</style>
