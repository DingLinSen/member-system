<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h2 class="login-title">积云会员管理系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 12, message: '请输入3~12个字符', trigger: 'blur' },
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 点击登录按钮进行表单校验
    handleLoginSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if(!valid) return
      })
    },
    // 登录方法
    async handleLogin(){
      
    }
  },
}
</script>
<style scoped>
.login-wrapper {
  background: url('http://vue.mengxuegu.com/img/login.b665435f.jpg') no-repeat;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: hsla(0, 0%, 100%, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  padding-top: 20px;
}
.el-form {
  margin-top: 22px;
}
</style>
