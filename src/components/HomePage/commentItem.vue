<template>
  <div class="coment">
    <div class="comentAvator"><img :src="commentItem.img" class="avator"></div>
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
    return {}
  },
  methods: {
  },
  created () {
    let date = this.commentItem.createDate
    date = date.replace('T', ' ')
    date = date.replace('.000Z', ' ')
    this.commentItem.createDate = date
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
