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
    path: '/',
    name: 'welcome',
    component: () => import('../views/WelcomeView.vue'),
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
    path: '/sales',
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
    path: '/how_to_guides',
    name: 'how_to_guides',
    component: () => import('../views/HowToGuidesView.vue'),
    meta: { requiresAuth: true },
  },


  {
    path: '/productOrders',
    name: 'productOrders',
    component: () => import('../views/ProductOrdersList.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/order/add',
    name: 'order_add',
    component: () => import('../views/ProductOrderView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/order/:id',
    name: 'order_view',
    component: () => import('../views/ProductOrderView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/forecasting',
    name: 'forecasting',
    component: () => import('../views/ForecastingList.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/forecast/add',
    name: 'forecast_add',
    component: () => import('../views/ForecastView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/forecast/:id',
    name: 'forecast_view',
    component: () => import('../views/ForecastView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/QBR',
    name: 'QBR',
    component: () => import('../views/QuarterlyBusinessReviewList.vue'),
    props: true,
    meta: { requiresAuth: true },
  } ,
  {
    path: '/QBR/add',
    name: 'QBR_add',
    component: () => import('../views/QuarterlyBusinessReviewView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/QBR/:id',
    name: 'QBR_view',
    component: () => import('../views/QuarterlyBusinessReviewView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/sales_marketing',
    name: 'sales_marketing',
    component: () => import('../views/SalesMarketingView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products_technical',
    name: 'products_technical',
    component: () => import('../views/ProductsTechnicalView.vue'),
    meta: { requiresAuth: true },
  },
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
