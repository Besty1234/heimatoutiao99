const KEY = 'heimatk'

// 获得toekn
export const getToken = () => {
  return JSON.parse(localStorage.getItem(KEY))
}

// 存储token
export const settoken = (token) => {
  localStorage.setItem(KEY, JSON.stringify(token))
}

// 存储删除token
export const remtoken = () => {
  localStorage.removeItem(KEY)
}
