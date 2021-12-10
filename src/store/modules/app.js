import Cookies from 'js-cookie'
import { checkBridgX } from '@/api/cloud'
import { checkSchedulX } from '@/api/service'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  service: {
    bridgX: 'unchecked',
    schedulX: 'unchecked'
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  UPDATE_BRIDGX_STATUS: (state, status) => {
    state.service.bridgX = status
  },
  UPDATE_SCHEDULX_STATUS: (state, status) => {
    state.service.schedulX = status
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  async checkBridgX({ commit }) {
    const res = await checkBridgX()
    commit('UPDATE_BRIDGX_STATUS', res.code !== 'ECONNREFUSED')
  },
  async checkSchedulX({ commit }) {
    const res = await checkSchedulX()
    commit('UPDATE_SCHEDULX_STATUS', res.code !== 'ECONNREFUSED')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
