import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ViewTask from '../views/ViewTask.vue'

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
      path: '/viewtask/:id',
      name: 'ViewTask',    
      component: () => import('../views/ViewTask.vue')
    },      
  ]
})

export default router
