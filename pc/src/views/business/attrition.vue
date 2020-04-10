<template>
  <section class="main-wrap">
    <div class="form-title">参保人员减员申报</div>
    <div class="form-wrap">
      <el-form 
        :inline="true"
        :model="formData"
        :rules="rules"
        ref="formData"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="IDNum">
              <el-input v-model="formData.IDNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>    
      </el-form>
      <div class="form-subtitle">基本信息</div>
       <el-form 
        :inline="true"
        :model="formData2"
        :rules="rules2"
        ref="formData2"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型" prop="idType">
              <el-select disabled v-model="formData.idType" placeholder="请选择">
                <el-option label="身份证" :value="1"></el-option>
                <el-option label="护照" :value="2"></el-option>
                <el-option label="军官证" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="IDNum">
              <el-input disabled v-model="formData2.IDNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input disabled v-model="formData2.name" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="减员原因" prop="downsizingCause">
              <el-select v-model="formData2.downsizingCause" placeholder="请选择">
                <el-option label="本地调出" :value="1"></el-option>
                <el-option label="转往外区" :value="2"></el-option>
                <el-option label="其他原因" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="减员备注">
              <el-input class="max-input" v-model="formData2.remark" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="经办人" prop="operator">
              <el-input v-model="formData2.operator" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办日期" prop="handleTime">
              <el-date-picker
                v-model="formData2.handleTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
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
    name: 'unitRegistered',
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
        formData: {
          IDNum: '',
        },
        rules: {
          'IDNum': [
            { required: true, validator: this.validateIdentityNumber, trigger: 'blur' }
          ],
        },
         formData2: {
          idType: '',
          IDNum: '',
          name: '',
          downsizingCause: '',
          remark: '',
          operator: '',
          handleTime: '',
        },
        rules2: {
          'idType': [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          'IDNum': [
            { required: true, validator: this.validateIdentityNumber, trigger: 'blur' }
          ],
          'name': [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          'downsizingCause': [
            { required: true, message: '请选择减员原因', trigger: 'change' }
          ],
          'operator': [
            { required: true, message: '请输入经办人', trigger: 'blur' },
          ],
          'handleTime': [
            { type: 'date', required: true, message: '请选择经办日期', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      validateIdentityNumber(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入身份证号'))
        } else if (!validateID(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      },
      onQuery () {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            console.log('验证通过')
            this.$ajax.post('/v1/query/basic_information',this.formData).then(res=>{
              console.log(res)
            })
          } else {
            console.log('验证未通过')
          }
        })
      },
      onConfirm () {
         this.$refs['formData2'].validate(valid => {
          if (valid) {
            console.log('验证通过')
            this.$ajax.post('/v1/declare/depletion_of_numbers',this.formData2).then(res=>{
              console.log(res)
            })
          } else {
            console.log('验证未通过')
          }
        })
      }
    },
  }
</script>

<style scoped lang="less">
</style>