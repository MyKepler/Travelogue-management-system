<template>
  <!-- 个人主页 -->
  <div  v-show="isShowFollow">
    <div class="articleTab">
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
    <div class="articleGroup" v-show="whichShow=='1'">
      <div style="height: 540px;">
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
        :total="totolNum">
      </el-pagination>
    </div>
    <div class="articleGroup" v-show="whichShow=='2'">
      <article-item v-for="item in article" v-bind:key="item.id" :articleItem="item"></article-item>
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
export default {
  props: {
    isShowFollow: Boolean
  },
  data () {
    return {
      article: '',
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
      let userId = this.$store.getters.isLogin
      axios.get('/api/selectArticle/searchByUserId?authorId=' + userId + '')
        .then((response) => {
          if (response.data !== '') {
            this.article = response.data.slice((this.currentPage - 1) * 3, this.currentPage * 3)
            this.totolNum = response.data.length
            this.totolPage = response.data.length / 3 + 1
          }
          console.log(response.data)
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
  }
}
</script>
<style lang="less" scoped>
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
    .pagination{
      margin: 30px auto;
    }
</style>
