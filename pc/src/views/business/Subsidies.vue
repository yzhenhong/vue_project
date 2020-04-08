<template>
  <div class="subsidies-module">
    <div class="form-title">生育津贴申领</div>
    <div class="form-wrap">
       <el-form :inline="true" :model="formData1" ref="formData1" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="credentialsNum">
              <el-input v-model="formData1.credentialsNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-subtitle">重要信息</div>
       <el-form :inline="true" :model="formData2" ref="formData2" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData2.name" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-input v-model="formData2.gender" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户籍" prop="register">
              <el-input v-model="formData2.register" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="jobType">
              <el-input v-model="formData2.jobType" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码">
              <el-input v-model="formData2.credentialsNum" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <div class="form-subtitle">生育津贴申请信息</div>
        <el-row>
          <inner-table :tableData="formData2.tableData" @addClick="addHandle" @deleteClick="deleteHandle"></inner-table>
        </el-row>
        <div class="form-subtitle">生育津贴申请信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="分娩/终止妊娠/计划生育手术日期" prop="childbirth" label-width="125px">
               <el-date-picker
                v-model="formData2.childbirth"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产前休假天数" prop="grass">
              <el-input v-model="formData2.grass" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生育津贴校验情形" prop="check">
              <el-select v-model="formData2.check" placeholder="请选择">
                <el-option
                  v-for="item in useOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="经办人姓名" prop="operator">
              <el-input v-model="formData2.operator"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人手机号" prop="operatorPhone">
              <el-input v-model="formData2.operatorPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="文书送达方式" prop="service">
              <el-select v-model="formData2.service" placeholder="请选择">
                <el-option
                  v-for="item in useOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人姓名" prop="addressee">
              <el-input v-model="formData2.addressee" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收件人手机号" prop="addresseePhone">
              <el-input v-model="formData2.addresseePhone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="16">
            <el-form-item label="邮寄地址" prop="address">
              <el-input class="max-input" v-model="formData2.address" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-subtitle">垫付生育津贴信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="垫付天数" prop="advancesDays">
              <el-input v-model="formData2.advancesDays"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="垫付金额" prop="advancesMoney">
              <el-input v-model="formData2.advancesMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <div class="form-subtitle">银行账号信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户银行" prop="bank">
              <el-input v-model="formData2.bank" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行户名" prop="bankUser">
              <el-input v-model="formData2.bankUser" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡类型" prop="bankCard">
              <el-input v-model="formData2.bankCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input v-model="formData2.bankAccount" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="24">
            <el-form-item class="form-operation">
              <el-button type="primary" @click="onConfirm">确认</el-button>
              <el-button type="primary" plain>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>  
       </el-form>
    </div>
  </div>
</template>

<script>
 import { validateID } from '@/utils/validate'
 import InnerTable from '../../components/common/inner-table'

  export default {
    name: 'subsidies',
    components: {InnerTable},
    data() {
      let  validateCredentialsNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入身份证号'))
        } else if (!validateID(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      }
      return {
        useOption: [
          {value: 1, label: '全日制用工'},
          {value: 2, label: '非全日制用工'},
        ],
        formData1: {
          credentialsNum: ''
        },
        formData2: {
          name: '',
          gender:'',
          register:'',
          jobType: '',
          credentialsNum: '',
          tableData: [
            {project: '', num: '', days: '', money: ''},
            {project: '', num: '', days: '', money: ''},
            {project: '', num: '', days: '', money: ''},
          ],
          childbirth: '',
          grass: '',
          check: '',
          operator: '',
          operatorPhone: '',
          service: '',
          addressee: '',
          addresseePhone: '',
          address: '',
          advancesDays: '',
          advancesMoney: '',
          bank: '',
          bankUser: '',
          bankCard: '',
          bankAccount: '',
        },
        rules: {
          'credentialsNum': [
            { required: true, validator: validateCredentialsNum, trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      onSearch() {

      },
      onConfirm() {

      },
      addHandle() {
        console.log('增加')
        const tableRow = {project: '', num: '', days: '', money: ''}
        this.formData2.tableData.push(tableRow)
      },
      deleteHandle(row) {
        console.log('删除', row)
        let index = this.formData2.tableData.indexOf(row);
        if (index !== -1) {
          this.formData2.tableData.splice(index, 1);
        }
      }
    }
  }
</script>

<style scoped lang="less">
@import '../../assets/css/mixin';
@import '../../assets/css/common';

.subsidies-module {
  .main-wrap();
}
</style>
