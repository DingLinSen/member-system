<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item class="item" :to="{ path: '/' }">{{breadcrumbText}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  computed: {
    breadcrumbText() {
      return this.$route.meta.title
    },
  },
}
</script>
<style scoped>
.el-breadcrumb {
  background-color: #fff;
  height: 10px;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 /10%);
}
.item {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
</style>
