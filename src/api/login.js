import request from '@/utils/request'

export const dlu = (data) => {
  return request.post('/v1_0/authorizations', data)
}
// export function dlu (data) {
//   return request({
//     url: '/v1_0/authorizations',
//     method: 'post',
//     data
//   })
// }

export const grxx = () => {
  return request.get('/v1_0/user/profile')
}

// 封装修改图片请求- patch
export const gxtp = (data) => {
  return request.patch('/v1_0/user/photo', data)
}
