<template>
  <div>
      <el-col :span="5" style="margin-top:-1px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#17233d"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group class="el-menu-item-group">
          <el-menu-item index="1-1"><router-link to="/admin/articleReview" tag='li'>文章审核</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/admin/articleManage" tag='li'>文章管理</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" >
        <template slot="title">
          <i class="el-icon-service"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group class="el-menu-item-group">
          <el-menu-item index="2-1"><router-link to="/admin/userManage" tag='li'>用户管理</router-link></el-menu-item>
          <el-menu-item index="2-2">信息修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <router-link to="/admin/articleData" tag='li'><i class="el-icon-message"></i>
        数据统计</router-link>
      </el-menu-item>
    </el-menu>
  </el-col>
  </div>
</template>
<script>
export default {
  methods: {
    // 侧边栏
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
  .el-menu-vertical-demo {
    min-height: 700px;
    height: auto;
    box-shadow: -18px 10px 21px 7px #888888;
  }
</style>
