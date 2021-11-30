const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')
const routerApi = new Router({
  prefix: '/api/v1'
})

routerApi.get('/eci/cluster', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster`,
      method: 'GET',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/eci/cluster', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.delete('/eci/cluster/delete/:id', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getKubeHost()}/api/v1/eci/cluster/delete/${ctx.params.id}`,
      method: 'DELETE',
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

module.exports = routerApi
