
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 统一携带token
  error.headers.Authorization = `Bearer ${store.state.login.token.tokenx}`
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Toast(error.response.data.message)
  return Promise.reject(error)
})

export default request
