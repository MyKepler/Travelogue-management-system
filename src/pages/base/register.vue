<template>
  <div class="backround" v-bind:style="{backgroundImage:'url(' + require('@/assets/images/background.jpg') + ')'}">
    <div class="loginForm">
      <el-form :model="ruleForm2" status-icon :rules="rule" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
        <h2>注&nbsp;&nbsp;&nbsp;&nbsp;册</h2>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="ruleForm2.telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入密码" prop="pwd">
          <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" style="width:46%;">提交</el-button>
        <el-button @click="resetForm('ruleForm2')" style="width:48%;margin-bottom:15px;">重置</el-button>
        <a href="#" @click="login">已有账号，去登录~</a>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pwd: '',
        checkPass: '',
        telephone: ''
      },
      rule: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get('/api/register?telephone=' + this.ruleForm2.telephone + '&password=' + this.ruleForm2.pwd + '')
            .then((response) => {
              console.log(response)
              if (response.data === 'success') {
                this.$message({
                  type: 'success',
                  message: '恭喜你，注册成功！',
                  duration: 3000
                })
                this.ruleForm2.pwd = ''
                this.ruleForm2.checkPass = ''
                this.ruleForm2.telephone = ''
                this.$router.push('/login')
              } else if (response.data === 'fail') {
                this.$message({
                  type: 'error',
                  message: '该手机号已注册！',
                  showClose: true
                })
                this.ruleForm2.pwd = ''
                this.ruleForm2.checkPass = ''
                this.ruleForm2.telephone = ''
              }
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
