<template>
  <section class="app-main">
    <!-- 标题 -->
    <div v-if="$route.name" class="app-main-title">
      <div v-for="(item,index) in $route.matched" :key="index">
        {{item.meta.title}}
        <span v-if="index != $route.matched.length-1">></span>
      </div>
    </div>
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
    created () {
      // console.log(this.$route)
    }
  }
</script>

<style scoped lang="less">
.app-main {
  position: relative;
  margin-left: 200px;
  min-height: 100%;
  background: #F2F7FE;
  padding-left: 30px;
  padding-right: 30px;
  .app-main-title{
    height: 60px;
    display:  flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #3B4351;
  }
  >div:nth-child(2){
    background: #fff;
    padding: 20px;
  }
}
</style>
