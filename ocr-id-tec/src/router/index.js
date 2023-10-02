import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/layout/home.vue'),
    redirect: '/home/homepage',
    children: [
      // 首页
      {
        path: '/home/homepage',
        name: 'Homepage',
        meta: { index: 0 },
        component: () => import('@/views/layout/homepage.vue'),
      },
      // 检索引擎
      {
        path: '/home/retrievalengine',
        name: 'retrievalengine',
        meta: { index: 1 },
        component: () => import('@/views/retrievalengine/index.vue'),
        redirect: '/home/retrievalengine/bibliography',
        children: [
          // 检索引擎的文献文库
          {
            path: '/home/retrievalengine/bibliography',
            name: 'bibliography',
            component: () => import('@/views/retrievalengine/bibliography/bibliography.vue')
          },
          {
            path: '/home/retrievalengine/bibliography/:id',
            name: 'articleDetails',
            component: () => import('@/views/retrievalengine/bibliography/articleDetails.vue'),
            // 在路由配置文件中设置自定义的路由路径到meta.activeIndex属性中，来控制菜单自定义高亮显示
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          {
            path: '/home/retrievalengine/bibliography/:id/score',
            name: 'score',
            component: () => import('@/views/retrievalengine/bibliography/score.vue'),
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          {
            path: '/home/retrievalengine/bibliography/:id/online',
            name: 'articleOnline',
            component: () => import('@/views/retrievalengine/bibliography/articleOnline.vue'),
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          // 检索引擎的批量导入
          {
            path: '/home/retrievalengine/bulkImport',
            name: 'bulkImport',
            component: () => import('@/views/retrievalengine/bulkImport.vue')
          },
          // 检索引擎的历史记录
          {
            path: '/home/retrievalengine/historicalBrowsing',
            name: 'history',
            component: () => import('@/views/retrievalengine/historicalBrowsing.vue')
          },
          // 检索引擎的我的下载
          {
            path: '/home/retrievalengine/myDownload',
            name: 'myDownload',
            component: () => import('@/views/retrievalengine/myDownload.vue')
          },
          // 检索引擎的我的关注
          {
            path: '/home/retrievalengine/myconcern',
            name: 'myConcern',
            component: () => import('@/views/retrievalengine/myConcern.vue')
          },
          // 检索引擎的我的收藏
          {
            path: '/home/retrievalengine/mycollection',
            name: 'myCollection',
            component: () => import('@/views/retrievalengine/myCollection.vue')
          },
          // 检索引擎的我的订阅
          {
            path: '/home/retrievalengine/mysubscription',
            name: 'mySubscription',
            component: () => import('@/views/retrievalengine/mySubscription.vue')
          },
          // 检索引擎回收站
          {
            path: '/home/retrievalengine/recyclebin',
            name: 'recyclebin',
            component: () => import('@/views/retrievalengine/recyclebin.vue')
          },
        ]
      },
      {
        path: '/home/onlinestore',
        name: 'onlinestore',
        meta: { index: 2 },
        component: () => import('@/views/onlinestore/index.vue'),
      },
      {
        path: '/home/smartcloud',
        name: 'smartcloud',
        meta: { index: 3 },
        component: () => import('@/views/smartcloud/index.vue'),
      },
      {
        path: '/home/feedback',
        name: 'feedback',
        component: () => import('@/views/layout/feedback/feedback.vue'),
        redirect: "/home/feedback/before",
        children: [
          {
            path: "/home/feedback/before",
            name: "beforeFeedback",
            component: () => import('@/views/layout/feedback/feedbackBefore.vue'),
          },
          {
            path: "/home/feedback/after",
            name: "afterFeedback",
            component: () => import('@/views/layout/feedback/feedbackAfter.vue'),
          },
        ]
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    redirect: "/passwordlogin",
    children: [
      {
        path: "/passwordlogin",
        name: "passwordLogin",
        component: () => import("@/views/login/passwordLogin.vue"),
      },
      {
        path: "/codelogin",
        name: "codeLogin",
        component: () => import("@/views/login/codeLogin.vue"),
      },
      {
        path: "/registered",
        name: "registered",
        component: () => import("@/views/login/registered.vue"),
      },
      {
        path: "/forgetpassword",
        name: "forgetPassword",
        component: () => import("@/views/login/forgetPassword.vue"),
      },
    ]
  },
  // 个人中心
  {
    path: '/personalcenter',
    name: 'personalCenter',
    component: () => import('@/views/layout/personalCenter/personalCenter.vue'),
  },
  // 设置
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/layout/settings.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
