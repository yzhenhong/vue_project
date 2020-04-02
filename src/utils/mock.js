import Mock from 'mockjs'

// 获取用户信息
Mock.mock('http://localhost:3000/v1/user/info', {
  'code': 0,
  'message': '获取用户信息成功',
  'data': {
    city: "北京市",
    headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKUE6YjF8mibdKr1Z2YPJNzfMaQHZv6ek0PIfcCt5w5v5Uayt1PB1l7to9QawgnzPXGY6pL7JQbWxQ/132",
    nickname: "杨杨杨",
    phone: "18970931271",
    position: "医生",
    province: "北京市",
    user_id: 31,
    work_hospital: "深圳医院",
  }
})

// 列表
Mock.mock('http://localhost:3000/v1/task/list', {
  'code': 0,
  'message': '',
  'data': {
    'total_count': 4,
    'tasks': [
      {
      'attachments': null,
      'charge_user_id': '1',
      'charge_user_name': '丁文超',
      'created_at': '1569498142433',
      'creator': '1',
      'deadline': '1571616000000',
      'detail': '显示宽度显然是为了提供一些元数据，要说明用零来填充↵↵如果从查询返回的数字超出了指定的显示宽度，实际上不会限制该数字的长度。↵↵要想深入了解MySQL中的整数数据类型实际允许的宽度，请参阅：(类型：TINYINT，SMALLINT，MEDUMINT，INT，BIGINT)；↵↵因此，在上述情况下，除非列指定为ZEROFILL列，否则显示宽度不会影响查询的结果。↵↵或者 数据将被应用程序调用。',
      'reward': 10,
      'status': 4,
      'task_id': 6,
      'task_name': '第六个任务',
      'updated_at': null
    },
    {
      'attachments': null,
      'charge_user_id': '1',
      'charge_user_name': '丁文超',
      'created_at': '1569498142433',
      'creator': '1',
      'deadline': '1571616000000',
      'detail': '显示宽度显然是为了提供一些元数据，要说明用零来填充↵↵如果从查询返回的数字超出了指定的显示宽度，实际上不会限制该数字的长度。↵↵要想深入了解MySQL中的整数数据类型实际允许的宽度，请参阅：(类型：TINYINT，SMALLINT，MEDUMINT，INT，BIGINT)；↵↵因此，在上述情况下，除非列指定为ZEROFILL列，否则显示宽度不会影响查询的结果。↵↵或者 数据将被应用程序调用。',
      'reward': 10,
      'status': 4,
      'task_id': 6,
      'task_name': '第六个任务',
      'updated_at': null
    },
    {
      'attachments': null,
      'charge_user_id': '1',
      'charge_user_name': '丁文超',
      'created_at': '1569498142433',
      'creator': '1',
      'deadline': '1571616000000',
      'detail': '显示宽度显然是为了提供一些元数据，要说明用零来填充↵↵如果从查询返回的数字超出了指定的显示宽度，实际上不会限制该数字的长度。↵↵要想深入了解MySQL中的整数数据类型实际允许的宽度，请参阅：(类型：TINYINT，SMALLINT，MEDUMINT，INT，BIGINT)；↵↵因此，在上述情况下，除非列指定为ZEROFILL列，否则显示宽度不会影响查询的结果。↵↵或者 数据将被应用程序调用。',
      'reward': 10,
      'status': 4,
      'task_id': 6,
      'task_name': '第六个任务',
      'updated_at': null
    },
    {
      'attachments': null,
      'charge_user_id': '1',
      'charge_user_name': '丁文超',
      'created_at': '1569498142433',
      'creator': '1',
      'deadline': '1571616000000',
      'detail': '显示宽度显然是为了提供一些元数据，要说明用零来填充↵↵如果从查询返回的数字超出了指定的显示宽度，实际上不会限制该数字的长度。↵↵要想深入了解MySQL中的整数数据类型实际允许的宽度，请参阅：(类型：TINYINT，SMALLINT，MEDUMINT，INT，BIGINT)；↵↵因此，在上述情况下，除非列指定为ZEROFILL列，否则显示宽度不会影响查询的结果。↵↵或者 数据将被应用程序调用。',
      'reward': 10,
      'status': 4,
      'task_id': 6,
      'task_name': '第六个任务',
      'updated_at': null
    }
  ]
  }
})