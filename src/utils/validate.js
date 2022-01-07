/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor', 'root']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

export function validInput(str) {
  let count = 0
  let type = true
  str.split('').forEach((i) => {
    if (/[0-9a-zA-Z]/.test(i)) {
      count++
    } else if (/[\u4E00-\u9FA5]/.test(i)) {
      count += 2
    } else {
      type = false
    }
  })
  return {
    count,
    type
  }
}
