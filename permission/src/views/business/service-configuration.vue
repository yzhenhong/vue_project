<template>
  <div class="service-configuration">
    <div class="search-wrapper">
      <el-button type="primary" size="medium" @click="increased">新增</el-button>
    </div>
    <dynamic-list
      :autoFetch="listAutoFetch"
      :listLoading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      theme="unitPay-list"
      @fetch-list="fetchList"
      v-model="listData"
    >
      <el-table-column width="150">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button  type="text" size="small" @click="examine(row, column, $index)">查看</el-button>
          <el-button  type="text" size="small" @click="forbidden(row, column, $index)">禁用</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
export default {
  name: 'serviceConfiguration',
  data() {
    return {
       // 列表
      listAutoFetch: true,
      listLoading: false,
      listPager: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 15],
        hideOnSinglePage: false
      },
      listData: [],
      listSchema: [
        {
          prop: 'serviceName',
          label: '服务名称',
        },
        {
          prop: 'serviceIdentifier',
          label: '服务标识',
        },
        {
          prop: 'serviceDns',
          label: '服务域名',
        },
        {
          prop: 'state',
          label: '状态',
          formatter: row => (row.state == 1 ? '启用' : '禁用')
        },
      ],
    }
  },
  created () {
  },
  methods: {
    increased () {
      this.$router.push('/business/editor-service')
    },
    fetchList(pagerOptions) {
      // console.log(pagerOptions)
      const pager = pagerOptions || this.listPager
      // console.log(pager)
      this.listPager.total = 0
      this.listData = []
      for(let i =0;i<this.listPager.pageSize;i++){
        this.listData.push({
          id: i,
          serviceName: '门慢门特申请',
          serviceIdentifier: 'forward-medical',
          serviceDns: '119.29.0.69：9098',
          state: i%2==0?0:1,
        })
      }
      this.listPager.total = 10
      // this.$ajax.get('/v1/query/payment_details_list',{
      //   params: {
      //     enterpriseID: this.parameter.enterpriseID,
      //     insurance: this.parameter.insurance,
      //     createDate: this.parameter.createDate,
      //     paymentDate: this.parameter.paymentDate,
      //     pageNum: pager.currentPage,
      //     pageSize: pager.pageSize,
      //   }
      // }).then(res=>{
      //     console.log(res)
      //     this.listLoading = false
      //     this.listPager.total = res.total
      //     this.listData = res.list
      //   })
    },
    examine () {
      this.$message({
        message: '该功能正在开发中！',
        type: 'warning'
      });
    },
    forbidden () {
       this.$message({
        message: '该功能正在开发中！',
        type: 'warning'
      });
    },
  }
}
</script>

<style scoped lang="less">

</style>
