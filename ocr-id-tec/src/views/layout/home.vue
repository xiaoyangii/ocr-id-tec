<template>
  <div class="container">
    <Navbar class="header"/>
    <div class="panel">
      <transition appear>
        <router-view :key="$route.path"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/layout/navbar.vue'
export default {
  name: 'home',
  components: {
    Navbar
  },
}
</script>
<style scoped lang='less'>
.header {
  position: fixed;
  width: 100%;
  right: 0;
  top: 0;
  z-index: 999;//一直将导航栏置于最顶层
}
.panel {
  width: 100%;
  margin-top: 80px;
}
</style>
