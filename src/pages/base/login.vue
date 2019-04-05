<template>
  <div class="backround" v-bind:style="{backgroundImage:'url(' + require('@/assets/images/background.jpg') + ')'}">
    <div class="loginForm">
      <el-form ref="form" :model="form" label-width="70px">
        <h2>登&nbsp;&nbsp;&nbsp;&nbsp;录</h2>
        <el-form-item label="手机号码">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="您的密码">
          <el-input v-model="form.pwd" type="password"></el-input>
          <!-- <a href="#" style="position: absolute;right:0;" @click="forget">忘记密码</a> -->
        </el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%;margin-top:20px;margin-bottom:15px;">立即登录</el-button>
          <a href="#" @click="register">还没有账号，去注册~</a>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      form: {
        tel: '',
        pwd: ''
      }
    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    forget () {
      this.$router.push('/404')
    },
    onSubmit () {
      let params = {
        telephone: this.form.tel,
        password: this.form.pwd
      }
      axios.post('/api/login', qs.stringify(params))
        .then((response) => {
          console.log(response)
          if (response.data.result.length !== 0) {
            if (+response.data.result[0].state === 0) {
              this.$message({
                type: 'error',
                message: '该用户已被管理员禁用!',
                showClose: true
              })
              this.form.tel = ''
              this.form.pwd = ''
            } else {
              let account
              if (response.data.result[0].account) {
                account = response.data.result[0].account
              } else {
                account = response.data.result[0].telephone
              }
              let userInfo = response.data.result[0].id
              this.$store.dispatch('login', userInfo).then(() => {
                this.$message({// notify
                  type: 'success',
                  message: '欢迎你,' + account + '!',
                  duration: 3000
                })
                if (+response.data.result[0].isadmin === 1) {
                  this.$router.push('/admin')
                } else {
                  // this.$router.push('/personal/' + this.$store.state.user + '')
                  this.$router.push('/')
                }
                // console.log(this.form.tel)
                // console.log('登录状态' + this.$store.state.isLogin)
                // console.log('id', this.$store.state.user)
                // console.log('getter:' + this.$store.getters)
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误',
              showClose: true
            })
            this.form.tel = ''
            this.form.pwd = ''
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.backround{
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: -60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size:100% 100%;
}
.loginForm{
  position: fixed;
  width: 400px;
  height: auto;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px 30px;
  h2 {
    margin-bottom: 10px;
  }
}
</style>
