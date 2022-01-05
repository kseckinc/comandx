const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/cudgx'
const routerApi = new Router({
  prefix
})

routerApi.post('/predict/rule/create', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/create`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/predict/rule/update', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/update`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/predict/rule/list', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/list`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/predict/rule/:id', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/${ctx.params.id}`,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/predict/rule/batch/delete', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/batch/delete`,
      method: 'POST',
      body: ctx.request.body,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/predict/rule/:id/enable', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/${ctx.params.id}/enable`,
      method: 'POST',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.post('/predict/rule/:id/disable', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCubeHost()}${prefix}/predict/rule/${ctx.params.id}/disable`,
      method: 'POST',
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
