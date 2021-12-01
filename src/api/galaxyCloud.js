import request from '@/utils/request'
import http from '@/utils/http'
import _ from 'lodash'
import { getToken } from '@/utils/auth'

export async function galaxyCloudBatchCreate(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/eci/cluster/batch/create',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function instanceGroupDelete(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/eci/cluster/batch/delete',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getGalaxyClusters() {
  const token = getToken()
  const res = await request({
    url: '/api/v1/kubernetes',
    method: 'get',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getInstanceGroup(params) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/eci/cluster',
    method: 'get',
    params: params,
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

