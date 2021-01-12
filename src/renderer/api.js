import Axios from 'axios';

Axios.defaults.baseURL = process.env.APP_SERVER_URL;
Axios.defaults.timeout = 10000;

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  // //token过期，退出重新登录
  // if (response.data.status.code === 401 || response.data.status.code === 402) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userInfo');
  //   setTimeout(function () {
  //     location.href = '/login';
  //   }, 2000);
  // }

  //token错误，重新登录
  if (response.data.status.code === 402) {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setTimeout(function () {
      location.href = '/login';
    }, 2000);
  }

  //token过期--获取更新的token
  const newtoken = response.headers.newtoken;
  //token过期--如果token存在则存在localStorage
  if (newtoken) {
    console.log('token过期，已重新赋值');
    localStorage.setItem('token', newtoken);
  }
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


export default Axios;
