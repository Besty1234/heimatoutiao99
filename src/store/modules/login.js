import { dlu, grxx } from '@/api/login'

import { settoken, getToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {

    tokenx: getToken() || null,
    userinfo: {}

  },
  mutations: {
    cctoken (state, x) {
      state.tokenx = x
    },

    sly (state, xx) {
      state.tokenx.token = xx
    },

    // 个人信息
    grxxmax (state, x) {
      state.userinfo = x
    },

    // 回显图片
    huixtp (state, x) {
      // 单独将图片数据更换
      state.userinfo.photo = x
    }

  },
  actions: {
    async logtoken (context, x) {
      const res = await dlu(x)
      console.log(res)

      context.commit('cctoken', res.data.data)

      settoken(res.data.data)
    },

    // 个人信息
    async gr (context) {
      // 判断vuex中是否有数据，有则重新发请求，没有则不发
      if (!context.state.userinfo.id) {
        const res = await grxx()

        console.log(res)

        context.commit('grxxmax', res.data.data)
      }
    }
  }

}
