<template>
  <div class="asiderbar">
    <div class="asiderbar_head">
      <i class="el-icon-arrow-left"></i>
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
  height: 877px;
  width: 317px;
}
.asiderbar_head {
  float: left;
  width: 100%;
  height: 100px;
  .el-icon-arrow-left {
    font-size: 30px;
    margin-top: 39px;
    margin-left: 50px;
    height: 35px;
    width: 35px;
    line-height: 35px;
  }
  &_title {
    float: right;
    margin-right: 105px;
    margin-top: 33px;
    color: #000;
    font-size: 28px;
    font-weight: 700;
  }
}
.asiderbar_bar {
  float: left;
  height: calc(100% - 100px);
  width: 100%;
  text-align: center;
  padding-top: 30px;
  ::v-deep .el-menu-item {
    height: 60px;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>
