const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/instance'
const routerApi = new Router({
  prefix
})

routerApi.get('/num', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/num`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/describe_all', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/describe_all`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/id/describe', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/id/describe`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/usage_total', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/usage_total`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/usage_statistics', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/usage_statistics`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
