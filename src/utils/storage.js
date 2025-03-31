const KEY = 'heimatk'

// 获得toekn
export const getToken = () => {
  return JSON.parse(localStorage.getItem(KEY))
}

// 存储token
export const settoken = (token) => {
  localStorage.setItem(KEY, JSON.stringify(token))
}

// 存储未登录存储频道数据
export const pindaocc = (token) => {
  localStorage.setItem('pindaocc', JSON.stringify(token))
}

// 获得登录存储频道数据
export const hqpindao = () => {
  return JSON.parse(localStorage.getItem('pindaocc'))
}

// 存储删除token
export const remtoken = () => {
  localStorage.removeItem(KEY)
}
