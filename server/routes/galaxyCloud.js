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
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/kubernetes`,
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
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/cluster`,
      method: 'GET',
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/eci/instance/self', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/instance/self`,
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
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/cluster/batch/create`,
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
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/cluster/batch/delete`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/instance/expand_shrink', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/instance/expand_shrink`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/summary', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/summary`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/bridgx/available_clusters', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/bridgx/available_clusters`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/cluster', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster`,
      method: 'POST',
      body: ctx.request.body
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/summary/:clusterId', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/summary/${ctx.params.clusterId}`,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/nodes/:clusterId', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/nodes/${ctx.params.clusterId}`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/cluster/pods/:clusterId', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/pods/${ctx.params.clusterId}`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.delete('/cluster/:clusterId', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/cluster/${ctx.params.clusterId}`,
      method: 'DELETE',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/instance/restart', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/galaxy_cloud/eci/instance/restart`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
