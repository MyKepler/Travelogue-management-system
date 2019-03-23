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
import qs from 'qs'
export default {
  props: {
    isShowFollow: Boolean,
    isFollow: Boolean
  },
  data () {
    return {
      myFollows: '',
      myFanses: '',
      followNum: '',
      fansNum: ''
    }
  },
  components: {
    FollowDetail,
    FansDetail
  },
  methods: {
    myFans () {
      let params = {
        beFollowedId: this.$route.params.userId
      }
      axios.post('/api/follow/myfans', qs.stringify(params))
        .then((response) => {
          this.fansNum = response.data.result.length
          if (response.data.result.length !== 0) {
            this.myFanses = response.data.result
            // let followNums = {
            //   followNum: this.followNum,
            //   fansNum: this.fansNum
            // }
            // this.$emit('followNums', followNums)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    myFollow () {
      let params = {
        followId: this.$route.params.userId
      }
      axios.post('/api/follow/myfollow', qs.stringify(params))
        .then((response) => {
          this.followNum = response.data.result.length
          if (response.data.result.length !== 0) {
            this.myFollows = response.data.result
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  watch: {
    followNum (val, oldVal) {
      if (this.followNum !== '' && this.fansNum !== '') {
        let followNums = {
          followNum: this.followNum,
          fansNum: this.fansNum
        }
        this.$emit('followNums', followNums)
      }
    },
    fansNum (val, oldVal) {
      if (this.followNum !== '' && this.fansNum !== '') {
        let followNums = {
          followNum: this.followNum,
          fansNum: this.fansNum
        }
        this.$emit('followNums', followNums)
      }
    }
  },
  mounted () {
    // this.myFollow()
    // this.myFans()
  },
  created () {
    this.myFollow()
    this.myFans()
    console.log(this.followNum, this.fansNum, '关注粉丝')
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
