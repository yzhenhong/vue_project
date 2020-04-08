<template>
  <div class="subsidy-result">
    <div class="from-module">
      <el-form :inline="true" :model="subsidyForm" class="demo-form-inline">
        <el-form-item label="">
          <el-date-picker
            class="small-ipt"
            v-model="subsidyForm.date"
            align="right"
            type="datetime"
            prefix-icon="el-icon-date"
            placeholder="请选择申领日期"
            default-time="23:59:59"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-select class="small-ipt" v-model="subsidyForm.type" placeholder="请选择审核状态">
            <el-option
              v-for="item in typeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="smaller-ipt" v-model="subsidyForm.input1" placeholder="请输入身份证号"></el-input>
          <el-input class="mini-ipt" v-model="subsidyForm.input2" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="small-btn" type="primary" @click="onSubmit" size="small">查询</el-button>
          <el-button class="small-btn" type="primary" plain @click="onReset" size="small">重置</el-button>
          <el-button class="mini-btn" type="primary" @click="onExport" size="small">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dynamic-list
      :autoFetch="listAutoFetch"
      :listLoading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      theme="individualPay-list"
      @fetch-list="fetchList"
      v-model="listData"
    >
      <el-table-column width="200">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button type="text" size="small" @click="goDetail(row, column, $index)">明细</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>
<script>
export default {
  name: 'SubsidyResult',
  data() {
    return {
      listAutoFetch: false,
      listPager: {
        total: 110,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 15],
      },
      listLoading: false,
      listData: [
        {
          date: '2016-05-01',
          name: '王小虎1',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200331
        },
        {
          date: '2016-05-02',
          name: '王小虎2',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200332
        },
        {
          date: '2016-05-03',
          name: '王小虎3',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎4',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200334
        },
        {
          date: '2016-05-05',
          name: '王小虎5',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200335
        },
        {
          date: '2016-05-06',
          name: '王小虎6',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200336
        },
        {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200337
        },
        {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200337
        },
        {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200337
        },
        {
          date: '2016-05-07',
          name: '王小虎7',
          province: '上海',
          city: '普陀区',
          address: '金沙江路 1518 弄',
          zip: 200337
        }
      ],
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
        {
          prop: 'date',
          label: '日期',
          // formatter: row => `${datetimeFormat(row.date)}`
          // formatter: row => `${this.datetimeFormat(row.date)}`
          // formatter: row => (row.date ? '有时间' : '无')
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'province',
          label: '省份',
        },
        {
          prop: 'city',
          label: '市区'
        },
        {
          prop: 'address',
          label: '市区'
        },
        {
          prop: 'zip',
          label: '邮编'
        },
      ],
      typeArray: [
        { value: 1, label: '状态1' },
        { value: 2, label: '状态2' },
        { value: 3, label: '状态3' },
        { value: 4, label: '状态4' },
      ],
      subsidyForm: {
        date: '',
        type: '',
        input1: '',
        input2: '',
      }
    }
  },
  methods: {
    onSubmit() {

    },
    onReset() {

    },
    onExport() {

    },
    goDetail() {

    },
    fetchList(pagerOptions) {
      console.log(pagerOptions)
    },
  }
}
</script>
<style lang="less" scope>
@import '../../assets/css/common';
  .subsidy-result {
    .main-wrap();
  }
</style>