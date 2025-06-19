import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth/Auth.vue'),
    meta: { title: '用户认证' }
  },
  {
    path: '/problems',
    name: 'Problems',
    component: () => import('@/views/problem/ProblemList.vue'),
    meta: { title: '题目练习' }
  },
  {
    path: '/contests',
    name: 'Contests',
    component: () => import('@/views/contest/ContestList.vue'),
    meta: { title: '竞赛' }
  },
  {
    path: '/submissions',
    name: 'Submissions',
    component: () => import('@/views/submission/SubmissionList.vue'),
    meta: { title: '提交记录' }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/community/Community.vue'),
    meta: { title: '社区讨论' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
    meta: { title: '后台管理' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
