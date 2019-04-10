<template>
    <div class="articleItem">
      <img class="imgItem" :src="coverSrc">
      <div class="infoItem">
        <h2>{{articleItem.title}}</h2>
        <p>by {{articleItem.account}}&nbsp;&nbsp;&nbsp;{{ articleItem.createDate}}</p>
        <div class="contentItem"  @click="toDetail">
              <span v-html="articleItem.content"></span>
        </div>
        <div class="bottomItem">
          <div class="left">
          <i class="iconfont">&#xe655;</i>
          <span>{{articleItem.location}}</span>
          </div>
          <div class="right">
            <i class="iconfont" ref="like" @click="addLike()">&#xe609;</i>
            <span class="mr3" ref="likeNum">{{articleLikeNum}}</span>
            <i class="iconfont">&#xe7f5;</i>
            <span class="mr3">{{articeCommentNum}}</span>
            <i class="iconfont" ref="favorite" @click="addFavorite()">&#xe613;</i>
            <span class="mr3" ref="favoriteNum">{{articleFavoriteNum}}</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    articleItem: Object
  },
  data () {
    return {
      articleLikeNum: '',
      articleFavoriteNum: '',
      articeCommentNum: '',
      coverSrc: '',
    }
  },
  methods: {
    addLike () {
      let params = {
        articleId: this.articleItem.id,
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
        articleId: this.articleItem.id,
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
    },
    toDetail () {
      this.$router.push(`/detail/${this.articleItem.id}`)
    },
    init () {
      let params = {
        articleId: this.articleItem.id
      }
      // 获取点赞数量
      axios.post('/api/articleLike', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.articleLikeNum = response.data.result.length
            console.log(1234567)
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
          this.articeCommentNum = response.data.result.length
        })
        .catch((error) => {
          console.log(error)
        })
        this.UTCformat()
    },
    UTCformat () {
      let date = new Date(this.articleItem.createDate)
      const y = date.getFullYear()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
      console.log(res, 'xuxy')
      this.articleItem.createDate = res
    }
  },
  mounted () {
  },
  created () {
    // 时间格式
    // let date = this.articleItem.createDate
    this.init()
    this.UTCformat()
    this.coverSrc = this.articleItem.cover ? this.articleItem.cover : require('@/assets/images/index6.jpg')
  }
}
</script>

<style lang="less" scoped>
  .articleItem{
    display: inline-flex;
    width: 100%;
    border-bottom: 2px solid #dcdee2;
    padding: 10px 10px 5px 0px;
    cursor: pointer;
    .imgItem{
      width: 230px;
      min-width: 230px;
      height: 160px;
    }
    .infoItem{
      width: 100%;
      text-align: left;
      margin-left: 20px;
      word-break: break-word;
      p{
        color:#ccc;
        margin: 10px 0;
      }
      .contentItem{
        width: 100%;
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
          vertical-align: top;
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
</style>
