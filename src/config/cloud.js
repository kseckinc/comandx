const cloudProviders = [{
  value: 'AlibabaCloud',
  label: '阿里云'
}, {
  value: 'HuaweiCloud',
  label: '华为云'
}]

const cloudDiskTypes = {
  AlibabaCloud: [{
    value: 'cloud_efficiency',
    label: '高效云盘'
  }, {
    value: 'cloud_ssd',
    label: 'SSD云盘'
  }, {
    value: 'cloud_essd',
    label: 'ESSD云盘'
  }],
  HuaweiCloud: [{
    value: 'SAS',
    label: '高IO'
  }, {
    value: 'SSD',
    label: '超高IO'
  }, {
    value: 'CO_P1',
    label: '高IO (性能优化I型)'
  }, {
    value: 'UH_L1',
    label: '高IO (性能优化I型)'
  }]
}

const ramUrl = {
  AlibabaCloud: 'https://ram.console.aliyun.com/manage/ak',
  HuaweiCloud: 'https://console.huaweicloud.com/iam/?region=cn-north-4&locale=zh-cn#/mine/accessKey'
}

const systemDiskSizes = [{
  value: 50,
  label: '50G'
}, {
  value: 100,
  label: '100G'
}, {
  value: 200,
  label: '200G'
}]

const dataDiskSizes = [{
  value: 50,
  label: '50G'
}, {
  value: 500,
  label: '500G'
}, {
  value: 1000,
  label: '1T'
}, {
  value: 2000,
  label: '2T'
}]

const huaweiIpType = [{
  value: '5_telcom',
  label: '电信'
}, {
  value: '5_union',
  label: '联通'
}, {
  value: '5_bgp',
  label: '全动态BGP'
}, {
  value: '5_sbgp',
  label: '静态BGP'
}, {
  value: '5_ipv6',
  label: 'ipv6'
}]

const aksk = {
  AlibabaCloud: {
    key: 'AccessKey',
    secret: 'AccessKey Secret'
  },
  HuaweiCloud: {
    key: 'AK',
    secret: 'SK'
  }
}

const taskStatus = [{
  label: '待执行',
  value: 'INIT'
}, {
  label: '执行成功',
  value: 'SUCCESS'
}, {
  label: '执行中',
  value: 'RUNNING'
}, {
  label: '执行失败',
  value: 'FAILED'
}]

const imageTypes = [{
  value: 'global',
  label: '公共镜像'
}, {
  value: 'private',
  label: '私有镜像'
}]

const chargeUnits = {
  AlibabaCloud: [{
    value: 'Week',
    label: '周'
  }, {
    value: 'Month',
    label: '月'
  }],
  HuaweiCloud: [{
    value: 'Month',
    label: '月'
  }, {
    value: 'Year',
    label: '年'
  }]
}

const protocols = {
  AlibabaCloud: ['tcp', 'udp', 'icmp', 'gre', 'all'],
  HuaweiCloud: ['tcp', 'udp', 'icmp', 'all']
}

const chargePeriods = {
  AlibabaCloud: {
    Week: [1, 2, 3, 4],
    Month: [1, 2, 3, 4, 6, 12, 24, 36, 48, 60]
  },
  HuaweiCloud: {
    Month: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    Year: [1, 2, 3]
  }
}

export {
  cloudProviders,
  cloudDiskTypes,
  aksk,
  taskStatus,
  systemDiskSizes,
  dataDiskSizes,
  ramUrl,
  huaweiIpType,
  imageTypes,
  chargeUnits,
  protocols,
  chargePeriods
}
