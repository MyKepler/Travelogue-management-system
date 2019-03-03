
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">
    <img :src="img" class="avator" @click="init()">
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
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog></div>
        <v-btn class="save">保 &nbsp;存</v-btn>
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
        motto: ''
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
    console.log(1)
    let userId = this.$store.getters.isLogin
    console.log(userId, 'xuxy')
    axios.get('/api/changeInfo?id=' + userId + '')
      .then((response) => {
        if (response.data !== '') {
          console.log(response.data[0])
          this.userInfo = response.data[0]
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    init () {
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changeMyInfo () {
      let account = this.userInfo.account
      let gender = this.userInfo.gender
      let city = this.userInfo.city
      let motto = this.userInfo.motto
      let id = this.$store.getters.isLogin
      axios.get('/api/changeInfo/info?account=' + account + '&gender=' + gender + '&city=' + city + '&motto=' + motto + '&id=' + id + '')
        .then((response) => {
          if (response.data === 'success') {
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
      if (this.otherInfo.code === '') {
        console.log(1)
      }
      let telephone = this.otherInfo.newTelephone
      let id = this.$store.getters.isLogin
      axios.get('/api/changeInfo/tel?telephone=' + telephone + '&id=' + id + '')
        .then((response) => {
          if (response.data === 'success') {
            this.showphone = false
            this.userInfo.telephone = telephone
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
      let password = this.otherInfo.newPassword
      let id = this.$store.getters.isLogin
      axios.get('/api/changeInfo/password?password=' + password + '&id=' + id + '')
        .then((response) => {
          if (response.data === 'success') {
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
        background: #ccc;
        border-right: 2px solid #ffffff;
        cursor: pointer;
      }
      .tab:last-child{
        border-right: none;
      }
      .tab:hover{
        background: rgb(190, 190, 190);
      }
      .active{
        background: rgb(167, 167, 167);
      }
      .active:hover{
        background: rgb(167, 167, 167);
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
