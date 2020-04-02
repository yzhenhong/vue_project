export const formatTime = (date, fmt) => {
  let Time = new Date(Number(date))
  const o = {
    'M+': Time.getMonth() + 1,
    'd+': Time.getDate(),
    'h+': Time.getHours(),
    'm+': Time.getMinutes(),
    's+': Time.getSeconds(),
    'q+': Math.floor((Time.getMonth() + 3) / 3),
    'S': Time.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (Time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function getQueryVariable (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) { return pair[1] }
  }
  return ''
}
