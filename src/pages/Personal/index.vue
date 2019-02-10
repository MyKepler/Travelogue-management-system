
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">
    <img :src="img" class="avator" @click="init()">
    <div class="follow">
      <div class="followItem" @click="toFollow()">关注&nbsp; {{this.follow}}</div>
      <div class="followerItem" @click="toFollower()">粉丝&nbsp; {{this.follower}}</div>
    </div>
    <div class="articleTab" v-show="isShowFollow">
      <div class="tab">
        我的游记
      </div>
      <div class="tab">
        我的收藏
      </div>
      <div class="tab">
        我的消息
      </div>
      <div class="tab">
        我的问答
      </div>
    </div>
    <div class="articleItem" v-show="isShowFollow">
      <img class="imgItem" src="@/assets/images/Tokyo2.jpg">
      <div class="infoItem">
        <h2>冰岛5天4夜自由行</h2>
        <p>by 徐欣奕&nbsp;&nbsp;&nbsp;2018-11-27 22：30</p>
        <div class="contentItem">
              冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。
          冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是
          冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被
          称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人
          第一次发现的间歇泉。
        </div>
        <div class="bottomItem">
          <div class="left">
          <i class="iconfont">&#xe655;</i>
          <span>冰岛</span>
          </div>
          <div class="right">
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
          </div>
        </div>
      </div>
    </div>
    <div class="followList" v-show="!isShowFollow && !isFollow">
      <div class="followDetail" style="position:relative;">
        <div class="followDetailAvator"><img :src="img" class="avator"></div>
        <div class="followDetailInfo">
          <div class="name">小米</div>
          <div class="followDetailNote">小小米小米小米小米小米米</div>
        </div>
        <el-button class="followDetailBtn" v-show="false">关注</el-button>
        <el-button class="followDetailBtn" v-show="true">取消关注</el-button>
      </div>
      <div class="followDetail">
        <div class="followDetailAvator"><img :src="img" class="avator"></div>
        <div class="followDetailInfo">
          <div class="name">小米</div>
          <div class="followDetailNote">小小米小米小米小米小米米</div>
        </div>
        <el-button class="followDetailBtn" v-show="false">关注</el-button>
        <el-button class="followDetailBtn" v-show="true">取消关注</el-button>
        <el-button class="followDetailBtn" v-show="false">互相关注</el-button>
      </div>
    </div>
    <div class="followList" v-show="!isShowFollow && isFollow">
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
      <div class="followDetail">
        <div class="followDetailAvator"><img :src="img" class="avator"></div>
        <div class="followDetailInfo">
          <div class="name">小米</div>
          <div class="followDetailNote">小小米小米小米小米小米米</div>
        </div>
        <el-button class="followDetailBtn" v-show="false">关注</el-button>
        <el-button class="followDetailBtn" v-show="false">取消关注</el-button>
        <el-button class="followDetailBtn" v-show="true">互相关注</el-button>
      </div>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      follow: 23,
      follower: 250,
      isShowFollow: true,
      isFollow: true
    }
  },
  components: {
    NavHeader
  },
  mounted: function () {
    this.init()
    console.log(1)
  },
  methods: {
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
    }
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
    height: 800px;
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
      margin: 30px auto 15px auto;
    }
    .follow{
      margin: 0 auto;
      font-size: 17px;
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
    .articleTab{
      width:90%;
      height: 40px;
      border-bottom: 2px solid #ccc;
      margin-top: 20px;
      display:inline-flex;
      .tab {
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 18px;
        background: #ccc;
        border-right: 2px solid #ffffff;
        cursor: pointer;
      }
      .tab:last-child{
        border-right: none;
      }
      .tab:hover{
        background: rgb(190, 190, 190);
      }
    }
    .articleItem{
      display: inline-flex;
      width: 90%;
      border-bottom: 2px solid #ccc;
      padding: 10px 10px 5px 0px;
      .imgItem{
        width: 230px;
        min-width: 230px;
        height: 160px;
      }
      .infoItem{
        text-align: left;
        margin-left: 20px;
        word-break: break-word;
        p{
          color:#ccc;
          margin: 10px 0;
        }
        .contentItem{
          height: 70px;
          font-size:17px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .bottomItem{
          width: 100%;
          height: 30px;
          line-height: 35px;
          display: inline-flex;
          .iconfont{
            line-height: 30px;
          }
          .left{
            width: 30%;
          }
          .right{
            width:70%;
            // float: right;
            text-align: right;
            .mr3{
              margin-right: 3px;
              margin-left: -3px;
            }
          }
        }
      }
    }
    .followList{
      border-top: 2px solid #ccc;
      width: 90%;
      margin: 20px auto 0 auto;
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
    }
  }
</style>
