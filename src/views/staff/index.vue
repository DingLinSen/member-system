<template>
  <div>
    <base-form :formItem="formItem" v-model.sync="queryFormParams"></base-form>
  </div>
</template>
<script>
import staffApi from '../../api/staff.js'
import baseForm from '../../components/baseForm'
export default {
  data() {
    return {
      // 页数
      page: 1,
      // 条数
      size: 10,
      // 发送给后台的数据
      queryFormParams: {
        username: '',
        name: '',
      },
      // 发送给子组件表单
      formItem: [
        {
          type: 'input',
          prop: 'username',
          placeholder: '账号',
        },
        {
          type: 'input',
          prop: 'name',
          placeholder: '姓名',
        }
      ],
    }
  },
  created() {
    this.getStaffList()
  },
  methods: {
    async getStaffList() {
      try {
        const response = await staffApi.getStaffList(this.page, this.size, this.queryFormParams)
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  components: {
    baseForm,
  },
}
</script>
<style scoped></style>
