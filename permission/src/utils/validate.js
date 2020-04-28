export function isvalidUsername (str) {
  // 用户名正则，4到16位（字母，数字，点, 下划线，减号）
  var reg = /^[a-zA-Z0-9._-]{4,16}$/
  return reg.test(str)
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validateAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 验证身份证号
 *
 * @export
 * @param {*} id
 * @returns
 */
export function validateID (id) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(id)
}

/**
 * 验证打码的身份证号 (中间6位*号)
 *
 * @export
 * @param {*} id
 * @returns
 */
export function validateMaskedID (id) {
  const reg = /^\d{5}\*{6}(\d|X|x)$/
  return reg.test(id)
}

/**
 * 验证手机号码 (只验证首位为1，长度11位)
 *
 * @export
 * @param {*} num
 * @returns
 */
export function validateMobilePhone (num) {
  const reg = /^1[0-9]{10}$/
  return reg.test(num)
}

/**
 * 验证打码的手机号码 (中间6位*号)
 *
 * @export
 * @param {*} num
 * @returns
 */
export function validateMaskedPhone (num) {
  const reg = /^1[0-9]{3}\*{6}\d{1}$/
  return reg.test(num)
}

export function validateNumber (num) {
  const reg = /^\+?[1-9][0-9]*$/
  return reg.test(num)
}

/**
 * 匹配中英文,字母,数字,点,下划线,减号 (默认: 2 到 30 位)
 *
 * @export
 * @param {*} str
 * @param {number} [min=2]
 * @param {number} [max=30]
 * @returns
 */
export function validateName (str, min = 2, max = 30) {
  const reg = new RegExp(`^[\u4e00-\u9fa5_a-zA-Z0-9·._-]{${min},${max}}$`)
  return reg.test(str)
}

// 名字验证
export const validateNames = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入名字'))
  }
  if (!validateName(value)) {
    return callback(new Error('名字格式错误,应为2-30位正常字符'))
  }
  return callback()
}

/**
 * 验证正整数+0
 */
export function validateAge (num) {
  const reg = /^(?:[0-9][0-9]?|1[01][0-9]|150)$/
  return reg.test(num)
}
