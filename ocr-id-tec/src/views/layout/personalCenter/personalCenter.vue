<template>
  <div class="personalcenter">
    <navbar></navbar>
    <div class="body">
      <asiderBar></asiderBar>
      <transition appear>
        <router-view :key="$route.path" class="right"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import navbar from '@/views/layout/navbar.vue';
import asiderBar from '@/views/layout/personalCenter/asiderBar.vue';
export default {
  name: 'personalCenter',
  components: {
    navbar,
    asiderBar
  },
  created () {},
}
</script>
<style scoped lang='less'>
.body {
  .px2vh(height, 990);
  width: 100vw;
  .right {
    .px2vw(margin-left, 317);
    .px2vh(padding-left, 155);
    .px2vh(height, 990);
    background: #FFF;
  }
}
</style>
