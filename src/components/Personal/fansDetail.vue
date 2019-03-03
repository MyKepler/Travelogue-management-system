<template>
  <div class="followDetail" style="position:relative;">
    <div class="followDetailAvator"><img :src="img" class="avator"></div>
    <div class="followDetailInfo">
      <input type="hidden" v-model="myFans.followId">
      <div class="name">{{myFans.account}}</div>
      <div class="followDetailNote">{{myFans.motto}}</div>
    </div>
    <el-button class="followDetailBtn" v-show="isEachOther">添加关注</el-button>
    <el-button class="followDetailBtn" v-show="!isEachOther">互相关注</el-button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    myFans: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      isEachOther: true
    }
  },
  created () {
    let userId = this.$store.getters.isLogin
    let fansId = this.myFans.followId
    console.log()
    axios.get('/api/follow?followId=' + userId + '&beFollowedId=' + fansId + '')
      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data)
          this.isEachOther = false
        } else {
          this.isEachOther = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
