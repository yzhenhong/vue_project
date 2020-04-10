<template>
  <div class="main-wrap unitPay">
    <div class="search-wrapper">
      <el-form :inline="true" :model="parameter">
        <el-form-item>
          <el-select v-model="parameter.insurance" placeholder="请选择险种类型">
            <el-option label="医疗" :value="1"></el-option>
            <el-option label="生育" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="parameter.createDate"
            align="right"
            type="date"
            prefix-icon="el-icon-date"
            placeholder="请选择建账日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="parameter.paymentDate"
            align="right"
            type="date"
            prefix-icon="el-icon-date"
            placeholder="请选择费款日期"
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
      <el-table-column width="150">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button  type="text" size="small" @click="deleteData(row, column, $index)">明细</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
import { formatDateMonth } from '@/utils/time'
export default {
  name: 'unitPay',
  data() {
    return {
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
        enterpriseID: '',
        insurance: '',
        createDate: '',
        paymentDate: '',
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
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
          enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '2',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '2',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '2',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '1',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
        },
        {
          insurance: '2',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          actualAmountPaid: '1577.44',
           enterprisePayment: '788.72',
          individualPayment: '788.72',
          payers: '60',
          paymentType: '正常应缴',
          collectionMethod: '税务征收',
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
          prop: 'insurance',
          label: '险种类型',
          formatter: row => (row.insurance == 1 ? '医疗' : '生育')
        },
        {
          prop: 'createDate',
          label: '建账年月',
          formatter: row => `${formatDateMonth(Number(row.createDate))}`
        },
        {
          prop: 'paymentDate',
          label: '费款所属年月',
          formatter: row => `${formatDateMonth(Number(row.paymentDate))}`
        },
        {
          prop: 'paymentBase',
          label: '缴费基数总额'
        },
        {
          prop: 'actualAmountPaid',
          label: '实缴总金额'
        },
        {
          prop: 'enterprisePayment',
          label: '单位实缴总金额'
        },
        {
          prop: 'individualPayment',
          label: '个人实缴总金额'
        },
        {
          prop: 'payers',
          label: '缴费人数'
        },
         {
          prop: 'paymentType',
          label: '应缴类型'
        },
        {
          prop: 'collectionMethod',
          label: '征收方式'
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
