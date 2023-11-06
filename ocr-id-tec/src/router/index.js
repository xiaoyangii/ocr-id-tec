import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('@/views/layout/home.vue')
const homepage = () => import('@/views/layout/homepage.vue')
const retrievalengineindex = () => import('@/views/retrievalengine/index.vue')

const bibliography = () => import(/* webpackChunkName: 'bibliography' */ '@/views/retrievalengine/bibliography/bibliography.vue')
const articleDetails = () => import(/* webpackChunkName: 'bibliography' */ '@/views/retrievalengine/bibliography/articleDetails.vue')
const score = () => import(/* webpackChunkName: 'bibliography' */ '@/views/retrievalengine/bibliography/score.vue')
const articleOnline = () => import(/* webpackChunkName: 'bibliography' */ '@/views/retrievalengine/bibliography/articleOnline.vue')

const bulkImport = () => import(/* webpackChunkName: 'bulkImport' */ '@/views/retrievalengine/bulkImport.vue')
const bulkImportImg = () => import(/* webpackChunkName: 'bulkImport' */ '@/views/retrievalengine/bulkImportImg.vue')

const historicalBrowsing = () => import('@/views/retrievalengine/historicalBrowsing.vue')
const myDownload = () => import('@/views/retrievalengine/myDownload.vue')
const myConcern = () => import('@/views/retrievalengine/myConcern.vue')
const myCollection = () => import('@/views/retrievalengine/myCollection.vue')
const mySubscription = () => import('@/views/retrievalengine/mySubscription.vue')
const recyclebin = () => import('@/views/retrievalengine/recyclebin.vue')

const onlinestore = () => import('@/views/onlinestore/index.vue')
const smartcloud = () => import('@/views/smartcloud/index.vue')

const feedback = () => import('@/views/layout/feedback/feedback.vue')
const feedbackBefore = () => import('@/views/layout/feedback/feedbackBefore.vue')
const feedbackAfter = () => import('@/views/layout/feedback/feedbackAfter.vue')

const login = () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
const passwordLogin = () => import(/* webpackChunkName: 'login' */ '@/views/login/passwordLogin.vue')
const codeLogin = () => import(/* webpackChunkName: 'login' */ '@/views/login/codeLogin.vue')
const registered = () => import(/* webpackChunkName: 'login' */ '@/views/login/registered.vue')
const forgetPassword = () => import(/* webpackChunkName: 'login' */ '@/views/login/forgetPassword.vue')

const personalCenter = () => import(/* webpackChunkName: 'personalCenter' */ '@/views/layout/personalCenter/personalCenter.vue')
const personalData = () => import(/* webpackChunkName: 'personalCenter' */ '@/views/layout/personalCenter/personalData.vue')
const homeData = () => import(/* webpackChunkName: 'personalCenter' */ '@/views/layout/personalCenter/homeData.vue')

const settings = () => import('@/views/layout/settings.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
    redirect: '/home/homepage',
    children: [
      // 首页
      {
        path: '/home/homepage',
        name: 'Homepage',
        meta: { index: 0 },
        component: homepage,
      },
      // 检索引擎
      {
        path: '/home/retrievalengine',
        name: 'retrievalengine',
        meta: { index: 1 },
        component: retrievalengineindex,
        redirect: '/home/retrievalengine/bibliography',
        children: [
          // 检索引擎的文献文库
          {
            path: '/home/retrievalengine/bibliography',
            name: 'bibliography',
            component: bibliography
          },
          {
            path: '/home/retrievalengine/bibliography/:id',
            name: 'articleDetails',
            component: articleDetails,
            // 在路由配置文件中设置自定义的路由路径到meta.activeIndex属性中，来控制菜单自定义高亮显示
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          {
            path: '/home/retrievalengine/bibliography/:id/score',
            name: 'score',
            component: score,
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          {
            path: '/home/retrievalengine/bibliography/:id/online',
            name: 'articleOnline',
            component: articleOnline,
            meta: { activeIndex: '/home/retrievalengine/bibliography' }
          },
          // 检索引擎的批量导入
          {
            path: '/home/retrievalengine/bulkimport',
            name: 'bulkImport',
            component: bulkImport
          },
          {
            path: '/home/retrievalengine/bulkimportimg',
            name: 'bulkImportImg',
            component: bulkImportImg,
            meta: { activeIndex: '/home/retrievalengine/bulkimport' }
          },
          // 检索引擎的历史记录
          {
            path: '/home/retrievalengine/historicalBrowsing',
            name: 'history',
            component: historicalBrowsing
          },
          // 检索引擎的我的下载
          {
            path: '/home/retrievalengine/myDownload',
            name: 'myDownload',
            component: myDownload
          },
          // 检索引擎的我的关注
          {
            path: '/home/retrievalengine/myconcern',
            name: 'myConcern',
            component: myConcern
          },
          // 检索引擎的我的收藏
          {
            path: '/home/retrievalengine/mycollection',
            name: 'myCollection',
            component: myCollection
          },
          // 检索引擎的我的订阅
          {
            path: '/home/retrievalengine/mysubscription',
            name: 'mySubscription',
            component: mySubscription
          },
          // 检索引擎回收站
          {
            path: '/home/retrievalengine/recyclebin',
            name: 'recyclebin',
            component: recyclebin
          },
        ]
      },
      {
        path: '/home/onlinestore',
        name: 'onlinestore',
        meta: { index: 2 },
        component: onlinestore,
      },
      {
        path: '/home/smartcloud',
        name: 'smartcloud',
        meta: { index: 3 },
        component: smartcloud
      },
      {
        path: '/home/feedback',
        name: 'feedback',
        component: feedback,
        redirect: "/home/feedback/before",
        children: [
          {
            path: "/home/feedback/before",
            name: "beforeFeedback",
            component: feedbackBefore
          },
          {
            path: "/home/feedback/after",
            name: "afterFeedback",
            component: feedbackAfter
          },
        ]
      }
    ]
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: login,
    redirect: "/passwordlogin",
    children: [
      {
        path: "/passwordlogin",
        name: "passwordLogin",
        component: passwordLogin,
      },
      {
        path: "/codelogin",
        name: "codeLogin",
        component: codeLogin,
      },
      {
        path: "/registered",
        name: "registered",
        component: registered,
      },
      {
        path: "/forgetpassword",
        name: "forgetPassword",
        component: forgetPassword,
      },
    ]
  },
  // 个人中心
  {
    path: '/personalcenter',
    name: 'personalCenter',
    component: personalCenter,
    redirect: '/personalcenter/personaldata',
    children: [
      {
        path: '/personalcenter/personaldata',
        name: 'personalData',
        component: personalData,
      },
      {
        path: '/personalcenter/homedata',
        name: 'homeData',
        component: homeData,
      }
    ]
  },
  // 设置
  {
    path: '/settings',
    name: 'settings',
    component: settings
  },
]

const router = new VueRouter({
  routes
})

export default router
