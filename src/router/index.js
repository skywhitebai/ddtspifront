import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../views/Login.vue'
import Main from '../components/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: '主页',
    component: Home,
    children: [{
      path: '/main',
      name: '首页',
      component: Main
    }, {
      path: '/amazonAuth',
      name: '授权管理',
      component: () => import('../components/AmazonAuth.vue')
    },
    ]
  },  
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/amazonSellerAuth',
    name: '授权信息',
    component: () => import('../views/AmazonSellerAuth.vue')
  }, {
    path: '/',
    name: '首页',
    component: () => import('../views/Index.vue'),
    children:[]
  }
]
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
