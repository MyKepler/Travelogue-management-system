<template>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#ccc"
  text-color="#fff"
  active-text-color="#666"
  router>
  <div class="logo">
    <img src="@/assets/images/logo.png" style="transform: rotate(-20deg);"/>
    <span>TRAVELING</span>
  </div>
  <el-menu-item class="subitem" index="1" style="margin-left:381px;">热门游记</el-menu-item>
  <el-menu-item class="subitem" index="2">境内游</el-menu-item>
  <el-menu-item class="subitem" index="3">境外游</el-menu-item>
  <el-menu-item class="subitem" index="4">周边游</el-menu-item>
  <el-submenu index="5" class="auth" v-if="this.$store.getters.isLogin">
    <template slot="title">
    <img src="@/assets/images/logo.png"/>
    </template>
    <el-menu-item index="5-1" @click="toPersonal">个人中心</el-menu-item>
    <el-menu-item index="5-2">我的消息</el-menu-item>
    <el-menu-item index="5-3" @click="loginOut">退出登录</el-menu-item>
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
<style lang="less">
body{
  padding:0;
  margin: 0;
}
.el-menu-demo {
    display: flex;
    flex-direction: row;
    height: 75px;
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
      height: 75px;
    }
    .noauth{
      width: 200px;
      position: absolute;
      right: 0;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .subitem {
      height: 74px;
      line-height: 75px;
      width:150px;
      font-size: 20px;
    }
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 74px!important;
    line-height: 75px!important;
    border-bottom: 2px solid transparent;
    color: #fff;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
      background: rgb(190, 190, 190)!important;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      outline: 0;
      color: #303133;
      background: rgb(190, 190, 190)!important;
  }
</style>
