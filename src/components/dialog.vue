<template>
  <el-dialog :title="dialogConfig.title" :width="dialogConfig.width" :visible.sync="visible">
    <el-form :rules="dialogRules" ref="dialogForm" :model="value" :style="{ width: `${dialogConfig.formWidth}px` }" :label-width="labelWidth">
      <template v-for="(item, index) in dialogFormItem">
        <el-form-item v-bind="item" :label="item.label">
          <el-input v-model="value[item.prop]" autocomplete="off"></el-input>
        </el-form-item>
      </template>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <!-- <template>
        <slot></slot>
      </template> -->
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogFormItem: {
      type: Array,
      default: () => [],
    },
    dialogConfig: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: String,
      default: '80px',
    },
    dialogRules: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$refs['dialogForm'].validate((valid) => {
        if (!valid) return
        this.$emit('submit')
      })
    },
    handleCancel() {
      this.$refs['dialogForm'].resetFields()
      this.visible = false
    },
  },
}
</script>
