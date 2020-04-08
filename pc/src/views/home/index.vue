<template>
  <div class="home">
    <div class="banner">
      <img src="../../assets/img/banner.png" alt="">
    </div>
    <div class="menu-wrap main-wrap" v-for="(item,index) in menuList" :key="index">
      <div class="menu-title">{{item.title}}</div>
      <ul>
        <li v-for="(item2,index2) in item.itemList" :key="index2" @click="goMenu(item2)">
          <img v-if="item2.imgSrc" :src="item2.imgSrc" alt="">
          <div v-if="item2.title" class="item-title">{{item2.title}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      menuList: [
        {
          title: '业务申报',
          itemList: [
             {
               imgSrc: require("@/assets/svg/unit_registered.svg"),
               title: '单位参保登记',
               routerName: 'business-unitRegistered',
             },
             {
               imgSrc: require("@/assets/svg/personalEdit.svg"),
               title: '个人信息变更',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/protect_registration.svg"),
               title: '职工参保登记',
               routerName: 'business-protectRegistration',
             },
             {
               imgSrc: require("@/assets/svg/subsidies.svg"),
               title: '生育津贴申领',
               routerName: 'business-protectRegistration',
             },
             {
               imgSrc: require("@/assets/svg/declaration.svg"),
               title: '补缴申报',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/yearly_check.svg"),
               title: '单位年检申报',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/pay_declare.svg"),
               title: '缴费申报与变更',
               routerName: '',
             },
              {
               imgSrc: require("@/assets/svg/delay_declare.svg"),
               title: '延缴申报',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/increase.svg"),
               title: '参保人员增员申报',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/attrition.svg"),
               title: '参保人员减员申报',
               routerName: 'business-attrition',
             },
             {
               imgSrc: require("@/assets/svg/pricing.svg"),
               title: '医疗机构调价项目申报',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/retirement_apply.svg"),
               title: '退休申请',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/unit_cancel.svg"),
               title: '参保单位注销',
               routerName: '',
             },
             
          ]
        },
        {
          title: '信息查询',
          itemList: [
             {
               imgSrc: require("@/assets/svg/to_audit.svg"),
               title: '待审核数据',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/the_approved.svg"),
               title: '已审核数据',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/personnelChange.svg"),
               title: '人员变更情况查询',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/individual_pay.svg"),
               title: '个人缴费明细',
               routerName: 'query-individualPay',
             },
             {
               imgSrc: require("@/assets/svg/unit_pay.svg"),
               title: '单位缴费明细',
               routerName: 'query-unitPay',
             },
             {
               imgSrc: require("@/assets/svg/prove.svg"),
               title: '单位参保证明查询',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/print.svg"),
               title: '单位缴费查询打印',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/subsidiesResults.svg"),
               title: '生育津贴申领结果',
               routerName: '',
             },
             {
               imgSrc: require("@/assets/svg/fallback_record.svg"),
               title: '回退记录',
               routerName: '',
             },
          ]
        }
      ]
    }
  },
  created () {
  },
  methods: {
    goMenu(data) {
      if(data.routerName){
        this.$router.push({
          name: data.routerName
        })
      } else {
        this.$message({
          showClose: true,
          message: '功能开发中',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/mixin.less';
.banner{
  width: 100%;
  min-height: 220px;
  >img{
    width: 100%;
    height: 100%;
  }
}
.menu-wrap{
  .menu-title{
    position: relative;
    width: 100%;
    height: 90px;
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #333333;
    padding-bottom: 11px;
    display: flex;
    align-items: flex-end;
    border-bottom: 4px solid #666666;
    margin-bottom: 34px;
  }
  .menu-title::after{
    position: absolute;
    z-index: 1;
    height: 4px;
    width: 96px;
    left: 0px;
    bottom: -4px;
    display: inline-block;
    background: #2484F6;
    content: "";
  }
  ul{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  li{
    width: 18%;
    height: 220px;
    margin-right: 2%;
    margin-bottom: 24px;
    padding-top: 46px;
    background: #FFFFFF;
    box-shadow: 0 4px 18px 0 rgba(0,0,0,0.06);
    img{
      display: block;
      margin: 0 auto;
      margin-bottom: 22px;
      width: 72px;
      height: 72px;
    }
    .item-title{
      margin: 0 auto;
      width: 110px;
      line-height: 22rpx;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      text-align: center;
    }
  }
}
.menu-wrap:last-child{
  margin-bottom: 100px;
}
</style>
