<template>
  <div>
    <div class="table-line"></div>
    <div class="record">
      <div>
        <span>机构列表共</span>
        <span class="num">{{totalCount}}</span>
        <span>条记录</span>
      </div>
      <div>
        <el-button type="primary" size="small" @click="onClickAdd">新增</el-button>
        <el-button type="primary" plain size="small" @click="onClickExport">导出</el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      :header-cell-style="{background: '#F5F5F5', height: '50px'}"
      fit>
      <el-table-column
        v-for="(item, key) in tableKey"
        :key="key"
        :prop="item.value"
        :label="item.name"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        width="200px">
        <template slot-scope="scope">
          <el-button v-if="view" type="text" size="mini" @click="onClickView(scope.row)">查看</el-button>
          <el-button v-if="edit" type="text" size="mini" @click="onClickEdit(scope.row)">{{edit === 'edit' ? '修改' : '编辑'}}</el-button>
          <el-button v-if="remove" type="text" size="mini" @click="onClickDelete(scope.row)">{{remove === 'remove' ? '删除' : '废弃'}}</el-button>
          <el-button v-if="disable" type="text" size="mini" @click="onClickDisable(scope.row)">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :total="totalCount"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {Loading, Message} from 'element-ui'

  export default {
    name: 'Table',
    data() {
      return {
        currentPage: 1, // 默认第一页
        pageSize: 10 // 一页展示10条数据
      }
    },
    props: {
      tableData: { // 表格数据
        type: Array,
        value: []
      },
      tableKey: { // 表头标题
        type: Array,
        value: []
      },
      totalCount: { // 记录总数
        type: Number,
        value: 0
      },
      view: { // 查看: true 有, false 无
        type: Boolean,
        value: false
      },
      edit: { // 修改|编辑: edit 修改, else 编辑
        type: String,
        value: 'edit'
      },
      remove: { // 删除|废弃: remove 删除, else 废弃
        type: String,
        value: 'remove'
      },
      disable: { // 禁用|启用: true 有, false 无
        type: Boolean,
        value: false
      },
    },
    methods: {
      // 新增
      onClickAdd() {
        this.$emit('onClickAdd')
      },
      // 导出
      onClickExport() {
        if (this.tableData.length > 0) {
          const h = this.$createElement
          this.$msgbox({
            title: '提示',
            message: h('p', {style: 'font-size: 14px; color: #333333; margin-bottom: 20px;'}, [
              h('span', null, '本次导出记录 '),
              h('span', {style: 'color: #3085FF'}, this.tableData.length),
              h('span', null, ' 条，确认导出吗？')
            ]),
            center: true,
            showClose: false,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
          .then(() => {
            let tHeaderArr = [], filterValArr = [], title = ''
            this.tableKey.forEach(ele => {
              filterValArr.push(ele.value)
              tHeaderArr.push(ele.name)
            })
            title = 'Excel' + Date.now()
            require.ensure([], () => {
              const {export_json_to_excel} = require('@assets/excel/Export2Excel')
              const tHeader = tHeaderArr // 设置Excel的表格第一行的标题
              const filterVal = filterValArr // 对应属性名
              const list = this.tableData // 把data里的tableData存到list
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, title)
            })
          })
          .catch(() => {
            Message.info('已取消')
          })
        } else {
          Message.info('暂无数据')
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      // 查看
      onClickView(e) {
        this.$emit('onClickView', e)
      },
      // 修改
      onClickEdit(e) {
        this.$emit('onClickEdit', e)
      },
      // 删除
      onClickDelete(e) {
        this.$emit('onClickRemove', e)
      },
      // 禁用|启用
      onClickDisable(e) {
        this.$emit('onClickDisable', e)
      },
      // 翻页
      handleCurrentChange(val) {
        this.currentPage = val
        this.$emit('onClickPagination', val)
      },
    }
  }
</script>

<style scoped lang="scss">
  .table-line {
    width: 120%;
    height: 10px;
    margin-left: -10%;
    background-color: #E8ECF1;
  }
  .record {
    height: 50px;
    display: flex;
    font-size: 15px;
    color: #333333;
    margin-bottom: 16px;
    justify-content: space-between;
    align-items: flex-end;
    .num {
      color: #2484F6;
    }
  }
  .pagination {
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
</style>
