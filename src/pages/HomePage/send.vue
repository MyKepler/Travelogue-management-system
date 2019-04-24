
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
          <quill-editor :options="editorOption"  v-model="article.content"></quill-editor>
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
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td class="text">添加封面</td>
        <td colspan="3" style="padding:0;text-align:left">
        <el-upload
        action="/api/upload"
        :http-request="httpRequest"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
        :limit="limitNum"
        ref="upload">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog></td>
      </tr>
      <tr>
        <td></td>
        <td colspan="3" style="padding:0;">
          <div class="upload">
            <input type='checkbox' v-model="check" value="1" style="width:18px;height:18px;"><span class="location">添加定位</span>
            <i class="iconfont">&#xe655;</i>
            <span @click="showMap" style="cursor:pointer;">{{article.location}}</span>
          </div>
          <v-btn style="float:right;" @click="sendArticle()">UPLOAD</v-btn>
          <!-- <el-button type="success" icon="el-icon-check" circle style="float:right;"></el-button> -->
        </td>
      </tr>
    </table>
    <el-dialog title="地址选择" :visible.sync="dialogFormVisible" style="margin-top: 5vh;">
      <my-map  @location="location"></my-map>
    </el-dialog>
  </div>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import MyMap from '@/components/HomePage/map'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      options: [{
        value: '1',
        label: '周边游'
      }, {
        value: '2',
        label: '境内游'
      }, {
        value: '3',
        label: '境外游'
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
      dialogFormVisible: false,
      check: ['1'],
      editorOption: {
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'color': []}, {'background': []}],
            [{'font': []}],
            [{'align': []}],
            [{'clean':'源码编辑'}],
            ['link', 'image']
          ]
        }
      },
      dialogImageUrl: '',
      dialogVisible: false,
      limitNum: 1,
    }
  },
  components: {
    NavHeader,
    MyMap
  },
  methods: {
    httpRequest () {
      console.log(123)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    showMap () {
      this.dialogFormVisible = true
    },
    sendArticle () {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = {headers: { 'Content-Type': 'multipart/form-data' }}
      if (!file) { // 若未选择文件
        alert('请添加封面')
        return
      }
      formData.append('file', file.raw)
      axios.post('/api/upload', formData, headerConfig).then(res => {
        console.log(res)
        if (res.data.code === 200) {
        let params = {
          title: this.article.title,
          content: this.article.content,
          tripMember: this.article.tripMember,
          source: this.article.source,
          destination: this.article.destination,
          tripDay: this.article.tripDay,
          tripPay: this.article.tripPay,
          category: this.article.category,
          authorId: this.$store.getters.isLogin,
          location: this.check.length === 1 ? this.article.location : '',
          cover: res.data.path.replace('public', 'http://localhost:3000'),
        }
        axios.post('/api/sendArticle', qs.stringify(params))
          .then((response) => {
            console.log(response.data + '123')
            if (response.data.code === 200) {
              this.$message({// notify
                type: 'success',
                message: '发送成功!',
                duration: 3000
              })
              this.$router.push('/')
            }else{
              this.$message({// notify
                type: 'error',
                message: '图片太大，请上传小一点的图片!',
                duration: 3000
              })
            }
          })
          .catch((error) => {
            console.log(error)
            this.$message({// notify
              type: 'error',
              message: '图片太大，请上传小一点的图片!',
              duration: 3000
            })
          })
        }
      })
    },
    location (val) {
      this.article.location = val
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
  padding-top: 70px;
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
