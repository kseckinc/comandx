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

export function isIPv4(str) {
  return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(str)
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

export function cidrIsLegal(cidr) {
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

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
