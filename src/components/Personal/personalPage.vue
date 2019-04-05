<template>
  <!-- 个人主页 -->
  <div  v-show="isShowFollow">
    <div class="articleTab" v-if="this.$route.params.userId === this.$store.getters.isLogin">
      <div class="tab" :class="whichShow=='1'?'active':''" @click="whichShow1">
        我的游记
      </div>
      <div class="tab" :class="whichShow=='2'?'active':''" @click="whichShow2">
        我的收藏
      </div>
      <div class="tab" :class="whichShow=='3'?'active':''" @click="whichShow3">
        我的消息
      </div>
      <div class="tab" :class="whichShow=='4'?'active':''" @click="whichShow4">
        我的问答
      </div>
    </div>
    <div class="line" v-else></div>
    <div class="articleGroup" v-if="whichShow=='1'">
      <div v-if="article.length > 0">
      <div style="height: 540px;">
      <article-item v-for="item in article" v-bind:key="item.id" :articleItem="item"></article-item>
      </div>
      <el-pagination
        class="pagination"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totolNum">
      </el-pagination></div>
      <div class="noArticle" v-else>啊~这个人很懒,没有发布过游记(ಥ﹏ಥ)</div>
    </div>
    <div class="articleGroup" v-else-if="whichShow=='2'">
      <div style="height: 540px;">
        <article-item v-for="item in articleFavorite" v-bind:key="item.id" :articleItem="item"></article-item>
      </div>
      <el-pagination
        class="pagination"
        background=""
        @current-change="handleCurrentChange2"
        :current-page.sync="currentPageFavorite"
        :page-size="pageSizeFavorite"
        layout="total, prev, pager, next"
        :total="totolNumFavorite">
      </el-pagination>
    </div>
    <div class="articleGroup" v-else-if="whichShow=='3'">
      <div class="timelineClass">
        <el-radio-group v-model="timelineShow"><el-radio :label="1">文章评论</el-radio><el-radio :label="2">文章点赞</el-radio></el-radio-group>
        <el-timeline style="margin-top:20px;" v-if="timelineShow === 1">
          <el-timeline-item :timestamp="item.createDate" placement="top" color="green" v-for="item in timeLineData" v-bind:key="item.index">
            <el-card>
              <h4>{{item.account}}对你的文章《{{item.title}}》发表了评论</h4>
              <p>评论内容：{{item.comment}}</p>
              <el-button type="warning" style="position: absolute;right: 10px;top: 45px;" plain @click="toDetail(item.id)">去看看</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-timeline style="margin-top:20px;" v-else-if="timelineShow === 2">
          <el-timeline-item :timestamp="item.createDate" placement="top" color="green" v-for="item in timeLineDataLike" v-bind:key="item.index">
            <el-card>
              <h4>{{item.account}}赞了你的文章《{{item.title}}》</h4>
              <el-button type="warning" style="position: absolute;right: 10px;top: 45px;" plain @click="toDetail(item.id)">去看看</el-button>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="articleGroup" v-else-if="whichShow=='4'">
      <chat-room></chat-room>
    </div>
  </div>
</template>
<script>
import ArticleItem from '@/components/HomePage/articleItem.vue'
import ChatRoom from '@/components/Personal/chatRoom.vue'
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    isShowFollow: Boolean
  },
  data () {
    return {
      article: '',
      articleFavorite: '',
      whichShow: '1',
      totolNum: 0,
      totolNumFavorite: 0,
      pageSize: 3,
      pageSizeFavorite: 3,
      currentPage: 1,
      currentPageFavorite: 1,
      timeLineData: [],
      timeLineDataLike: [],
      timelineShow: 1
    }
  },
  components: {
    ArticleItem,
    ChatRoom
  },
  methods: {
    myArticle () {
      let params = {
        authorId: this.$route.params.userId,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      axios.post('/api/selectArticle/searchByUserId', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.article = response.data.result
            this.totolNum = response.data.totalNum
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myFavoriteArticle () {
      let params = {
        userId: this.$route.params.userId,
        currentPage: this.currentPageFavorite,
        pageSize: this.pageSizeFavorite
      }
      axios.post('/api/articleFavorite/article', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.articleFavorite = response.data.result
            this.totolNumFavorite = response.data.totalNum
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.myArticle()
    },
    handleCurrentChange2 (val) {
      this.currentPageFavorite = val
      this.myFavoriteArticle()
    },
    myTimeLine () {
      let params = {
        id: this.$route.params.userId
      }
      axios.post('/api/timeLine', qs.stringify(params))
        .then((response) => {
          console.log(response)
          this.timeLineData = response.data.result
          this.timeLineData.forEach(element => {
            let date = new Date(element.createDate)
            const y = date.getFullYear()
            const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
            const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
            const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
            const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
            const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
            var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
            element.createDate = res
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myLikeTimeLine () {
      let params = {
        id: this.$route.params.userId
      }
      axios.post('/api/timeLine/like', qs.stringify(params))
        .then((response) => {
          console.log(response)
          this.timeLineDataLike = response.data.result
          this.timeLineDataLike.forEach(element => {
            let date = new Date(element.createDate)
            const y = date.getFullYear()
            const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
            const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
            const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
            const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
            const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
            var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
            element.createDate = res
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    toDetail (itemId) {
      this.$router.push(`/detail/${itemId}`)
    },
    whichShow1 () {
      this.whichShow = 1
      this.myArticle()
    },
    whichShow2 () {
      this.whichShow = 2
      this.myFavoriteArticle()
    },
    whichShow3 () {
      this.whichShow = 3
      this.myTimeLine()
      this.myLikeTimeLine()
    },
    whichShow4 () {
      this.whichShow = 4
    }
  },
  created () {
    this.myArticle()
  }
}
</script>
<style lang="less" scoped>
    .articleTab{
      width:90%;
      height: 40px;
      border-bottom: 2px solid #dcdee2;
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
        background: #dcdee2;
        border-right: 2px solid #ffffff;
        cursor: pointer;
      }
      .tab:last-child{
        border-right: none;
      }
      .tab:hover{
        background: #c5c8ce;
      }
      .active{
        background: #808695;
      }
      .active:hover{
        background: #808695;
      }
    }
    .line{
      width:90%;
      height: 1px;
      border-top: 2px solid #ccc;
      margin-top: 20px;
      display:inline-flex;
    }
    .noArticle {
      width:100%;
      height: 200px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      font-family: STXinwei;
      font-size: 24px;
    }
    .articleGroup{
      width: 90%;
      margin:0 auto;
      min-height: 600px;
      .timelineClass{
        height: 610px;
        overflow-y: auto;
      }
    }
    .pagination{
      margin: 30px auto;
    }
</style>
