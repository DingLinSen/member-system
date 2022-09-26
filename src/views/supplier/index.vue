<template>
  <div>
    <base-form :formData="formData">
      <template>
        <el-button type="primary" @click="handleQuerySupplier">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button @click="handleReset">重置</el-button>
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
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </template>
    </base-table>
  </div>
</template>
<script>
import baseTable from '../../components/baseTable'
import baseForm from '../../components/baseForm'
import { getSupplierList } from '../../api/supplier.js'
export default {
  components: {
    baseTable,
    baseForm,
  },
  created() {
    this.getSupplierList()
  },
  data() {
    return {
      // 表单的数据
      formData: [
        {
          type: 'input',
          prop: 'linkman',
          placeholder: '供应商名称',
        },
        {
          type: 'input',
          prop: 'name',
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
      total: 0,
      // 发送给后台要查询的参数
      querySupplierParams: {
        name: '', // 供应商名称
        linkman: '', // 联系人名称
        mobile: '', // 手机号
      },
    }
  },
  methods: {
    async getSupplierList() {
      try {
        const { total, rows } = await getSupplierList(this.page, this.size, this.querySupplierParams)
        this.supplierList = rows
        this.total = total
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
    handleQuerySupplier() {
      this.page = 1
      this.getSupplierList()
    },
    // 重置表单
    handleReset() {
      // this.$refs['FormData'].resetFields()
    },
  },
}
</script>
