import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import CreateUser from '../views/CreateUser.vue'
import Dashboard from '../views/Dashboard.vue'
import DelayTaskView from '../views/DelayTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/createuser',
      name: 'createuser',    
      component: () => import('../views/CreateUser.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',    
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/delaytaskview',
      name: 'delaytaskview',    
      component: () => import('../views/DelayTaskView.vue')
    },
  ]
})

export default router
