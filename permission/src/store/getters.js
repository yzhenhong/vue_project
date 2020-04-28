const getters = {
  userid: state => state.user.userid,
  token: state => state.user.token,
  menuList: state => state.user.menuList,
  permissions: state => state.permission.permissions,
  navs: state => state.nav.navs,
  activeNavName: state => state.nav.activeNavName,
};
export default getters;
