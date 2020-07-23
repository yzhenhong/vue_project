
<template>
  <el-container class="page-layout">
    <el-header
      height="70px"
      class="page-layout__header"
    >
      <page-header
        :logo="header.logo"
        :title="header.title"
        :menus="header.menus"
      />
    </el-header>
    <el-container class="page-layout__body">
      <el-aside
        width="220px"
        class="page-layout__aside"
      >
        <page-aside :menus="asideMenu" />
      </el-aside>
      <el-main class="page-layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="javascript">
import PageHeader from '@/components/page-header/page-header'
import PageAside from '@/components/page-aside/page-aside'
import Logo from '@/assets/logo.svg'

import menuWorkbenchIcon from '@/assets/icon/menu_workbench.svg'
import menuOperateIcon from '@/assets/icon/menu_operate.svg'
import menuDevelopmentIcon from '@/assets/icon/menu_development.svg'
import menuSystemIcon from '@/assets/icon/menu_system.svg'

import { mapState } from 'vuex'

export default {
  components: {
    PageHeader,
    PageAside
  },
  data () {
    return {
      header: {
        logo: Logo,
        title: '医疗接入平台（客户端）',
        menus: [
          {
            name: '管理台',
            link: '/console'
          },
          {
            name: '接口文档',
            link: '/documents'
          },
          {
            name: '调试中心',
            link: '/debug'
          }
        ]
      },
      asideMenu: [
        { icon: menuWorkbenchIcon, name: '工作站', path: '' },
        {
          icon: menuOperateIcon,
          name: '运营管理',
          submenu: [
            { name: '数据总览', path: '#' },
            { name: '用户管理', path: '#' },
            { name: '预约挂号订单', path: '#' },
            { name: '门诊缴费订单', path: '#' },
            { name: '住院预缴金订单', path: '#' }
          ]
        },
        {
          icon: menuDevelopmentIcon,
          name: '开发配置',
          submenu: [
            { name: '应用配置', path: '/apps-standard-setting' },
            { name: '页面配置', path: '/page-setting' },
            { name: '版本管理', path: '/version' },
            { name: '域名配置', path: '/domains-setting' },
            { name: '小程序信息管理', path: '/mp-info-setting' }
          ]
        },
        {
          icon: menuSystemIcon,
          name: '系统设置',
          submenu: [
            { name: '账号管理', path: '#' },
            { name: '角色管理', path: '#' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState({
      breadcrumb: state => state.breadcrumb,
      breadcrumbTip: state => state.breadcrumbTip
    })
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/global.less');
@import url('~@/style/variables.less');

#app {
  height: 100%;
}
.page-layout {
  background: @PageBackgroundColor;
  min-height: 100%;

  &__header {
    background: @HeaderBackgroundColor;
  }

  &__body {
    height: calc(100vh - @HeaderHeight);
  }

  &__main {
    padding: 20px 30px 30px 30px;
  }

  &__aside {
    background: @PageAsideBackgroundColor;
    box-sizing: box-border;

    &::-webkit-scrollbar-thumb {
      background-color: @PageAsideBackgroundColor;
      transition: background-color .2s;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        transition: background-color .2s ease-in-out;
        background-color: @ScrollbarThumbColor;
      }
    }
  }

  &__main {
    background: #f2f7fe;
  }

  &__topbar{
    margin-bottom: 20px;
  }
  &__breadcrumb{
    display: inline-block;
    vertical-align: middle;
    margin-right: 30px;
  }
  &__tip{
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #9ea2a9;
  }
}
</style>
