
<template>
<div class="content">
  <nav-header></nav-header>
  <div class="articleSend">
    <table class="articleAlign">
      <tr>
        <td class="text">标题</td>
        <td colspan="3"><el-input v-model="article.title" placeholder="请输入标题" class="input-area"></el-input></td>
      </tr>
      <tr>
        <td class="text" style="vertical-align: top;">正文</td>
        <td colspan="3">
          <quill-editor v-model="article.content"></quill-editor>
        </td>
      </tr>
      <tr>
        <td class="text">旅行人数</td>
        <td><el-input v-model="article.tripMember" placeholder="请输入旅行人数" class="input-area"></el-input></td>
        <td class="text">旅行天数</td>
        <td><el-input v-model="article.tripDay" placeholder="请输入旅行天数" class="input-area"></el-input></td>
      </tr>
      <tr>
        <td class="text">出发城市</td>
        <td><el-input v-model="article.source" placeholder="请输入出发城市" class="input-area"></el-input></td>
        <td class="text">目的城市</td>
        <td><el-input v-model="article.destination" placeholder="请输入目的城市" class="input-area"></el-input></td>
      </tr>
      <tr>
        <td class="text">预算费用</td>
        <td><el-input v-model="article.tripPay" placeholder="请输入预算费用" class="input-area"></el-input></td>
        <td class="text">旅行分类</td>
        <!-- <td><el-input placeholder="请输入旅行分类" class="input-area"></el-input></td> -->
        <td>
          <el-select v-model="article.category" clearable placeholder="请选择" class="selectCategory" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td></td>
        <td colspan="3" style="padding:0;">
          <div class="upload">
            <input type='checkbox' v-model="check" value="1" style="width:18px;height:18px;"><span class="location">添加定位</span>
            <i class="iconfont">&#xe655;</i>
            <input class="location" v-model="article.location">
          </div>
          <v-btn style="float:right;" @click="sendArticle()">UPLOAD</v-btn>
          <!-- <el-button type="success" icon="el-icon-check" circle style="float:right;"></el-button> -->
        </td>
      </tr>
    </table>
    <div id="map-core"></div>
  </div>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '境内游'
      }, {
        value: '2',
        label: '境外游'
      }, {
        value: '3',
        label: '周边游'
      }],
      article: {
        title: '',
        content: '',
        location: '杭州',
        tripMember: '',
        source: '',
        destination: '',
        tripDay: '',
        tripPay: '',
        category: ''
      },
      check: ['1']
    }
  },
  components: {
    NavHeader
  },
  methods: {
    sendArticle () {
      let title = this.article.title
      let content = this.article.content
      let tripMember = this.article.tripMember
      let source = this.article.source
      let destination = this.article.destination
      let tripDay = this.article.tripDay
      let tripPay = this.article.tripPay
      let category = this.article.category
      let userId = this.$store.getters.isLogin
      let location
      if (this.check.length === 1) {
        location = this.article.location
      } else {
        location = ''
      }
      axios.get('/api/sendArticle?authorId=' + userId +
      '&title=' + title +
      '&content=' + content +
      '&location=' + location +
      '&tripMember=' + tripMember +
      '&source=' + source +
      '&destination=' + destination +
      '&tripDay=' + tripDay +
      '&tripPay=' + tripPay +
      '&category=' + category + '')
        .then((response) => {
          console.log(response.data + '123')
          if (response.data === 'success') {
            this.$message({// notify
              type: 'success',
              message: '发送成功!',
              duration: 3000
            })
            this.$router.push('/')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
  },
  created () {
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
.articleSend{
  width: 74%;
  margin:0 auto 50px auto;
  min-height: 500px;
  .articleAlign {
    width: 100%;
    td {
      padding: 20px 0 10px 0;
    }
    .text{
      font-size: 18px;
      font-weight: bold;
      color: #999;
      width: 10%;
    }
    .input-area{
      font-size: 18px;
    }
    .selectCategory input.el-input__inner{
        width: 100% !important;
    }
    .upload{
      text-align: left;
      font-size: 16px;
      display: flex;
      align-items: center;
      float: left;
      height: 47px;
    }
    .iconfont{
      line-height: 30px;
      font-size: 18px;
    }
    .location{
      font-size: 17px;
      margin-right: 10px;
    }
  }
}
</style>
