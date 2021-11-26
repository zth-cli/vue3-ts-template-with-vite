const getters = {
  routes: state => state.menuPermission.routes,

  fixedHeader: state => state.appSettings.fixedHeader,
  mode: state => state.appSettings.menuModeisVertical, // 水平菜单,垂直菜单
  sidebarLogo: state => state.appSettings.menuModeisVertical,
  tagsBar: state => state.appSettings.tagsBar,
  showThemeBar: state => state.appSettings.showThemeBar,
}
export default getters
