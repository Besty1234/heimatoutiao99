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
      <van-tabs v-model="active">
        <van-tab v-for="v in List" :title="v.name" :key="v.id">
          <ArTiclelist :maclist="v.id"></ArTiclelist>
        </van-tab>
      </van-tabs>

      <!-- 点击弹出频道 -->
      <van-icon name="apps-o" class="apps" @click="hbshow = true"  />
    </div>
    <!-- 弹框 -->

      <van-popup round closeable  v-model="hbshow" position="bottom" close-icon-position="top-left">

        <!-- 封装频道组件 -->
         <PinDao :List="List" @xxll="xxl" @onadd='onadd' @hbshow="hbshow = !hbshow" @acti="active = $event"></PinDao>
      </van-popup>
  </div>
</template>

<script>
import { OWNlistapi } from '@/api/OWNlistapi'
import ArTiclelist from './conponents/ArTiclelist.vue'
import PinDao from './conponents/PinDao.vue'
export default {
  name: 'ArTcie',

  data () {
    return {
      List: [],
      active: 0,
      hbshow: false
    }
  },
  // 请求频道信息
  async created () {
    const res = await OWNlistapi()

    console.log(res)

    this.List = res.data.data.channels
  },
  components: {
    ArTiclelist,
    PinDao
  },
  methods: {
    // 删除频道
    xxl (x) {
      if (x !== 1 && x !== 0) {
        this.List.splice(x, 1)
      }

      console.log(x)
    },
    // 添加频道
    onadd (x) {
      this.List.push(x)
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
