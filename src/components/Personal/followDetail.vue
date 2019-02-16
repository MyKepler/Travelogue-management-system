<template>
  <div class="followDetail" style="position:relative;">
    <div class="followDetailAvator"><img :src="img" class="avator"></div>
    <div class="followDetailInfo">
      <div class="name">小米</div>
      <div class="followDetailNote">小小米小米小米小米小米米</div>
    </div>
    <el-button class="followDetailBtn" v-show="false">关注</el-button>
    <el-button class="followDetailBtn" v-show="false">取消关注</el-button>
    <el-button class="followDetailBtn" v-show="true">互相关注</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg')
    }
  }
}
</script>
<style lang="less" scoped>
  .followDetail{
    position: relative;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    height: 85px;
    .followDetailAvator{
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin: 0;
      }
    }
    .followDetailInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      .name {
        font-size: 17px;
        font-weight: bold;
      }
      .followDetailNote{
        font-size: 16px;
      }
    }
    .followDetailBtn{
      position:absolute;
      right:5px;
      top:23px;
      background: #fff;
      border:1px solid #ccc;
      color:#000;
    }
    .followDetailBtn:hover{
      background: #ccc;
      color: #fff;
      border: 1px solid #fff;
    }
  }
</style>
