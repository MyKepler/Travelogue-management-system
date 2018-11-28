<template>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#cacac9"
  text-color="#fff"
  active-text-color="#ffd04b"
  router>
  <div class="logo">
    <img src="@/assets/images/logo.png" style="transform: rotate(-20deg);"/>
    <span>TRAVELING</span>
  </div>
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-menu-item index="2">处理中心</el-menu-item>
  <el-menu-item index="3">处理中心</el-menu-item>
  <el-menu-item index="4">处理中心</el-menu-item>
  <el-menu-item index="5">处理中心</el-menu-item>
  <el-menu-item index="6">处理中心</el-menu-item>
  <el-menu-item index="7">处理中心</el-menu-item>
  <el-submenu index="8" class="auth" v-if="this.$store.getters.isLogin">
    <template slot="title" >
    <img src="@/assets/images/logo.png"/>
    </template>
    <el-menu-item index="8-1" @click="toPersonal">个人中心</el-menu-item>
    <el-menu-item index="8-2">我的消息</el-menu-item>
    <el-menu-item index="8-3" @click="loginOut">退出登录</el-menu-item>
  </el-submenu>
  <div class="noauth" v-else>
    <el-button size="mini" @click="register">注册</el-button>
    <el-button size="mini" @click="login">登录</el-button>
  </div>
</el-menu>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    login () {
      this.$router.push('/login')
    },
    register () {
      this.$router.push('/register')
    },
    toPersonal () {
      this.$router.push('/personal')
    },
    loginOut () {
      this.$store.dispatch('logout').then(() => {
        this.$message({// notify
          type: 'success',
          message: '退出登录',
          duration: 3000
        })
        this.$router.push('/')
        console.log(this.$store.state.isLogin)
      })
    }
  }
}
</script>
<style lang="less" scoped>
body{
  padding:0;
  margin: 0;
}
  .el-menu-demo {
    display: flex;
    flex-direction: row;
    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 50px;
      margin-right: 50px;
      height: 100;
      span {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .auth {
      width: 200px;
      position: absolute;
      right: 0;
      height: 100%;
    }
    .noauth{
      width: 200px;
      position: absolute;
      right: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
