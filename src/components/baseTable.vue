<template>
  <div>
    <el-table :data="supplierList" :height="tableStyle.height" border style="width: 100%">
      <template v-for="(item, index) in columns">
        <el-table-column v-if="item.status" :type="item.type" :prop="item.prop" :label="item.label" v-bind="item"> </el-table-column>
        <el-table-column v-else-if="!item.type" :prop="item.prop" :label="item.label" v-bind="item"> </el-table-column>
        <el-table-column v-else-if="item.type === 'slot'" :label="item.label" v-bind="item">
          <template v-slot="scope">
            <slot :name="item.slot_name" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination
      class="mt-2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      :layout="layout"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    supplierList: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tableStyle: {
      type: Object,
      default: () => {},
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: [Number, String],
      default: 10,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50],
    },
    pager: Boolean,
  },
  methods: {
    handleSizeChange(size) {
      this.$emit('size', size)
    },
    handleCurrentChange(page) {
      this.$emit('page', page)
    },
  },
}
</script>
