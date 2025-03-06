<template>
  <div>
    <van-nav-bar
  title="注册"
  left-text="返回"
  left-arrow
/>
    <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[
      { required: true, message: '请填写用户名' },
      { pattern: /\w{6}/,message: '长度为6'}
    ]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' },{ pattern: /\w{6}/,message: '长度为6'}]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
export default {
  name: 'LoGin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style>

</style>
