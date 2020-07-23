import Net from '@/utils/net'

/**
 *
 * 应用列表
 * @export
 * @returns { {
  "code": 0,
  "message": "success",
  "data": [
    {
      "id":1,
      "status":1, // 0:未启用，1:已启用
      "appsId":1, //应用id
      "name": "应用名称",
      "description":"应用描述",
      "cover": "应用图标",
      "category": 1, // 应用类别 1:业务2:自研3:自定义
      "type": 1, // 应用类型 1:h5 2:小程序
      "linkUrl": "跳转路径",
      "appId": "关联小程序id",
      "apiUrl": "接口地址",
      "sort": 0 // 越小越优先

    },
    ...
  ]
} }
*/
export function appsList (data) {
  return Net.post('/apps/list')
}

/**
 *
 * 应用详情
 * @export
 * @param {{
  "id": 1 // 应用id
}} data
 * @returns {  {
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "status": 1, // 0:未启用，1:已启用
    "userId": "1"
    "appsId": 1, //应用信息关联id
    "name": "应用名称",
    "description": "应用描述",
    "cover": "应用图标",
    "category": 1, // 应用类别 1:业务2:自研3:自定义
    "type": 1, // 应用类型 1:h5 2:小程序
    "linkUrl": "跳转路径",
    "appId": "关联小程序id",
    "apiUrl": "接口地址",
    "pics": "",
    "sort": 0 // 越小越优先
  }
} }
 */
export function appsDetail (data) {
  return Net.post('/apps/detail', data)
}

/**
 *
 * 应用开启，关闭
 * @export
 * @param {{
  "id": 1, // 应用id
  "status": 0 // 0:关闭，1：开启
}} data
 * @returns {  {
  "code": 0,
  "message": "success"
} }
 */
export function appsSwitch (data) {
  return Net.post('/apps/switch', data)
}
