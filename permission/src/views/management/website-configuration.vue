<template>
  <div class="website-configuration">
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="医保服务小程序" name="applet"></el-tab-pane>
      <el-tab-pane label="医保服务公众号" name="dabaiservice"></el-tab-pane>
      <el-tab-pane label="医保服务APP" name="software"></el-tab-pane>
      <el-tab-pane label="医保服务短信平台" name="message"></el-tab-pane>
    </el-tabs>
    <div class="search-wrapper">
      <el-button type="primary" size="medium" @click="increased">新增</el-button>
    </div>
    <dynamic-list
      :autoFetch="listAutoFetch"
      :listLoading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      theme="website-configuration"
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
  name: 'websiteConfiguration',
  data() {
    return {
      activeName: 'applet',
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
          prop: 'websiteName',
          label: '站点名称',
        },
        {
          prop: 'domainName',
          label: '访问域名',
        },
        {
          prop: 'targetName',
          label: '目标域名',
        },
        {
          prop: 'address',
          label: '访问地址',
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    increased () {
      this.$router.push('/management/editor-website')
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
          websiteName: '医保政策查询',
          domainName: 'forward-medical',
          targetName: '不需要',
          address: 'http(s)://rio.xgeeklab.com',
          state: i%2==0?0:1,
        })
      }
      this.listPager.total = 10
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
