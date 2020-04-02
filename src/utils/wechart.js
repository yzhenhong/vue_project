// import { Toast } from 'vant'
// import wx from 'weixin-js-sdk'

export const initWeChart = ({ timestamp, noncestr, signature }, chargeUserId, toUrl) => {
  // console.log(timestamp, noncestr, signature, chargeUserId, toUrl)
  let menuList = []
  let imgUrl = process.env.WEB_HOST + '/img/shareLogo.png'
  // console.log(imgUrl)
  if (toUrl === '/user_registration') {
    menuList = [
      'menuItem:share:appMessage',
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:share:facebook',
      'menuItem:share:QZone'
    ]
  } else {
    menuList = [
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:share:facebook',
      'menuItem:share:QZone'
    ]
  }

  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: process.env.APPID, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: noncestr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'hideMenuItems',
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
    ] // 必填，需要使用的JS接口列表
  })

  wx.ready(function () {
    let shareData = {
      title: '众包平台', // 分享标题
      desc: '欢迎加入平台共同为智慧医疗行业发展做出贡献，实现互利共赢。', // 分享描述
      link: `${process.env.WEB_HOST}?shareUser=${chargeUserId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: function () {
        // Toast.success('分享成功')
        console.log('设置分享成功')
      },
      fail: function () {
        console.log('设置分享失败')
      }
    }
    if (wx.updateAppMessageShareData) {
      wx.updateAppMessageShareData(shareData)
    } else {
      wx.onMenuShareAppMessage(shareData)
    }
    if (wx.updateTimelineShareData) {
      wx.updateTimelineShareData(shareData)
    } else {
      wx.onMenuShareTimeline(shareData)
    }
    wx.hideMenuItems({
      menuList // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    })
  })
}

// import wx from 'weixin-js-sdk
// 微信配置信息
// let wxjsconfig = {
//   debug: false,
//   jsApiList: [
//     'updateAppMessageShareData',
//     'updateTimelineShareData',
//     'hideMenuItems',
//   ]
// };
