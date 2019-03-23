
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row>
    <left-menu></left-menu>
    <el-col :span="1">&nbsp;</el-col>
    <!-- <article-manage></article-manage> -->
    <router-view></router-view>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import LeftMenu from '@/components/Admin/leftMenu'
import ArticleManage from '@/components/Admin/articleManage'
export default {
  data () {
    return {
    }
  },
  components: {
    NavHeader,
    LeftMenu,
    ArticleManage
  },
  methods: {
    // // 侧边栏
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // 表格
    handleDetail (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },
  mounted: function () {
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .content {
    margin-top: -58px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #D3D3D3;
    // .el-menu-vertical-demo {
    //   height: 700px;
    //   box-shadow: -18px 10px 21px 7px #888888;
    // }
  }
</style>
