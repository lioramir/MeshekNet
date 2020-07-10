import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Notifications from '@/components/home/Notifications'
import Landing from '@/components/layout/Landing'
import Weather from '@/components/home/Weather'
import MyCrops from '@/components/home/MyCrops'
import MyCoop from '@/components/home/MyCoop'
import Contact from '@/components/home/Contact'

Vue.use(Router)

const routes = [
  {
    path: '/Notifications',
    name: 'Notifications',
    component: Notifications,
    meta: {
      reqAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      reqAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      reqAuth: false
    }
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      reqAuth: false
    }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather,
    meta: {
      reqAuth: false
    }
  },

  {
    path: '/MyCrops',
    name: 'MyCrops',
    component: MyCrops,
    meta: {
      reqAuth: true
    }
  },

  {
    path: '/myCoop',
    name: 'MyCoop',
    component: MyCoop,
    meta: {
      reqAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      reqAuth: true
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//routes guard - only auth users can go to specific components. checked by farm id in store
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.reqAuth)) {
    if (router.app.$store.state.LOADED) {
      next()
    } else {
      next({ name: 'Landing' })
    }
  } else {
    next()
  }
})

export default router
