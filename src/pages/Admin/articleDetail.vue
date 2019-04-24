
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row style="text-align: center;">
    <div class="articleDetail" @click="dialogShow">
      <span class="articleTitle">{{articleDetail.title}}</span><span class="articleAuthor">by {{articleDetail.account}}</span>
      <div class="articleInfo">
        <i class="iconfont" style="font-size:24px;">&#xe672;</i>
        <span>{{articleDetail.createDate}}</span>
        <i class="iconfont" style="font-size:24px;">&#xe627;</i>
        <span>{{articleDetail.tripDay}}日游</span>
        <i class="iconfont">&#xe633;</i>
        <span>{{articleDetail.destination}}</span>
      </div>
      <div class="articleContent" style="text-align: left;">
        <span v-html="articleDetail.content"></span>
      </div>
    </div>
  </el-row>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span style="text-align:center;">返回列表页？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="returnPage()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      id: '',
      centerDialogVisible: false,
      articleDetail: {
        articleTitle: '冰岛5天4夜自由行',
        articleAuthor: '徐欣奕',
        articleDate: '2018-12-24',
        articleTime: '五日游',
        articlePlace: '冰岛',
        articleContent: '冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。'
      }
    }
  },
  components: {
    NavHeader
  },
  methods: {
    init () {
      let params = {
        id: this.$route.params.id
      }
      axios.post('/api/selectArticle/searchByArticleId', qs.stringify(params))
        .then((response) => {
          this.articleDetail = response.data.result[0]
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '网络故障，请稍后重试！',
            duration: 3000
          })
        })
    },
    returnPage () {
      this.$router.go(-1)
    },
    dialogShow () {
      this.centerDialogVisible = true
    }
  },
  mounted: function () {
  },
  created () {
    this.init()
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
  .articleDetail{
    width: 74%;
    margin-top: 100px;
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
      .delete {
        float: right;
        margin-top: -20px;
        .button {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .articleContent {
      cursor: pointer;
      margin-top: 10px;
      padding-bottom: 10px;
      font-size: 18px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
