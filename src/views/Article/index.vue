<template>
  <div>
    <van-nav-bar left-arrow>
      <template #left>
        <img src="@/assets/logo.png" alt="" class="logimg" /> vue 头条
      </template>

      <template #right>
        <van-button icon="search" round type="info">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- tab栏 用盒子包起来，做相对定位-->
    <div class="tabbox">
      <van-tabs v-model="active"  >
        <van-tab v-for="v in List" :title="v.name" :key="v.id" >
          <ArTiclelist :maclist="v.id"></ArTiclelist>
        </van-tab>
      </van-tabs>

      <!-- 点击弹出频道 -->
      <van-icon name="apps-o" class="apps" @click="hbshow = true"  />
    </div>
    <!-- 弹框 -->

      <van-popup round closeable  v-model="hbshow" position="bottom" close-icon-position="top-left">

        <!-- 封装频道组件 -->
         <PinDao :List="List" :active="active" @xxll="xxl" @onadd='onadd' @hbshow="hbshow = !hbshow" @acti="active = $event" @activejianyi="active=active-$event"></PinDao>
      </van-popup>
  </div>
</template>

<script>
import { OWNlistapi } from '@/api/OWNlistapi'
import { dltjpd, dlscpd } from '@/api/PinDaoall'
import ArTiclelist from './conponents/ArTiclelist.vue'
import PinDao from './conponents/PinDao.vue'
import { mapState } from 'vuex'
import { hqpindao } from '@/utils/storage'
export default {
  name: 'ArTcie',

  data () {
    return {
      List: [],
      active: 0,
      tabid: '',
      hbshow: false
    }
  },
  // 请求频道信息
  async created () {
    // 首获取正确数据
    // 1判断是否登录
    // 2没有登录看看本地存储有没有
    // 3本地没有，将请求用户未登录数据

    // 判断token是否有

    if (this.tokenx) {
      console.log('个人数据')

      const res = await OWNlistapi()
      this.List = res.data.data.channels
    } else {
      // 有本地请求本地
      if (hqpindao()) {
        console.log('本地')

        const rrr = hqpindao()
        this.List = rrr
      } else {
        console.log('基本')

        // 没有本地存储则请求基本数据
        const res = await OWNlistapi()
        this.List = res.data.data.channels
      }
    }
  },
  components: {
    ArTiclelist,
    PinDao
  },
  computed: {
    ...mapState('login', ['tokenx'])

  },
  methods: {

    // 删除频道

    async xxl (x) {
      this.List.splice(x.x, 1)

      console.log(x)

      // 删除频道频道

      if (this.tokenx) {
        console.log('登录')

        // 删除请求
        await dlscpd(x.v)
      } else {
        console.log('未登录')
      }
    },
    // 添加频道
    async onadd (x) {
      this.List.push(x)

      console.log('222222', x)

      // 判断是否为登录状态，登录则发请求，未登录未存储本地

      if (this.tokenx) {
        console.log('登录')

        await dltjpd({
          id: x.id,
          seq: this.List.length
        })

        console.log(this.List.length, x.id)
      } else {
        console.log('未登录')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-popup{
  height: 100%;
  padding-top: 40px;
  .van-icon-cross{
    font-size: 25px;
  }
}
.logimg {
  width: 30px;
  height: 30px;

  margin-right: 5px;
}

.van-nav-bar {
  background-color: #fafafc;
}

.van-button {
  width: 100px;
  height: 30px;

  background-color: rgb(245, 245, 247);
}

/deep/ .van-button--info {
  color: #514f4f;
  background-color: rgb(245, 245, 247);
  border: 1px solid #dbdcdd;
}

/deep/ .van-icon {
  color: #514f4f !important;
}

.tabbox {
  position: relative;
}

/deep/ .van-tabs__wrap {
  width: 345px;

  overflow: hidden;
}

.apps {
  right: 0;
  top: 0;
  position: absolute;
  line-height: 44px;
  height: 44px;
  font-size: 30px;
}

.tabbox {
  // margin-bottom: 50px;
}
</style>
