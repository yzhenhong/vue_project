<template>
  <div class="business-configuration">
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
    <!-- 新增业务 -->
    <el-dialog
      :visible.sync="addBusiness.visible"
      append-to-body
      title="新增业务"
      width="600px"
    >
      <el-form :model="addBusiness.ruleForm" :rules="addBusiness.rules" ref="ruleForm" label-width="100px">
        <el-form-item label="业务名称" prop="name">
          <el-input v-model="addBusiness.ruleForm.name" placeholder="个人医保查询"></el-input>
        </el-form-item>
        <el-form-item label="业务描述" prop="desc">
          <el-input type="textarea" v-model="addBusiness.ruleForm.desc" placeholder="获取个人医保业务的详细信息"></el-input>
        </el-form-item>
        <el-form-item label="关联服务" prop="associated">
          <div class="checkbox-box">
            <el-checkbox v-model="addBusiness.ruleForm.checkAll" @change="allChange">
              <span>服务名称</span>
              <span>服务标识</span>
            </el-checkbox>
            <el-checkbox-group v-model="addBusiness.ruleForm.associated" @change="associatedChange">
              <el-checkbox v-for="(item,index) in addBusiness.ruleForm.associatedArray" :label="item.serviceName" :key="index">
                <span>{{item.serviceName}}</span>
                <span>{{item.serviceIdentifier}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="网络区域" prop="network">
          <el-radio-group v-model="addBusiness.ruleForm.network">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="ascertain" size="medium" type="primary">提交</el-button>
        <el-button @click="addBusiness.visible = false" size="medium" type="primary" plain >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'businessConfiguration',
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
          prop: 'businessName',
          label: '业务名称',
        },
        {
          prop: 'amount',
          label: '服务数量',
          component: {
            props: ['col', 'scope'],
            template:
              '<el-link type="primary">{{scope.row.amount}}个</el-link>',
          },
        },
        {
          prop: 'description',
          label: '业务描述',
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
        ruleForm: {
          name: '',
          desc: '',
          checkAll: false,
          associatedArray: [
            {serviceName:'特检用药申请',serviceIdentifier:'orward-medical'},
            {serviceName:'个人医疗待遇申请',serviceIdentifier:'orward-medical'},
            {serviceName:'关系转移接续',serviceIdentifier:'orward-medical'},
          ],
          associated: ['特检用药申请'],
          network: '启用',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          associated: [
            { type: 'array', required: true, message: '请至少选择一个关联服务', trigger: 'change' }
          ],
          network: [
            { required: true, message: '请选择网络区域', trigger: 'change' }
          ],
        }
      },
    }
  },
  created () {
  },
  methods: {
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
          businessName: '医保查询',
          amount: i+10,
          description: '获取个人医保的详细信息',
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
    ascertain () {
      this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            console.log(this.addBusiness.ruleForm)
          } else {
            console.log('验证未通过')
          }
        })
    },
    allChange(value) {
      if(value){
        this.addBusiness.ruleForm.associated = this.addBusiness.ruleForm.associatedArray.map(item=>{
          return item.serviceName
        })
      } else {
        this.addBusiness.ruleForm.associated = []
      }
    },
    associatedChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.addBusiness.ruleForm.checkAll = checkedCount === this.addBusiness.ruleForm.associatedArray.length;
    },
  }
}
</script>

<style scoped lang="less">
.checkbox-box{
  border: 1px solid #DCDFE6;
  >label:first-child{
    background: #F2F7FE;
  }
  /deep/.el-checkbox{
    display: block;
    padding: 0px 30px;
    margin-right: 0px;
  }
  /deep/.el-checkbox__input{
    display: inline-block;
    width: 50px;
  }
  /deep/.el-checkbox__label{
    >span:first-child{
      display: inline-block;
      width: 190px;
      text-align: center;
    }
  }
  /deep/.el-checkbox__input.is-checked+.el-checkbox__label{
    color: #3B4351;
  }
}
</style>
