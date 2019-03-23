
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">
    <img :src="img" class="avator" @click="init()">
    <div class="name">{{name}}</div>
    <div class="follow">
      <div class="followItem" @click="toFollow()">关注&nbsp; {{follow}}</div>
      <div class="followerItem" @click="toFollower()">粉丝&nbsp; {{follower}}</div>
    </div>
    <div class="motto">{{motto}}</div>
    <personal-page :isShowFollow="isShowFollow"></personal-page>
    <follow-list :isShowFollow="isShowFollow" :isFollow="isFollow" v-on:followNums="followNums"></follow-list>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import FollowList from '@/components/Personal/followList.vue'
import PersonalPage from '@/components/Personal/personalPage.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      name: '徐欣奕',
      follow: 23,
      follower: 250,
      motto: '热爱生活',
      isShowFollow: true,
      isFollow: true,
      whichShow: 1
    }
  },
  components: {
    NavHeader,
    PersonalPage,
    FollowList
  },
  methods: {
    followNums: function (data) {
      this.follow = data.followNum
      this.follower = data.fansNum
    },
    init () {
      this.isShowFollow = true
      this.isFollow = true
    },
    toFollow () {
      this.isShowFollow = false
      this.isFollow = false
    },
    toFollower () {
      this.isShowFollow = false
      this.isFollow = true
    },
    initInfo () {
      let userId = this.$route.params.userId
      let params = {
        id: userId
      }
      axios.post('/api/changeInfo', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.img = response.data.result[0].avator
            this.name = response.data.result[0].account
            this.motto = response.data.result[0].motto
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.init()
    console.log(1)
  },
  created () {
    this.initInfo()
  }
}
</script>
<style lang="less" scoped>
  .content {
    margin-top: -58px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #D3D3D3;
  }
  .personalInfo {
    height: 850px;
    width: 74%;
    margin: 0 auto;
    background-color: #fff;
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    .avator {
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: 30px auto 0px auto;
    }
    .name {
      // font-family: STXinwei;
      font-family: KaiTi_GB2312;
      font-size: 20px;
      margin: 10px auto;
      font-weight: bold;
    }
    .motto {
      color: #999999;
      margin: 10px auto -10px auto;
      font-size: 16px;
    }
    .follow{
      margin: 0 auto;
      font-size: 17px;
      padding-left: 10px;
      .followItem{
        cursor: pointer;
      }
      .followerItem{
        cursor: pointer;
      }
    }
    .follow div{
      height: 20px;
      line-height: 20px;
      width: 100px;
      text-align: center;
      display: inline-block;
      margin: 0;
    }
    .follow div:first-child{
      border-right: 1px solid #666;
    }
    // .articleTab{
    //   width:90%;
    //   height: 40px;
    //   border-bottom: 2px solid #ccc;
    //   margin-top: 20px;
    //   display:inline-flex;
    //   .tab {
    //     width: 25%;
    //     height: 100%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     color: #ffffff;
    //     font-size: 18px;
    //     background: #ccc;
    //     border-right: 2px solid #ffffff;
    //     cursor: pointer;
    //   }
    //   .tab:last-child{
    //     border-right: none;
    //   }
    //   .tab:hover{
    //     background: rgb(190, 190, 190);
    //   }
    //   .active{
    //     background: rgb(167, 167, 167);
    //   }
    //   .active:hover{
    //     background: rgb(167, 167, 167);
    //   }
    // }
    // .articleGroup{
    //   width: 90%;
    //   margin:0 auto;
    //   min-height: 500px;
    // }
    // .pagination{
    //   margin: 30px auto;
    // }
  }
</style>
