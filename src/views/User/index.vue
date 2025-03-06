<template>
  <div>
    <div class="user-box">
      <van-image

      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      fill
      round
     />
     <div class="left-top">
      <h2>xxxxx</h2>
      <span>1999-11-02</span>
     </div>

    </div>
  </div>
</template>

<script>
export default {

  name: 'UsEr'

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

    width: 111px;
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
