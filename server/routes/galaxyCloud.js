const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')
const routerApi = new Router({
  prefix: '/api/v1/galaxy_cloud'
})

routerApi.get('/kubernetes', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/kubernetes`,
      method: 'GET',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/eci/cluster', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster`,
      method: 'GET',
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/cluster/batch/create', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster/batch/create`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/cluster/batch/delete', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster/batch/delete`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/instance/expand', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/instance/expand`,
      method: 'POST',
      body: ctx.request.body
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/instance/shrink', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/instance/shrink`,
      method: 'POST',
      body: ctx.request.body
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/summary', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: '',
    pager: {
      total: 3,
      page_size: 10,
      page_number: 1
    },
    clusters: [{
      cluster_id: 1,
      cluster_name: 'BridgxCluster',
      all_cpu_cores: 1000,
      free_cpu_cores: 680,
      all_memory_gi: 2000,
      free_memory_gi: 1200,
      all_disk_gi: 2,
      free_disk_gi: 1.24,
      max_unallocated_cpu_in_node: '',
      max_unallocated_memory_in_node: '',
      max_unallocated_storage_in_node: '',
      pod_count: 20,
      work_count: 3,
      master_count: 3,
      created_user: 'root',
      created_time: '',
      status: 'Running'
    }, {
      cluster_id: 2,
      cluster_name: 'BridgxCluster',
      all_cpu_cores: 1000,
      free_cpu_cores: 650,
      all_memory_gi: 2000,
      free_memory_gi: 1240,
      all_disk_gi: 2,
      free_disk_gi: 1.24,
      max_unallocated_cpu_in_node: '',
      max_unallocated_memory_in_node: '',
      max_unallocated_storage_in_node: '',
      pod_count: 20,
      work_count: 10,
      master_count: 3,
      created_user: 'root',
      created_time: '',
      status: 'Running'
    }]
  }
  // {
  //   status: 'running',
  //     ip_address: '10.192.16.201',
  //   host_name: 'host_name',
  //   cluster_name: 'BridgXCluster',
  //   all_cpu_cores: 1000,
  //   allocated_cpu_cores: 300,
  //   all_memory_gi: 1000,
  //   allocated_memory_gi: 400,
  //   all_disk_gi: 2000,
  //   allocated_disk_gi: 1000,
  //   machine_type: '',
  //   cloud_provider: 'AlibabaCloud',
  //   role: 'master'
  // }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster/summary`,
  //     qs: ctx.query,
  //     json: true
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.get('/cluster/bridgx/available_clusters', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: '',
    pager: {
      total: 5,
      page_size: 10,
      page_number: 1
    },
    clusters: [{
      cluster_name: 'cluster 01',
      cloud_type: 'AlibabaCloud',
      nodes: ['10.1.4.10', '10.1.4.12', '10.1.4.14', '10.1.4.16', '10.1.4.18']
    }, {
      cluster_name: 'cluster 02',
      cloud_type: 'AlibabaCloud',
      nodes: ['10.1.4.10', '10.1.4.12']
    }, {
      cluster_name: 'cluster 03',
      cloud_type: 'AlibabaCloud',
      nodes: ['10.1.4.10']
    }, {
      cluster_name: 'cluster 04',
      cloud_type: 'AlibabaCloud',
      nodes: []
    }, {
      cluster_name: 'cluster 05',
      cloud_type: 'AlibabaCloud',
      nodes: []
    }]
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster/bridgx/available_clusters`,
  //     qs: ctx.query,
  //     json: true
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.post('/cluster', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: ''
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster`,
  //     method: 'POST',
  //     body: ctx.request.body
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.get('/cluster/summary/:clusterId', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: '',
    cluster: {
      cluster_id: 2,
      cluster_name: 'BridgxCluster',
      all_cpu_cores: 1000,
      free_cpu_cores: 650,
      all_memory_gi: 2000,
      free_memory_gi: 1240,
      all_disk_gi: 2,
      free_disk_gi: 1.24,
      max_unallocated_cpu_in_node: '',
      max_unallocated_memory_in_node: '',
      max_unallocated_storage_in_node: '',
      pod_count: 20,
      work_count: 10,
      master_count: 3,
      created_user: 'root',
      created_time: '2021-11-25  20:11:12',
      status: 'Running'
    }
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster/summary/${ctx.params.clusterId}`,
  //     json: true
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.get('/cluster/nodes/:clusterId', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: '',
    pager: {
      total: 4,
      page_number: 1,
      page_size: 10
    },
    nodes: [{
      status: 'common',
      ip_address: '10.1.4.10',
      host_name: 'i-2ze3rehoi7mohouu5cgi',
      cluster_name: 'cluster05',
      all_cpu_cores: 48,
      free_cpu_cores: 28,
      all_memory_gi: 96,
      free_memory_gi: 65,
      all_disk_gi: 2000,
      free_disk_gi: 1500,
      machine_type: 'ecs.s6-c1m1.large',
      cloud_provider: 'AlibabaCloud',
      role: 'master'
    }, {
      status: 'common',
      ip_address: '10.1.4.12',
      host_name: 'i-2ze3rehoi7mohouu2cgi',
      cluster_name: 'cluster05',
      all_cpu_cores: 48,
      free_cpu_cores: 28,
      all_memory_gi: 96,
      free_memory_gi: 65,
      all_disk_gi: 2000,
      free_disk_gi: 1500,
      machine_type: 'ecs.s6-c1m1.large',
      cloud_provider: 'AlibabaCloud',
      role: 'worker'
    }, {
      status: 'common',
      ip_address: '10.1.4.14',
      host_name: 'i-2ze3rehoi7mohouu3cgi',
      cluster_name: 'cluster05',
      all_cpu_cores: 16,
      free_cpu_cores: 4.32,
      all_memory_gi: 32,
      free_memory_gi: 9.01,
      all_disk_gi: 500,
      free_disk_gi: 233.9,
      machine_type: 'ecs.s6-c1m1.large',
      cloud_provider: 'AlibabaCloud',
      role: 'worker'
    }, {
      status: 'error',
      ip_address: '10.1.4.16',
      host_name: 'i-2ze3rehoi7mohouu4cgi',
      cluster_name: 'cluster05',
      all_cpu_cores: 16,
      free_cpu_cores: 4.32,
      all_memory_gi: 32,
      free_memory_gi: 9.01,
      all_disk_gi: 500,
      free_disk_gi: 233.9,
      machine_type: 'ecs.s6-c1m1.large',
      cloud_provider: 'AlibabaCloud',
      role: 'worker'
    }]
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster/nodes/${ctx.params.clusterId}`,
  //     qs: ctx.query,
  //     json: true
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.get('/cluster/pods/:clusterId', async(ctx) => {
  ctx.body = {
    success: 'success',
    message: '',
    pager: {
      total: 4,
      page_number: 1,
      page_size: 10
    },
    pods: [{
      node_name: '',
      node_ip: '10.1.4.10',
      pod_name: 'i-2ze3rehoi7mohouu2cgi',
      pod_ip: '172.123.45.2',
      allocated_cpu_cores: 1,
      allocated_memory_gi: 1,
      allocated_disk_gi: 10,
      group_name: 'ItemGroup01',
      running_time: '3天12小时24分11秒',
      status: 'Running'
    }, {
      node_name: '',
      node_ip: '10.1.4.12',
      pod_name: 'i-2ze3rehoi7mohouu2cgi',
      pod_ip: '172.123.45.3',
      allocated_cpu_cores: 1,
      allocated_memory_gi: 1,
      allocated_disk_gi: 10,
      group_name: 'ItemGroup01',
      running_time: '3天12小时24分11秒',
      status: 'Running'
    }, {
      node_name: '',
      node_ip: '10.1.4.14',
      pod_name: 'i-2ze3rehoi7mohouu2cgi',
      pod_ip: '172.123.45.4',
      allocated_cpu_cores: 0.25,
      allocated_memory_gi: 0.5,
      allocated_disk_gi: 0,
      group_name: 'ItemGroup01',
      running_time: '3天12小时24分11秒',
      status: 'Running'
    }, {
      node_name: '',
      node_ip: '10.1.4.16',
      pod_name: 'i-2ze3rehoi7mohouu2cgi',
      pod_ip: '172.123.45.5',
      allocated_cpu_cores: 0.346,
      allocated_memory_gi: 0.909,
      allocated_disk_gi: 1.345,
      group_name: 'ItemGroup01',
      running_time: '3天12小时24分11秒',
      status: 'Pending'
    }]
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getKubeHost()}/api/v1/cluster/pods/${ctx.params.clusterId}`,
  //     qs: ctx.query,
  //     json: true
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

module.exports = routerApi
