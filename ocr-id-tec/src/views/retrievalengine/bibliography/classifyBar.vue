<template>
  <div>
    <el-menu
      index
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#FFF"
      text-color="#013480"
      active-text-color="black"
    >
      <p class="text">分类导航</p>
      <el-menu-item index="临床医学">
        <span slot="title">临床医学</span>
      </el-menu-item>
      <el-menu-item index="基础医学">
        <span slot="title">基础医学</span>
      </el-menu-item>
      <el-menu-item index="法医学">
        <span slot="title">法医学</span>
      </el-menu-item>
      <el-menu-item index="检验医学">
        <span slot="title">检验医学</span>
      </el-menu-item>
      <el-menu-item index="预防医学">
        <span slot="title">预防医学</span>
      </el-menu-item>
      <el-menu-item index="保健医学">
        <span slot="title">保健医学</span>
      </el-menu-item>
      <el-menu-item index="康复医学">
        <span slot="title">康复医学</span>
      </el-menu-item>
      <el-menu-item index="其他">
        <span slot="title">其他</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'classifyBar',
  data() {
    return {
      activeIndex: ""
    }
  },
};
</script>
<style scoped lang="less">
.el-menu-vertical-demo {
  background-color: #fff !important;
  border-radius: 9px;
  .text {
    color: #000;
    font-size: 26px;
    text-align: center;
  }
}
::v-deep .el-menu-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #FFF !important;
  span {
    font-size: 20px;
  }
}
::v-deep .el-menu-item.is-active {
  font-weight: 700;
  background-color: #EBF5FF !important;
}
::v-deep .el-menu-item:hover{  
  outline: 0 !important;  
  background-color: #EBF5FF !important;
}
</style>

