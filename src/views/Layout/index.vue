<template>
  <div>

      <router-view  > </router-view>

    <van-tabbar route>
  <van-tabbar-item icon="home-o" to="/Article">首页</van-tabbar-item>
  <van-tabbar-item icon="comment-o" to="/ask">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/vide">视频</van-tabbar-item>
  <van-tabbar-item icon="smile-o" to="/User">我的</van-tabbar-item>
</van-tabbar>

    </div>
</template>

<script>
export default {

  name: 'LaYout'

}
</script>

<style lang="less" scoped>

</style>
