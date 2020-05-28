<template>
  <div class="main-wrap">
    <div class="search-wrapper">
      <el-form :inline="true" :model="parameter">
        <el-form-item>
          <el-input :disabled="fallbackRecord" v-model="parameter.sn" placeholder="请填写身份证号" @keyup.enter.native="fetchList()"></el-input>
          <el-input :disabled="fallbackRecord" v-model="parameter.name" placeholder="请填写姓名" @keyup.enter.native="fetchList()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="fallbackRecord" type="primary"  @click="query">查询</el-button>
          <el-button :disabled="fallbackRecord" type="primary" plain @click="empty">清空</el-button>
          <el-button type="primary" @click="preserve">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <dynamic-list
      :autoFetch="listAutoFetch"
      :listLoading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      @paymentBaseNew-change ="paymentBaseIuput"
      @fetch-list="fetchList"
      v-model="listData"
    >
    </dynamic-list>
  </div>
</template>

<script>
import { formatDateMonth } from '@/utils/time'
export default {
  name: 'auditData',
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
      fallbackRecord: false,
      auditId: '',
      // 搜索条件
      parameter: {
        enterpriseId: '123',
        sn: '',
        name: '',
      },
      // 列表
      listAutoFetch: false,
      listLoading: false,
      listPager: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 15],
        hideOnSinglePage: false
      },
      listChange: [],
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
          prop: 'name',
          label: '姓名',
        },
         {
          prop: 'sn',
          label: '身份证号',
          formatter: row => row.sn?(row.sn.replace(/(\d{4})\d{10}(\w{4})/, "$1******$2")):'-'
        },
        {
          prop: 'gender',
          label: '性别',
          formatter: row => (row.gender == 1 ? '男' : '女')
        },
        {
          prop: 'insuredIdentity',
          label: '参保身份',
          formatter: row => (row.gender == 1 ? '工人' : '干部')
        },
        {
          prop: 'paymentBase',
          label: '原缴费基数',
        },
        {
          prop: 'paymentBaseNew',
          label: '新缴费基数',
          component: {
              props: ['col', 'scope'],
              template:
                '<el-input v-model.trim="scope.row.paymentBaseNew" @change="changeInput(scope.row)"></el-input>',
              methods: {
                changeInput(item) {
                  this.$emit('paymentBaseNew-change', item)
                }
              }
            },
        },
      ],
    }
  },
  created () {
    if( this.$route.query.id && this.$route.query.IDNum && this.$route.query.name){
      this.parameter.sn = this.$route.query.IDNum
      this.parameter.name = this.$route.query.name
      this.getDetail ()
    } else {
      this.fetchList()
    }
  },
  methods: {
    getDetail () {
      let data = {
        enterpriseId: this.parameter.enterpriseId,
        id: this.$route.query.id,
      }
      this.listPager.total = 0
      this.listData = []
      this.listChange = []
      this.$ajax.post('/api/v1/query/info/insured/payments',data).then(res=>{
        console.log('详情', res)
        let val = {
          name: res.data.info.name,
          sn: res.data.info.certificateNumber,
          gender: res.data.info.gender,
          insuredIdentity: res.data.info.insuredIdentity,
          paymentBase: res.data.info.oldPaymentBase,
          paymentBaseNew: res.data.info.paymentBase,
        }
        this.fallbackRecord = true
        this.auditId = res.data.check.auditId,
        this.listData.push(val)
        this.listPager.total = 1
        this.listChange.push({
          id: res.data.info.id,
          paymentBase: res.data.info.paymentBase,
        })
      })
    },
   // 查询
    query() {
      this.listPager.currentPage = 1
      this.listPager.pageSize = 10
      this.fetchList()
    },
    // 重置
    empty() {
      // this.parameter.enterpriseId = ''
      this.parameter.sn = ''
      this.parameter.name = ''
      this.listPager.currentPage = 1
      this.listPager.pageSize = 10
      this.fetchList()
    },
    // 保存
    preserve() {
      // console.log(this.listChange)
      if(this.listChange && this.listChange.length<=0){
        this.$message({
          message: '请先填写新缴费基数！',
          type: 'error'
        });
        return false
      }
      // 删除新缴费基数字段为空的数据
      this.listChange = this.listChange.filter((item)=>{
        return item.paymentBase
      })
      if(this.listChange && this.listChange.length<=0){
        this.$message({
          message: '请先填写新缴费基数！',
          type: 'error'
        });
        return false
      }
      // console.log(this.listChange)
      let nextStep = true
      const reg1 = /(^[0-9]{1,10}$)|(^[0-9]{1,10}[\.]{1}[0-9]{1,2}$)/ // 整数长度最大10 小数点最多两位
      this.listChange.forEach(item=>{
        if(!reg1.test(item.paymentBase)){
          nextStep =false
        }
        return false
      })
      if(!nextStep){
        this.$message({
          message: '请填写正常的缴费基数！',
          type: 'error'
        });
        return false
      }
      let data = {
        enterpriseId: this.parameter.enterpriseId,
        list: this.listChange
      }
      if(this.fallbackRecord && this.auditId){
        data.auditId = this.auditId
      }
      this.$ajax.post('/api/v1/declare/insured/payments',data).then(res=>{
        console.log(res)
        if (res.code === 0) {
          this.$message({
            message: '您的申请已经提交成功！',
            type: 'success'
          });
          if(this.fallbackRecord && this.auditId){
            this.parameter.sn = ''
            this.parameter.name = ''
            this.fallbackRecord = false
            this.auditId = ''
            this.$router.replace({name:'business-pay-cost'});
          }
          this.fetchList()
        }  
      })
    },
    paymentBaseIuput (itemVal) {
      if(this.fallbackRecord){
        console.log(this.listChange)
        this.listChange[0].paymentBase = itemVal.paymentBaseNew
        return false
      }
      if(this.listChange<=0){
        this.listChange.push({
          id: itemVal.id,
          paymentBase: itemVal.paymentBaseNew,
        })
      } else {
        let a = this.listChange.filter(item=>{
          return  item.id==itemVal.id
        })
        if(a.length<=0){
          this.listChange.push({
            id: itemVal.id,
            paymentBase: itemVal.paymentBaseNew,
          })
        } else {
          this.listChange.forEach(item=>{
            if(item.id == a[0].id){
              item.paymentBase = itemVal.paymentBaseNew
            }
          })
        }
      }
    },
    fetchList(pagerOptions) {
      // console.log(pagerOptions)
      const pager = pagerOptions || this.listPager
      let data = {
        enterpriseId: this.parameter.enterpriseId,
        sn: this.parameter.sn,
        name: this.parameter.name,
        pageIndex: pager.currentPage,
        pageSize: pager.pageSize,
      }
      this.listPager.total = 0
      this.listData = []
      this.listChange = []
      this.$ajax.post('/api/v1/query/insured/payments',data).then(res=>{
        console.log(res)
        this.listLoading = false
        if(res.code!=0){
          return false
        }
        this.listChange = []
        this.listPager.total = res.data.total
        this.listData = res.data.list
      })
    },
  }
}
</script>

<style scoped lang="less">
</style>
