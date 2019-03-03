
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row style="text-align: left;">
    <div class="articleAvator"><img :src="img" class="avator"></div>
    <div class="articleDetail">
      <span class="articleTitle">{{articleDetail.title}}</span><span class="articleAuthor">by {{articleDetail.account}}</span>
      <div class="articleInfo">
        <i class="iconfont" style="font-size:24px;">&#xe672;</i>
        <span>{{articleDetail.createDate}}</span>
        <i class="iconfont" style="font-size:24px;">&#xe627;</i>
        <span>{{articleDetail.tripDay}}日游</span>
        <i class="iconfont">&#xe633;</i>
        <span>{{articleDetail.destination}}</span>
      </div>
      <div class="articleContent">
        {{articleDetail.content}}
      </div>
      <div class="bottomItem">
        <div class="right">
          <i class="iconfont">&#xe609;</i>
          <span class="mr3">11</span>
          <i class="iconfont">&#xe7f5;</i>
          <span class="mr3">11</span>
          <i class="iconfont">&#xe613;</i>
          <span class="mr3">11</span>
        </div>
      </div>
      <!-- <div class="coment">
        <div class="comentAvator"><img :src="img" class="avator"></div>
        <div class="comentInfo">
          <div class="name">小米 <span>2018-10-1</span></div>
          <div class="comentDetail">小小米小米小米小米小米米</div>
        </div>
      </div>
      <div class="coment">
        <div class="comentAvator"><img :src="img" class="avator"></div>
        <div class="comentInfo">
          <div class="name">小米 <span>2018-10-1</span></div>
          <div class="comentDetail">小小米小米小米小米小米米</div>
        </div>
      </div>
      <div class="coment">
        <div class="comentAvator"><img :src="img" class="avator"></div>
        <div class="comentInfo">
          <div class="name">小米 <span>2018-10-1</span></div>
          <div class="comentDetail">小小米小米小米小米小米米</div>
        </div>
      </div> -->
      <comment-item v-for="item in comment" v-bind:key="item.id" :commentItem="item"></comment-item>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import CommentItem from '@/components/HomePage/commentItem'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
export default {
  data () {
    return {
      id: '',
      articleDetail: {
        img: require('@/assets/images/index9.jpg'),
        articleTitle: '冰岛5天4夜自由行',
        articleAuthor: '徐欣奕',
        articleDate: '2018-12-24',
        articleTime: '五日游',
        articlePlace: '冰岛',
        articleContent: '冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。'
      },
      img: require('@/assets/images/index9.jpg'),
      comment: ''
    }
  },
  components: {
    NavHeader,
    CommentItem
  },
  methods: {
  },
  mounted: function () {
    this.id = this.$route.params.id
    axios.get('/api/selectArticle/searchByArticleId?id=' + this.id + '')
      .then((response) => {
        this.articleDetail = response.data[0]
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('/api/comment?articleId=' + this.id + '')
      .then((response) => {
        if (response.data === '') {
          console.log('111')
        }
        this.comment = response.data
        console.log(this.comment + '123')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
}
.content {
  margin-top: -58px;
  .articleAvator{
    display: inline-block;
    vertical-align: top;
    width:13%;
    margin-top: 35px;
    text-align: center;
    .avator {
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
  }
  .articleDetail{
    width: 74%;
    margin-top: 35px;
    display: inline-block;
    .articleTitle {
      color: #2c3e50;
      font-size: 24px;
      font-weight: bold;
    }
    .articleAuthor{
      font-size: 18px;
      color: #ccc;
      margin-left: 20px;
    }
    .articleInfo{
      padding: 5px 0;
      border-bottom: 1px solid #ccc;
      font-size: 18px;
      line-height: 30px;
      .iconfont {
        font-size: 20px;
        margin-left: 10px;
        line-height: 30px;
        vertical-align: top;
      }
      .iconfont:first-child {
        margin-left: 0;
      }
    }
    .articleContent {
      margin-top: 10px;
      padding-bottom: 10px;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
    }
    .bottomItem{
        width: 100%;
        height: 30px;
        line-height: 35px;
        display: inline-flex;
        font-size: 18px;
        .iconfont{
          line-height: 30px;
          font-size: 18px;
        }
        .right{
          width:100%;
          // float: right;
          text-align: right;
          .mr3{
            margin-right: 3px;
            margin-left: -3px;
          }
        }
    }
    .coment{
      display: flex;
      flex-direction: row;
      padding: 8px 0;
      border-bottom: 1px solid #ccc;
      .comentAvator{
        width: 70px;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid #fff;
          border-radius: 50%;
        }
      }
      .comentInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        .name {
          font-size: 17px;
          font-weight: bold;
          span{
            font-weight: normal;
            color: #ccc;
            font-size: 14px;
          }
        }
        .comentDetail{
          font-size: 16px;
        }
      }
    }
  }
}
</style>
