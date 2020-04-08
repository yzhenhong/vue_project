<template>
  <section class="main-wrap">
    <div class="form-title">单位参保登记</div>
    <div class="form-wrap">
       <el-form 
        :inline="true"
        :model="formData"
        :rules="rules"
        ref="formData"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位名称" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照类型" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照号码" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位电话" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位地址" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
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
        formData: {
          identityNumber: '',
        },
        rules: {
          'identityNumber': [
            { required: true, validator: this.validateIdentityNumber, trigger: 'blur' }
          ],
        },
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
          } else {
            console.log('验证未通过')
          }
        })
      },
      onConfirm () {
         this.$refs['formData2'].validate(valid => {
          if (valid) {
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
