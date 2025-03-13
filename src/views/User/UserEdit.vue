<template>
  <div>

    <!-- 头部区域 -->
    <van-nav-bar title="编辑个人信息" left-arrow @click-left="$router.back()" />

    <!-- 头像区域 -->
    <div class="tx">

      <van-uploader :after-read="afterRead" />

      <van-image
    round
      :src="userinfo.photo"
    />
    </div>

    <van-cell title="姓名" is-link :value=" userinfo.name"/>
    <van-cell title="性别" is-link :value="userinfo.gender === 1? '男' : '女'"/>
    <van-cell title="生日" is-link :value="userinfo.birthday "/>

    <!-- 裁剪区域 -->
     <div v-if="caijian" class="caijian">

      <vueCropper
    ref="cropper"
    :img="content"
    autoCrop
    autoCropWidth="200"
    autoCropHeight="200"

></vueCropper>

<van-button type="info" size="normal" @click="doCrop">确认</van-button>
<van-button type="info" size="normal" style="right: 0;" @click="caijian=false">取消</van-button>

     </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { VueCropper } from 'vue-cropper'
import { gxtp } from '@/api/login'

export default {

  data () {
    return {

      // 裁剪显示
      caijian: false,

      // 裁剪图片数据
      content: ''

    }
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)

      // 点击上传完文件后显示裁减
      this.caijian = true

      // 将上传拿到的数据，赋值给裁剪显示图片
      this.content = file.content
    },
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

@h:147px;

.tx{

  position: relative;
 height: @h;
 display: flex;
 justify-content: center;
 align-items: center;
}

.van-image{
    display: block;
    width: 110px;
    height:110px;
}
.van-nav-bar{
    height: 50px;
    line-height: 50px;
}
.van-uploader{
  // 为了要保留功能用透明度
   position: absolute;
   opacity: 0;
   z-index: 1;
}
/deep/ .van-uploader__upload{
  width: 100vw;
  height: @h;

}
.caijian{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #7c7c7c;
}
.van-button{
  position: absolute;
  bottom: 0;
}
</style>
