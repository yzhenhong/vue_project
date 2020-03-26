// 获取微信code
export function getOpenIdUrl (url) {
  let appid = process.env.APPID
  let redirectUrl = encodeURI(process.env.WEB_HOST + url)
  let openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=drugstore#wechat_redirect`
  return openUrl
}
