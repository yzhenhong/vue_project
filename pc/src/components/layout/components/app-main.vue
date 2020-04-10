<template>
  <section class="app-main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </section>
</template>

<script>
  export default {
    name: 'appMain',
  }
</script>

<style scoped lang="less">
  @import '../../../assets/css/mixin.less';
  .app-main {
    position: relative;
  }
</style>
