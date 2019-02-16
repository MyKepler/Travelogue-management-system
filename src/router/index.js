import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import HomePage from '@/pages/HomePage/index'
import Detail from '@/pages/HomePage/detail'
import Send from '@/pages/HomePage/send'
import Login from '@/pages/base/login'
import Register from '@/pages/base/register'
import NotFound from '@/pages/base/404'
import Personal from '@/pages/Personal/index'
import Set from '@/pages/Personal/set'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/send',
      name: 'Send',
      component: Send,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/set',
      name: 'set',
      component: Set,
      meta: {
        requireAuth: false
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.state.user) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
