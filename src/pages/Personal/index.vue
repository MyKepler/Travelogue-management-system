
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row class="personalInfo">

  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
export default {
  components: {
    NavHeader
  }
}
</script>
<style scoped>
.content {
  margin-top: -58px;
  background-color: #f5f5f5;
}
.personalInfo {
  height: 500px;
  margin: 0 200px;
  background-color: #fff;
  border-left: 1px solid #D3D3D3;
  border-right: 1px solid #D3D3D3;
}
</style>
