const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/task'
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

routerApi.get('/list', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/list`,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/describe', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/describe `,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/instances', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getHost()}${prefix}/instances `,
      qs: ctx.query
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
