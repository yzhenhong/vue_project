<template>
  <div class="app-wrapper">
    <!--头部-->
    <layout-header></layout-header>
    <!--侧边栏-->
    <layout-sidebar></layout-sidebar>
    <!-- 主体内容 -->
    <app-main></app-main>
  </div>
</template>

<script>
  import { appMain, layoutHeader, layoutSidebar } from './components'
  import redirectConfirmList from './getRedirectConfirm';
  // import {setRedirectConfirm} from '@/components/layout/setRedirectConfirm';
  export default {
    name: 'layout',
    components: {
      appMain,
      layoutHeader,
      layoutSidebar,
    },
    beforeRouteLeave (to, from, next) {
      let _self = this;
      let currentRouteName = _self.$route.name;
      let rc = redirectConfirmList.find((x) => x.routeName === currentRouteName);
      // console.log(currentRouteName,rc)
      if (rc) {
        if(rc.canReturn) {
          next()
          rc.canReturn=false
        } else {
          _self.$confirm(rc.message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {
            // setRedirectConfirm(this.$route.name,true)
            rc.canReturn=true
            next()
            rc.canReturn=false
          }).catch((err) => {
            next(false)
          });
        }
      } else {
        next()
      }
    },
  }
</script>

<style scoped lang="less">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 80px;
}
</style>

