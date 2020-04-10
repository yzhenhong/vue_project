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
            <el-form-item label="证件号码" prop="IDNum">
              <el-input v-model="formData.IDNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请填写"></el-input>
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
              <img :src="formData2.imageUrl" alt="">
              <div>个人照片</div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="12">
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="formData2.gender" placeholder="请选择">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="nation">
                  <el-select v-model="formData2.nation" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in computed_nation_list"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="个人身份" prop="personalIdentit">
                  <el-select v-model="formData2.personalIdentity" placeholder="请选择">
                    <el-option label="工人" :value="1"></el-option>
                    <el-option label="干部" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday">
                  <el-date-picker
                    v-model="formData2.birthday"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位编号" prop="enterpriseNumber">
                  <el-input v-model="formData2.enterpriseNumber" placeholder="请填写"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参加工作日期" prop="attackTime">
                  <el-date-picker
                    v-model="formData2.attackTime"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="农民工标识" prop="peasantWorker">
                  <el-select v-model="formData2.peasantWorker" placeholder="请选择">
                    <el-option label="工人" :value="1"></el-option>
                    <el-option label="干部" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="户口所在地">
                  <el-input v-model="formData2.registeredPermanentResidence" placeholder="（选填）"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="户口性质" prop="registrationType">
                  <el-select v-model="formData.registrationType" placeholder="请选择">
                    <el-option label="深圳户籍" :value="1"></el-option>
                    <el-option label="广东非深圳户籍" :value="2"></el-option>
                    <el-option label="非广东户籍" :value="3"></el-option>
                    <el-option label="港澳台" :value="4"></el-option>
                    <el-option label="华侨" :value="5"></el-option>
                    <el-option label="外国人" :value="6"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文化程度" prop="standardOfCulture">
                  <el-select v-model="formData.standardOfCulture" placeholder="请选择">
                    <el-option
                      v-for="item in standardOfCultureArray"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="form-subtitle">联系信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phoneNum">
              <el-input v-model="formData2.phoneNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱">
              <el-input v-model="formData2.email" placeholder="（选填）"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮政编码" prop="postalCode">
              <el-input v-model="formData2.postalCode" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="16">
            <el-form-item label="通讯地址" prop="mailingAddress">
              <el-input class="max-input" v-model="formData2.mailingAddress" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-subtitle">参保信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否外统筹区" prop="isPlan">
              <el-select v-model="formData.isPlan" placeholder="请选择">
                <el-option label="深圳户籍" :value="0"></el-option>
                <el-option label="广东非深圳户籍" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="外统筹区参保说明">
              <el-input class="max-input" v-model="formData2.explain" placeholder="（选填）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="统一档案医保对接表ID" prop="healthInsuranceID">
              <el-input v-model="formData2.healthInsuranceID" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工资" prop="salary">
              <el-input v-model.number="formData2.salary" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生育缴费基数">
              <el-input v-model.number="formData2.payTheFees" placeholder="（选填）"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="本次参保年月" prop="insuredTime">
              <el-date-picker
                v-model="formData2.attackTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注">
              <el-input class="max-input" v-model="formData2.remark" placeholder="（选填）"></el-input>
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
 import { nation_list } from '@/global/js/dictionary'
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
        standardOfCultureArray: [
          { value: 1, label: '博士研究生' },
          { value: 2, label: '硕士研究生' },
          { value: 3, label: '大学本科' },
          { value: 4, label: '大学大专' },
          { value: 5, label: '中等专科' },
          { value: 6, label: '职业高中' },
          { value: 7, label: '普通高中' },
          { value: 8, label: '初等中学' },
          { value: 9, label: '技工学校' },
          { value: 10, label: '小学毕业' },
          { value: 11, label: '其他文化程度' },
        ],
        formData: {
          IDNum: '',
          name: '',
        },
        rules: {
          'IDNum': [
            { required: true, validator: this.validateIDNum, trigger: 'blur' }
          ],
          'name': [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
        },
         formData2: {
          IDNum: '',
          name: '',
          imageUrl: '',
          gender: '',
          nation: '',
          personalIdentity: '',
          birthday: '',
          enterpriseNumber: '',
          attackTime: '',
          peasantWorker: '',
          registeredPermanentResidence: '',
          registrationType: '',
          standardOfCulture: '',
          phoneNum: '',
          email: '',
          postalCode: '',
          mailingAddress: '',
          isPlan: '',
          explain: '',
          healthInsuranceID: '',
          salary: '',
          payTheFees: '',
          insuredTime: '',
          remark: '',
        },
        rules2: {
          'IDNum': [
            { required: true, validator: this.validateIDNum, trigger: 'blur' }
          ],
          'name': [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          'gender': [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          'nation': [
            { required: true, message: '请选择民族', trigger: 'change' }
          ],
          'personalIdentit': [
            { required: true, message: '请选择个人身份', trigger: 'change' }
          ],
          'birthday': [
            { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          'enterpriseNumber': [
            { required: true, message: '请输入单位编号', trigger: 'blur' },
          ],
          'attackTime': [
            { type: 'date', required: true, message: '请选择参加工作日期', trigger: 'change' }
          ],
          'peasantWorker': [
            { required: true, message: '请选择农民工标识', trigger: 'change' }
          ],
          'registrationType': [
            { required: true, message: '请选择户口性质', trigger: 'change' }
          ],
          'standardOfCulture': [
            { required: true, message: '请选择文化程度', trigger: 'change' }
          ],
          'phoneNum': [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          'postalCode': [
            { required: true, message: '请输入邮政编码', trigger: 'blur' },
          ],
          'mailingAddress': [
            { required: true, message: '请输入通讯地址', trigger: 'blur' },
          ],
          'isPlan': [
            { required: true, message: '请选择是否外统筹区', trigger: 'change' }
          ],
          'healthInsuranceID': [
            { required: true, message: '请输入统一档案医保对接表ID', trigger: 'blur' },
          ],
          'salary': [
            { required: true, message: '请输入工资', trigger: 'blur' },
            { type: 'number', message: '工资必须为数字值'},
          ],
          'insuredTime': [
            { type: 'date', required: true, message: '请选择本次参保年月', trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      computed_nation_list() {
        return nation_list
      },
    },
    created () {
    },
    methods: {
      validateIDNum(rule, value, callback) {
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
            this.$ajax.post('/v1/declare/employee_registration',this.formData2).then(res=>{
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
