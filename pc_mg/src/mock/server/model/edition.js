
const edition = {
  'id|+1': 1,
  'status|0-3': 0,
  'name|': '@integer(1, 8).@integer(2, 8).@integer(3, 8)',
  'description|5-10': '版本描述',
  'templateId+1': 1,
  'auditId|+1': 1,
  'auditStatus|0-3': 0,
  // 审核时间戳
  auditTime: '@integer(1234567890, 9000000000)',
  updateTime: '@integer(1234567890, 9000000000)',
  // 审核不通过信息
  'auditInfo|3-5': '审核不通过信息',
  path: '@url',
  qrcode: '@image("200x100")',
  'userId|+1': 0,
  userName: '@cname',
  'updateInfo|2-5': [
    { text: '测试模块', time: 1234567890 },
    { text: '医保模块', time: 1234567890 }]
}
function optionsValue (value) {
  const values = [value, null, value, null, value, value, null, value]
  return values[Math.ceil(Math.random() * 7)]
}
module.exports = {
  edition,
  editions: () => {
    return {
      unload: optionsValue({ ...edition, status: 0 }),
      dev: optionsValue({ ...edition, status: 1 }),
      audit: optionsValue({ ...edition, status: 2 }),
      publish: optionsValue({ ...edition, status: 3 })
    }
  }
}
