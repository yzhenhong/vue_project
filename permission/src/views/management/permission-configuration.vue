<template>
  <div class="permission-configuration">
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
      theme="permission-configuration"
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
     <!-- 新增业务 -->
    <el-dialog
      :visible.sync="addBusiness.visible"
      append-to-body
      title="新增业务"
      width="600px"
    >
      <div class="dialog-main">
        <el-tabs class="dialog-tabs" v-model="addBusiness.type" @tab-click="tabsBtn" tab-position="left">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="业务查询" name="second"></el-tab-pane>
          <el-tab-pane label="业务办理" name="third"></el-tab-pane>
          <el-tab-pane label="异地就医" name="fourth"></el-tab-pane>
          <el-tab-pane label="其他" name="five"></el-tab-pane>
        </el-tabs>
        <el-table class="dialog-table" :data="addBusiness.listData" @selection-change="addBusinessSelection" :header-cell-style="{background: '#F2F7FE'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="name" label="服务名称" width="200"></el-table-column>
          <el-table-column property="id" label="服务标识"></el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="ascertain" size="medium" type="primary">提交</el-button>
        <el-button @click="addBusiness.visible = false" size="medium" type="primary" plain >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'permissionConfiguration',
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
          prop: 'serviceName',
          label: '服务名称',
        },
        {
          prop: 'serviceIdentifier',
          label: '服务标识',
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
      // 新增业务
      addBusiness: {
        visible: false,
        type: '',
        listData: [
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
          {name: '医保查询', id: 'orward-medical'},
        ],
      },
    }
  },
  created () {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    increased () {
      this.addBusiness.visible = true
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
          serviceName: '医保缴费明细查询',
          serviceIdentifier: 'forward-medical',
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
    tabsBtn () {},
    addBusinessSelection(val) {
      console.log(val)
    },
    ascertain () {
      console.log('ascertain')
    },
  }
}
</script>

<style scoped lang="less">
.dialog-main {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #E4E9F6;
  height: 280px;
  flex-wrap: wrap;
  .dialog-table{
    height: 100%;
    overflow-y: auto;
  }
}
</style>
