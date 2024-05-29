import axios from 'axios';

const instance  = axios.create({
  baseURL:'https://service-5u1neg12-1307963180.gz.tencentapigw.com.cn/release/'
  // baseURL:'http://192.168.2.108:3000/'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const { data:{result},data:{code},data:{data} } = response
  if (code!==200) {
    return Promise.reject(new Error(`Request failed with status code ${code}`))
  }
  return result?result:data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance