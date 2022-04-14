const getters = {
  routes: (state) => state.menuPermission.routes,

  fixedHeader: (state) => state.appSettings.fixedHeader,
  menuMode: (state) => state.appSettings.menuMode, // 水平菜单,垂直菜单
  sidebarLogo: (state) => state.appSettings.sidebarLogo,
  tagsBar: (state) => state.appSettings.tagsBar,
  showThemeBar: (state) => state.appSettings.showThemeBar,
}
export default getters
