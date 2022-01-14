const host = require('../config/host')
const request = require('request-promise')
const Router = require('koa-router')

const prefix = '/api/v1/query'
const routerApi = new Router({
  prefix
})

routerApi.get('/redundancy/qps_average', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCudgxHost()}${prefix}/redundancy/qps_average`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/redundancy/instance_count', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCudgxHost()}${prefix}/redundancy/instance_count`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

routerApi.get('/redundancy/qps_total', async(ctx) => {
  try {
    ctx.body = await request({
      headers: {
        authorization: ctx.header.authorization
      },
      url: `${host.getCudgxHost()}${prefix}/redundancy/qps_total`,
      qs: ctx.query,
      json: true
    })
  } catch (e) {
    ctx.body = e.error
  }
})

module.exports = routerApi
