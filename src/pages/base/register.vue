<template>
  <div class="backround" v-bind:style="{backgroundImage:'url(' + require('@/assets/images/background.jpg') + ')'}">
    <div class="loginForm">
      <el-form :model="ruleForm2" status-icon :rules="rule" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
        <h3>注&nbsp;&nbsp;&nbsp;&nbsp;册</h3>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="ruleForm2.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')" style="width:48%;">提交</el-button>
        <el-button @click="resetForm('ruleForm2')" style="width:48%;margin-bottom:15px;">重置</el-button>
        <a href="#" @click="login">已有账号，去登录~</a>
      </el-form>
    </div>
  </div>
</template>
<script>
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
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        tel: ''
      },
      rule: {
        pass: [
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
          alert('submit!')
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
}
.loginForm{
  position: fixed;
  width: 400px;
  height: 310px;
  background-color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
}
</style>
