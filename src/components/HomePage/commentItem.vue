<template>
  <div class="coment">
    <div class="comentAvator" @click="toPage">
      <img :src="myavator" class="avator">
    </div>
    <div class="comentInfo">
      <div class="name">{{commentItem.account}} <span>{{commentItem.createDate}}</span></div>
      <div class="comentDetail">{{commentItem.comment}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    commentItem: Object
  },
  data () {
    return {
      myavator: require('@/assets/images/touxiang.png')
    }
  },
  methods: {
    toPage () {
      this.$router.push('/personal/' + this.commentItem.id + '')
    },
    UTCformat () {
      let date = new Date(this.commentItem.createDate)
      const y = date.getFullYear()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
      const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
      const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
      console.log(res, 'xuxy')
      this.commentItem.createDate = res
    }
  },
  created () {
    this.myavator = this.commentItem.avator ? this.commentItem.avator : require('@/assets/images/touxiang.png')
    this.UTCformat()
  }
}
</script>
<style lang="less" scoped>
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
</style>
