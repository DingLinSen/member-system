<template>
  <div class="login-wrapper">
    <div class="login-form">
      <h2 class="login-title">积云会员管理系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { login, getUserInfo } from '../../api/user.js'
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
        if (!valid) return
        // 校验通过之后执行登录方法
        this.handleLogin()
      })
    },
    // 登录方法
    async handleLogin() {
      // 获取vuex的token
      const token =await this.$store.dispatch('login', this.ruleForm)
      console.log(token);
      if (!token) return
      // 获取vuex的用户信息
      const userInfo =await this.$store.dispatch('handleUserInfo')
      console.log(userInfo);
      if (!userInfo) return
      this.$message.success('登录成功')
      this.$router.push('/')
    },

    // async handleLogin() {
    //   try {
    //     // 调用登录接口
    //     const response = await login(this.ruleForm)
    //     // 将token存储到vuex
    //     this.$store.dispatch('DIS_SET_TOKEN', response.token)
    //     console.log(response.token)
    //     // 调用获取用户信息接口
    //     const userInfo = await getUserInfo()
    //     console.log(userInfo)
    //     // 将用户信息存储到vuex
    //     this.$store.dispatch('DIS_SET_USER_INFO', userInfo)
    //     // 提示登录成功
    //     this.$message.success('登录成功')
    //     // 跳转到主页
    //     this.$router.push('/')
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
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
