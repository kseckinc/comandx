import _ from 'lodash'
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

const specialSymbols = ['(', ')', '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '_', '-', '+', '=', '|', '{', '}', '[', ']', ':', ';', '\'', '<', '>', ',', '.', '?', '/']

/** 8～30 个字符，必须同时包含三项（大写字母、小写字母、数字、 ()`~!@#$%^&*_-+=|{}[]:;'<>,.?/ 中的特殊符号）
 * @param {string} password
 * @returns {boolean}
 */
export function passwordLegitimacy(password) {
  if (password.length < 8 || password.length > 30) {
    return false
  }
  const type = {
    symbols: 0,
    number: 0,
    lowercase: 0,
    uppercase: 0
  }
  password.split('').forEach((i) => {
    if (/[A-Z]/.test(i)) {
      type.uppercase++
    }
    if (/[a-z]/.test(i)) {
      type.lowercase++
    }
    if (specialSymbols.includes(i)) {
      type.symbols++
    }
    if (/[0-9]/.test(i)) {
      type.number++
    }
  })
  let typeNum = 0
  _.values(type).forEach((i) => {
    if (i > 0) {
      typeNum++
    }
  })
  return typeNum > 2
}

export function justifySubnet(vpcCidr, subnetCidr) {
  if (!cidrIsLegal(vpcCidr) || !cidrIsLegal(subnetCidr)) {
    return false
  }
  const vpc = vpcCidr.split('/')
  const vpcIp = ip2Binary(vpc[0])
  const vpcMask = +vpc[1]
  const vpcIpMask = ipMask(vpcIp, vpcMask)
  const subnet = subnetCidr.split('/')
  const subnetIpMask = ipMask(ip2Binary(subnet[0]), +subnet[1])
  return vpcIpMask.slice(0, vpcMask) === subnetIpMask.slice(0, vpcMask)
}

function cidrIsLegal(cidr) {
  const arr = cidr.split('/')
  if (arr.length !== 2) {
    return false
  }
  const ips = arr[0].split('.')
  if (ips.length !== 4) {
    return false
  }
  for (const ip of ips) {
    if (+ip > 255 || +ip < 0) {
      return false
    }
  }
  const mask = arr[1]
  return !(mask < 0 || mask > 32)
}

function ip2Binary(ip) {
  let res = ''
  ip.split('.').forEach((i) => {
    const str = (+i).toString(2)
    res += _.padStart(str, 8, '0')
  })
  return res
}

function ipMask(ip, mask) {
  return _.padEnd(ip.slice(0, +mask), 32, '0')
}
