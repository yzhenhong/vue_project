import net from '@/utils/net'

/**
 * 用户登录
 * @param {object} data
 * @param {string} data.username
 * @param {string} data.password
 * @returns {undefined}
 */
export function login (data) {
  return net.post('/auth/login', data)
    .then(res => res.data)
}

/**
 * @typedef User
 * @property {string} mobile 手机
 * @property {string} email 邮箱
 * @property {string} userId 用户id
 * @property {string} miniAppName 小程序名字
 */

/** 获取用户信息
 * @returns {Promise.<User>}
 */
export function getUserInfo () {
  return net.post('/auth/info')
    .then(res => res.data)
}

/**
 * 推出登录
 */
export function logout () {
  return net.post('/auth/logout')
    .then(res => res.data)
}

/**
 * @param {object} data
 * @param {string} data.mobile
 * @param {string} data.verifyCode
 * @param {string} data.password
 * @param {string} data.passwordAgain
 * @returns {Promise.<undefined>}
 */
export function forgetPassword (data) {
  return net.post('/auth/forgetPassword', data)
    .then(res => res.data)
}
