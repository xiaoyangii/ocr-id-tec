<template>
  <div>
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#F5F5F5"
      text-color="black"
      active-text-color="#043492"
    >
      <el-menu-item index="/home/retrievalengine/bibliography">
        <span slot="title">文献文库</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/bulkimport">
        <span slot="title">批量导入</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/historicalbrowsing">
        <span slot="title">历史浏览</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/mydownload">
        <span slot="title">我的下载</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/myconcern">
        <span slot="title">我的关注</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/mycollection">
        <span slot="title">我的收藏</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/mysubscription">
        <span slot="title">我的订阅</span>
      </el-menu-item>
      <el-menu-item index="/home/retrievalengine/recyclebin">
        <span slot="title">回收站</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'asiderBar',
  data() {
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {
    activeIndex() {
      const route = this.$route;
      const { meta, path } = route;
      const reg = new RegExp("/home/retrievalengine/", "g");
      // if(this.$route.path.match(reg)) {
      //   return path;
      // }
      if (meta.activeIndex) {
        return meta.activeIndex;
      }
      return path;
    }
  },
  methods: {

  },
};
</script>
<style scoped lang="less">
.el-menu-vertical-demo {
  margin-top: 65px;
  background-color: #fff !important;
}
::v-deep .el-menu-item {
  height: 93px;
  line-height: 93px;
  text-align: center;
  background-color: #FFF !important;
  span {
    font-size: 26px;
  }
}
::v-deep .el-menu-item.is-active {
  font-weight: 700;
  color: #1559DD !important;
  background-color: #EBF5FF !important;
}
::v-deep .el-menu-item:hover{  
  outline: 0 !important;  
  background-color: #EBF5FF !important;  
}
</style>

