<template>
  <div class="element-form">
    <div class="form-wrap">
      <el-form :inline="true" :model="formData" :rules="rules" ref="formData">
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
                  :value="index"
                ></el-option>
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
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文化程度" prop="standardOfCulture">
              <el-select v-model="formData.standardOfCulture" placeholder="请选择">
                <el-option
                  v-for="item in standardOfCultureArray"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
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
        <div class="item-form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="单位名称" prop="Corp.Name">
                <el-input placeholder="请输入单位名称" v-model="formData.Corp.Name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业范围" prop="Corp.Type">
                <el-select placeholder="请选择行业范围" size="small" v-model.number="formData.Corp.Type">
                  <el-option
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID"
                    v-for="item in typeList"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人名称" prop="Corp.OwnerName">
                <el-input placeholder="请输入法人名称" v-model="formData.Corp.OwnerName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="身份证号" prop="Corp.OwnerIdentityNumber">
                <el-input placeholder="请输入身份证号" v-model="formData.Corp.OwnerIdentityNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号码" prop="Corp.OwnerPhone">
                <el-input placeholder="请输入手机号码" v-model="formData.Corp.OwnerPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位地址" prop="Corp.Address">
                <el-input class="max-input" placeholder="请输入单位地址" v-model="formData.Corp.Address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="item-form">
          <!-- 修改 -->
          <div
            :key="item.ID"
            class="personnel-wrap"
            v-for="(item, index) in formData.ModifyStaffList"
          >
            <el-row class="personnel-delete">
              <span @click.stop="deletePractitioners(item.ID,index)">删除已有</span>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.Name'"
                  :rules="rules.Name"
                  label="姓名"
                >
                  <el-input placeholder="请输入从业人员姓名" v-model="formData.ModifyStaffList[index].Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.Phone'"
                  :rules="rules.Phone"
                  label="手机号码"
                >
                  <el-input placeholder="请输入手机号码" v-model="formData.ModifyStaffList[index].Phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.Nation'"
                  :rules="rules.Nation"
                  label="民族"
                >
                  <el-select
                    placeholder="请选择民族"
                    v-model.number="formData.ModifyStaffList[index].Nation"
                  >
                    <el-option
                      v-for="(item,index) in computed_nation_list"
                      :key="index"
                      :label="item"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.IdentityNumber'"
                  :rules="rules.IdentityNumber"
                  label="身份证号"
                >
                  <el-input
                    placeholder="请输入身份证号"
                    v-model="formData.ModifyStaffList[index].IdentityNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.ResidenceAddress'"
                  :rules="rules.ResidenceAddress"
                  label="户籍地址"
                >
                  <el-input
                    class="max-input"
                    placeholder="请输入户籍地址"
                    v-model="formData.ModifyStaffList[index].ResidenceAddress"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.TempAddress'"
                  :rules="rules.TempAddress"
                  label="暂住地址"
                >
                  <el-input
                    class="max-input"
                    placeholder="请输入暂住地址"
                    v-model="formData.ModifyStaffList[index].TempAddress"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :prop="'ModifyStaffList.' + index + '.Picture'"
                  :rules="{
                    required: true, message: '请选择图片地址', trigger: 'blur'
                  }"
                  label="图片"
                >
                  <el-input v-model="item.Picture"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 新增 -->
          <div
            :key="index"
            class="personnel-wrap"
            v-for="(item, index) in formData.InsertStaffList"
          >
            <el-row class="personnel-delete">
              <span @click="deleteNewPractitioners(index)">删除新增</span>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.Name'"
                  :rules="rules.Name"
                  label="姓名"
                >
                  <el-input placeholder="请输入从业人员姓名" v-model="formData.InsertStaffList[index].Name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.Phone'"
                  :rules="rules.Phone"
                  label="手机号码"
                >
                  <el-input placeholder="请输入手机号码" v-model="formData.InsertStaffList[index].Phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.Nation'"
                  :rules="rules.Nation"
                  label="民族"
                >
                  <el-select
                    placeholder="请选择民族"
                    v-model.number="formData.InsertStaffList[index].Nation"
                  >
                    <el-option
                      v-for="(item,index) in computed_nation_list"
                      :key="index"
                      :label="item"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.IdentityNumber'"
                  :rules="rules.IdentityNumber"
                  label="身份证号"
                >
                  <el-input
                    placeholder="请输入身份证号"
                    v-model="formData.InsertStaffList[index].IdentityNumber"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.ResidenceAddress'"
                  :rules="rules.ResidenceAddress"
                  label="户籍地址"
                >
                  <el-input
                    class="max-input"
                    placeholder="请输入户籍地址"
                    v-model="formData.InsertStaffList[index].ResidenceAddress"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.TempAddress'"
                  :rules="rules.TempAddress"
                  label="暂住地址"
                >
                  <el-input
                    class="max-input"
                    placeholder="请输入暂住地址"
                    v-model="formData.InsertStaffList[index].TempAddress"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  :prop="'InsertStaffList.' + index + '.Picture'"
                  :rules="{
                    required: true, message: '请选择图片地址', trigger: 'blur'
                  }"
                  label="图片"
                >
                  <el-input v-model="item.Picture"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item class="form-operation">
              <el-button @click="addingPractitioners">添加从业人员</el-button>
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
import {
  validateTels,
  validateNames,
  validateID,
  validateMobilePhone,
} from "@/utils/validate";
import { nation_list } from "@/global/js/dictionary";
export default {
  name: "element-form",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      standardOfCultureArray: [
        { value: 1, label: "博士研究生" },
        { value: 2, label: "硕士研究生" },
        { value: 3, label: "大学本科" },
        { value: 4, label: "大学大专" },
        { value: 5, label: "中等专科" },
        { value: 6, label: "职业高中" },
        { value: 7, label: "普通高中" },
        { value: 8, label: "初等中学" },
        { value: 9, label: "技工学校" },
        { value: 10, label: "小学毕业" },
        { value: 11, label: "其他文化程度" },
      ],
      typeList: [{ Name: "Name", ID: "ID" }],
      formData: {
        name: "",
        gender: "",
        IDNum: "",
        nation: "",
        birthday: "",
        standardOfCulture: "",
        salary: "",
        Corp: {
          Name: "",
          Type: "",
          OwnerName: "",
          OwnerIdentityNumber: "",
          OwnerPhone: "",
          Address: "",
        },
        InsertStaffList: [],
        ModifyStaffList: [],
        DeleteStaffList: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        IDNum: [
          { required: true, validator: this.validateIDNum, trigger: "blur" },
        ],
        nation: [{ required: true, message: "请选择民族", trigger: "change" }],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        standardOfCulture: [
          { required: true, message: "请选择文化程度", trigger: "change" },
        ],
        workPhone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateTels(rule, value, callback, "请输入正确的单位电话");
            },
            trigger: "blur",
          },
        ],
        salary: [
          { required: true, message: "请输入工资", trigger: "blur" },
          { type: "number", message: "工资必须为数字值" },
        ],
        "Corp.Name": [
          { required: true, validator: validateNames, trigger: "blur" },
        ],
        "Corp.Type": [
          { required: true, message: "请选择行业范围", trigger: "change" },
        ],
        "Corp.OwnerName": [
          { required: true, validator: validateNames, trigger: "blur" },
        ],
        "Corp.OwnerIdentityNumber": [
          {
            required: true,
            validator: this.validateIdentityNumber,
            trigger: "blur",
          },
        ],
        "Corp.OwnerPhone": [
          { required: true, validator: this.validatePhone, trigger: "blur" },
        ],
        "Corp.Address": [
          { required: true, message: "请输入单位地址", trigger: "blur" },
        ],
        // Picture: [{ required: true, message: '请选择图片地址', trigger: 'blur' }],
        Name: [{ required: true, validator: validateNames, trigger: "blur" }],
        Phone: [
          { required: true, validator: this.validatePhone, trigger: "blur" },
        ],
        Nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
        IdentityNumber: [
          {
            required: true,
            validator: this.validateIdentityNumber,
            trigger: "blur",
          },
        ],
        ResidenceAddress: [
          { required: true, message: "请输入户籍地址", trigger: "blur" },
        ],
        TempAddress: [
          { required: true, message: "请输入暂住地址", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    computed_nation_list() {
      return nation_list;
    },
  },
  created() {},
  methods: {
    validateIDNum(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else if (!validateID(value)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    },
    validateIdentityNumber(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入身份证号"));
      } else if (value.indexOf("*") > -1) {
        callback();
      } else if (!validateID(value)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    },
    validatePhone(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else if (value.indexOf("*") > -1) {
        callback();
      } else if (!validateMobilePhone(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    },
    addingPractitioners() {
      let data = {
        Picture: "",
        Name: "",
        Phone: "",
        Nation: 0,
        IdentityNumber: "",
        ResidenceAddress: "",
        TempAddress: "",
      };
      this.formData.InsertStaffList.push(data);
    },
    // 删除新增
    deleteNewPractitioners(index) {
      console.log(index);
      this.formData.InsertStaffList.splice(index, 1);
    },
    // 删除已有
    deletePractitioners(id, index) {
      console.log(id, index);
      this.formData.ModifyStaffList.splice(index, 1);
      this.formData.DeleteStaffList.push(id);
    },
    onConfirm() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          Object.keys(this.formData.Corp).forEach((e) => {
            if (this.formData.Corp[e].toString().indexOf("*") > -1) {
              delete this.formData.Corp[e];
            }
          });
          this.formData.InsertStaffList.forEach((item, index) => {
            Object.keys(item).forEach((e) => {
              if (item[e].toString().indexOf("*") > -1) {
                delete this.formData.InsertStaffList[index][e];
              }
            });
          });
          this.formData.ModifyStaffList.forEach((item, index) => {
            Object.keys(item).forEach((e) => {
              if (item[e].toString().indexOf("*") > -1) {
                delete this.formData.ModifyStaffList[index][e];
              }
            });
          });
          console.log(this.formData);
        } else {
          console.log("验证未通过");
        }
      });
    },
    onCancel() {
      console.log("onCancel");
      this.$refs["formData"].resetFields();
      // parent.window.closeDialog(1);
    },
  },
};
</script>

<style scoped lang="less">
.form-wrap {
  /deep/ .el-form-item__label {
    width: 120px;
  }
  /deep/.el-select {
    width: 200px;
  }
}

.item-form{
  margin-top: 50px;
}
.personnel-delete {
  color: #1576da;
  cursor: pointer;
}
</style>
