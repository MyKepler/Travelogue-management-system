<template>
  <!-- 个人主页 -->
  <div  v-show="isShowFollow">
    <div class="articleTab" v-if="this.$route.params.userId === this.$store.getters.isLogin">
      <div class="tab" :class="whichShow=='1'?'active':''" @click="whichShow = 1">
        我的游记
      </div>
      <div class="tab" :class="whichShow=='2'?'active':''" @click="whichShow = 2">
        我的收藏
      </div>
      <div class="tab" :class="whichShow=='3'?'active':''" @click="whichShow = 3">
        我的消息
      </div>
      <div class="tab" :class="whichShow=='4'?'active':''" @click="whichShow = 4">
        我的问答
      </div>
    </div>
    <div class="line" v-else></div>
    <div class="articleGroup" v-show="whichShow=='1'">
      <div style="height: 540px;" v-if="article.length > 0">
      <article-item v-for="item in article" v-bind:key="item.id" :articleItem="item"></article-item>
      </div>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="totolPage"
        layout="total, prev, pager, next"
        :total="totolNum" v-if="article.length > 0">
      </el-pagination>
      <div class="noArticle" v-else>啊~这个人很懒,没有发布过游记(ಥ﹏ಥ)</div>
    </div>
    <div class="articleGroup" v-show="whichShow=='2'">
      <article-item v-for="item in articleFavorite" v-bind:key="item.id" :articleItem="item"></article-item>
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
  </div>
</template>
<script>
import ArticleItem from '@/components/HomePage/articleItem.vue'
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
      totolPage: 0,
      currentPage: 1
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    myArticle () {
      let params = {
        authorId: this.$route.params.userId
      }
      axios.post('/api/selectArticle/searchByUserId', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.article = response.data.result.slice((this.currentPage - 1) * 3, this.currentPage * 3)
            this.totolNum = response.data.result.length
            this.totolPage = response.data.result.length / 3 + 1
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myFavoriteArticle () {
      let params = {
        userId: this.$route.params.userId
      }
      axios.post('/api/articleFavorite/article', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.articleFavorite = response.data.result
            // this.article = response.data.result.slice((this.currentPage - 1) * 3, this.currentPage * 3)
            // this.totolNum = response.data.result.length
            // this.totolPage = response.data.result.length / 3 + 1
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
      this.myArticle()
    }
  },
  created () {
    this.myArticle()
    this.myFavoriteArticle()
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
      min-height: 500px;
    }
    .pagination{
      margin: 30px auto;
    }
</style>
