import request from '@/utils/request'
import http from '@/utils/http'
import _ from 'lodash'
import { getToken } from '@/utils/auth'

export async function clusterNum(account) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/num',
    method: 'get',
    params: {
      account
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data.cluster_num', 0)
}

export async function clusterDescribeAll(cluster_name, provider, account, usage, cluster_type, page_number, page_size) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/describe_all',
    method: 'get',
    params: { cluster_name, provider, account, page_number, page_size, cluster_type, usage },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', [])
}

export async function clusterDescribe(cluster_name) {
  const token = getToken()
  const res = await request({
    url: `/api/v1/cluster/name/${cluster_name}`,
    method: 'get',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', {})
}

export async function clusterEdit(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/cluster/edit',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function clusterCreate(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/cluster/create',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export function clusterExpand(cluster_name, task_name, count) {
  const token = getToken()
  return request({
    url: '/api/v1/cluster/expand',
    method: 'post',
    data: {
      cluster_name,
      task_name,
      count
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterShrink(cluster_name, task_name, count) {
  const token = getToken()
  return request({
    url: '/api/v1/cluster/shrink',
    method: 'post',
    data: {
      cluster_name,
      task_name,
      count
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterDelete(ids) {
  const token = getToken()
  return request({
    url: `/api/v1/cluster/delete/${ids.join(',')}`,
    method: 'delete',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function clusterInstanceStat(cluster_name) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/instance_stat',
    params: {
      cluster_name
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data')
}

export async function createCustomPublicCluster(name, desc, provider, account_key, instance_list) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/create_custom_public',
    headers: {
      Authorization: ` Bearer ${token}`
    },
    method: 'post',
    data: {
      name,
      desc,
      provider,
      account_key,
      instance_list
    }
  })
  return res
}

export async function createCustomPrivateCluster(name, desc, instance_list) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/create_custom_private',
    headers: {
      Authorization: ` Bearer ${token}`
    },
    method: 'post',
    data: {
      name,
      desc,
      instance_list
    }
  })
  return res
}

export async function customClusterDetail(cluster_id, cluster_name) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/custom/detail',
    headers: {
      Authorization: ` Bearer ${token}`
    },
    params: {
      cluster_id,
      cluster_name
    }
  })
  return _.get(res, 'data')
}

export async function customClusterDelete(ids) {
  const token = getToken()
  const res = await request({
    url: `/api/v1/cluster/delete/${ids.join(',')}`,
    method: 'delete',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function clusterMachineCheck(instance_list) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/cluster/instance/check',
    method: 'post',
    data: {
      instance_list
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data')
}
