<template>
  <div class="followDetail" style="position:relative;" >
    <div class="followDetailAvator"><img :src="img" class="avator"></div>
    <div class="followDetailInfo" @click="toPage">
      <input type="hidden" v-model="myFans.followId">
      <div class="name">{{myFans.account}}</div>
      <div class="followDetailNote">{{myFans.motto}}</div>
    </div>
    <el-button class="followDetailBtn" v-show="isEachOther" @click="addFollow=true">添加关注</el-button>
    <el-button class="followDetailBtn" v-show="!isEachOther">互相关注</el-button>
    <el-dialog
      title="提示"
      :visible.sync="addFollow"
      width="30%"
      center>
      <span style="text-align:center;">确认关注{{myFans.account}}吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFollow = false">取 消</el-button>
        <el-button type="primary" @click="confirmFollow()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    myFans: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      isEachOther: true,
      addFollow: false
    }
  },
  methods: {
    init () {
      let params = {
        followId: this.$store.getters.isLogin,
        beFollowedId: this.myFans.followId
      }
      axios.post('/api/follow', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            console.log(response.data)
            this.isEachOther = false
          } else {
            this.isEachOther = true
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    confirmFollow () {
      let params = {
        followId: this.$store.getters.isLogin,
        beFollowedId: this.myFans.followId
      }
      axios.post('/api/follow/addfollow', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.addFollow = false
            this.$message({// notify
              type: 'success',
              message: '关注成功!',
              duration: 3000
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    toPage () {
      this.$router.push('/personal/' + this.myFans.followId + '')
      location.reload()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .followDetail{
    cursor: pointer;
    position: relative;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    height: 85px;
    .followDetailAvator{
      width: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin: 0;
      }
    }
    .followDetailInfo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      .name {
        font-size: 17px;
        font-weight: bold;
      }
      .followDetailNote{
        font-size: 16px;
      }
    }
    .followDetailBtn{
      position:absolute;
      right:5px;
      top:23px;
      background: #fff;
      border:1px solid #ccc;
      color:#000;
    }
    .followDetailBtn:hover{
      background: #ccc;
      color: #fff;
      border: 1px solid #fff;
    }
  }
</style>
