import Vue from 'vue'
import App from './App.vue'
// 全局默认样式
import '@/assets/style/reset.css'
import '@/assets/style/global.css'
import '@/assets/style/confirm.css'
import '@/assets/style/variable.less'
import "@/assets/font/font.css"

// 按需引入 element-ui 组件

import '@/helper/registerElementComponents.js'

// 按需引入echats
import echarts from '@/helper/registerEcharts.js'

import router from './router'
import store from './store'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
