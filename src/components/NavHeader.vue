<template>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#515a6e"
  text-color="#fff"
  active-text-color="#666"
  router>
  <div class="logo" @click="toIndex()">
    <img src="@/assets/images/logo.png" style="transform: rotate(-20deg);"/>
    <span>TRAVELING</span>
  </div>
  <el-menu-item class="subitem" index="1" @click="emit0">热门游记</el-menu-item>
  <el-menu-item class="subitem" index="2" @click="emit1">周边游</el-menu-item>
  <el-menu-item class="subitem" index="3" @click="emit2">境内游</el-menu-item>
  <el-menu-item class="subitem" index="4" @click="emit3">境外游</el-menu-item>
  <el-submenu index="5" class="auth" v-if="this.$store.getters.isLogin">
    <template slot="title">
    <img class="myavator" :src="img"/>
    <span>{{name}}</span>
    </template>
    <el-menu-item index="5-1" @click="toPersonal">个人中心</el-menu-item>
    <el-menu-item index="5-2" @click="toSend">发布游记</el-menu-item>
    <el-menu-item index="5-3" @click="toSet">设置中心</el-menu-item>
    <el-menu-item index="5-4" @click="loginOut">退出登录</el-menu-item>
  </el-submenu>
  <div class="noauth" v-else>
    <!-- <el-button size="mini" @click="register">注册</el-button> -->
    <el-button size="mini" @click="login">去登录</el-button>
  </div>
</el-menu>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  props: {
    changeAvator: String
  },
  data () {
    return {
      img: require('@/assets/images/touxiang.png'),
      name: ''
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    },
    toSend () {
      this.$router.push('/send')
    },
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
      this.$router.push('/personal/' + this.$store.getters.isLogin + '')
      location.reload()
    },
    toSet () {
      this.$router.push('/set')
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
    },
    emit0 () {
      this.$emit('category', 0)
      this.$router.push('/')
    },
    emit1 () {
      this.$emit('category', 1)
      this.$router.push('/')
    },
    emit2 () {
      this.$emit('category', 2)
      this.$router.push('/')
    },
    emit3 () {
      this.$emit('category', 3)
      this.$router.push('/')
    },
    init () {
      let params = {
        id: this.$store.getters.isLogin
      }
      axios.post('/api/changeInfo', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.img = response.data.result[0].avator ? response.data.result[0].avator : require('@/assets/images/touxiang.png')
            this.name = response.data.result[0].account
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '网络故障，请稍后重试！',
            duration: 3000
          })
        })
    }
  },
  created () {
    if (this.$store.getters.isLogin) {
      this.init()
    }
  },
  watch: {
    changeAvator (val, oldVal) {
      console.log(val, oldVal, 'xuxy')
      this.init()
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
    position: fixed;
    width: 100%;
    z-index: 9;
    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 50px;
      margin-right: 50px;
      height: 100;
      cursor: pointer;
      outline: none;
      span {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        margin-left: 10px;
        border: none;
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
      background: #808695!important;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      outline: 0;
      color: #303133;
      background: #808695!important;
  }
  .myavator {
    width: 55px;
    height: 55px;
    border: 1px solid #808695;
    border-radius: 50%;
  }
</style>
