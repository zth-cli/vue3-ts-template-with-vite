
function checkStorange (key:string) {
  return localStorage.getItem(key) != null ? (localStorage.getItem(key) === 'true') : true
}
const state = {
  fixedHeader: checkStorange('fixedHeader'),
  // sidebarLogo: checkStorange('sidebarLogo'),
  menuModeisVertical: checkStorange('menuModeisVertical'),
  tagsBar: checkStorange('tagsBar'),
  showThemeBar: checkStorange('showThemeBar')
}

const mutations = {
  CHANGE_SETTING: (state: { [x: string]: any; hasOwnProperty: (arg0: any) => any }, { key, value }: any) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      localStorage.setItem(key, value)
    }
  }
}

const actions = {
  changeSetting ({ commit, state, getters }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  state,
  mutations,
  actions
}
