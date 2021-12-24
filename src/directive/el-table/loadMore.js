import Vue from 'vue'
import waves from '@/directive/waves/waves'
const loadMore = {
  bind(el, binding) {
    const SELECTWRAP_DOM = el.querySelector('.el-table__body-wrapper')
    if (SELECTWRAP_DOM !== null) {
      SELECTWRAP_DOM.addEventListener('scroll', function() {
        const condition = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (condition) {
          binding.value()
        }
      })
    }
  }
}
const install = function(Vue) {
  Vue.directive('el-table-load-more', loadMore)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install)
}

loadMore.install = install

export default loadMore
