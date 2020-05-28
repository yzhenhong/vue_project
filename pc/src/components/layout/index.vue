<template>
  <div class="app-wrapper">
    <!--头部-->
    <layout-header></layout-header>
    <!-- 主体内容 -->
    <app-main></app-main>
    <!-- 尾部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
  import { appMain, layoutHeader, layoutFooter } from './components'
  import redirectConfirmList from './getRedirectConfirm';
  export default {
    name: 'layout',
    components: {
      appMain,
      layoutHeader,
      layoutFooter
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
          _self.$confirm('离开页面将不保存已编辑的内容，请确认是否离开？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {
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

