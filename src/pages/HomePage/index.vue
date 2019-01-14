
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
    <div class="tab">
      热门游记
    </div>
    <div class="tab">
      最新发布
    </div>
  </div>
  <div class="articleGroup">
    <div class="articleItem">
      <img class="imgItem" src="@/assets/images/Tokyo2.jpg">
      <div class="infoItem">
        <h2>冰岛5天4夜自由行</h2>
        <p>by 徐欣奕&nbsp;&nbsp;&nbsp;2018-11-27 22：30</p>
        <div class="contentItem">
              冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。
          冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是
          冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被
          称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人
          第一次发现的间歇泉。
        </div>
        <div class="bottomItem">
          <i class="iconfont">&#xe655;</i>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
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
      ]
    }
  },
  components: {
    NavHeader
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
  .tab{
    width: 200px;
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
  .tab:hover{
    background: rgb(190, 190, 190);
  }
}
.articleGroup{
  width: 80%;
  margin:0 auto;
  border: 1px solid red;
  height: 500px;
  .articleItem{
    display: inline-flex;
    width: 100%;
    border: 1px solid blue;
    padding: 10px;
    .imgItem{
      width: 230px;
      height: 165px;
    }
    .infoItem{
      text-align: left;
      margin-left: 20px;
      word-break: break-word;
      p{
        color:#ccc;
        margin: 10px 0;
      }
      .contentItem{
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
        border:1px solid green;
        display: inline-flex;
      }
    }
  }
}
</style>
