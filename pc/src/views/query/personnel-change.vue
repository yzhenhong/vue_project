<template>
  <div class="main-wrap personnelChange">
    <div class="search-wrapper">
      <el-form :inline="true" :model="parameter">
        <el-form-item>
          <el-date-picker
            v-model="parameter.changeDate"
            align="right"
            type="date"
            prefix-icon="el-icon-date"
            placeholder="请选择变更日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="parameter.changeType" placeholder="请选择变更类型">
            <el-option
              v-for="item in changeTypeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="query">查询</el-button>
          <el-button type="primary" plain @click="empty">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <dynamic-list
      :autoFetch="listAutoFetch"
      :listLoading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      theme="personnelChange-list"
      @fetch-list="fetchList"
      v-model="listData"
    >
    </dynamic-list>
  </div>
</template>

<script>
import { formatDateMonth } from '@/utils/time'
export default {
  name: 'personnelChange',
  data() {
    return {
      changeTypeArray: [
        { value: 1, label: '状态1' },
        { value: 2, label: '状态2' },
        { value: 3, label: '状态3' },
        { value: 4, label: '状态4' },
      ],
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
      // 搜索条件
      parameter: {
        pageNum: '',
        pageSize: '',
        enterpriseID: '',
        changeDate: '',
        changeType: '',
      },
      // 列表
      listAutoFetch: false,
      listPager: {
        total: 110,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 15],
      },
      listLoading: false,
       listData: [
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
        {
          name: '张晓刚',
          IDNum: '3508****11',
          insurance: '1',
          medicalGrade: '一档在职',
          enrollmentStatus: '正常参保',
          IncreaseDate: '1580774752000',
          DownsizingDate: '1580774752000',
          enrollmentDate: '1580774752000',
          endDate: '1580774752000',
          isAgree: '是',
          collectionMethod: '788.72',
        },
      ],
      listSchema: [
        {
          label: '序号',
          width: '60',
          type: 'index',
          index: res => {
            let index = (this.listPager.currentPage - 1) * this.listPager.pageSize + res + 1;
            return index
          }
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'IDNum',
          label: '身份证号',
        },
        {
          prop: 'insurance',
          label: '险种类型',
          formatter: row => (row.insurance == 1 ? '医疗' : '生育')
        },
        {
          prop: 'medicalGrade',
          label: '医疗档次'
        },
        {
          prop: 'enrollmentStatus',
          label: '参保状态'
        },
        {
          prop: 'IncreaseDate',
          label: '办理增员时间',
          formatter: row => `${formatDateMonth(Number(row.IncreaseDate))}`
        },
        {
          prop: 'DownsizingDate',
          label: '办理减员时间',
          formatter: row => `${formatDateMonth(Number(row.DownsizingDate))}`
        },
        {
          prop: 'enrollmentDate',
          label: '参保年月',
          formatter: row => `${formatDateMonth(Number(row.DownsizingDate))}`
        },
        {
          prop: 'endDate',
          label: '停止参保年月',
          formatter: row => `${formatDateMonth(Number(row.DownsizingDate))}`
        },
        {
          prop: 'isAgree',
          label: '是否本人意'
        },
        {
          prop: 'collectionMethod',
          label: '首次参保标志'
        },
      ],
    }
  },
  mounted () {
    // document.getElementsByClassName("meta-title")[0].style.width = "1400px";
    // document.getElementsByClassName("main-wrap")[0].style.width = "1400px";
  },
  created () {
  },
  methods: {
    dateChange() {
      console.log()
    },
     // 清空
    empty() {
    },
    // 查询
    query() {
      console.log(this.parameter);
    },
    fetchList(pagerOptions) {
      console.log(pagerOptions)
    },
    deleteData(row, column, $index) {
      console.log(row, column, $index);
    },
    editData(row, column, $index) {
      console.log(row, column, $index);
    },
  }
}
</script>

<style scoped lang="less">
</style>
