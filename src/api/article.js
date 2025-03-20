import request from '@/utils/request'

export const newlist = (data) => {
  return request.get('/v1_0/articles', { params: data }
  )
}
