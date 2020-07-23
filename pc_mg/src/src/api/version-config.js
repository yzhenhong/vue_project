import net from '@/utils/net'
/**
 * @typedef Edition
 * @property {number} id
 * @property {number} status  0:未上传1:开发版本 2:审核版本 3:线上版本
 * @property {string} name 版本号
 * @property {string} description 版本描述
 * @property {number} templateId 关联模板id
 * @property {number} auditId 提交微信审核id
 * @property {number} auditStatus 微信审核状态 0:未提交1:审核中2审核被拒绝3:审核通过
 * @property {number} auditTime 微信审核时间
 * @property {number} updateTime 更新时间
 * @property {string} auditInfo 审核不通过信息
 * @property {string} path  服务代码存储地址
 * @property {string} qrcode 体验二维码地址
 * @property {string} userId 操作人id
 * @property {string} userName 操作人名称
 * @property {{text: string, time: number}[]} updateInfo "未上传的修改信息记录"
 */

/**
 *
 * 小程序版本列表
 * @export
 * @returns {{unload: Edition, dev: Edition, audit: Edition, publish: Edition}}
 */
export async function editionList () {
  return net.post('/edition/list')
    .then(res => res.data)
}

/**
 *
 * 创建版本
 * @export
 * @param {{ templateId: number  }} data
 * @returns {undefined}}
 */
export function editionCreate (data) {
  return net.post('/edition/create', data)
    .then(res => res.data)
}
/**
 *
 * 上传开发版
 * @export
 * @param {{ id: number,name: string,description: string }} data
 * @returns {undefined}
 */
export function editionUpload (data) {
  return net.post('/edition/upload', data)
    .then(res => res.data)
}
/**
 *
 * 获取体验版二维码
 * @export
 * @param {
 * { id: string, path: string }} data
 * @returns {{ path: string} }
 */
export function editionQrcode (data) {
  return net.post('/edition/qrcode', data)
    .then(res => res.data)
}

/**
 *
 * 提交审核
 * @export
 * @param { {id: string} } data
 * @returns {undefined}
 */
export async function editionAudit (data) {
  return net.post('/edition/audit', data)
    .then(res => res.data)
}
/**
 *
 * 审核撤销
 * @export
 * @param {{id: string}} data
 * @returns {undefined}
 */
export function editionAuditCancel (data) {
  return net.post('/edition/auditCancel', data)
    .then(res => res.data)
}
/**
 *
 * 版本发布
 * @export
 * @param {{id: string}} data
 * @returns {undefined}
 */
export function editionPublish (data) {
  return net.post('/edition/publish', data)
    .then(res => res.data)
}

/**
 * 版本回退
 *
 * @export
 * @param {{id: string}} data
 * @returns {undefined}
 */
export function editionRollback (data) {
  return net.post('/edition/rollback', data)
    .then(res => res.data)
}

/**
 * 停止服务
 *
 * @export
 * @param {{id: string}} data
 * @returns {undefined}
 */
export function editionStop (data) {
  return net.post('/edition/stop', data)
    .then(res => res.data)
}
