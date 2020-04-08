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
  export default {
    name: 'layout',
    components: {
      appMain,
      layoutHeader,
      layoutFooter
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

