const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/cluster'
const routerApi = new Router({
  prefix
})

routerApi.get('/describe_all', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/describe_all`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/name/:cluster_name', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/name/${ctx.params.cluster_name}`
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/num', async(ctx) => {
  ctx.body = {
    code: 401
  }
  // try {
  //   ctx.body = await request({
  //     headers: {
  //       authorization: ctx.header.authorization
  //     },
  //     url: `${host.getHost()}${prefix}/num`,
  //     qs: {
  //       account: ctx.query.account
  //     }
  //   })
  // } catch (e) {
  //   ctx.body = e.error
  // }
})

routerApi.post('/create', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/create`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/edit', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/edit`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/expand', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/expand`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/shrink', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/shrink`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.delete('/delete/:ids', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/delete/${ctx.params.ids}`,
      method: 'DELETE',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/instance_stat', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/instance_stat`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
