<template>
  <div>
    <van-nav-bar
  title="登录"
  left-text="返回"
  left-arrow
/>
    <van-form @submit="onSubmit">
  <van-field
    v-model="from.mobile"
    name="mobile"
    label="用户名"
    placeholder="用户名"
    :rules="[
      { required: true, message: '请填写用户名' },
      { pattern: /\w{11}/,message: '长度为6'}
    ]"
  />
  <van-field
    v-model="from.code"
    type="password"
    name="code"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' },{ pattern: /\w{6}/,message: '长度为6'}]"
  />
  <div style="margin: 16px;">
    <van-button round block :loading="dontai" type="info" loading-text="加载中..." native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
// import { dlu } from '@/api/login'
// import { settoken } from '@/utils/storage'
export default {
  name: 'LoGin',
  data () {
    return {
      from: {

        mobile: '',
        code: ''

      },
      dontai: false

    }
  },
  methods: {
    async onSubmit (values) {
      try {
      //  开始加载
        this.dontai = true

        await this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })

        await this.$store.dispatch('logtoken', values)

        this.$toast.success('登录成功')

        // 登录成功要跳转 -- 有想去的页面就回到想去的页面，没有就去首页
        if (this.$route.query.x) {
          this.$router.push(this.$route.query.x)
        } else {
          // 没有参数就直接去首页
          this.$router.push('/')
        }
      } catch {
      // 无论成功失败都执行 停止加载
      } finally {
        this.dontai = false
      }
    }
  }
}
</script>

<style>

</style>
