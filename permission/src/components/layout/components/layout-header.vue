<template>
  <div class="layout-header">
    <div>
      <img src="@/assets/img/logo.png" alt="">
      医保公共服务管理平台
    </div>
    <div>
      <div>文档中心</div>
      <div>技术支持</div>
      <div>系统管理员<img src="@/assets/svg/pulldown.svg" alt=""></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layoutHeader',
  }
</script>

<style scoped lang="less">
.layout-header{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  padding-left: 16px;
  padding-right: 30px;
  background: #ffffff;
  z-index: 1000;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  >div{
    height: 100%;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    color: #3B4351;
  }
  >div:first-child{
    font-size: 20px;
    img{
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
  }
  >div:last-child{
    font-size: 14px;
    img{
      width: 16px;
      height: 16px;
      margin-left: 5px;
    }
    >div{
      margin-left: 30px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

