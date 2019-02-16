
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">
    <img :src="img" class="avator" @click="init()">
    <div class="follow">
      <div class="followItem" @click="toFollow()">关注&nbsp; {{this.follow}}</div>
      <div class="followerItem" @click="toFollower()">粉丝&nbsp; {{this.follower}}</div>
    </div>
    <div class="articleTab">
      <div class="tab">
        我的信息
      </div>
      <div class="tab">
        我的头像
      </div>
      <div class="tab">
        更换绑定
      </div>
      <div class="tab">
        修改密码
      </div>
    </div>
    <div class="articleItem">
    <div class="myInfo" v-show="false">
    <table  class="myInfoTable">
        <tr><td>我的名号：</td><td><el-input placeholder="请输入名号"></el-input></td></tr>
        <tr><td>我的性别：</td><td><el-radio-group v-model="gender"><el-radio :label="1">男</el-radio><el-radio :label="2">女</el-radio><el-radio :label="3">保密</el-radio></el-radio-group></td></tr>
        <tr><td>我的城市：</td><td><el-input placeholder="请输入城市"></el-input></td></tr>
        <tr><td>我的签名：</td><td><el-input placeholder="请输入签名"></el-input></td></tr>
        <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn>保 &nbsp;存</v-btn></td></tr>
    </table></div>
    <div class="myPic" v-show="false">
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
    <div class="changePhone" v-show="false">
         <table  class="myPhoneTable">
             <tr><td><i class="iconfont">&#xe655;</i>
        <span class="mr3">15700193247</span></td><td><v-btn style="margin-left:0;">更换绑定</v-btn></td></tr>
        <tr><td>我的手机：</td><td style="padding-right:0;"><el-input placeholder="请输入手机" style="width:75%;"></el-input><v-btn >获取验证码</v-btn></td></tr>
        <tr><td>更换绑定：</td><td><el-input placeholder="请输入新绑定的手机"></el-input></td></tr>
        <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn>保 &nbsp;存</v-btn></td></tr>
    </table>
    </div>
        <div class="changePassword">
         <table  class="myPasswordTable">
        <tr><td>原密码：</td><td><el-input placeholder="请输入原密码"></el-input></td></tr>
        <tr><td>新密码：</td><td><el-input placeholder="请输入新密码"></el-input></td></tr>
        <tr><td>确认密码：</td><td><el-input placeholder="请确认新密码"></el-input></td></tr>
        <tr><td colspan="2" style="padding-left:0;padding-right:0;"><v-btn>保 &nbsp;存</v-btn></td></tr>
    </table>
    </div>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
export default {
  data () {
    return {
      img: require('@/assets/images/index9.jpg'),
      follow: 23,
      follower: 250,
      isShowFollow: true,
      gender: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  components: {
    NavHeader
  },
  mounted: function () {
    this.init()
    console.log(1)
  },
  methods: {
    init () {
      this.isShowFollow = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
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
      margin: 30px auto 15px auto;
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
    }
    .articleItem{
      display: inline-flex;
      width: 90%;
      border-bottom: 2px solid #ccc;
      padding: 10px 10px 5px 0px;
      .myInfo{
            width: 100%;
              font-size: 18px;
              font-weight: bold;
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
              font-size: 32px;
              vertical-align: middle;
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
              font-weight: bold;
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
