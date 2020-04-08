<template>
  <section class="business-personal-edit">
    <div class="form-title">个人信息变更</div>
    <div class="form-wrap">
      <div class="form-subtitle no-margin">基本信息</div>
       <el-form 
        :inline="true"
        :model="formData2"
        ref="formData2"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="缴费工资" prop="salary">
              <el-input v-model="formData2.salary" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData2.phone" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="民族" prop="nation">
              <el-input v-model="formData2.nation" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="学历" prop="education">
              <el-select v-model="formData2.education" placeholder="请选择">
                <el-option
                  v-for="item in educationOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用工形式" prop="use">
              <el-select v-model="formData2.use" placeholder="请选择">
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
            <el-form-item label="首次参加工作时间" prop="firstTime" label-width="124px">
               <el-date-picker
                v-model="formData2.firstTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="通讯地址" prop="address">
              <el-input class="max-input" v-model="formData2.address" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-subtitle">重要信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData2.name" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="credentials">
              <el-select v-model="formData2.credentials" placeholder="请选择">
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
            <el-form-item label="证件号码" prop="credentialsNum">
              <el-input v-model="formData2.credentialsNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="formData2.gender" placeholder="请选择">
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
            <el-form-item label="出生日期" prop="birth">
               <el-date-picker
                v-model="formData2.birth"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户籍" prop="register">
              <el-input v-model="formData2.register" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="个人身份" prop="identity">
              <el-select v-model="formData2.identity" placeholder="请选择">
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
            <el-form-item label="医疗保险档次" prop="grade">
              <el-input v-model="formData2.grade" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="岗位类别" prop="station">
              <el-input v-model="formData2.station" disabled placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="国家/地区" prop="country">
              <el-input v-model="formData2.country" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入深户时间" prop="registerTime">
              <el-input v-model="formData2.registerTime" disabled placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="就业登记证号" prop="jobNum">
              <el-input v-model="formData2.jobNum" disabled placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="就业证件类型" prop="jobType">
              <el-input v-model="formData2.jobType" disabled placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="就业登记证件签发时间" prop="jobTime">
              <el-input v-model="formData2.jobTime" disabled placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="就业登记证件到期时间" prop="objEnd">
              <el-input v-model="formData2.objEnd" disabled placeholder="请填写"></el-input>
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
  </section>
</template>

<script>
 import { validateID } from '@/utils/validate'

  export default {
    name: 'personalInfoEdit',
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
        educationOption: [
          {value: 1, label: '本科'},
          {value: 2, label: '大专'},
          {value: 3, label: '中专'},
        ],
        useOption: [
          {value: 1, label: '全日制用工'},
          {value: 2, label: '非全日制用工'},
        ],
        formData2: {
          salary: '',
          phone: '',
          nation: '',
          education: '',
          use: '',
          firstTime: '',
          address: '',
          name: '',
          credentials: '',
          credentialsNum: '',
          gender: '',
          birth: '',
          register: '',
          identity: '',
          grade: '',
          station: '',
          country: '',
          registerTime: '',
          jobNum: '',
          jobType: '',
          jobTime: '',
          objEnd: '',
        },
        rules: {
          'credentialsNum': [
            { required: true, validator: validateCredentialsNum, trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      onConfirm() {

      }
    }
  }
</script>

<style scoped lang="less">
@import '../../../assets/css/mixin.less';
@import '../../../assets/css/common';

.business-personal-edit {
  .main-wrap();
  .no-margin {
    margin-top: 0;
  }
}
</style>
