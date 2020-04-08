/**
 * 获取URL请求参数
 * @param {string} name
 */
export function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let url = window.location.href
  let r = url.substr(url.indexOf('?') + 1).match(reg)
  if (r != null) return decodeURI(r[2]); return null
}

export function getOpenId (code) {
  console.log(code)
  // sessionStorage.setItem('wxopenid', JSON.stringify('wxopenid'))
}

// 获取微信code
export function getOpenIdUrl (url) {
  let appid = process.env.APPID
  let redirectUrl = encodeURI(process.env.WEB_HOST + url)
  let openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=drugstore#wechat_redirect`
  return openUrl
}
