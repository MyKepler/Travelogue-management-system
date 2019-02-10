
<template>
<div class="content">
  <nav-header></nav-header>
  <div class="articleSend">
    <table class="articleAlign">
      <tr>
        <td class="text">标题</td>
        <td><el-input placeholder="请输入标题" class="input-area"></el-input></td>
      </tr>
      <tr>
        <td class="text" style="vertical-align: top;">正文</td>
        <td>
          <quill-editor></quill-editor>
        </td>
      </tr>
      <tr>
        <td></td>
        <td style="padding:0;">
          <div class="upload">
            <input type='checkbox' style="width:18px;height:18px;"><span class="location">添加定位</span>
            <i class="iconfont">&#xe655;</i>
            <span class="location">杭州</span>
          </div>
          <v-btn style="float:right;">UPLOAD</v-btn>
          <!-- <el-button type="success" icon="el-icon-check" circle style="float:right;"></el-button> -->
        </td>
      </tr>
    </table>
  </div>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import '@/assets/css/font_1013302_osideqkll3/iconfont.css'
export default {
  data () {
    return {
      mark: 0,
      timer: null,
      img: [require('@/assets/images/index9.jpg'),
        require('@/assets/images/index4.jpg'),
        require('@/assets/images/index5.jpg'),
        require('@/assets/images/index6.jpg')
      ]
    }
  },
  components: {
    NavHeader
  },
  methods: {
    change (i) {
      this.mark = i
    },
    autoPlay () {
      this.mark++
      if (this.mark === 4) {
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 4000)
    }
  },
  created () {
    this.play()
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
  margin:0 auto;
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
