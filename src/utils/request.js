
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { settoken } from '@/utils/storage'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  // 统一携带token
  if (store.state.login.tokenx) {
    config.headers.Authorization = `Bearer ${store.state.login.tokenx.token}`
    console.log(store.state.login.tokenx.token)
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 当token失效会返回401，将要捕捉重新抛出,将重新请求获取新token重新赋值

  if (error.response.status === 401) {
  // 利用try捕捉错误，refresh_token是否过期

    try {
      const res = await axios({
        url: 'http://geek.itheima.net/v1_0/authorizations',
        method: 'put',
        headers: {
          Authorization: `Bearer ${store.state.login.tokenx.refresh_token}`
        }
      })
      console.log(res)

      // 将反回的token 存到vuex
      store.commit('login/sly', res.data.data.token)

      // 因为每次刷新优先使用本地存储，要先把最新的token存到本地

      // 可以利用插件，一旦存储到vuex就立即存到本地
      settoken({
        token: res.data.data.token,
        refresh_token: store.state.login.tokenx.refresh_token

      })

      // 将之前的请求重新请求一边，将值返回，实现无感刷新
      // error.config 相当于上一次的请求
      return request(error.config)
    } catch {
      Toast('身份过期，请重新登录')
      // 过期将返回登录页
      router.push('/login')
    }
  } else {
    // 对响应错误做点什么
    Toast(error.response.data.message)

    return Promise.reject(error)
  }
})

export default request
