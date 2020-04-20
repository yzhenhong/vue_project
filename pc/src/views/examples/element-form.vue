<template>
  <div class="element-form">
    <div class="form-wrap">
       <el-form 
        :inline="true"
        :model="formData"
        :rules="rules"
        ref="formData"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="formData.gender" placeholder="请选择">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码" prop="IDNum">
              <el-input v-model="formData.IDNum" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row> 
        <el-row>
          <el-col :span="8">
            <el-form-item label="民族" prop="nation">
              <el-select v-model="formData.nation" placeholder="请选择">
                <el-option
                  v-for="(item,index) in computed_nation_list"
                  :key="index"
                  :label="item"
                  :value="index">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                v-model="formData.birthday"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="工资" prop="salary">
              <el-input v-model.number="formData.salary" placeholder="请填写"></el-input>
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
  </div>
</template>

<script>
import { validateID } from '@/utils/validate'
import { nation_list } from '@/global/js/dictionary'
export default {
  name: 'element-form',
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
        name: '',
        gender: '',
        IDNum: '',
        nation: '',
        birthday: '',
        standardOfCulture: '',
        salary: '',
      },
      rules: {
        'name': [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        'gender': [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        'IDNum': [
          { required: true, validator: this.validateIDNum, trigger: 'blur' }
        ],
        'nation': [
          { required: true, message: '请选择民族', trigger: 'change' }
        ],
        'birthday': [
          { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        'standardOfCulture': [
          { required: true, message: '请选择文化程度', trigger: 'change' }
        ],
        'salary': [
          { required: true, message: '请输入工资', trigger: 'blur' },
          { type: 'number', message: '工资必须为数字值'},
        ],
      },
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
    onConfirm () {
      console.log('onConfirm')
        this.$refs['formData'].validate(valid => {
        if (valid) {
          console.log('验证通过')
        } else {
          console.log('验证未通过')
        }
      })
    },
    onCancel () {
      console.log('onCancel')
      this.$refs['formData'].resetFields();
      parent.window.closeDialog(1);
      // this.$router.go(-1);
    },
  },
}
</script>

<style scoped lang="less">
.form-wrap{
  /deep/ .el-form-item__label{
    width: 120px;
  }
}
</style>
