import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import _ from 'lodash'

export function checkBridgX() {
  return request({
    url: '/api/v1/ok'
  })
}

export async function vpcDescribe(region_id, provider, account_key) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/vpc/describe',
    method: 'get',
    params: {
      region_id,
      provider,
      account_key
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data.Vpcs', [])
}

export function vpcCreate(provider, region_id, cidr_block, vpc_name, ak) {
  const token = getToken()
  return request({
    url: '/api/v1/vpc/create',
    method: 'post',
    data: {
      provider,
      region_id,
      cidr_block,
      vpc_name,
      ak
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function subnetDescribe(vpc_id, zone_id) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/subnet/describe',
    method: 'get',
    params: {
      vpc_id,
      zone_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data.Switches', [])
}

export function subnetCreate(provider, account_key, region_id, zone_id, cidr_block, vpc_id, switch_name, gateway_ip) {
  const token = getToken()
  return request({
    url: '/api/v1/subnet/create',
    method: 'post',
    data: {
      provider,
      zone_id,
      cidr_block,
      vpc_id,
      switch_name,
      gateway_ip,
      account_key,
      region_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function securityGroupDescribe(account_key, region_id, vpc_id) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/security_group/describe',
    method: 'get',
    params: {
      vpc_id,
      account_key,
      region_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data.Groups', [])
}

export function securityGroupCreate(account_key, region_id, vpc_id, security_group_name) {
  const token = getToken()
  return request({
    url: '/api/v1/security_group/create',
    method: 'post',
    data: {
      account_key,
      region_id,
      vpc_id,
      security_group_name
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function securityGroupCreateWithRule(account_key, region_id, vpc_id, security_group_name, rules) {
  const token = getToken()
  return request({
    url: '/api/v1/security_group/create_with_rule',
    method: 'post',
    data: {
      account_key,
      region_id,
      vpc_id,
      security_group_name,
      rules
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export function securityGroupRuleAdd(account_key, region_id, vpc_id, security_group_id, protocol, port_range, direction, group_id, cidr_ip, prefix_list_id) {
  const token = getToken()
  return request({
    url: '/api/v1/security_group/rule/add',
    method: 'post',
    data: {
      region_id,
      vpc_id,
      security_group_id,
      protocol,
      port_range,
      direction,
      group_id,
      cidr_ip,
      prefix_list_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function cloudAccountList(account_name, provider, account, page_number, page_size) {
  const token = getToken()
  const res = await request({
    headers: {
      Authorization: ` Bearer ${token}`
    },
    url: '/api/v1/cloud_account/list',
    params: {
      account_name,
      provider,
      account,
      page_number,
      page_size
    }
  })
  return _.get(res, 'data')
}

export async function cloudAccountAdd(account_name, provider, account_key, account_secret) {
  const token = getToken()
  const res = await request({
    headers: {
      Authorization: ` Bearer ${token}`
    },
    url: '/api/v1/cloud_account/create',
    method: 'post',
    data: {
      account_name,
      provider,
      account_key,
      account_secret
    }
  })
  return res
}

export async function cloudAccountEdit(account_id, account_name) {
  const token = getToken()
  const res = await request({
    headers: {
      Authorization: ` Bearer ${token}`
    },
    url: '/api/v1/cloud_account/edit',
    method: 'post',
    data: {
      account_id,
      account_name
    }
  })
  return res
}

export async function cloudAccountDelete(ids) {
  const token = getToken()
  const res = await request({
    headers: {
      Authorization: ` Bearer ${token}`
    },
    method: 'delete',
    url: `/api/v1/cloud_account/delete/${ids.join(',')}`
  })
  return res
}

export function subnetsDescribe(vpc_id) {
  const token = getToken()
  return request({
    url: '/api/v1/subnet_id/describe',
    method: 'post',
    data: {
      vpc_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
}

export async function regionList(provider) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/region/list',
    params: {
      provider
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', [])
}

export async function zoneList(provider, region_id) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/zone/list',
    params: {
      provider,
      region_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', [])
}

export async function instanceTypeList(provider, region_id, zone_id, computing_power_type) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/instance_type/list',
    params: {
      provider,
      region_id,
      zone_id,
      computing_power_type
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', [])
}

export async function imageList(provider, region_id, instance_type, image_type) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/image/list',
    params: {
      provider,
      region_id,
      instance_type,
      image_type
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data', [])
}

export async function vpcInfo(id) {
  const token = getToken()
  const res = await request({
    url: `/api/v1/vpc/info/${id}`,
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data')
}

export async function subnetInfo(vpc_id, switch_id) {
  const token = getToken()
  const res = await request({
    url: `/api/v1/subnet/info/${switch_id}`,
    params: {
      vpc_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data')
}

export async function securityGroupInfo(vpc_id, security_group_id, provider, region_id) {
  const token = getToken()
  const res = await request({
    url: `/api/v1/security_group/${security_group_id}/rules`,
    params: {
      vpc_id,
      provider,
      region_id
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return _.get(res, 'data')
}

export async function netWorkConfigSync(provider, region_id, account_key) {
  const token = getToken()
  const res = await request({
    url: '/api/v1/network_config/sync',
    method: 'post',
    data: {
      provider,
      region_id,
      account_key
    },
    headers: {
      Authorization: ` Bearer ${token}`
    }
  })
  return res
}
