<template>
  <section class="app-main" :class="$route.meta.table?'table-app-main':''">
    <!-- 标题 -->
    <div v-if="$route.name" class="main-wrap meta-title">
      <div v-for="(item,index) in $route.matched" :key="index" @click="goHome(index)">
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
    methods: {
      goHome(indexVal) {
        if(this.$route.path != "/home/index" && indexVal==0)(
          this.$router.push("/home/index")
        )
      }
    },
    created () {
    }
  }
</script>

<style scoped lang="less">
  @import '../../../assets/css/mixin.less';
  .app-main {
    position: relative;
    min-height: 100%;
    padding-top: 0.1px;
    .meta-title{
      margin-top: 40px;
      margin-bottom: 10px;
      line-height: 20px;
      display:  flex;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      span{
        margin: 0px 5px;
      }
      >div:first-child{
        cursor: pointer;
        &:hover{
          color: @blue-color;
        }
      }
      >div:last-child{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #151515;
      }
    }
  }
  .table-app-main{
    margin-bottom: 44px;
  }
</style>
