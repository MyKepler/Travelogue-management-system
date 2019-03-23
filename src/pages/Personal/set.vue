
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">
    <img :src="userInfo.avator" class="avator" @click="init()">
    <div class="follow">
      <!-- <div class="followItem" @click="toFollow()">关注&nbsp; {{this.follow}}</div>
      <div class="followerItem" @click="toFollower()">粉丝&nbsp; {{this.follower}}</div> -->
    </div>
    <div class="articleTab">
      <div class="tab" :class="whichShow=='1'?'active':''" @click="whichShow = 1">
        我的信息
      </div>
      <div class="tab" :class="whichShow=='2'?'active':''" @click="whichShow = 2">
        我的头像
      </div>
      <div class="tab" :class="whichShow=='3'?'active':''" @click="whichShow = 3">
        更换绑定
      </div>
      <div class="tab" :class="whichShow=='4'?'active':''" @click="whichShow = 4">
        修改密码
      </div>
    </div>
    <div class="articleItem">
    <div class="myInfo" v-show="whichShow=='1'">
      <table  class="myInfoTable">
          <tr><td>我的名号：</td><td><el-input v-model="userInfo.account" placeholder="请输入名号"></el-input></td></tr>
          <tr><td>我的性别：</td><td><el-radio-group v-model="userInfo.gender"><el-radio :label="1">男</el-radio><el-radio :label="2">女</el-radio><el-radio :label="3">保密</el-radio></el-radio-group></td></tr>
          <tr><td>我的城市：</td><td><el-input v-model="userInfo.city" placeholder="请输入城市"></el-input></td></tr>
          <tr><td>我的签名：</td><td><el-input v-model="userInfo.motto" placeholder="请输入签名"></el-input></td></tr>
          <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn @click="changeMyInfo">保 &nbsp;存</v-btn></td></tr>
      </table>
    </div>
    <div class="myPic" v-show="whichShow=='2'">
         <div style="height:145px;"><el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        ref="upload">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog></div>
       <v-btn class="save" @click="upload">保 &nbsp;存</v-btn>
    </div>
    <div class="changePhone" v-show="whichShow=='3'">
        <table  class="myPhoneTable">
             <tr><td><i class="iconfont">&#xe61c;</i>
        <span class="mr3">{{userInfo.telephone}}</span></td><td><v-btn style="margin-left:0;" @click="showphone=true">更换绑定</v-btn></td></tr>
        <tbody v-show="showphone">
        <tr><td>我的手机：</td><td style="padding-right:0;"><el-input v-model="userInfo.telephone" placeholder="请输入手机" style="width:75%;" readonly class="not-allowed"></el-input><v-btn >获取验证码</v-btn></td></tr>
        <tr><td>验证码&nbsp;&nbsp;&nbsp;&nbsp;：</td><td><el-input v-model="otherInfo.code" placeholder="请输入验证码"></el-input></td></tr>
        <tr><td>更换绑定：</td><td><el-input v-model="otherInfo.newTelephone" placeholder="请输入新绑定的手机"></el-input></td></tr>
        <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn @click="changePhone">保 &nbsp;存</v-btn></td></tr>
        </tbody>
    </table>
    </div>
    <div class="changePassword"  v-show="whichShow=='4'">
      <table  class="myPasswordTable">
        <tr><td>我的手机：</td><td style="padding-right:0;"><el-input v-model="userInfo.telephone" placeholder="请输入手机" style="width:75%;" readonly class="not-allowed"></el-input><v-btn >获取验证码</v-btn></td></tr>
        <tr><td>验证码&nbsp;&nbsp;&nbsp;&nbsp;：</td><td><el-input v-model="otherInfo.code" placeholder="请输入验证码"></el-input></td></tr>
        <tr><td>新密码：</td><td><el-input v-model="otherInfo.newPassword" placeholder="请输入新密码"></el-input></td></tr>
        <tr><td>确认密码：</td><td><el-input v-model="otherInfo.newPassword2" placeholder="请确认新密码"></el-input></td></tr>
        <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn @click="changePassword">保 &nbsp;存</v-btn></td></tr>
      </table>
    </div>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      follow: 23,
      follower: 250,
      showphone: false,
      dialogImageUrl: '',
      dialogVisible: false,
      whichShow: 1,
      userInfo: {
        telephone: '',
        password: '',
        account: '',
        city: '',
        gender: '',
        motto: '',
        avator: require('@/assets/images/index9.jpg')
      },
      otherInfo: {
        code: '',
        newTelephone: '',
        newPassword: '',
        newPassword2: ''
      }
    }
  },
  components: {
    NavHeader
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      let userId = this.$store.getters.isLogin
      let params = {
        id: userId
      }
      axios.post('/api/changeInfo', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            console.log(response.data[0])
            this.userInfo = response.data.result[0]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    upload () {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = {headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      axios.post('/api/upload', formData, headerConfig).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          // let avatorPath = res.data.path.replace('public', 'http:\\localhost:3000')
          let params = {
            avator: res.data.path.replace('public', 'http://localhost:3000'),
            id: this.$store.getters.isLogin
          }
          axios.post('/api/upload/img', qs.stringify(params))
            .then((response) => {
              if (response.data.code === 200) {
                this.$message({// notify
                  type: 'success',
                  message: '修改成功!',
                  duration: 3000
                })
                setTimeout(() => {
                  this.init()
                }, 1000)
              } else {
                this.$message({// notify
                  type: 'error',
                  message: '修改失败!',
                  showClose: true
                })
              }
              console.log(response.data)
            }).catch((error) => {
              console.log(error)
            })
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changeMyInfo () {
      let params = {
        account: this.userInfo.account,
        gender: this.userInfo.gender,
        city: this.userInfo.city,
        motto: this.userInfo.motto,
        id: this.$store.getters.isLogin
      }
      axios.post('/api/changeInfo/info', qs.stringify(params))
        .then((response) => {
          console.log(response.data.code, 'code')
          if (response.data.code === 200) {
            this.$message({// notify
              type: 'success',
              message: '修改成功!',
              duration: 3000
            })
          } else {
            this.$message({// notify
              type: 'error',
              message: '修改失败!',
              showClose: true
            })
          }
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changePhone () {
      let params = {
        telephone: this.otherInfo.newTelephone,
        id: this.$store.getters.isLogin
      }
      axios.post('/api/changeInfo/tel', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.showphone = false
            this.userInfo.telephone = this.otherInfo.newTelephone
            this.otherInfo.code = ''
            this.otherInfo.newTelephone = ''
            this.$message({// notify
              type: 'success',
              message: '修改成功!',
              duration: 3000
            })
          } else {
            this.$message({// notify
              type: 'error',
              message: '修改失败!',
              showClose: true
            })
          }
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changePassword () {
      if (this.otherInfo.newPassword !== this.otherInfo.newPassword2) {
        this.$message({// notify
          type: 'error',
          message: '两次密码不一致!',
          showClose: true
        })
        return
      }
      let params = {
        password: this.otherInfo.newPassword,
        id: this.$store.getters.isLogin
      }
      axios.post('/api/changeInfo/password', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.otherInfo.code = ''
            this.otherInfo.newPassword = ''
            this.otherInfo.newPassword2 = ''
            this.$message({// notify
              type: 'success',
              message: '修改成功!',
              duration: 3000
            })
          } else {
            this.$message({// notify
              type: 'error',
              message: '修改失败!',
              showClose: true
            })
          }
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  create () {
  }
}
</script>
<style lang="less" scoped>
  .content {
    margin-top: -58px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #D3D3D3;
  }
  .personalInfo {
    height: 800px;
    width: 74%;
    margin: 0 auto;
    background-color: #fff;
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    .avator {
      width: 100px;
      height: 100px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: 30px auto 0 auto;
      cursor: pointer;
    }
    .follow{
      margin: 0 auto;
      font-size: 17px;
      .followItem{
        cursor: pointer;
      }
      .followerItem{
        cursor: pointer;
      }
    }
    .follow div{
      height: 20px;
      line-height: 20px;
      width: 100px;
      text-align: center;
      display: inline-block;
      margin: 0;
    }
    .follow div:first-child{
      border-right: 1px solid #666;
    }
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
        background: #dcdee2;
        border-right: 2px solid #ffffff;
        cursor: pointer;
      }
      .tab:last-child{
        border-right: none;
      }
      .tab:hover{
        background: #c5c8ce;
      }
      .active{
        background: #808695;
      }
      .active:hover{
        background: #808695;
      }
    }
    .articleItem{
      display: inline-flex;
      width: 90%;
      border-bottom: 2px solid #ccc;
      padding: 10px 10px 5px 0px;
      .myInfo{
            width: 100%;
              font-size: 18px;
              padding: 10px;
        .myInfoTable{
                   width: 100%;
          td{
            vertical-align: middle;
            text-align: left;
            padding: 20px 0;
            font-size: 18px;
          }
          tr td:first-child{
            text-align: center;
            width:25%;
          }
          tr td:last-child{
            padding-right: 75px;
          }
        }
      }
      .myPic{
          margin: 0 auto;
        padding: 10px;
        .save{
            margin: 20px 0 0 0;
        }
      }
      .changePhone{
          width: 100%;
          i{
              font-size: 40px;
              vertical-align: middle;
              margin-left: -42px;
              color: gray;
          }
          span{
              font-size: 18px;
              vertical-align: middle;
              margin: 0 10px;
          }
          .myPhoneTable{
              width: 100%;
          td{
            vertical-align: middle;
            text-align: left;
            padding: 20px 0;
            font-size: 18px;
          }
          tr td:first-child{
            text-align: center;
            width:25%;
          }
          tr td:last-child{
            padding-right: 75px;
          }
          }
      }
      .changePassword{
        width: 100%;
        font-size: 18px;
        padding: 10px;
        .myPasswordTable{
          width: 100%;
          td{
            vertical-align: middle;
            text-align: left;
            padding: 20px 0;
            font-size: 18px;
          }
          tr td:first-child{
            text-align: center;
            width:25%;
          }
          tr td:last-child{
            padding-right: 75px;
          }
      }
    }}
  }
</style>
