const bridgx_host = '127.0.0.1:9090'

const schedulx_host = '127.0.0.1:9091'

const cudgx_host = '127.0.0.1:9092'

function getBridgXHost() {
  return `http://${process.env.bridgx_host || bridgx_host}`
}
function getSchedulXHost() {
  return `http://${process.env.schedulx_host || schedulx_host}`
}
function getKubeHost() {
  return `http://${process.env.k8s_host || bridgx_host}`
}
function getCudgxHost() {
  return `http://${process.env.cudgx_host || cudgx_host}`
}

exports.getHost = getBridgXHost
exports.getSchedulxHost = getSchedulXHost
exports.getKubeHost = getKubeHost
exports.getCudgxHost = getCudgxHost
