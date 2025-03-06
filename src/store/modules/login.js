import { dlu } from '@/api/login'

import { settoken, getToken } from '@/utils/storage'

export default {
  state: {

    token: {

      tokenx: getToken() || null

    }

  },
  mutations: {
    cctoken (state, x) {
      state.token.tokenx = x.token
    }

  },
  actions: {
    async logtoken (context, x) {
      const res = await dlu(x)
      console.log(res)

      context.commit('cctoken', res.data.data)

      settoken(res.data.data.token)
    }
  }

}
