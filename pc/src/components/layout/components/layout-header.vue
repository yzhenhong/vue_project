<template>
  <div class="layout-header">
    <div>
      <div class="layout-header-left" @click="goHome">
        <img src="@/assets/svg/logo.svg" alt="">
        <div>医保服务大厅</div>
      </div>
      <div class="layout-header-right">
        <div>腾讯医疗健康（深圳）有限公司 <i class="el-icon-arrow-down"></i> </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'layoutHeader',
    methods: {
      goHome() {
        if(this.$route.path != "/home/index")(
          this.$router.push("/home/index")
        )
      }
    }
  }
</script>

<style scoped lang="less">
.layout-header{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 80px;
  background: #ffffff;
  z-index: 1000;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
  >div{
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .layout-header-left{
    cursor: pointer;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-size: 26px;
    color: #333333;
    img{
      width: 52px;
      height: 36px;
      margin-right: 20px;
    }
  }
  .layout-header-right{
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    text-align: right;
  }
}
</style>

