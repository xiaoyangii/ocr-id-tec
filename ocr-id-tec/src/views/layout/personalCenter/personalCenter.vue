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
  height: 877px;
  width: 100%;
  .right {
    margin-left: 317px;
    padding-left: 155px;
    height: 100%;
    background: #FFF;
  }
}
</style>
