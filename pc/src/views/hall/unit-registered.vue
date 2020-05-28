<template>
  <section class="main-wrap">
    <div class="form-title">单位参保登记</div>    
    <audit-info :checkData="checkData" class="audit-info" v-if="isDetail"></audit-info>
    <div class="form-wrap" :class="isDetail?'isDetail':''">
       <el-form 
        :inline="true"
        :model="formData"
        :rules="rules"
        ref="formData"
        :hide-required-asterisk='isDetail'
        :show-message='!isDetail'
        :disabled='isDetail'
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位名称" prop="businessName">
              <el-input v-model="formData.businessName" placeholder="请填写" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照类型" prop="typeOfCertificate">
              <el-select v-model="formData.typeOfCertificate" placeholder="请选择" maxlength="30">
                <el-option
                  v-for="item in computed_unitCertification_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位证照号码" prop="certificateSn">
              <el-input v-model="formData.certificateSn" placeholder="请填写" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定代表人" prop="legalRepresentative">
              <el-input v-model="formData.legalRepresentative" placeholder="请填写" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位电话" prop="workPhone">
              <el-input v-model="formData.workPhone" placeholder="请填写" maxlength="13"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位地址" prop="workAddress">
              <el-input v-model="formData.workAddress" placeholder="请填写" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="form-operation" v-if="!isDetail">
        <el-button type="primary" @click="onConfirm">确认</el-button>
        <el-button type="primary" plain @click="onCancel">取消</el-button>
      </div>
      <div class="form-operation" v-else>
        <el-button type="primary" @click="onCancel">返回</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { unitCertification_list } from '@/global/js/dictionary'
import { validateTels } from '@/utils/validate'
import {setRedirectConfirm} from '@/components/layout/setRedirectConfirm';
export default {
  name: 'unitRegistered',
  data() {
    return {
      isDetail: false,
      id: '',
      checkData: {},
      formData: {
        enterpriseId: '123',
        businessName: '',
        typeOfCertificate: '',
        certificateSn: '',
        legalRepresentative: '',
        workPhone: '',
        workAddress: '',
      },
      rules: {
        'businessName': [
          { required: true, message: '请填写单位名称', trigger: 'blur' },
        ],
        'typeOfCertificate': [
          { required: true, message: '请选择单位证照类型', trigger: 'change' }
        ],
        'certificateSn': [
          { required: true, message: '请填写单位证照号码', trigger: 'blur' },
        ],
        'legalRepresentative': [
          { required: true, message: '请填写法定代表人', trigger: 'blur' },
        ],
        'workPhone': [
          { required: true, validator: ((rule, value, callback) => { validateTels(rule, value, callback,'单位电话') }), trigger: 'blur' }
        ],
        'workAddress': [
          { required: true, message: '请填写单位地址', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    computed_unitCertification_list() {
      return unitCertification_list
    },
  },
  created () {
    // console.log(this.$route.query)
    if(this.$route.query.isDetail){
      setRedirectConfirm(this.$route.name,true)
      this.isDetail=true
    }
    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getDetail (this.id)
    }
  },
  methods: {
    getDetail (id) {
      this.$ajax.post('/api/v1/query/info/unit/insured',{
        enterpriseId: this.formData.enterpriseId,
        id: this.id
      }).then(res=>{
        console.log('详情', res)
        if(this.isDetail && res.data.info){
          for(let key  in res.data.info){
            if(!res.data.info[key]){
              res.data.info[key] = '-'
            }
          }
        }
        res.data.info.enterpriseId = this.formData.enterpriseId
        res.data.check.auditId?res.data.info.auditId=res.data.check.auditId:res.data.info.auditId=''
        this.formData = res.data.info
        this.checkData = res.data.check
      })
    },
    onConfirm () {
        this.$refs['formData'].validate(valid => {
        if (valid) {
          console.log('验证通过')
          this.$ajax.post('/v1/declare/business_registration',this.formData).then(res=>{
            console.log(res)
            if (res.code === 0) {
              this.$message({
                message: '您的申请已经提交成功！',
                type: 'success'
              });
              setRedirectConfirm(this.$route.name,true)
              this.onCancel()
            }  
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
