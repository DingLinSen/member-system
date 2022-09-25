<template>
  <div class="mt-2">
    <el-form :inline="true" :model="memberQueryParams" class="demo-form-inline" ref="memberQueryForm">
      <el-form-item prop="cardNum">
        <el-input v-model="memberQueryParams.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="memberQueryParams.name" placeholder="会员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="memberQueryParams.payType" placeholder="支付类型">
          <el-option v-for="(item, index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker value-format="yyyy-MM-dd" v-model="memberQueryParams.birthday" type="date" placeholder="出生日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryMember">查询</el-button>
        <el-button type="primary" @click="handleOpenDialog">新增</el-button>
        <el-button @click="handleReset('memberQueryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="memberList" height="380" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="110"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | filterPayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleOpenDialog(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="mt-2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dialogForm" :model="dialogFormParams" :rules="dialogRules" style="width: 400px" label-width="100px">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="dialogFormParams.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="dialogFormParams.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" v-model="dialogFormParams.birthday" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="dialogFormParams.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="dialogFormParams.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="dialogFormParams.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="dialogFormParams.payType" placeholder="支付类型">
            <el-option v-for="(item, index) in payType" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="dialogFormParams.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import memberApi from '../../api/member.js'
import MemberEnum from '../../enum/member.js'
export default {
  data() {
    return {
      // 保存后台返回的会员列表数据
      memberList: [],
      // 页数
      page: 1,
      // 条数
      size: 10,
      // 总条数
      total: 0,
      // 查询的参数
      memberQueryParams: {
        cardNum: '',
        name: '',
        payType: '',
        birthday: '',
      },
      // 支付类型
      payType: MemberEnum.payType,
      // 控制弹窗的显示与隐藏
      dialogFormVisible: false,
      // 弹窗标题
      dialogTitle: '会员新增',
      // 保存弹窗表单的数据
      dialogFormParams: {
        cardNum: '',
        name: '',
        payType: '',
        address: '',
        money: '',
        integral: '',
        phone: '',
        birthday: '',
      },
      // 弹窗表单的校验规则
      dialogRules: {
        cardNum: [{ required: true, message: '卡号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        payType: [{ required: true, message: '支付类型不能为空', trigger: 'change' }],
      },
    }
  },
  created() {
    this.getMemberList()
  },
  methods: {
    // 获取登录列表数据
    async getMemberList() {
      try {
        const { rows, total } = await memberApi.getMemberList(this.page, this.size, this.memberQueryParams)
        this.memberList = rows
        this.total = total
      } catch (error) {
        console.log(error.message)
      }
    },
    // 切换条数触发
    handleSizeChange(size) {
      this.size = size
      this.getMemberList()
    },
    // 切换页数触发
    handleCurrentChange(page) {
      this.page = page
      this.getMemberList()
    },
    // 会员查询功能
    handleQueryMember() {
      this.page = 1
      this.getMemberList()
    },
    // 表单重置功能
    handleReset(formName) {
      this.$refs[formName].resetFields()
    },
    // 删除会员功能
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            const response = await memberApi.deleteMemberList(id)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.getMemberList()
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
    // 打开弹窗
    handleOpenDialog(id) {
      this.dialogFormVisible = true
      if (typeof id === 'number') {
        this.dialogTitle = '会员编辑'
        this.handleFindMember(id)
        return
      }
      this.dialogTitle = '会员新增'
    },
    // 弹窗提交
    handleSubmit() {
      this.$refs['dialogForm'].validate((valid) => {
        if (!valid) return
        this.dialogFormParams.id ? this.handleEditMember() : this.handleAddMember()
      })
    },
    // 会员新增
    async handleAddMember() {
      try {
        const response = await memberApi.addMember(this.dialogFormParams)
        this.$message.success('新增成功')
        this.handleReset('dialogForm')
        this.getMemberList()
        this.dialogFormVisible = false
      } catch (error) {
        console.log(error.message)
      }
    },
    // 会员编辑方法
    async handleEditMember() {
      try {
        const response = await memberApi.editMember(this.dialogFormParams.id, this.dialogFormParams)
        this.handleReset('dialogForm')
        this.dialogFormVisible = false
        this.$message.success('编辑成功')
        this.getMemberList()
      } catch (error) {
        console.log(error.message)
      }
    },
    // 查询单个会员数据
    async handleFindMember(id) {
      try {
        const response = await memberApi.findMember(id)
        this.dialogFormParams = response
      } catch (error) {
        console.log(error.message)
      }
    },
    // 弹窗取消
    handleCancel() {
      this.dialogFormVisible = false
      this.handleReset('dialogForm')
    },
  },
  filters: {
    // 过滤支付方式
    filterPayType(value) {
      const data = MemberEnum.payType.find((item) => {
        return item.type === value
      })
      return data ? data.name : ''
    },
  },
}
</script>
