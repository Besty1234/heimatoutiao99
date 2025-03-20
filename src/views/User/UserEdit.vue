<template>
  <div>

    <!-- 头部区域 -->
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="$router.back()" />

    <!-- 头像区域 -->
    <div class="tx">

      <van-uploader :after-read="afterRead" />

      <van-image round :src="userinfo.photo" />
    </div>

    <van-cell title="姓名" is-link :value="userinfo.name" @click="tcname('name')" />
    <van-cell title="性别" is-link :value="userinfo.gender === 1 ? '女' : '男'" @click="gendershow = true" />
    <van-cell title="生日" is-link :value="userinfo.birthday" @click="birthday" />

    <!-- 裁剪区域 -->
    <div v-if="caijian" class="caijian">

      <vueCropper ref="cropper" :img="content" autoCrop autoCropWidth="200" autoCropHeight="200"></vueCropper>

      <van-button type="info" size="normal" @click="doCrop">确认</van-button>
      <van-button type="info" size="normal" style="right: 0;">取消</van-button>

    </div>

    <!-- 弹出框 -->

    <van-dialog @confirm="chengname" v-model="show" title="名称" show-cancel-button>
      <van-field v-model="value" ref="inp" />
    </van-dialog>

    <!-- 性别弹出层 -->
    <van-popup v-model="gendershow" position="bottom">
      <van-nav-bar title="性别" left-text="返回" @click-left="gendershow = false" />
      <!-- 点击做同一件事，绑定同一个事件 -->
      <van-cell title="男" is-link @click="genders(0)"/>
      <van-cell title="女" is-link @click="genders(1)"/>
    </van-popup>

    <!-- 时间更新 -->
    <van-popup v-model="pickershow" position="bottom">

    <van-datetime-picker @cancel="pickershow = false" @confirm="bifirm"  v-model="currentDate" type="date" title="选择年月日"
      :min-date="minDate" :max-date="maxDate" />
    </van-popup>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { gxtp, xgname } from '@/api/login'

import dayjs from 'dayjs'

export default {

  data () {
    return {

      // 裁剪显示
      caijian: false,

      // 裁剪图片数据
      content: '',

      // 弹框
      show: false,

      value: 'name',

      // 性别弹出层
      gendershow: false,

      minDate: new Date(1888, 0, 1),
      maxDate: new Date(2070, 10, 1),
      currentDate: new Date(this.$store.state.login.userinfo.birthday),

      // 时间显示隐藏变量
      pickershow: false
    }
  },
  methods: {

    // 时间发请求
    async bifirm () {
      const birthday = dayjs(this.currentDate).format('YYYY-MM-DD')

      // 简写，当参数值和名字一样可简写
      await xgname({ birthday })

      this.$store.commit('login/grxxmax', {
        ...this.userinfo,
        birthday
      })

      this.pickershow = false
    },

    // 时间更新 弹出
    birthday () {
      this.pickershow = true
    },

    // 性别弹出层，发请求
    async genders (gender) {
      // 发请求
      await xgname({ gender })

      this.$store.commit('login/grxxmax', {
        ...this.userinfo,
        gender
      })

      // 发送请求，关闭发送层
      this.gendershow = false
    },

    // 确认发送请求，修改信息 , 因为公用一个弹出框 /利用标识去做判断, 要请求哪个api
    async chengname () {
      if (!this.value) return this.$toast('不能为空')

      // 名字
      const res = await xgname({ name: this.value })

      console.log(res)

      // 更改vuex值，实现动态更新
      this.$store.commit('login/grxxmax', {
        ...this.userinfo,
        name: this.value
      })
    },
    // 点击弹出框
    // 多次用到这个点击，让他传入一个参数，当点击的时候去判断参数，当参数等于name弹出框就显示name
    tcname (x) {
      this.show = true

      // 利用传值判断，要显示名字还是男女3
      this.value = this.userinfo.name

      // 聚焦

      // 注意新版本vant再用弹出框时，会抢走焦点，所以导致我们的输入框焦点一闪而过
      this.$nextTick(() => {
        // 聚焦 - 抢走聚焦
        this.$refs.inp.focus()
        // 过半秒重新在让输入框聚焦
        setTimeout(() => {
          this.$refs.inp.focus()
        }, 500)
      })
    },
    // 上传图片数据赋值
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)

      // 点击上传完文件后显示裁减
      this.caijian = true

      // 将上传拿到的数据，赋值给裁剪显示图片
      this.content = file.content
    },

    // 裁剪之后数据，发送请求
    doCrop () {
      // 拿到裁剪后的数据，看接口文档要file数据还是base64
      this.$refs.cropper.getCropBlob(async data => {
        // 因为请求上传，都要用fomdata
        const fd = new FormData()
        // 追加数据(data裁剪后数据)， 参数名photo  接口文档有则写没有则不写
        fd.append('photo', data)

        console.log(fd)

        // 发送请求
        const res = await gxtp(fd)

        // 做图片回显
        this.$store.commit('login/huixtp', res.data.data.photo)
      })

      // 隐藏裁剪
      this.caijian = false
    }

  },

  async created () {
    this.$store.dispatch('login/gr')
  },

  computed: {
    ...mapState('login', ['userinfo'])
  },
  components: {
    VueCropper
  }

}
</script>

<style scoped lang="less">
@h: 147px;

.tx {

  position: relative;
  height: @h;
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-image {
  display: block;
  width: 110px;
  height: 110px;
}

.van-nav-bar {
  height: 50px;
  line-height: 50px;
}

.van-uploader {
  // 为了要保留功能用透明度
  position: absolute;
  opacity: 0;
  width: 100%;

  z-index: 1;
}

/deep/ .van-uploader__upload {
  // width: 100vw;
  width: 100%;
  height: @h;

}

.caijian {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #7c7c7c;
}

.van-button {
  position: absolute;
  bottom: 0;
}
</style>
