// 请求工具类
import axios from 'axios'
// import { getOpenIdUrl } from '@/utils/wxjsInterface'
// import { Notify } from 'vant'
// import { getQueryVariable } from './common'

// axios.defaults.withCredentials=true
// axios.defaults.baseURL = process.env.API_URL

// const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 10000,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   }
// });
// axiosInstance.interceptors.request.use(
//   config => {
//     // if (getToken()) {
//     //   config.headers['Authorization'] = 'Bearer ' + getToken();
//     // }
//     config.headers['Authorization'] = 'Bearer ' + getToken();
//     return config;
//   },
//   error => {
//     console.log(error);// for debug
//     Promise.reject(error);
//   }
// );


const axiosInstance = axios.create()
// 请求返回的中间拦截, response: {data: Object, status: 200, statusText: "OK", headers: Object, config: Object, request: XMLHttpRequest }
axiosInstance.interceptors.response.use(function (response) {
  if (response.data.code !== 0) {
    Notify({
      className: 'errorNotify',
      message: response.data.message,
      background: '#FFF2F1',
      color: '#A8002D',
      duration: 1000
    })
  }
  return response
}, function (error) {
  if (error.response) {
    if (error.response.status === 401) {
      sessionStorage.setItem('toPath', window.location.pathname)
      let shareUser = getQueryVariable('shareUser')
      let url = getOpenIdUrl(`/?shareUser=${shareUser}`)
      window.location.replace(url)
    }
  }
  return Promise.reject(error)
})

// net 网络请求组件
function net() {
}

net.prototype.get = function (url, params) {
  let _params = params || {}
  return axiosInstance.get(url, { params: _params })
}

net.prototype.post = function (url, params, config) {
  let _params = params || {}
  return axiosInstance.post(url, _params, config)
}

export default new net()
