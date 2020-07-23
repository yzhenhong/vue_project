import Net from '@/utils/net'

var thirdPrtAppid = 'wx094fdf4a7dc75919'

/**
 *
 * 获取基本信息
 * @returns { {
    appid: '', // 帐号 appid,
    account_type: 1, // 帐号类型（1：订阅号，2：服务号，3：小程序）
    principal_type: '', // 主体类型 (0:个人, 1:企业, 2:媒体, 3:政府, 4:其他组织)
    principal_name: '', // 主体名称
    realname_status: '', // 实名验证状态
    wx_verify_info: {
      qualification_verify: false, // 是否资质认证，若是，拥有微信认证相关的权限。
      naming_verify: false, // 是否名称认证
      annual_review: false, // 是否需要年审（qualification_verify == true 时才有该字段）
      annual_review_begin_time: 0, // 年审开始时间，时间戳（qualification_verify == true 时才有该字段）
      annual_review_end_time: 0 // 年审截止时间，时间戳（qualification_verify == true 时才有该字段）
    }, // 微信认证信息
    signature_info: {
      signature: '', // 功能介绍
      modify_used_count: 0, // 功能介绍已使用修改次数（本月）
      modify_quota: 0 // 功能介绍修改次数总额度（本月）
    }, // 功能介绍信息
    head_image_info: {
      head_image_url: '', // 头像 url
      modify_used_count: 0, // 头像已使用修改次数（本月）
      modify_quota: 0 // 头像修改次数总额度（本月）
    } // 头像信息
} }
*/
export function getMinAppInfo (data) {
  return Net.get(`/apps/${thirdPrtAppid}`)
}

/**
 * @param {{}} data
 * @returns {{
    "code": 0,
    "message": "success",
    "data": {
      "name": "小程序名称",
      "appId": "帐号 appid",
      "headImg": "头像",
      "principalName": "名称",
      "verifyType": "", // 认证状态
      "signature": "功能介绍",
      "searchStatus": true // 隐私设置
    }
  }}
 */
export function getMpInfo (data) {
  return Net.post('/miniApp/info')
}
