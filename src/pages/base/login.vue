<template>
  <div class="backround" v-bind:style="{backgroundImage:'url(' + require('@/assets/images/background.jpg') + ')'}">
    <div class="loginForm">
      <el-form ref="form" :model="form" label-width="70px">
        <h3>登&nbsp;&nbsp;&nbsp;&nbsp;录</h3>
        <el-form-item label="手机号码">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="您的密码">
          <el-input v-model="form.pwd"></el-input>
          <a href="#" style="position: absolute;right:0;">忘记密码</a>
        </el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%;margin-top:20px;margin-bottom:15px;">立即登录</el-button>
          <a href="#" @click="register">还没有账号，去注册~</a>
      </el-form>
    </div>
  </div>
</template>
<script>
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
    onSubmit () {
      if (this.form.tel === 'xuxy' && this.form.pwd === '123') {
        this.$store.dispatch('login', this.form).then(() => {
          this.$message({// notify
            type: 'success',
            message: '欢迎你,' + this.form.tel + '!',
            duration: 3000
          })
          this.$router.push('/personal')
          // console.log(this.form.tel)
          console.log('登录状态' + this.$store.state.isLogin)
          console.log('getter:' + this.$store.getters.isLogin)
        })
      } else {
        this.$message({
          type: 'error',
          message: '用户名或密码错误',
          showClose: true
        })
        console.log(this.$store.state.isLogin)
      }
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
}
.loginForm{
  position: fixed;
  width: 400px;
  height: 270px;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
}
</style>
