<template>
  <div class="main-wrap">
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
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
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
            value-format="yyyy-MM-dd"
            format="yyyy 年 MM 月 dd 日"
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
          <el-button  type="text" size="small" @click="theDetail(row, column, $index)">明细</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
import download from '@/utils/download'
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
        enterpriseId: '123',
        insurance: '',
        createDate: '',
        paymentDate: '',
      },
      // 列表
      listAutoFetch: true,
      listLoading: false,
      listPager: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        hideOnSinglePage: false
      },
      listData: [],
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
          prop: 'insurance',
          label: '险种类型',
          formatter: row => (row.insurance == 1 ? '医疗' : '生育')
        },
        {
          prop: 'createDate',
          label: '建账年月',
        },
        {
          prop: 'paymentDate',
          label: '费款所属年月',
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
          label: '应缴类型',
          formatter: row => (row.paymentType == 1 ? '正常应缴' : '补缴')
        },
        {
          prop: 'collectionMethod',
          label: '征收方式',
          formatter: row => (row.collectionMethod == 1 ? '税务征收' : row.collectionMethod)
        },
      ],
    }
  },
  created () {
  },
  methods: {
    // 查询
    query() {
      this.listPager.currentPage = 1
      this.listPager.pageSize = 10
      this.fetchList()
    },
    // 重置
    empty() {
      // this.parameter.enterpriseId = ''
      this.parameter.insurance = ''
      this.parameter.createDate = ''
      this.parameter.paymentDate = ''
      this.listPager.currentPage = 1
      this.listPager.pageSize = 10
      this.fetchList()
    },
    // 导出
    exportActive() {
      this.$ajax.post('/api/v1/query/export/unit/payment/list',{
        enterpriseId: this.parameter.enterpriseId,
        type: this.parameter.insurance,
        createDate: this.parameter.createDate,
        costDate: this.parameter.paymentDate,
      }).then(res=>{
          console.log(res)
          let url = '/' + res.data
          download(url,"单位缴费明细.xlsx")
        })  
    },
    fetchList(pagerOptions) {
      // console.log(pagerOptions)
      const pager = pagerOptions || this.listPager
      this.$ajax.get('/v1/query/payment_details_list',{
        params: {
          enterpriseId: this.parameter.enterpriseId,
          insurance: this.parameter.insurance,
          createDate: this.parameter.createDate,
          paymentDate: this.parameter.paymentDate,
          pageNum: pager.currentPage,
          pageSize: pager.pageSize,
        }
      }).then(res=>{
          console.log(res)
          this.listLoading = false
          if(res.code!=0){
            this.listPager.total = 0
            this.listData = []
            return false
          }
          this.listPager.total = res.data.total
          this.listData = res.data.list
        })
    },
    theDetail(row, column, $index) {
      console.log(row, column, $index);
      this.$router.push({
        name: 'query-individual-pay'
      })
    },
  }
}
</script>

<style scoped lang="less">
</style>
