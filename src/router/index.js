import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/create',
    name: '扩缩容任务',
    meta: { title: '扩缩容任务', icon: 'task' },
    children: [
      {
        path: '/task/create/once',
        name: 'createOnceTask',
        component: () => import('@/views/elasticTask/createOnceTask'),
        meta: { title: '立即扩缩容', icon: '' }
      },
      {
        path: '/task/create/cron',
        name: 'createCronTask',
        component: () => import('@/views/elasticTask/createCronTask'),
        meta: { title: '定时扩缩容', icon: '' }
      },
      {
        path: '/task/list',
        name: 'taskList',
        component: () => import('@/views/elasticTask/taskList'),
        meta: { title: '任务列表', icon: '' }
      }
    ]
  },
  {
    path: '/cluster',
    component: Layout,
    redirect: '/cluster/list',
    name: '集群管理',
    meta: { title: '集群管理', icon: 'cluster' },
    children: [{
      path: '/cluster/create',
      name: 'clusterCreate',
      component: () => import('@/views/cluster/createOrEdit'),
      meta: { title: '创建集群', icon: '' }
    }, {
      path: '/cluster/list',
      name: 'clusterList',
      component: () => import('@/views/cluster/list'),
      meta: { title: '集群列表', icon: '' }
    }, {
      path: '/cluster/edit/:name',
      name: 'clusterEdit',
      component: () => import('@/views/cluster/createOrEdit'),
      meta: { title: '编辑集群', icon: '' },
      hidden: true
    }, {
      path: '/cluster/info/:name',
      name: 'clusterInfo',
      component: () => import('@/views/cluster/detail'),
      meta: { title: '集群信息', icon: '' },
      hidden: true
    }]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/list',
    name: '服务部署',
    meta: { title: '服务部署', icon: 'service' },
    children: [{
      path: '/service/create',
      name: 'serviceCreate',
      component: () => import('@/views/service/create'),
      meta: { title: '创建服务', icon: '' }
    }, {
      path: '/service/list',
      name: 'serviceList',
      component: () => import('@/views/service/list'),
      meta: { title: '服务列表', icon: '' }
    }, {
      path: '/service/history/:service_name/:service_cluster_id',
      name: 'serviceHistory',
      component: () => import('@/views/service/history'),
      meta: { title: '扩缩容记录', icon: '' },
      hidden: true
    }, {
      path: '/service/:service_name/:service_cluster_id/template',
      name: 'templateList',
      component: () => import('@/views/template/index'),
      meta: { title: '扩缩容流程列表', icon: '' },
      hidden: true
    }, {
      path: '/service/:service_name/:service_cluster_id/template-create',
      name: 'templateCreate',
      component: () => import('@/views/template/create'),
      meta: { title: '创建扩缩容流程', icon: '' },
      hidden: true
    }, {
      path: '/service/template-edit/:service_name/:tmpl_expand_id',
      name: 'templateEdit',
      component: () => import('@/views/template/edit'),
      meta: { title: '编辑扩缩容流程', icon: '' },
      hidden: true
    }]
  },
  {
    path: '/instance',
    component: Layout,
    redirect: '/instance',
    children: [{
      path: '/instance',
      name: 'instanceList',
      component: () => import('@/views/instance/list'),
      meta: { title: '云服务器', icon: 'instance' }
    }]
  },
  {
    path: '/provider',
    component: Layout,
    redirect: '/provider',
    children: [{
      path: '/provider',
      name: 'provider',
      component: () => import('@/views/cloudAccount/index'),
      meta: { title: '云厂商账户', icon: 'cloudAccount' }
    }]
  },
  {
    path: '/billing',
    component: Layout,
    redirect: '/billing',
    children: [{
      path: '/billing',
      name: 'billing',
      component: () => import('@/views/billing/index'),
      meta: { title: '费用管理', icon: 'billing' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account',
    children: [{
      path: 'account',
      name: 'account',
      component: () => import('@/views/account/index'),
      meta: { title: '账户管理', icon: 'account' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
