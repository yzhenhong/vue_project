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
  export default {
    name: 'layout',
    components: {
      appMain,
      layoutHeader,
      layoutSidebar,
    },
  }
</script>

<style scoped lang="less">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  padding-top: 70px;
}
</style>

