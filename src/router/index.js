import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import ReportImport from '../views/ReportImport'
import Test2 from "../views/Test2";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    path: '/home',
    name: '报表',
    component: Home,
    hidden: true
  },
  {
    path: '/home',
    name: '报表',
    component: Home,
    children: [
      {
        path: '/reportImport',
        name: '报表导入',
        component: ReportImport
      },
      {
        path: '/test22',
        name: '报表分析',
        component: Test2
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
