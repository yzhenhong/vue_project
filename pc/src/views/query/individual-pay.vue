<template>
  <div class="main-wrap individualPay">
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
          <el-input v-model="parameter.IDNum" placeholder="请输入身份证号"></el-input>
          <el-input v-model="parameter.name" placeholder="请输入姓名"></el-input>
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
      theme="individualPay-list"
      @fetch-list="fetchList"
      v-model="listData"
    >
      <el-table-column width="150">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button type="text" size="small" @click="deleteData(row, column, $index)">明细</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
import { formatDateMonth } from '@/utils/time'
export default {
  name: 'individualPay',
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
        pageNum: '',
        pageSize: '',
        enterpriseID: '',
        insurance: '',
        createDate: '',
        paymentDate: '',
        IDNum: '',
        name: '',
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
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
        {
          insurance: '1',
          IDNum: '3508****11',
          name: '张晓刚',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          enterprisePayment: '788.72',
          enterprisePaymentRate: '0.08',
          individualPayment: '788.72',
          individualPaymentRate: '0.08',
          actualAmountPaid: '126.18',
          reversalMark: '正常账目',
        },
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
          prop: 'IDNum',
          label: '身份证号',
        },
        {
          prop: 'name',
          label: '姓名',
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
          label: '缴费基数'
        },
        {
          prop: 'enterprisePayment',
          label: '单位实缴'
        },
        {
          prop: 'enterprisePaymentRate',
          label: '单位缴费费率'
        },
        
        {
          prop: 'individualPayment',
          label: '个人缴费金额'
        },
        {
          prop: 'individualPaymentRate',
          label: '个人缴费费率'
        },
         {
          prop: 'actualAmountPaid',
          label: '实缴金额'
        },
        {
          prop: 'reversalMark',
          label: '冲销标记'
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
