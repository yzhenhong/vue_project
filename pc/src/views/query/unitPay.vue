<template>
  <div class="main-wrap unitPay">
    <div class="search-wrapper">
      <el-form :inline="true" :model="parameter">
        <el-form-item>
          <el-select v-model="parameter.type" placeholder="请选择险种类型">
            <el-option
              v-for="item in typeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="parameter.date1"
            align="right"
            type="datetime"
            prefix-icon="el-icon-date"
            placeholder="请选择建账日期"
            default-time="23:59:59"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="parameter.date2"
            align="right"
            type="datetime"
            prefix-icon="el-icon-date"
            placeholder="请选择费款日期"
            default-time="23:59:59"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="query">查询</el-button>
          <el-button type="primary" plain @click="empty">重置</el-button>
          <el-button type="primary" plain @click="exportActive">导出</el-button>
        </el-form-item>
      </el-form>
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
      <el-table-column width="200">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button type="primary" size="small" @click="deleteData(row, column, $index)">编辑</el-button>
          <el-button type="danger" size="small" @click="editData(row, column, $index)">删除</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
export default {
  name: 'unitPay',
  data() {
    return {
      typeArray: [
        { value: 1, label: '状态1' },
        { value: 2, label: '状态2' },
        { value: 3, label: '状态3' },
        { value: 4, label: '状态4' },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      // 搜索条件
      parameter: {
        type: "",
        date1: "",
        date2: "",
      },
      // 列表
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
          width: '50',
          type: 'selection',
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
    }
  },
  mounted () {
    // document.getElementsByClassName("meta-title")[0].style.width = "1400px";
    // document.getElementsByClassName("main-wrap")[0].style.width = "1400px";
  },
  created () {
  },
  methods: {
    dateChange() {
      console.log()
    },
     // 清空
    empty() {
    },
    // 查询
    query() {
      console.log(this.parameter);
    },
    // 导出
    exportActive() {
    },
    fetchList(pagerOptions) {
      console.log(pagerOptions)
    },
    deleteData(row, column, $index) {
      console.log(row, column, $index);
    },
    editData(row, column, $index) {
      console.log(row, column, $index);
    },
  }
}
</script>

<style scoped lang="less">
</style>
