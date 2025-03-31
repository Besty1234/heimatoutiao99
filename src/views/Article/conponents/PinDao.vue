<template>
  <div class="app">
    <van-cell :border="false">
      <template #title>我的频道</template>
      <van-button type="danger" plain round size="mini" @click="clotrue=!clotrue" >{{ clotrue ? ' 完成' :'编辑' }}  </van-button>
    </van-cell>

    <van-grid :gutter="10">

      <!--
       index组件 原本有一个 active，可以拿到下标，
       那么就可以传到子组件，去做判断，父组件active下标等于子组件index
        -->
      <van-grid-item v-for="(v,index) in List" :class="{ccccc:active=== index}" :key="v.id" :text="v.name" :icon="clotrue ? 'close' : ''"  @click="spbj(index,v.id,v)" />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <template #title>频道推荐</template>
    </van-cell>

    <van-grid :gutter="10" class="xxx" >
      <van-grid-item v-for="v in gllist" :key="v.id" :text="v.name" @click="onadd(v)" />
    </van-grid>
  </div>
</template>

<script>
import { pdall } from '@/api/PinDaoall'
import { pindaocc } from '@/utils/storage'

export default {

  // 接收我的频道数据v
  props: {
    List: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 获取所有频道
      nolist: [],
      clotrue: false

    }
  },
  async created () {
    const res = await pdall()

    this.nolist = res.data.data.channels
    console.log(res)
  },
  computed: {

    gllist () {
      pindaocc(this.List)

      // 先把第一个数组遍历，才能到过滤中进行每一个数据比较
      return this.nolist.filter(v => {
      // 过滤，将不同的数据筛选出来
        return !this.List.find(x => {
          return x.name === v.name
        })
      })
    }

  },
  methods: {

    // 添加频道
    onadd (x) {
      this.$emit('onadd', x)
    },
    // 编辑频道
    spbj (x, v) {
      pindaocc(this.List)
      // console.log(x, v)

      // 频道是编辑状态还是关闭状态
      if (this.clotrue) {
        // 发现active下标大于传回来的下标,就减去下标
        if (this.active >= x && x !== 1 && x !== 0) {
          this.$emit('activejianyi', 1)
        }

        if (x !== 1 && x !== 0) this.$emit('xxll', { x, v })
      } else {
      // 在未编辑状态下，点击将跳转到频道
      // 1. 关闭弹出宽
      // 2. 跳转频道
        this.$emit('hbshow')
        this.$emit('acti', x)
      }
    }
  }
}
</script>

<style scoped lang="less">

.ccccc{
  /deep/ .van-grid-item__text{

  color:red !important;

  }
}
.app {
  padding-top: 15px;
}
.van-cell{

  margin-bottom: 15px;

}
.xxx{

/deep/ .van-grid-item__content--center{

  background-color: #f4f5f6;
}
}
/deep/ .van-grid-item__text{
  font-style: 16px;
  color: #333333;
}
.van-grid-item{
  width: 80px;
  height: 43px;
}
/deep/ .van-grid-item__content--center{
  position: relative;
  .van-icon-close{
    position: absolute;
    top: -5px;
    right: -6px;
    font-size: 16px;
  }
  .van-grid-item__text{
    margin: 0;
  }
}
</style>
