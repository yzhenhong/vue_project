<template>
  <section class="main-wrap">
    <div class="form-title">职工参保登记</div>
    <div class="form-wrap">
      <el-form 
        :inline="true"
        :model="formData"
        :rules="rules"
        ref="formData"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="姓名" prop="identityNumber">
              <el-input v-model="formData.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>    
      </el-form>
       <el-form 
        :inline="true"
        :model="formData2"
        :rules="rules2"
        ref="formData2"
      >
        <div class="form-subtitle">基本信息</div>
        <el-row>
          <el-col :span="8">
            <div class="personal-photo">
              <img src="" alt="">
              <div>个人照片</div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="个人身份" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位编号" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参加工作日期" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="农民工标识" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="户口所在地" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="户口性质" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度" prop="identityNumber">
                  <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="form-subtitle">联系信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="16">
            <el-form-item label="通讯地址" prop="identityNumber">
              <el-input class="max-input" v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-subtitle">参保信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否外统筹区" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="外统筹区参保说明" prop="identityNumber">
              <el-input class="max-input" v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一档案医保对接表ID" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工资" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生育缴费基数" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="本次参保年月" prop="identityNumber">
              <el-input v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注" prop="identityNumber">
              <el-input class="max-input" v-model="formData2.identityNumber" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tips">温馨提示：单位应按照与员工签订的劳动合同如实申报缴费工资，系统将会按照各险种的政策规定，确定缴费基数。</div>
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
         formData2: {
          identityNumber: '',
        },
        rules2: {
          'identityNumber': [
            { required: true, validator: this.validateIdentityNumber, trigger: 'blur' }
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
/deep/.personal-photo{
  width: 190px;
  height: 262px;
  padding-top: 5px;
  background: #FFFFFF;
  border: 1px solid #DBDBDB;
  border-radius: 2px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  text-align: center;
  line-height: 20px;
  >img{
    display: block;
    width: 178px;
    height: 220px;
    margin: 0 auto;
    background: #C1C1C1;
    margin-bottom: 8px;
  }
}
.tips{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF0000;
  line-height: 20px;
  margin-bottom: 30px;
}
</style>
