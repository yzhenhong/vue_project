import axios from 'axios';

// 接口错误提示
const networkMessage = {
  401: '抱歉，身份验证失败，请刷新页面或重新登录!',
  403: '抱歉，您没有权限访问该接口',
  404: '接口不存在，请联系开发人员',
  500: '服务器内部错误，请重试',
  502: '网关错误，请重试'
}
const timeoutMessage = '请求超时，请检查重试'
const defaultMessage = '接口返回错误，请检查重试'


// create an axios instance
const service = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000
});


// request interceptor
service.interceptors.request.use(config => {
  // if (token) {
  //   config.headers['usertoken'] = token;
  // }
  return config;
}, error => {
  // Do something with request error
  console.log(error);
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('error' + error);
    return Promise.reject(error)
  }
);

export default service;
