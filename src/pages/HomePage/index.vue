
<template>
<div class="content">
  <nav-header @category="category"></nav-header>
  <el-row>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in img" :key="item">
        <h3><img :src="item" style="width:100%;height:100%;"></h3>
      </el-carousel-item>
    </el-carousel>
  </el-row>
  <div class="articleTab">
    <div class="tab" :class="whichShow=='2'?'active':''" @click="whichShow = 2">
      最新发布
    </div>
    <div class="tab" :class="whichShow=='1'?'active':''" @click="whichShow = 1">
      我的关注
    </div>
    <div class="searchBar">
      <el-select v-model="selectValue" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input class="searchInput" placeholder="请输入查询内容" v-model="searchInput"></el-input>
      <v-btn class="searchBtn" @click="searchArticle">查 &nbsp;询</v-btn>
    </div>
  </div>
  <div class="articleGroup" v-show="whichShow=='1'">
    <article-item v-for="item in article" v-bind:key="item.id" :articleItem="item"></article-item>
  </div>
  <div class="articleGroup" v-show="whichShow=='2'">
    <article-item v-for="item in article2" v-bind:key="item.id" :articleItem="item"></article-item>
  </div>
  <el-pagination
      v-if="whichShow=='1'"
      class="pagination"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalNum">
    </el-pagination>
      <el-pagination
      v-if="whichShow=='2'"
      class="pagination"
      background
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage2"
      :page-size="pageSize2"
      layout="total, prev, pager, next"
      :total="totalNum2">
    </el-pagination>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import ArticleItem from '@/components/HomePage/articleItem.vue'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      article: '',
      article2: '',
      currentPage: 1,
      pageSize: 5,
      totalNum: 0,
      currentPage2: 1,
      pageSize2: 5,
      totalNum2: 0,
      timer: null,
      img: [require('@/assets/images/index9.jpg'),
        require('@/assets/images/index4.jpg'),
        require('@/assets/images/index5.jpg'),
        require('@/assets/images/index6.jpg')
      ],
      options: [{
        value: '1',
        label: '出发地'
      }, {
        value: '2',
        label: '目的地'
      }, {
        value: '3',
        label: '旅行人数'
      }, {
        value: '4',
        label: '旅行天数'
      }, {
        value: '5',
        label: '旅行费用'
      }],
      selectValue: '',
      searchInput: '',
      whichShow: '2',
      myCategory: 0
    }
  },
  components: {
    NavHeader,
    ArticleItem
  },
  methods: {
    ...mapActions({
      getArticle: 'HomePage/getArticle'
    }),
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    },
    handleCurrentChange2 (val) {
      this.currentPage2 = val
      this.init2()
    },
    init () {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        category: this.myCategory,
        id: this.$store.getters.isLogin
      }
      axios.post('/api/selectArticle', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.article = response.data.result
            this.totalNum = response.data.totalNum
          } else {
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          }
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
    init2 () {
      let params = {
        currentPage: this.currentPage2,
        pageSize: this.pageSize2,
        category: this.myCategory
      }
      axios.post('/api/selectArticle/searchByTime', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.article2 = response.data.result
            this.totalNum2 = response.data.totalNum
          } else {
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          }
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
    searchArticle () {
      // if(+this.whichShow === 2) {
        let params = {
          currentPage: this.currentPage2,
          pageSize: this.pageSize2,
          source: +this.selectValue === 1 ? this.searchInput : null,
          destination: +this.selectValue === 2 ? this.searchInput : null,
          tripMember: +this.selectValue === 3 ? this.searchInput : null,
          tripDay: +this.selectValue === 4 ? this.searchInput : null,
          tripPay: +this.selectValue === 5 ? this.searchInput : null,
          category: this.myCategory
        }
        axios.post('/api/selectArticle/searchByCondition', qs.stringify(params))
          .then((response) => {
            if (response.data.code === 200) {
              this.article2 = response.data.result
              this.totalNum2 = response.data.totalNum
            } else {
              this.$message({
                type: 'error',
                message: '网络故障，请稍后重试！',
                duration: 3000
              })
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          })        
      // } else {
        let params2 = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          source: +this.selectValue === 1 ? this.searchInput : null,
          destination: +this.selectValue === 2 ? this.searchInput : null,
          tripMember: +this.selectValue === 3 ? this.searchInput : null,
          tripDay: +this.selectValue === 4 ? this.searchInput : null,
          tripPay: +this.selectValue === 5 ? this.searchInput : null,
          category: this.myCategory,
          id: this.$store.getters.isLogin
        }
        axios.post('/api/selectArticle', qs.stringify(params2))
          .then((response) => {
            if (response.data.code === 200) {
              this.article = response.data.result
              this.totalNum = response.data.totalNum
            } else {
              this.$message({
                type: 'error',
                message: '网络故障，请稍后重试！',
                duration: 3000
              })
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          })        
      // }
    },
    category (val) {
      console.log(val, '123123')
      this.myCategory = val
      console.log(this.category, 'zzzz')
    }
  },
  watch: {
    myCategory (val, oldVal) {
      console.log(val, oldVal, 'zazzaza')
      this.currentPage = 1
      this.pageSize = 5
      this.totalNum = 0
      this.init()
      this.init2()
    }
  },
  created () {
    this.init()
    this.init2()
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
}
.el-carousel {
  margin-top: 60px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    /* opacity: 0.75; */
    line-height: 300px!important;
    margin: 0;
    margin-top:20px;
  }
.el-carousel__item:nth-child(n) {
  opacity:0.4;
}
.el-carousel__item:nth-child(2n+1) {
  opacity:0.4;
}
.is-active{
  opacity:1!important;
}
.articleTab{
  width:100%;
  height: 50px;
  border-bottom: 3px solid #dcdee2;
  margin-top: 20px;
  display:inline-flex;
  position: relative;
  .tab{
    width: 194px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20px;
    background: #dcdee2;
    border-right: 2px solid #ffffff;
    cursor: pointer;
  }
  .tab.active{
    background: #808695;
  }
  .tab.active:hover{
    background: #808695;
  }
  .tab:hover{
    background: #c5c8ce;
  }
  .searchBar{
    float: right;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right:0;
    height: 80%;
    text-align: left;
    padding-right: 10px;
    .searchInput{
      margin-left: 8px;
      width: 400px!important;
    }
    .searchBtn{
    }
  }
}
.articleGroup{
  width: 74%;
  margin:0 auto;
  min-height: 500px;
}
.pagination{
  margin: 30px auto;
}
</style>
