<template>
<div>
  <!-- 关注列表 -->
  <div class="followList" v-show="!isShowFollow && !isFollow">
    <follow-detail v-for="item in myFollows" v-bind:key="item.id" :myFollow="item"></follow-detail>
  </div>
  <!-- 粉丝列表 -->
  <div class="followList" v-show="!isShowFollow && isFollow">
    <fans-detail v-for="item in myFanses" v-bind:key="item.id" :myFans="item"></fans-detail>
  </div>
</div>
</template>
<script>
import FollowDetail from '@/components/Personal/followDetail.vue'
import FansDetail from '@/components/Personal/fansDetail.vue'
import axios from 'axios'
export default {
  props: {
    isShowFollow: Boolean,
    isFollow: Boolean
  },
  data () {
    return {
      myFollows: '',
      myFanses: ''
    }
  },
  components: {
    FollowDetail,
    FansDetail
  },
  methods: {
    myFans () {
      let userId = this.$store.getters.isLogin
      axios.get('/api/follow/myfans?beFollowedId=' + userId + '')
        .then((response) => {
          if (response.data !== '') {
            console.log(response.data)
            this.myFanses = response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myFollow () {
      let userId = this.$store.getters.isLogin
      axios.get('/api/follow/myfollow?followId=' + userId + '')
        .then((response) => {
          if (response.data !== '') {
            console.log(response.data)
            this.myFollows = response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.myFollow()
    this.myFans()
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .followList{
    border-top: 2px solid #ccc;
    width: 90%;
    margin: 20px auto 0 auto;
  }
</style>
