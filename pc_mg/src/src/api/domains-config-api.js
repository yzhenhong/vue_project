import Net from '@/utils/net'

var thirdPrtAppid = 'wx094fdf4a7dc75919'

/**
 *
 * 设置服务器域名
 * @export
 * @param {{
    "third_part_appid": "<string>",
    "action": "<string>",
    "requestdomain": [
        "<string>",
        "<string>"
    ],
    "wsrequestdomain": [
        "<string>",
        "<string>"
    ],
    "uploaddomain": [
        "<string>",
        "<string>"
    ],
    "downloaddomain": [
        "<string>",
        "<string>"
    ]
}} data
 * @returns { }
 */
export function setDomains (data) {
  return Net.post(`/apps/${thirdPrtAppid}`, data)
}

/**
 *
 * 设置业务域名
 * @export
 * @param {{
  "third_part_appid": "<string>",
  "action": "<string>",
  "requestdomain": [
      "<string>",
      "<string>"
  ],
  "wsrequestdomain": [
      "<string>",
      "<string>"
  ],
  "uploaddomain": [
      "<string>",
      "<string>"
  ],
  "downloaddomain": [
      "<string>",
      "<string>"
  ]
}} data
* @returns { }
*/
export function setWebDomains (data) {
  return Net.post(`/apps/${thirdPrtAppid}/web_domains`, data)
}

/**
 *
 * 业务域名列表
 * @export
 * @returns {  {
  "code": 0,
  "message": "success",
  "data": [
    {
      "url": "业务域名url",
      "status": 1,
      "createTime": 0,
      "domainId": 1 // 域名id
    }
  ]
} }
 */
export function getWebviewList () {
  return Net.post('/domain/webviewList')
}

/**
 *
 * 业务域名添加
 * @export
 * @param {{ "url": "业务域名url" }} data
 * @returns {  {
    "code": 0,
    "message": "success"
  }}
 */
export function addWebview (data) {
  return Net.post('/domain/webviewAdd', data)
}

/**
 *
 * 业务域名删除
 * @export
 * @param {{
    "domianId": 1, // 域名id
    "url": "业务域名url"
  }} data
 * @returns {{
    "code": 0,
    "message": "success"
  }}
 */
export function deleteWebview (data) {
  return Net.post('/domain/webviewDelete', data)
}
