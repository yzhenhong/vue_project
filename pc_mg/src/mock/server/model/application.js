
const application = {
  'id|+1': 1,
  'status|0-1': 0,
  'apps_id|+1': 1,
  'name|': '@ctitle(4,6)',
  'description|': '@csentence(20,100)',
  'cover|': '@image("100x100",#3085ff)',
  'pics|1-3': ['@image("200x356",#3085ff)'],
  'category|1-3': 1,
  'type|1-2': 1,
  'link_url|': '@url',
  'app_id|': '@integer(10,20)',
  'api_url|': '@url',
  'sort|+1': 0 // 越小越优先
}

const applicationList = [application, application, application, application, application]

module.exports = {
  application,
  applicationList
}
