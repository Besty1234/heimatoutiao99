import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'

// 路由
import Layout from '@/views/Layout'
import Article from '@/views/Article'
import User from '@/views/User'
import Login from '@/views/Login'
import Register from '@/views/Register'
import ask from '@/views/ask'
import vide from '@/views/vide'

// import Router from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [

    {
      path: '/',
      component: Layout,

      redirect: '/Article',

      children: [
        {
          path: '/Article',
          component: Article
        },
        {
          name: 'User',
          path: '/User',
          component: User
        },
        {
          path: '/ask',
          component: ask
        },
        {
          path: '/vide',
          component: vide
        }

      ]
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    }

  ]
})

const souwei = ['/login', '/ask', '/vide', '/article', '/Article']

router.beforeEach((to, from, next) => {
  console.log(to.path)

  if (store.state.login.tokenx) {
    next()
  } else {
    if (souwei.includes(to.path)) {
      next()
    } else {
      next({
        path: '/login',

        query: {
          x: `${to.path}`
        }
      })
      Toast('重新登录谢谢')
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
