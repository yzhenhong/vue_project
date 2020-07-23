// @ts-check
import axios from 'axios'
import { Message } from 'element-ui'

/**
  * @typedef NetResPonse
  * @property {number} code 后端响应状态码 0 正常 非0 异常
  * @property {string} message 与后端状态码相对应的描述信息
  * @property {object} data 相应数据
  */
/**
  * @typedef NetRequestOptions
  * @property {boolean} emitError 是否显示启用通用错误处理
  */
export class Net {
  constructor (options) {
    const baseURL = process.env.VUE_APP_BASE_URL
    this.http = axios.create(options || { baseURL })
  }

  /**
   * base on axios request
   * @param {object} config
   * @param {string} config.url
   * @param {'get'|'post'} config.method
   * @param {object} [config.data]
   * @param {object} [config.params]
   * @param {NetRequestOptions} options
   * @returns {Promise.<NetResPonse>}
   * @memberof Net
   */
  async request (config, options) {
    let result
    try {
      const response = await this.http.request(config)
      if (response.status === 200) {
        if (response.data.code === 100) {
          location.href = '/login'
        } else if (response.data.code === 0) {
          result = response.data
        } else {
          if (options.emitError) {
            Message({
              message: response.data.message,
              type: 'error'
            })
          }
          result = Promise.reject(response.data)
        }
      } else {
        // 全部当成服务器错误
        Message({
          message: '服务器繁忙，请稍后重试',
          type: 'error'
        })
        result = Promise.reject(response.statusText)
      }
    } catch (error) {
      // 全部当成服务器错误
      Message({
        message: '服务器繁忙，请稍后重试',
        type: 'error'
      })
      result = Promise.reject(error.message)
    }
    return result
  }

  /**
 *
 *
 * @param {string} url 请求路径
 * @param {object} [params] 请求需要发送的body
 * @param {NetRequestOptions} options 其他
 * @returns { Promise.<NetResPonse> }
 * @memberof Net
 */
  post (url, params, options = { emitError: true }) {
    return this.request({ url, method: 'post', data: params }, options)
  }

  /**
 *
 *
 * @param {string} url 请求路径
 * @param {*} params get请求拼接的路径参数
 * @param {NetRequestOptions} options 其他
 * @returns { Promise.<NetResPonse> }
 * @memberof Net
 */
  get (url, params, options = { emitError: true }) {
    return this.request(({ url, method: 'get', params }), options)
  }
}

Net.prototype.pathBuilderWithPathPrefix = function (pathPrefix) {
  if (typeof pathPrefix !== 'string') {
    throw new Error('pathPrefix must be string')
  }

  return function (action) {
    if (typeof action !== 'string') {
      throw new Error('action must be string')
    }
    const endsWithSlash = pathPrefix[pathPrefix.length - 1] === '/'
    return endsWithSlash ? pathPrefix + action : pathPrefix + '/' + action
  }
}

export default new Net()
