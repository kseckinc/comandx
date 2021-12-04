import request from '@/utils/request'
import http from '@/utils/http'
import { getToken } from '@/utils/auth'

export async function instancGroupBatchCreate(data) {
  const token = getToken()
  const res = await http({
    url: '/api/v1/galaxy_cloud/instance_group/batch/create',
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
    url: '/api/v1/galaxy_cloud/instance_group/batch/delete',
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
    url: '/api/v1/galaxy_cloud/kubernetes',
    method: 'get',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getInstanceGroupList(params) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/galaxy_cloud/instance_group',
    method: 'get',
    params: params,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getInstanceFormList(params) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/galaxy_cloud/instance/form',
    method: 'get',
    params: params,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function getInstanceBySelf(params) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/galaxy_cloud/instance/self',
    method: 'get',
    params: params,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}

export async function instanceGroupExpandOrShrink(data) {
  const token = getToken()
  return await request({
    url: '/api/v1/galaxy_cloud/instance_group/expand_shrink',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function instanceDelete(data) {
  const token = getToken()
  return await request({
    url: '/api/v1/galaxy_cloud/instance/delete',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function instanceRestart(data) {
  const token = getToken()
  return await request({
    url: '/api/v1/galaxy_cloud/instance/restart',
    method: 'post',
    data,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clustersSummary(page_number, page_size) {
  const token = getToken()
  return request({
    url: '/api/v1/galaxy_cloud/cluster/summary',
    params: {
      page_number,
      page_size
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterAvailable(page_number, page_size, ip, cluster_name) {
  const token = getToken()
  return request({
    url: '/api/v1/galaxy_cloud/cluster/bridgx/available_clusters',
    params: {
      page_number,
      page_size,
      ip,
      cluster_name
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterCreate(cluster_name, bridgx_cluster_name, cluster_type, service_cidr, pod_cidr) {
  const token = getToken()
  return request({
    url: '/api/v1/galaxy_cloud/cluster',
    method: 'post',
    data: {
      cluster_name,
      bridgx_cluster_name,
      cluster_type,
      service_cidr,
      pod_cidr
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterDelete(id) {
  const token = getToken()
  return request({
    url: `/api/v1/galaxy_cloud/cluster/${id}`,
    method: 'delete',
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterSummary(id) {
  const token = getToken()
  return request({
    url: `/api/v1/galaxy_cloud/cluster/summary/${id}`,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterNodes(id, page_number, page_size, node_ip, cluster_name, role) {
  const token = getToken()
  return request({
    url: `/api/v1/galaxy_cloud/cluster/nodes/${id}`,
    params: {
      page_number,
      page_size,
      node_ip,
      cluster_name,
      role
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function clusterPods(id, page_number, page_size, node_ip, pod_ip) {
  const token = getToken()
  return request({
    url: `/api/v1/galaxy_cloud/cluster/pods/${id}`,
    params: {
      page_number,
      page_size,
      node_ip,
      pod_ip
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function podRestart(instance_group_id, instance_name) {
  const token = getToken()
  return request({
    url: '/api/v1/galaxy_cloud/eci/instance/restart',
    method: 'post',
    data: {
      instance_group_id,
      instance_name
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}
