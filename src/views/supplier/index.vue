<template>
  <div>
    <base-form ref="queryForm" :formItem="formItem" v-model.sync="queryFormParams">
      <template>
        <el-button type="primary" @click="handleQueryForm">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('queryForm')">重置</el-button>
      </template>
    </base-form>

    <base-table
      @page="handlePage"
      @size="handleSize"
      :tableStyle="tableStyle"
      pager
      :size="size"
      :page="page"
      :total="total"
      :supplierList="supplierList"
      :columns="columns"
    >
      <template v-slot:opteration="scope">
        <el-button type="primary" @click="handleOpenDialog(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </base-table>

    <dialog-form
      :dialogConfig="dialogConfig"
      labelWidth="110px"
      :dialogRules="dialogRules"
      :dialogFormItem="dialogFormItem"
      :dialogVisible.sync="dialogVisible"
      v-model.sync="dialogForm"
      @submit="handleSubmit"
    ></dialog-form>
  </div>
</template>
<script>
import baseTable from '../../components/baseTable'
import baseForm from '../../components/baseForm'
import supplierApi from '../../api/supplier.js'
export default {
  components: {
    baseTable,
    baseForm,
    'dialog-form': () => import('../../components/dialog.vue'),
  },
  created() {
    this.getSupplierList()
  },
  data() {
    return {
      // 控制弹窗的显示隐藏
      dialogVisible: false,
      // 弹窗表单双向绑定的数据
      dialogForm: {
        name: '',
        linkman: '',
        remark: '',
        mobile: '',
      },
      // 弹窗配置
      dialogConfig: {
        title: '供应商新增',
        width: '500px',
        formWidth: '400',
      },
      // 表单校验
      dialogRules: {
        name: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
        linkman: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
      },
      // 弹窗表单的数据
      dialogFormItem: [
        {
          label: '供应商名称',
          type: 'input',
          prop: 'name',
        },
        {
          label: '联系人',
          type: 'input',
          prop: 'linkman',
        },
        {
          label: '联系电话',
          type: 'input',
          prop: 'mobile',
        },
        {
          label: '备注',
          type: 'input',
          prop: 'remark',
        },
      ],
      // 双向绑定表单的数据
      queryFormParams: {
        name: '', // 供应商名称
        linkman: '', // 联系人名称
        mobile: '', // 手机号
      },
      // 表单的数据
      formItem: [
        {
          type: 'input',
          prop: 'name',
          placeholder: '供应商名称',
        },
        {
          type: 'input',
          prop: 'linkman',
          placeholder: '联系人',
        },
        {
          type: 'input',
          prop: 'mobile',
          placeholder: '联系电话',
        },
      ],
      // 存放供应商列表的数据
      supplierList: [],
      // 存放每一列的数据
      columns: [
        {
          label: '序号',
          type: 'index',
          status: true,
          width: 70,
        },
        {
          label: '供应商名称',
          prop: 'name',
        },
        {
          label: '联系人',
          prop: 'linkman',
        },
        {
          label: '联系电话',
          prop: 'mobile',
        },
        {
          label: '备注',
          prop: 'remark',
        },
        {
          label: '操作',
          slot_name: 'opteration',
          type: 'slot',
        },
      ],
      // 表格高度
      tableStyle: {
        height: 380,
      },
      // 页数
      page: 1,
      // 条数
      size: 10,
      // 总条数
      total: 0
    }
  },
  methods: {
    async getSupplierList() {
      try {
        const { count, rows } = await supplierApi.getSupplierList(this.page, this.size, this.queryFormParams)
        this.supplierList = rows
        this.total = count
      } catch (error) {
        console.log(error.message)
      }
    },
    handlePage(page) {
      this.page = page
      this.getSupplierList()
    },
    handleSize(size) {
      this.size = size
      this.getSupplierList()
    },
    // 查询供应商
    handleQueryForm() {
      this.page = 1
      this.getSupplierList()
    },
    // 重置表单
    handleReset(formName) {
      this.$refs[formName].handleResetForm()
    },
    // 打开弹窗
    handleOpenDialog(id) {
      this.dialogVisible = true
      if (typeof id === 'number') {
        this.findSupplier(id)
        this.dialogConfig.title = '供应商编辑'
        return
      } else {
        this.dialogConfig.title = '供应商新增'
      }
    },
    // 确定按钮方法
    handleSubmit() {
      if (this.dialogForm.id) {
        this.handleEditSupplier()
      } else {
        this.handleAddSupplier()
      }
    },
    // 供应商新增
    async handleAddSupplier() {
      try {
        const response = await supplierApi.addSupplier(this.dialogForm)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.dialogForm = {}
        this.getSupplierList()
      } catch (error) {
        console.log(error.message)
      }
    },
    // 供应商编辑
    async handleEditSupplier() {
      try {
        const response = await supplierApi.editSupplier(this.dialogForm.id, this.dialogForm)
        this.$message.success('编辑成功')
        this.dialogVisible = false
        this.dialogForm = {}
        this.getSupplierList()
      } catch (error) {
        console.log(error.message)
      }
    },
    // 查找单个供应商
    async findSupplier(id) {
      try {
        const response = await supplierApi.findSupplier(id)
        this.dialogForm = response
      } catch (error) {
        console.log(error.message)
      }
    },
    // 删除单个供应商
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            this.page = 1
            this.handleReset('queryForm')
            const response = await supplierApi.deleteSupplier(id)
            this.$message.success('删除成功')
            this.getSupplierList()
          } catch (error) {
            console.log(error.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 取消弹窗
  },
}
</script>
