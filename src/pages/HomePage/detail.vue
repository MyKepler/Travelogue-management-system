
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row style="text-align: left;padding-top:60px;">
    <div class="articleAvator"><img :src="avatorImg" class="avator"></div>
    <div class="articleDetail">
      <span class="articleTitle">{{articleDetail.title}}</span><span class="articleAuthor">by {{articleDetail.account}}</span>
      <div class="articleInfo">
        <i class="iconfont" style="font-size:24px;">&#xe672;</i>
        <span>{{articleDetail.createDate}}</span>
        <i class="iconfont" style="font-size:24px;">&#xe627;</i>
        <span>{{articleDetail.tripDay}}日游</span>
        <i class="iconfont">&#xe633;</i>
        <span>{{articleDetail.destination}}</span>
        <div class="delete" v-show="articleDetail.authorId === +this.$store.getters.isLogin"><v-btn class="button" @click="editMyArticle">编 辑</v-btn></div>
        <div class="delete" v-show="articleDetail.authorId === +this.$store.getters.isLogin"><v-btn class="button" @click="centerDialogVisible = true">删 除</v-btn></div>
        <div class="delete"><v-btn class="button" @click="gobackPage">返 回</v-btn></div>
      </div>
      <div class="articleContent">
        <span v-html="articleDetail.content"></span>
      </div>
      <div class="bottomItem">
        <div class="right">
          <i class="iconfont" ref="like" @click="addLike()">&#xe609;</i>
          <span class="mr3" ref="likeNum">{{articleLikeNum}}</span>
          <i class="iconfont">&#xe7f5;</i>
          <span class="mr3">{{articeCommentNum}}</span>
          <i class="iconfont" ref="favorite" @click="addFavorite()">&#xe613;</i>
          <span class="mr3" ref="favoriteNum">{{articleFavoriteNum}}</span>
        </div>
      </div>
      <comment-item v-for="(item,index) in comment" v-bind:key="index" :commentItem="item"></comment-item>
      <el-input
        type="textarea"
         class="write-comment"
          placeholder="说出你的想法吧~"
        :autosize="{ minRows: 5, maxRows: 7}"
        v-model="CommentTextarea">
      </el-input>
      <v-btn style="float:right;margin-bottom:30px;" @click="sendComment">发送评论</v-btn>
    </div>
  </el-row>
  <el-dialog
    title="提示"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
    <span style="text-align:center;">确认删除此文章吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteArticle()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import CommentItem from '@/components/HomePage/commentItem'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      id: '',
      articleDetail: {
        avator: require('@/assets/images/touxiang.png'),
        articleTitle: '冰岛5天4夜自由行',
        articleAuthor: '徐欣奕',
        articleDate: '2018-12-24',
        articleTime: '五日游',
        articlePlace: '冰岛',
        articleContent: '冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人第一次发现的间歇泉。'
      },
      comment: '',
      CommentTextarea: '',
      centerDialogVisible: false,
      articleLikeNum: '',
      articleFavoriteNum: '',
      articeCommentNum: '',
      avatorImg: require('@/assets/images/touxiang.png')
    }
  },
  components: {
    NavHeader,
    CommentItem
  },
  methods: {
    gobackPage () {
      this.$router.go(-1)
    },
    init () {
      let params = {
        articleId: this.$route.params.id
      }
      // 获取顶赞数量
      axios.post('/api/articleLike', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.articleLikeNum = response.data.result.length
            response.data.result.forEach((item) => {
              if (item.userId === +this.$store.getters.isLogin) {
                this.$refs.like.style.color = 'red'
                this.$refs.likeNum.style.color = 'red'
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
      // 获取收藏数量
      axios.post('/api/articleFavorite', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.articleFavoriteNum = response.data.result.length
            response.data.result.forEach((item) => {
              if (item.userId === +this.$store.getters.isLogin) {
                this.$refs.favorite.style.color = 'red'
                this.$refs.favoriteNum.style.color = 'red'
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
      // 获取评论数量
      axios.post('/api/comment', qs.stringify(params))
        .then((response) => {
          this.comment = response.data.result
          console.log(this.comment, 'wwwwwwww')
          this.articeCommentNum = response.data.result.length
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteArticle () {
      let params = {
        id: this.articleDetail.id
      }
      axios.post('/api/deleteArticle', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.centerDialogVisible = false
            this.$message({// notify
              type: 'success',
              message: '删除成功!',
              duration: 3000
            })
            this.$router.push('/personal/' + this.$store.getters.isLogin + '')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editMyArticle () {
      this.$router.push(`/edit/${this.articleDetail.id}`)
    },
    sendComment () {
      let params = {
        articleId: this.$route.params.id,
        comment: this.CommentTextarea,
        commenterId: this.$store.getters.isLogin
      }
      axios.post('/api/comment/addComment', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.$message({// notify
              type: 'success',
              message: '评论成功!',
              duration: 3000
            })
            this.CommentTextarea = ''
            setTimeout(() => {
              this.init()
            }, 1000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UTCformat () {
      let date = new Date(this.articleDetail.createDate)
      const y = date.getFullYear()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
      this.articleDetail.createDate = res
    },
    addLike () {
      let params = {
        articleId: this.$route.params.id,
        userId: this.$store.getters.isLogin
      }
      if (this.$refs.like.style.color !== 'red') {
        // 获取点赞数量
        axios.post('/api/articleLike/addLike', qs.stringify(params))
          .then((response) => {
            if (response.data.code === 200) {
              this.$refs.like.style.color = 'red'
              this.$refs.likeNum.style.color = 'red'
              this.articleLikeNum = this.articleLikeNum + 1
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        // 获取点赞数量
        axios.post('/api/articleLike/removeLike', qs.stringify(params))
          .then((response) => {
            if (response.data.code === 200) {
              this.$refs.like.style.color = '#2c3e50'
              this.$refs.likeNum.style.color = '#2c3e50'
              this.articleLikeNum = this.articleLikeNum - 1
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    addFavorite () {
      let params = {
        articleId: this.$route.params.id,
        userId: this.$store.getters.isLogin
      }
      if (this.$refs.favorite.style.color !== 'red') {
        axios.post('/api/articleFavorite/addFavorite', qs.stringify(params))
          .then((response) => {
            if (response.data.code === 200) {
              this.$refs.favorite.style.color = 'red'
              this.$refs.favoriteNum.style.color = 'red'
              this.articleFavoriteNum = this.articleFavoriteNum + 1
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        axios.post('/api/articleFavorite/removeFavorite', qs.stringify(params))
          .then((response) => {
            if (response.data.code === 200) {
              this.$refs.favorite.style.color = '#2c3e50'
              this.$refs.favoriteNum.style.color = '#2c3e50'
              this.articleFavoriteNum = this.articleFavoriteNum - 1
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  },
  mounted: function () {
    // this.id = this.$route.params.id
    let params = {
      id: this.$route.params.id
    }
    axios.post('/api/selectArticle/searchByArticleId', qs.stringify(params))
      .then((response) => {
        this.articleDetail = response.data.result[0]
        this.avatorImg = response.data.result[0].avator ? response.data.result[0].avator : require('@/assets/images/touxiang.png')
        console.log(response.data.result[0], 'zxcvbnm')
        this.UTCformat()
      })
      .catch((error) => {
        console.log(error)
      })
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
          cursor: pointer;
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
    .write-comment {
      margin: 30px 0 10px 0;
      font-size: 18px;
    }
  }
}
</style>
