import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000
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
