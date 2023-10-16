<template>
  <div>
    <div class="left">
      <Asider></Asider>
    </div>
    <main class="right">
      <transition appear>
        <router-view :key="$route.path"></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Asider from '@/views/retrievalengine/asiderBar.vue'
export default {
  name: 'retrievalengine',
  components: {
    Asider
  }
};
</script>
<style scoped lang="less">
.left {
  float: left;
  width: 282px;
  height: 877px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
.right {
  margin-left: 285px;
  height: 877px;
  background: #F5F5F5;
}
</style>

