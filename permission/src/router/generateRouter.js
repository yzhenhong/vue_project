import store from '@/store';
import router from './index';
import homeRouterMap from './modules/home';
import monitoringRouterMap from './modules/monitoring';
import managementRouterMap from './modules/management';
import appletRouterMap from './modules/applet';
import businessRouterMap from './modules/business';
import systemRouterMap from './modules/system';
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
    },
    {
      name: 'applet',
      title: '小程序管理',
      routers: appletRouterMap
    },
    {
      name: 'business',
      title: '业务管理',
      routers: businessRouterMap
    },
    {
      name: 'system',
      title: '系统设置',
      routers: systemRouterMap
    },
  ]
  routers.forEach(res=>{
    permissions.push(res.routers)
  })
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
    {
      name: 'applet',
      title: '小程序管理',
      icon: '',
      url: '',
      children: []
    },
    {
      name: 'business',
      title: '业务管理',
      icon: '',
      url: '',
      children: []
    },
    {
      name: 'system',
      title: '系统设置',
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
      router.addRoutes(item);
    } catch (error) {
      console.error(error);
    }
  }
}

export function initRoute(registerRouteFresh) {
  if (process.env.NODE_ENV === 'development') {  // 开发环境下直接展示全部路由
    console.log('generateRouter-development')
    let navs = getAdminNavs();
    store.dispatch('setNavs', navs);
    let permissions = getAdminRoute();
    if (registerRouteFresh) {
      appendRoute(permissions);
    }
    store.dispatch('setPermission', permissions).then(() => {});
  } else {  // 生产环境下展示权限路由
    console.log('generateRouter-production')
    let menuList = store.getters.menuList;
    if (menuList && menuList.length > 0) {
      let navs = [];
      let permissions = [];
      for (let i = 0; i < menuList.length; i++) {
        let item = menuList[i];
        navs.push({
          name: item.name,
          title: item.title,
        });
        let m = createRoute([item]);
        permissions.push(m);
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