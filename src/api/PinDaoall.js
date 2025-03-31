import request from '@/utils/request'

export const pdall = () => request('/v1_0/channels')

// 登录状态添加频道数据
export const dltjpd = (data) => {
  request.patch('/v1_0/user/channels', {
    channels: [
      data
    ]
  })
}

// 登录状态添加频道数据
export const dlscpd = (data) => {
  return request.delete(`/v1_0/user/channels/${data}`)
}
