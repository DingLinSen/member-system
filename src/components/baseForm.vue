<template>
  <div class="mt-2">
    <el-form ref="form" :inline="true" :model="value" class="demo-form-inline">
      <template v-for="(item, index) in formItem">
        <el-form-item :prop="item.prop">
          <el-input v-model="value[item.prop]" :placeholder="item.placeholder"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    formItem: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleResetForm() {
      this.$refs['form'].resetFields()
    },
  },
}
</script>
