<template>
  <div>
    <div class="user-box">
      <van-image
      :src="user_g.photo"
      fill
      round
     />
     <div class="left-top">
      <h2>{{ user_g.name }}</h2>
      <span>{{ user_g.birthday }}</span>
     </div>

    </div>

    <!-- 快速浏览 -->

    <van-grid :column-num="3" :border="false">
  <van-grid-item   icon="photo-o" text="我的作品" style="color: aqua;"/>
  <van-grid-item   icon="photo-o" text="我的收藏" style="color: red;"/>
  <van-grid-item   icon="photo-o" text="阅读历史" style="color: bisque;"/>
</van-grid>

<!-- 4 -->
<van-cell-group>
<van-cell title="编辑资料" is-link  icon="edit"/>
<van-cell title="小哲同学" is-link icon="more-o"/>
<van-cell title="系统设置" is-link icon="setting-o"/>
<van-cell title="退出登录" is-link icon="info-o" @click="deldlu"/>
</van-cell-group>

  </div>
</template>

<script>
import { grxx } from '@/api/login'
import { remtoken } from '@/utils/storage'
export default {

  name: 'UsEr',
  data () {
    return {
      user_g: []
    }
  },

  async created () {
    const res = await grxx()

    this.user_g = res.data.data

    console.log(res)
  },
  methods: {
    deldlu () {
      this.$dialog.confirm({
        message: '确认推出吗'
      })

      // 确认返回登录页，清除token
        .then(() => {
          remtoken()
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    }

  }

}
</script>

<style   scoped lang="less">

.user-box{

  @clic:#3296fa;

  height: 140px;
  background-color:@clic;
  display: flex;
  align-items: center;

  .van-image{

    width: 110px;
    height: 110px;
    margin: 0 20px;

  }

  .left-top{

    color: #fff;

    font-size: 17px;

    h2{
      margin-bottom:10px;
    }

    span{
      color: @clic;
      background-color: #fff;
      padding: 5px;
    }

  }
}

</style>
