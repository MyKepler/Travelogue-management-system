<template>
    <div class="articleItem" @click="toDetail">
      <img class="imgItem" src="@/assets/images/Tokyo2.jpg">
      <div class="infoItem">
        <h2>{{articleItem.title}}</h2>
        <p>by {{articleItem.account}}&nbsp;&nbsp;&nbsp;{{ articleItem.createDate}}</p>
        <div class="contentItem">
              {{articleItem.content}}
        </div>
        <div class="bottomItem">
          <div class="left">
          <i class="iconfont">&#xe655;</i>
          <span>{{articleItem.location}}</span>
          </div>
          <div class="right">
            <i class="iconfont" ref="like" @click="addLike()">&#xe609;</i>
            <span class="mr3">11</span>
            <i class="iconfont">&#xe7f5;</i>
            <span class="mr3">11</span>
            <i class="iconfont" ref="favorite" @click="addFavorite()">&#xe613;</i>
            <span class="mr3">11</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    articleItem: Object
  },
  data () {
    return {}
  },
  methods: {
    addLike () {
      if (this.$refs.like.style.color !== 'red') {
        this.$refs.like.style.color = 'red'
      } else {
        this.$refs.like.style.color = '#2c3e50'
      }
    },
    addFavorite () {
      if (this.$refs.favorite.style.color !== 'red') {
        this.$refs.favorite.style.color = 'red'
      } else {
        this.$refs.favorite.style.color = '#2c3e50'
      }
    },
    toDetail () {
      this.$router.push(`/detail/${this.articleItem.id}`)
    }
  },
  mounted () {
  },
  created () {
    let date = this.articleItem.createDate
    date = date.replace('T', ' ')
    date = date.replace('.000Z', ' ')
    this.articleItem.createDate = date
  }
}
</script>

<style lang="less" scoped>
  .articleItem{
    display: inline-flex;
    width: 100%;
    border-bottom: 2px solid #ccc;
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
