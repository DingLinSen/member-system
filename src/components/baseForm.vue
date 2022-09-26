<template>
  <div class="mt-2">
    <el-form :inline="true" :form="form" :formData="formData" class="demo-form-inline">
      <template v-for="(item, index) in formData">
        <el-form-item>
          <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
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
    form: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
