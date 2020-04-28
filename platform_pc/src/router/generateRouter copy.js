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
  let routers = [
    {
      name: 'home',
      title: '首页',
      routers: homeRouterMap
    },
    {
      name: 'monitoring',
      title: '运行监测',
      routers: monitoringRouterMap
    },
    {
      name: 'management',
      title: '渠道管理',
      routers: managementRouterMap
    }
  ]
  routers.forEach(res=>{
    permissions.push(res.routers)
  })
  return permissions;
}


function appendRoute(permissions) {
  for (let index = 0; index < permissions.length; index++) {
    let item = permissions[index];
    try {
      router.addRoutes(item);
    } catch (error) {
      console.error(error);
    }
  }
}

export function initRoute(registerRouteFresh) {
  let menuList = store.getters.menuList;
  if (process.env.NODE_ENV === 'development1') {  // 开发环境下直接展示全部路由
    let permissions = getAdminRoute();
    if (registerRouteFresh) {
      appendRoute(permissions);
    }
    console.log('development-permissions',permissions)
    store.dispatch('setPermission', permissions).then(() => {});
  } else {  // 生产环境下展示权限路由
    if (menuList && menuList.length > 0) {
      let permissions = [];
      for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        let m = createRoute([item]);
        permissions.push(m);
      }
      if (registerRouteFresh) {
        appendRoute(permissions);
      }
      console.log('development-production',permissions)
      store.dispatch('setPermission', permissions).then(() => {});
    }
  }
}