<template>
<div class="backround" v-bind:style="{backgroundImage:'url(' + require('@/assets/images/background.jpg') + ')'}">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="注册" name="first">
    <form>
    <v-text-field
      v-model="telephone"
      label="Telephone"
    ></v-text-field>
    <v-text-field
      v-model="pwd"
      label="Password"
      type="password"
    ></v-text-field>
        <v-text-field
      v-model="checkPass"
      label="Check Password"
      type="password"
      @blur="reviewPwd"
    ></v-text-field>
    <v-btn @click="submitForm">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
    </el-tab-pane>
    <el-tab-pane label="登录" name="second">
      <form>
        <v-text-field
          v-model="telephone2"
          label="Telephone"
          required
        ></v-text-field>
        <v-text-field
          v-model="pwd2"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn @click="onSubmit">submit</v-btn>
        <v-btn @click="clear2">clear</v-btn>
      </form>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
  export default {
    data() {
      return {
        activeName: 'first',
        telephone: '',
        pwd: '',
        telephone2: '',
        pwd2: '',
        checkPass: ''
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      reviewPwd () {
        if (this.pwd !== '' && this.checkPass !== '' && this.pwd !== this.checkPass) {
          this.$message({
            type: 'error',
            message: '两次密码填写不一致',
            duration: 3000
          })
        }
      },
      submitForm (formName) {
        if (this.telephone === '' || this.pwd === '' || this.checkPass === '') {
          this.$message({
            type: 'error',
            message: '请填写完整后提交！',
            duration: 3000
          })
          return false
        }
        if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
          this.$message({
            type: 'error',
            message: '手机号码格式错误！',
            duration: 3000
          })
          return false
        }
        let params = {
          telephone: this.telephone,
          password: this.pwd
        }
        axios.post('/api/register', qs.stringify(params))
          .then((response) => {
            console.log(response)
            if (response.data.code === 1) {
              this.$message({
                type: 'success',
                message: '恭喜你，注册成功！',
                duration: 3000
              })
              this.pwd = ''
              this.checkPass = ''
              this.telephone = ''
              this.activeName = 'second'
            } else if (response.data.code === 0) {
              this.$message({
                type: 'error',
                message: '该手机号已注册！',
                showClose: true
              })
              this.pwd = ''
              this.checkPass = ''
              this.telephone = ''
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      onSubmit () {
        if (this.telephone2 === '' || this.pwd2 === '') {
          this.$message({
            type: 'error',
            message: '请填写完整后提交！',
            duration: 3000
          })
          return false
        }
        let params = {
          telephone: this.telephone2,
          password: this.pwd2
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
                this.telephone2 = ''
                this.pwd2 = ''
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
                    this.$router.push('/admin/articleData')
                  } else {
                    this.$router.push('/')
                  }
                })
              }
            } else {
              this.$message({
                type: 'error',
                message: '用户名或密码错误',
                showClose: true
              })
              this.telephone2 = ''
              this.pwd2 = ''
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      clear () {
        this.telephone = '',
        this.pwd = ''
        this.checkPass = ''
      },
      clear2 () {
        this.telephone2 = '',
        this.pwd2 = ''
      },
    }
  };
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
  color: white;
}
.tabs {
  width: 460px;
  .el-tabs__item {
   width: 200px!important;
  }
}
</style>