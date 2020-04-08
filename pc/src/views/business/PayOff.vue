<template>
  <section class="payoff">
    <div class="form-title">生育津贴申领</div>
    <div class="form-wrap">
      <div class="form-subtitle no-margin">业务情形</div>
       <el-form :inline="true" :model="formData" ref="formData2" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务情形" prop="business">
              <el-input v-model="formData.business" placeholder="请填写"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-subtitle">业务情形</div>
        <el-row>
          <dynamic-list :autoFetch="listAutoFetch" :schema="listSchema" v-model="formData.listData">
            <el-table-column width="200">
              <template v-slot:header>操作</template>
              <template v-slot="{ row, column, $index }">
                <el-button type="text" @click="deleteClick(row, column, $index)">删除</el-button>
              </template>
            </el-table-column>
          </dynamic-list>
          <div class="add-module">
            <el-button type="text" class="add-btn" @click="onAddClick()">
              <div class="add-inner">
                <img class="add-icon" src="../../assets/svg/add_btn.svg">
                <span>新增生育津贴申请信息</span>
              </div>
            </el-button>
          </div>
        </el-row>
        <div class="form-subtitle">补缴信息</div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开户银行" prop="bank">
                <el-input v-model="formData.bank" disabled placeholder="请填写"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行户名" prop="bankUser">
                <el-input v-model="formData.bankUser" disabled placeholder="请填写"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行账号" prop="bankAccount">
                <el-input v-model="formData.bankAccount" disabled placeholder="请填写"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="tips-module">
              <p class="red-txt">一、一次提交允许最大人数为20人，若超过20人，请分批提交；</p>
              <p class="red-txt">二、同一批次中只有三个月内的职工补缴可自助办结，申请单位需核实该职工属于应保未参加的人员，并保留补缴所需的材料（劳动合同、工资表、会计凭证、外 <br>
              籍人还需“就业许可证件”）备查，参保单位必须严格审查职工补缴条件，虚假申报的将按照社会保险法等法律法规依法查处。</p>
              <p class="grey-txt">部分法律法规如下：</p>
              <p class="grey-txt">1、社会保险法 <span class="blue-txt" @click="ensureClick">（点击下载）</span></p>
              <p class="grey-txt">2、广东省社会保险基金监督条例 <span class="blue-txt"  @click="superviseClick">（点击下载）</span></p>
              <p class="grey-txt">3、《社会保险费申报缴纳管理规定》（人社部令第20号）<span class="blue-txt"  @click="declareClick">（点击下载）</span></p>
            </div>
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
  export default {
    name: 'payOff',
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
        listAutoFetch: false,
        listSchema: [
          { label: '序号', width: '60', type: 'index'},
          {prop: 'number', label: '证件号码'},
          {prop: 'name', label: '姓名'},
          {prop: 'startTime', label: '起始年月'},
          {prop: 'endTime', label: '终止年月'},
          {prop: 'base', label: '缴费基数'},
          {prop: 'type', label: '险种'},
          {prop: 'grade', label: '医疗档次'},
        ],
        formData: {
          business: '',
          listData: [
            {number: '4409**********7321', name: '李明', startTime: '2019-06', endTime: '2019-07', base: 12432.00, type: '医保', grade: '一档在职'},
            {number: '4409**********7322', name: '小明', startTime: '2019-06', endTime: '2019-07', base: 12432.00, type: '医保', grade: '一档在职'},
            {number: '4409**********7323', name: '张柳', startTime: '2019-06', endTime: '2019-07', base: 12432.00, type: '医保', grade: '一档在职'},
          ],
          bank: '',
          bankUser: '',
          bankAccount: '',
        },
        rules: {
          'business': [
            { required: true, validator: validateCredentialsNum, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      deleteClick(row, column, index) {
        let idx = this.formData2.tableData.indexOf(index);
        if (idx !== -1) {
          this.formData2.listData.splice(idx, 1);
        }
      },
      onAddClick() {
        
      },
      onConfirm() {

      },
      ensureClick() {

      },
      superviseClick() {

      },
      declareClick() {

      },
    },
  }
</script>

<style scoped lang="less">
@import '../../assets/css/mixin';
@import '../../assets/css/common';

.payoff {
  .main-wrap();
  .no-margin {
    margin-top: 0;
  }
  .add-module {
    display: flex;
    align-items: center;
    justify-content: center;
    .add-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .add-btn {
      width: 170px !important;
    }
    .add-inner {
      display: flex;
      align-items: center;
    }
  }
  .tips-module {
    background: #FCFCFC;
    border: 1px solid #DBDBDB;
    padding: 24px 30px;
    .red-txt {
      font-size: 14px;
      line-height: 24px;
      color: #FF0000;
    }
    .grey-txt {
      font-size: 14px;
      color: #666666;
      line-height: 24px;
    }
    .law-txt {
      margin: 14px 0 6px 0;
    }
    .blue-txt {
      font-size: 14px;
      color: #2484F6;
      cursor: pointer;
    }
  }
}
</style>
