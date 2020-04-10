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
            <el-form-item label="单位名称" prop="businessName">
              <el-input v-model="formData.businessName" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照类型" prop="typeOfCertificate">
              <el-select v-model="formData.typeOfCertificate" placeholder="请选择">
                <el-option
                  v-for="item in typeOfCertificateArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照号码" prop="enterpriseID">
              <el-input v-model.number="formData.enterpriseID" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="legalRepresentative">
              <el-input v-model="formData.legalRepresentative" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位电话" prop="workPhone">
              <el-input v-model="formData.workPhone" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位地址" prop="workAddress">
              <el-input v-model="formData.workAddress" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="form-operation">
              <el-button type="primary" @click="onConfirm">确认</el-button>
              <el-button type="primary" plain @click="onCancel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>    
      </el-form>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'unitRegistered',
    data() {
      return {
        typeOfCertificateArray: [
          { value: 1, label: '营业执照' },
          { value: 2, label: '组织机构代码证' },
          { value: 3, label: '税务登记证' },
        ],
        formData: {
          businessName: '',
          typeOfCertificate: '',
          enterpriseID: '',
          legalRepresentative: '',
          workPhone: '',
          workAddress: '',
        },
        rules: {
          'businessName': [
            { required: true, message: '请输入单位名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          'typeOfCertificate': [
            { required: true, message: '请选择单位证照类型', trigger: 'change' }
          ],
          'enterpriseID': [
            { required: true, message: '请输入单位证照号码', trigger: 'blur' },
            { type: 'number', message: '单位证照号码必须为数字值'},
          ],
          'legalRepresentative': [
            { required: true, message: '请输入法定代表人', trigger: 'blur' },
          ],
          'workPhone': [
            { required: true, message: '请输入单位电话', trigger: 'blur' },
          ],
          'workAddress': [
            { required: true, message: '请输入单位地址', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      onConfirm () {
         this.$refs['formData'].validate(valid => {
          if (valid) {
            console.log('验证通过')
            this.$ajax.post('/v1/declare/business_registration',this.formData).then(res=>{
              console.log(res)
            })
          } else {
            console.log('验证未通过')
          }
        })
      },
      onCancel () {
        this.$router.go(-1);
      },
    },
  }
</script>

<style scoped lang="less">
</style>
