
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
      <div class="tab" :class="whichShow=='1'?'active':''" @click="tabChoose1()">
        我的游记
      </div>
      <div class="tab" :class="whichShow=='2'?'active':''" @click="tabChoose2()">
        我的收藏
      </div>
      <div class="tab" :class="whichShow=='3'?'active':''" @click="tabChoose3()">
        我的消息
      </div>
      <div class="tab" :class="whichShow=='4'?'active':''" @click="tabChoose4()">
        我的问答
      </div>
    </div>
    <div class="articleGroup" v-show="isShowFollow">
      <article-item></article-item>
      <article-item></article-item>
      <!-- <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination> -->
    </div>
    <div class="followList" v-show="!isShowFollow && !isFollow">
      <follow-detail></follow-detail>
      <follow-detail></follow-detail>
    </div>
    <div class="followList" v-show="!isShowFollow && isFollow">
     <follow-detail></follow-detail>
      <follow-detail></follow-detail>
      <follow-detail></follow-detail>
      <follow-detail></follow-detail>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import ArticleItem from '@/components/HomePage/articleItem.vue'
import FollowDetail from '@/components/Personal/followDetail.vue'
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      follow: 23,
      follower: 250,
      isShowFollow: true,
      isFollow: true,
      whichShow: 1
    }
  },
  components: {
    NavHeader,
    ArticleItem,
    FollowDetail
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
    },
    tabChoose1 () {
      this.whichShow = 1
    },
    tabChoose2 () {
      this.whichShow = 2
    },
    tabChoose3 () {
      this.whichShow = 3
    },
    tabChoose4 () {
      this.whichShow = 4
    }
  },
  created () {
    console.log(this.$store)
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
      .active{
        background: rgb(167, 167, 167);
      }
      .active:hover{
        background: rgb(167, 167, 167);
      }
    }
    .articleGroup{
      width: 90%;
      margin:0 auto;
      min-height: 500px;
    }
    .followList{
      border-top: 2px solid #ccc;
      width: 90%;
      margin: 20px auto 0 auto;
    }
    .pagination{
      margin: 30px auto;
    }
  }
</style>
