<template>
  <div>
    <router-link class="link" to="/">
      <img class="logo" src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="" />
      <span class="company">积云会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.getters.userInfo.username || '' }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePass">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  methods: {
    handleCommand(command) {
      // 计算一次 switch 表达式
      // 把表达式的值与每个 case 的值进行对比
      // 如果存在匹配，则执行关联代码
      switch (command) {
        case 'changePass':
          this.changePass()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    changePass() {},
    async logout() {
      try {
        const response=await this.$store.dispatch('handleLogout')
        setTimeout(() => {
          this.$router.push('/login')
        }, 100);
        this.$message.success('退出成功')
      } catch (error) {
        console.log(error.message);
      }
    },
  },
}
</script>
<style scoped>
.link {
  color: #fff;
  margin-left: 30px;
}
.logo {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.company {
  margin-left: 5px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
  color: #fff;
}
</style>
