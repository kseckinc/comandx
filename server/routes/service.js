const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/schedulx'
const routerApi = new Router({
  prefix
})

routerApi.get('/ok', async(ctx) => {
  try {
    ctx.body = await request({
      url: host.getSchedulxHost()
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/service/list', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/list`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/service/update', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/update`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/service/create', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/create`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/service/expand', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/expand`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/service/shrink', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/shrink`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/template/expand/list', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/template/expand/list`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/template/expand/create', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/template/expand/create`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/template/expand/update', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/template/expand/update`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/template/expand/delete', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/template/expand/delete`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/template/expand/info', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/template/expand/info`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/decision/rule/update', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/decision/rule/update`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/decision/rule/info', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/decision/rule/info`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/service/breathrecord', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getSchedulxHost()}${prefix}/service/breathrecord`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
