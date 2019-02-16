
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in img" :key="item">
        <h3><img :src="item" style="width:100%;height:100%;"></h3>
      </el-carousel-item>
    </el-carousel>
    <!-- <el-carousel height="400px">
      <el-carousel-item v-for="item in img" :key="item">
        <h3><img :src="item" style="width:100%;height:100%;"></h3>
      </el-carousel-item>
    </el-carousel> -->
  </el-row>
  <div class="articleTab">
    <div class="tab active">
      热门游记
    </div>
    <div class="tab">
      最新发布
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
      <el-input class="searchInput" placeholder="请输入查询内容"></el-input>
      <!-- <el-button>查询</el-button> -->
      <v-btn class="searchBtn">查 &nbsp;询</v-btn>
    </div>
  </div>
  <div class="articleGroup">
    <article-item></article-item>
    <article-item></article-item>
    <article-item></article-item>
    <article-item></article-item>
  </div>
  <el-pagination
      class="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import ArticleItem from '@/components/HomePage/articleItem.vue'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
export default {
  data () {
    return {
      mark: 0,
      timer: null,
      img: [require('@/assets/images/index9.jpg'),
        require('@/assets/images/index4.jpg'),
        require('@/assets/images/index5.jpg'),
        require('@/assets/images/index6.jpg')
      ],
      options: [{
        value: '出发地',
        label: '出发地'
      }, {
        value: '目的地',
        label: '目的地'
      }, {
        value: '旅行天数',
        label: '旅行天数'
      }, {
        value: '旅行人数',
        label: '旅行人数'
      }],
      selectValue: ''
    }
  },
  components: {
    NavHeader,
    ArticleItem
  },
  methods: {
    change (i) {
      this.mark = i
    },
    autoPlay () {
      this.mark++
      if (this.mark === 4) {
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 4000)
    }
  },
  created () {
    this.play()
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
  border-bottom: 3px solid #ccc;
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
    background: #ccc;
    border-right: 2px solid #ffffff;
    cursor: pointer;
  }
  .tab.active{
    background: #999;
  }
  .tab.active:hover{
    background: #999;
  }
  .tab:hover{
    background: rgb(190, 190, 190);
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
