import Net from '@/utils/net'

const pageActionBuilder = Net.pathBuilderWithPathPrefix('/page/')
const tempateActionBulder = Net.pathBuilderWithPathPrefix('/template/')

/**
 * 模板列表
 * @returns {{
 *   "code": 0,
    "message": "success",
    "data": [
      {
        "id":1,
        "status":1, //
        "name": "模板名称",
        "wxTemplateId":"关联微信模板库id",
        "isCurrent": 0, // 是否当前选择 0:否 1:是
        "cover": "模板封面图",
        "sort": 0 // 越小越优先
      }
    ]
 }}
 */
export function fetchTemplateList () {
  return Net.post(tempateActionBulder('list'))
}

/**
 * 模板选择
 * @param { Number } templateId
 * @returns {{
 *    "code": 0,
 *    "message": "success"
 * }}
 */
export function selectTemplate (templateId) {
  return Net.post(tempateActionBulder('select', { templateId }))
}

/**
 * 页面列表
 * @param { Number } templateId
 * @returns {{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id":1,
      "status":1, //
      "name": "页面名称",
      "templateId":1, // 所属模板id
      "cover": "页面封面图",
      "sort": 0 // 越小越优先
    }
  ]
}}
 */
export function fetchPageList (templateId) {
  return Net.post(pageActionBuilder('list'), { templateId })
}

/**
 * 页面应用配置获取
 * @param { Number } pageId
 * @returns {{
  "code": 0,
  "message": "success",
  "data": {
      "pageId": 1, // 页面id
      "info": JSON.stringify([
        {
          "name": "分组名称",
          "count": 0,
          "appsIds": "关联应用id，格式 `id1, id2`（逗号分隔）"
        }
      ])
  }
 * }}
 */
export function fetchAppGroupsOfPage (pageId) {
  return Net.post(pageActionBuilder('appsConfigGet'), { pageId: pageId })
}

/**
 * 页面应用设置
 * @param {{
  "pageId": 1, // 页面id
  "info": [
    {
      "name":"分组名称",
      "count": 0,
      "appsIds": "关联应用id，格式 `id1, id2`（逗号分隔）"
    },
    ...
  ]
}} apps
* @returns {{
  "code": 0,
  "message": "success"
}}
 */
export function setAppsOfPage (apps) {
  return Net.post(pageActionBuilder('/appsConfigSet'), apps)
}

/**
 * 页面修改
 * @params {{
   "pageId": 1, // 页面id
  "codeStr": "", // 代码字符串, 小程序 wxml
  "modifyInfo": "" // 修改备注。默认空
 * }}
 * @returns {{
 * "code": 0,
  "message": "success"
}}
 */
export function modifyPageInfo (pageId, code, remark = '') {
  return Net.post(pageActionBuilder('modify'), { pageId, codeStr: code, modifyInfo: remark })
}
