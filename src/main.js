import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/vant'
import '@/styles/const.less'

// 相对时间
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// 导入中文包
import 'dayjs/locale/zh-cn'
// 在设置中文
dayjs.locale('zh-cn')

// 让dayjs运用插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 做成全局 - 过滤器)(将拿到的数据进行过滤替换成转换好的时间)
Vue.filter('relvTime', (val) => {
  return dayjs(val).fromNow()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
