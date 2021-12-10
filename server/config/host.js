const bridgx_host = 'http://127.0.0.1:9090'

const schedulx_host = 'http://127.0.0.1:9091'

const kube_host = 'http://127.0.0.1:9090'

function getBridgXHost() {
  return bridgx_host
}
function getSchedulXHost() {
  return schedulx_host
}
function getKubeHost() {
  return kube_host
}
exports.getHost = getBridgXHost
exports.getSchedulxHost = getSchedulXHost
exports.getKubeHost = getKubeHost
