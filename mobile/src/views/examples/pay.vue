<template>
  <div>
    <div class="page">
      <div class="icon-box">
        <img src="../../assets/img/money.png" alt="" class="icon">
        <div class="hint-tlt">等待付款</div>
      </div>
      <div class="hint-txt">订单已提交，请在点击确认支付。</div>
      <div class="money-box">订单金额：¥ {{Number(weixinPayMsg.orderPrice).toFixed(2)}}</div>
      <div class="line"></div>
      <div class="pay-txt">选择支付方式</div>
      <div class="payType" v-if="this.payEnv != 'weixin'">
        <div class="payType-l">
          <img src="../../assets/img/icon-zhifubao.png" alt="" class="payIcon">
          <div>支付宝支付</div>
        </div>
        <img src="../../assets/img/iconxh_gy_elect.png" alt="" v-if="payType==1" class="typeIcon">
        <img src="../../assets/img/iconxh_gy_nomal.png" alt="" v-else class="typeIcon" @click="payChoice(1)">
      </div>
      <div class="payType" v-if="this.payEnv != 'alipay'">
        <div class="payType-l">
          <img src="../../assets/img/icon-weixin.png" alt="" class="payIcon">
          <div>微信支付</div>
        </div>
        <img src="../../assets/img/iconxh_gy_elect.png" alt="" v-if="payType==2" class="typeIcon">
        <img src="../../assets/img/iconxh_gy_nomal.png" alt="" v-else class="typeIcon" @click="payChoice(2)">
      </div>
      <div class="goPays" :class="bgColor?'': 'huisi'" @click="goPays">确认支付</div>
    </div>
  </div>
</template>
<script>
import { getQueryString } from '@/utils/index';
import wxjs from '@/utils/wxjsInterface';
export default {
  data: function () {
    return {
      spbill_create_ip: '', // ip
      bgColor: true,
      payType: 1, // 1:支付宝支付,2:微信支付
      payEnv: 'others', // 判断微信还是支付宝或者其他浏览器
      wxopenid: '',
      // 支付订单信息
      weixinPayMsg: {
        orderId: '', // 订单号
        orderPrice: '', // 付款金额
        Category: '', // 商品：product 处方：prescription, 脉诊仪:jinmu
        StoreName: '', // 药店名称 已兼容旧版本
      },
    };
  },
  methods: {
    // 判断微信还是支付宝或者其他浏览器
    liulanqi() {
      if (/MicroMessenger/.test(window.navigator.userAgent)) {
      // 微信
        this.payEnv = 'weixin';
        this.payType = 2;
      } else if (/AlipayClient/.test(window.navigator.userAgent)) {
      // 支付宝
        this.payEnv = 'alipay';
        this.payType = 1;
      } else {
      // 其他浏览器
        this.payEnv = 'others';
        this.payType = 1;
      }
      console.log('浏览器this.payEnv类型:', this.payEnv);
    },
    // 选择支付
    payChoice(val) {
      this.payType = val;
    },
    // 确认支付
    goPays() {
      console.log('确认支付');
      if (this.bgColor === false) {
        return false;
      }
      this.bgColor = false;
      if (this.payEnv === 'weixin') { // 在微信内浏览器打开 只能进行微信宝支付
        if (!this.wxopenid && !sessionStorage.getItem('wxopenid')) {
          console.log('账户登录中,请重试！');
          this.bgColor = true;
          return false;
        } else if (sessionStorage.getItem('wxopenid')) {
          this.wxopenid = sessionStorage.getItem('wxopenid');
        }
        let data = {
          PayType: 2,
          OrderId: this.weixinPayMsg.orderId, 
          PayFee: this.weixinPayMsg.orderPrice,
          OpenId: this.wxopenid,
          Category: this.weixinPayMsg.Category,
          StoreName: this.weixinPayMsg.StoreName,
        };
        // 在微信内置浏览器中直接调用微信内支付
        console.log('微信内支付参数', data);
        ajax.post('/api/pay/wxpay', data).then(res => {
          console.log('微信内提交支付返回结果', res);
          if (res.status === 200 && res.data.code === 0) {
            this.weixinPay(res.data.data);
          }
        });
      } else if (this.payEnv === 'alipay') { // 在支付宝内浏览器打开 只能进行支付宝支付
        console.log('唤起支付宝h5支付');
        let data = {
          payType: 100,
          OrderId: this.weixinPayMsg.orderId,
          PayFee: this.weixinPayMsg.orderPrice,
          Category: this.weixinPayMsg.Category,
          StoreName: this.weixinPayMsg.StoreName,
          quity_url: `${process.env.WEB_HOST}/prescription/prescription_order`, // 退出跳回地址
        };
        this.alipay(data);
      } else if (this.payEnv === 'others') { // 在其他浏览器打开
        if (this.payType === 1) { // 普通浏览器进行支付宝h5支付
          console.log('唤起支付宝h5支付');
          let data = {
            payType: 100,
            OrderId: this.weixinPayMsg.orderId,
            PayFee: this.weixinPayMsg.orderPrice,
            Category: this.weixinPayMsg.Category,
            StoreName: this.weixinPayMsg.StoreName,
            quity_url: `${process.env.WEB_HOST}/prescription/prescription_order`, // 退出跳回地址
          };
          this.alipay(data);
        } else if (this.payType === 2) { // 普通浏览器进行微信h5支付
          console.log('唤起微信h5支付');
          let data = {
            PayType: 6,
            OrderId: this.weixinPayMsg.orderId,
            PayFee: this.weixinPayMsg.orderPrice,
            spbill_create_ip: this.spbill_create_ip,
            OpenId: '',
            Category: this.weixinPayMsg.Category,
            StoreName: this.weixinPayMsg.StoreName,
          };
          this.wxpay(data);
        }
      }
    },
    // 支付宝h5支付
    alipay(data) {
      console.log('支付宝h5支付参数', data);
      ajax.post('/api/pay/AliPayNew', data).then(res => {
        console.log('支付宝h5支付返回结果', res);
        this.bgColor = true;
        if (res.status === 200 && res.data.code === 0) {
          const form = res.data.data;
          const div = document.createElement('div');
          div.id = 'alipay';
          div.innerHTML = form;
          document.body.appendChild(div);
          document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
        }
      });
    },
    // 微信h5支付
    wxpay(data) {
      console.log('微信h5支付参数', data);
      ajax.post('/api/pay/wxpay', data).then(res => {
        console.log('微信h5提交支付返回结果', res);
        this.bgColor = true;
        if (res.status === 200 && res.data.code === 0) {
          location.href = res.data.data.mweb_url + '&redirect_url=' + encodeURIComponent(`${process.env.WEB_HOST}/prescription/prescription_order`);
        }
      });
    },
    // 微信内请求支付
    weixinPay(resData) {
      let that = this;
      console.log('进行微信内支付');
      function onBridgeReady() {
        /* eslint-disable */
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': resData.appid, //公众号名称，由商户传入
            'timeStamp': resData.timestamp, //时间戳，自1970年以来的秒数
            'nonceStr': resData.nonce_str, //随机串
            'package': resData.package, //订单详情扩展字符串
            // 'signType': resData.signType, //微信签名方式
            'signType': 'MD5',
            'paySign': resData.sign, //微信签名
          },
          function (res) {
            console.log(res);
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              that.bgColor = true;
              console.log('付款成功');
            }
            else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.bgColor = true;
              console.log('付款取消');
            } else {
              that.bgColor = true;
              console.log('付款失败');
            }
          }
        );
      }
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
  },
  created() {
    let _self = this;
    // 先判断是否是在微信内还是微信外的普通手机浏览器
    this.liulanqi();
    // 微信公众号支付 需要获取code code跳转前传过来的
    let code = getQueryString('code');
    if(code){
      wxjs.init(code).then((res) => {
        console.log('微信', res.wxconfig);
        if(res.wxconfig.openid){
          sessionStorage.setItem('wxopenid', res.wxconfig.openid);
        }
        _self.wxopenid = res.wxconfig.openid;//openid
        console.log('_self.wxopenid', _self.wxopenid);
      });
    };
  },
};
</script>
<style lang="less" scoped>
.page{
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  background: #fff;
  font-size: 12px;
}
.line{
  height: 10px;
  background-color: #f5f5f5;
}
.icon-box{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
  .icon{
    width: 30px;
    height: 30px;
    margin-right: 5px;
  }
  .hint-tlt{
    font-size: 26px;
  }
}
.hint-txt{
  margin-bottom: 20px;
  text-align: center;
}
.money-box{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-top: 1px solid #e6e6e6;
}
.pay-txt{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.payType{
  height: 50px;
  padding:0 10px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  .payIcon{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .payType-l{
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .typeIcon{
    width: 20px;
    height: 20px;
  }
}
.goPays{
  margin: 0 10px;
  margin-top: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
  background: rgb(12, 205, 211);
}
.goPays.huisi{
  background: #ccc;
}
</style>