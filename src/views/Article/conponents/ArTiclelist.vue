<template>
  <div class="aaa">
    <van-pull-refresh
      v-model="xlLoading"
      @refresh="onRefresh"
      :success-text="xxx"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(v,index) in list" :key="index">
          <!-- top -->
          <div>{{ v.title }}</div>
          <!-- 图片 -->
          <van-grid :border="false" :column-num="v.cover.type" class="imgxxx">
            <van-grid-item v-for="(img, index) in v.cover.images" :key="index">
              <van-image :src="img" />
            </van-grid-item>
          </van-grid>

          <!-- 信息 -->

          <div class="xx">
            <span>{{ v.aut_name }}</span>
            <span style="margin: 0 16px">{{ v.comm_count }}</span>
            <!-- 时间转换 -->
            <span>{{ pubdate(v.pubdate) }}</span>
            <van-icon name="cross" style="float: right" />
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// 导入中文包
import 'dayjs/locale/zh-cn'
import { newlist } from '@/api/article'
export default {
  props: {
    maclist: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      times: Date.now(),
      // 下拉刷新 相当于loading
      // onRefresh 相当于 onLoad
      xlLoading: false,

      xxx: '刷新成功'

    }
  },
  methods: {
    pubdate (x) {
      // 在设置中文
      dayjs.locale('zh-cn')

      // 让dayjs运用插件
      dayjs.extend(relativeTime)
      dayjs.locale('zh-cn')

      // 让dayjs运用插件
      // 返回转好的数据
      return dayjs(x).fromNow()
    },

    async onLoad () {
      const res = await newlist({
        channel_id: this.maclist,
        timestamp: this.times
      })

      // 将返回的上一次新闻赋值给最新新闻，重新发请求
      this.times = res.data.data.pre_timestamp

      this.list.push(...res.data.data.results)

      this.loading = false

      // 当数据请求完，会返回一个null 将进行判断
      if (this.times === null) {
        this.finished = true
      }

      // 简写  this.times === null 判断的值也不是true就是fales
      // this.finished = this.times === null
    },

    // 下拉刷新
    async onRefresh () {
      // 将封装好的请求，把当前最新时间传入得到最新信息

      const res = await newlist({
        channel_id: this.maclist,
        timestamp: Date.now()
      })

      // 将pre_timestamp存起来，到下来的时候判断是否重复
      // this.pre_timestamp = res.data.data.pre_timestamp

      this.xlLoading = false

      if (Date.now() === res.data.data.results) {
        this.xxx = '最新数据'
      } else {
        this.list.unshift(...res.data.data.results)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .van-image {
  height: 120px;
}
.aaa{
  width: 100%;
  position:fixed;
  overflow: auto;
  top: 90px;
  left: 0;
  right: 0;
  bottom:50px;
}
</style>
