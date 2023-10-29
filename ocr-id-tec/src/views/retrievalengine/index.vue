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
  .px2vh(height, 990);
  .px2vw(width, 282);
  background-color: #fff;
  box-shadow: 0px 0px 1vw 0px rgba(0, 0, 0, 0.25);
}
.right {
  .px2vh(height, 990);
  .px2vw(margin-left, 285);
  background: #F5F5F5;
}
</style>

