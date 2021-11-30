import request from '@/utils/request'
import http from '@/utils/http'
import _ from 'lodash'
import { getToken } from '@/utils/auth'

export async function galaxyCloudCreate(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/eci/cluster',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function galaxyCloudDelete(id) {
  const token = getToken()
  const res = await http({
    url: `/api/v1/eci/cluster/delete/${id}`,
    method: 'delete',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getGalaxyClusters() {
  const token = getToken()
  const res = await request({
    url: '/api/v1/eci/cluster',
    method: 'get',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function instanceExpand(params) {
  const token = getToken()
  return await request({
    url: '/api/v1/eci/instance/expand',
    method: 'get',
    params: params,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function instanceShrink(params) {
  const token = getToken()
  return await request({
    url: '/api/v1/eci/instance/shrink',
    method: 'get',
    params: params,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

