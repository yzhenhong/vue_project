<template>
  <div class="table-pagination">
    <el-table
      ref="table"
      class="table-pagination__table"
      v-bind="$attrs"
      header-row-class-name="header-row"
      v-on="listeners"
    >
      <slot />
    </el-table>
    <div class="table-pagination__pagination">
      <el-pagination
        v-if="showPagination"
        v-bind="$attrs"
        :page-sizes="[10,20,50,100]"
        layout="prev, pager, next, jumper"
        class="pagination"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePagination',
  components: {

  },
  props: {
    showPagination: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      pagination: {}
    }
  },
  computed: {
    listeners: function () {
      return Object.assign({}, this.$listeners, {
        'current-change': function (value) {
        }
      })
    }
  }
}
</script>

<style lang="less">
.table-pagination{
  color: #3B4351;
  .header-row{
    th {
      background: #F2F7FE !important;
    }
  }
  .table-pagination{
    &__table{
      width: 100% !important;
    }
    &__pagination{
      margin-top: 20px;
      overflow: hidden;
      .pagination{
        float: right;
      }
    }
  }
}
</style>
