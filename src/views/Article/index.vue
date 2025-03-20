<template>
  <div>
    <van-nav-bar  left-arrow>
  <template #left>
    <img src="@/assets/logo.png" alt="" class="logimg"> vue 头条
  </template>

  <template #right>
    <van-button icon="search" round type="info">搜索</van-button>
  </template>
</van-nav-bar>

 <!-- tab栏 用盒子包起来，做相对定位-->
  <div class="tabbox">
  <van-tabs v-model="active" >
  <van-tab v-for="v in List" :title="v.name" :key="v.id">
    <ArTiclelist :maclist="v.id"></ArTiclelist>
  </van-tab>
</van-tabs>

<van-icon name="apps-o" class="apps"/>
  </div>

  </div>
</template>

<script >
import { OWNlistapi } from '@/api/OWNlistapi'
import ArTiclelist from './conponents/ArTiclelist.vue'
export default {

  name: 'ArTcie',

  data () {
    return {
      List: [],
      active: 0

    }
  },
  async created () {
    const res = await OWNlistapi()

    console.log(res)

    this.List = res.data.data.channels
  },
  components: {
    ArTiclelist
  }

}
</script>

<style scoped lang="less">

.logimg{
  width: 30px;height: 30px;

  margin-right: 5px;
}
.van-nav-bar{
  background-color: #fafafc;
}
.van-button{
 width: 100px;
 height: 30px;

 background-color: rgb(245, 245, 247);
}
/deep/ .van-button--info {
    color: #514f4f;
    background-color:rgb(245, 245, 247);
    border: 1px solid #dbdcdd;
}
/deep/ .van-icon {

  color: #514f4f !important;

}
.tabbox{
  position: relative;
}

/deep/ .van-tabs__wrap{
  width: 345px;

  overflow: hidden;

}

.apps{
  right: 0;
  top: 0;
  position: absolute;
  line-height: 44px;
  height: 44px;
  font-size: 30px;
}
.tabbox{
  // margin-bottom: 50px;
}

</style>
