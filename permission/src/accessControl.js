import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import { getToken, removeToken } from '@/utils/auth';
import { initRoute } from './router/generateRouter';

NProgress.configure({
  showSpinner: false
});
// 路由白名单
const whiteList = ['/login', '/401', '/404'];
let registerRouteFresh = true;

if (process.env.NODE_ENV === 'development') {  // 开发环境下无需验证token
  console.log('accessControl-development')
  router.beforeEach((to, from, next) => {
    NProgress.start();
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      NProgress.done();
    } else {
      if (store.getters.permissions.length > 0) {
        next();
      } else {
        initRoute(registerRouteFresh);
        registerRouteFresh = false;
        // set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true });
      }
    }
  }); 
} else {  // 生产环境下需验证token
  console.log('accessControl-development')
  router.beforeEach((to, from, next) => {
    NProgress.start();
    let token = getToken();
    if (token) {
      // has token
      if (whiteList.indexOf(to.path) !== -1) {
        next();
        NProgress.done();
      } else {
        if (store.getters.permissions.length > 0) {
          next();
        } else {
          store.dispatch('getUserInfo').then((res) => {
            if (res.code === 0 && res.data && res.data.menuList && res.data.menuList.length > 0) {
              initRoute(registerRouteFresh);
              registerRouteFresh = false;
              // set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true });
            } else {
              Message.error('您的账号尚未设置权限，请联系管理员!');
              removeToken();
              next({
                path: '/401'
              });
              NProgress.done();
            }
          }).catch((error) => {
            console.error(error);
            store.dispatch('userLogOut').then(() => {
              Message.error('身份验证失败，请重新登录');
              removeToken();
              next({
                path: '/login'
              });
              NProgress.done();
            });
          });
        }
      }
    } else {
      // has no token
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next('/login');
        NProgress.done();
      }
    }
  });
}

router.afterEach(() => {
  NProgress.done();
});
