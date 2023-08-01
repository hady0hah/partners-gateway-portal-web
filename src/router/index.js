import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/deal/add',
    name: 'deal_add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DealView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/deal/:id',
    name: 'deal_view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DealView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'sales',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SalesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/documentation',
    name: 'documentation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DocumentationView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mdf',
    name: 'mdf',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MDFView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mdf/add',
    name: 'mdf_add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EventView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/mdf/:id',
    name: 'mdf_view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EventView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/demo',
    name: 'demo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoListView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/demo/add',
    name: 'demo_add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/demo/:id',
    name: 'demo_view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoView.vue'),
    props: true,
    meta: { requiresAuth: true },
  }
  ,
  {
    path: '/program_overview',
    name: 'program_overview',
    component: () => import('../views/ProgramView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/program/add',
    name: 'program_add',
    component: () => import('../views/ProgramAddView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/program/:id',
    name: 'program_view',
    component: () => import('../views/ProgramView.vue'),
    props: true,
    meta: { requiresAuth: true },
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.StateUser != null) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
