<template>
  <section class="main-inner">
    <div class="from-module">
      <el-form :inline="true" :model="personalForm" class="demo-form-inline">
        <el-form-item label="">
          <el-input class="small-ipt" v-model="personalForm.userId" size="small" placeholder="请输入证件号码"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input class="small-ipt" v-model="personalForm.userName" size="small" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="small-btn" type="primary" @click="onSubmit" size="small">查询</el-button>
          <el-button class="small-btn" type="primary" plain="" @click="onReset" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <dynamic-list
        :autoFetch="listAutoFetch"
        :listLoading="listLoading"
        :pager.sync="listPager"
        :schema="listSchema"
        @fetch-list="fetchList"
        v-model="listData"
      >
        <el-table-column width="200">
          <template v-slot:header>操作</template>
          <template v-slot="{ row, column, $index }">
            <el-button type="text" @click="changeHandle(row, column, $index)">变更</el-button>
          </template>
        </el-table-column>
      </dynamic-list>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'personalInfoList',
    data() {
      return {
        listAutoFetch: false,
        listLoading: false,
        listPager: {
          total: 100,
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 15],
        },
        listSchema: [
          {
            label: '序号',
            width: '60',
            type: 'index',
            index: res => {
              let index = (this.listPager.currentPage - 1) * this.listPager.pageSize + res + 1;
              return index
            }
          },
          {prop: 'name', label: '姓名'},
          {prop: 'userId', label: '证件号码'},
          {prop: 'registry', label: '户籍'},
          {prop: 'kind', label: '险种类型'},
          {prop: 'wages', label: '工资'},
        ],
        listData: [
          {name: '李明', userId: '440881198812047431', registry: '广东省深圳市', kind: '城镇职工基本医疗保险', wages: '15707.44'},
          {name: '刘敏', userId: '440881198812047432', registry: '广东省深圳市', kind: '城镇职工基本医疗保险', wages: '15707.44'},
          {name: '张晓杰', userId: '440881198812047435', registry: '广东省深圳市', kind: '城镇职工基本医疗保险', wages: '15707.44'},
          {name: '林更心', userId: '440881198812047433', registry: '广东省深圳市', kind: '城镇职工基本医疗保险', wages: '15707.44'},
          {name: '张三丰', userId: '440881198812047436', registry: '广东省深圳市', kind: '城镇职工基本医疗保险', wages: '15707.44'},
        ],
        personalForm: {
          userId: '',
          userName: ''
        }
      }
    },
    methods: {
      onSubmit() {
        
      },
      onReset() {
        
      },
      changeHandle() {

      },
      fetchList(pagerOptions) {
        console.log(pagerOptions)
      },
    }
  }
</script>

<style scoped lang="less">
@import '../../../assets/css/common';
// @import '../../assets/css/mixin.less';
.main-inner {
  // width: 1380px;
  .main-wrap();
}
</style>
