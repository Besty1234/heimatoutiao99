import { dlu } from '@/api/login'

import { settoken, getToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {

    tokenx: getToken() || null

  },
  mutations: {
    cctoken (state, x) {
      state.tokenx = x
    },

    sly (state, xx) {
      state.tokenx.token = xx
    }
  },
  actions: {
    async logtoken (context, x) {
      const res = await dlu(x)
      console.log(res)

      context.commit('cctoken', res.data.data)

      settoken(res.data.data)
    }
  }

}
