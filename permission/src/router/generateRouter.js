import store from '@/store';
import router from './index';
import homeRouterMap from './modules/home';
import monitoringRouterMap from './modules/monitoring';
import managementRouterMap from './modules/management';
import layout from '@/components/layout'
const _import = require('./_import_' + process.env.NODE_ENV);

export function createRoute(data) {
  data.forEach((item) => {
    if (item.path) {
      if (item.component) {
        if (item.component.indexOf('layout') >= 0) {
          item.component = layout;
        } else {
          let componentPath = item.component.replace('.vue', '');
          item.component = _import(componentPath);
        }
      } else {
        item.component = layout;
      }
      item.meta = {};
      if (item.title) {
        item.meta.title = item.title;
      }
      if (item.show !== '0') {
        item.meta.show = true;
      } else {
        item.meta.show = false;
      }
      item.children = item.child;
      if (item.children) {
        createRoute(item.children);
      }
    }
  });
  return data;
}

function getAdminRoute() {
  let permissions = [];
  permissions.push({
    name: 'home',
    routers: homeRouterMap
  });
  permissions.push({
    name: 'monitoring',
    routers: monitoringRouterMap
  });
  permissions.push({
    name: 'management',
    routers: managementRouterMap
  });
  return permissions;
}

function getAdminNavs() {
  let navs = [
    {
      name: 'home',
      title: '首页',
      icon: '',
      url: '',
      children: []
    },
    {
      name: 'monitoring',
      title: '运行监测',
      icon: '',
      url: '',
      children: []
    },
    {
      name: 'management',
      title: '渠道管理',
      icon: '',
      url: '',
      children: []
    },
  ];
  return navs;
}

function appendRoute(permissions) {
  for (let index = 0; index < permissions.length; index++) {
    let item = permissions[index];
    try {
      router.addRoutes(item.routers);
    } catch (error) {
      console.error(error);
    }
  }
}

export function initRoute(registerRouteFresh) {
  let menuList = store.getters.menuList;
  if (process.env.NODE_ENV === 'development') {  // 开发环境下直接展示全部路由
    let navs = getAdminNavs();
    store.dispatch('setNavs', navs);
    let permissions = getAdminRoute();
    if (registerRouteFresh) {
      appendRoute(permissions);
    }
    store.dispatch('setPermission', permissions).then(() => {});
  } else {  // 生产环境下展示权限路由
    if (menuList && menuList.length > 0) {
      let navs = [];
      let permissions = [];
      for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        navs.push({
          name: item.name,
          title: item.title,
        });
        // if (item.child) {
        let m = createRoute([item]);
        permissions.push({
          name: item.name,
          routers: m
        });
        // }
      }
      let activeNavName = store.getters.activeNavName;
      let activeNav = navs.find((x) => x.name === activeNavName);
      if (!activeNav) {
        store.dispatch('setActiveNavName', navs[0].name);
      }
      store.dispatch('setNavs', navs);
      if (registerRouteFresh) {
        appendRoute(permissions);
      }
      store.dispatch('setPermission', permissions).then(() => {});
    }
  }
}