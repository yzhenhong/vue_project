<template>
  <div class="element-list">
    <div class="search-wrapper">
      <el-form :inline="true" :model="parameter">
        <el-form-item>
          <el-select v-model="parameter.insurance" placeholder="请选择险种类型">
            <el-option label="医疗" :value="1"></el-option>
            <el-option label="生育" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="parameter.createDate"
            align="right"
            type="date"
            prefix-icon="el-icon-date"
            placeholder="请选择建账日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="parameter.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <dynamic-list
      :autoFetch="listAutoFetch"
      :loading="listLoading"
      :pager.sync="listPager"
      :schema="listSchema"
      theme="list"
      @detail-click="carOwnerView"
      @paymentBaseNew-change ="paymentBaseIuput"
      @fetch-list="fetchList"
      v-model="listData"
    >
      <el-table-column width="150">
        <template v-slot:header>操作</template>
        <template v-slot="{ row, column, $index }">
          <el-button  type="text" size="small" @click="deleteData(row, column, $index)">删除</el-button>
        </template>
      </el-table-column>
    </dynamic-list>
  </div>
</template>

<script>
import { formatDateMonth } from '@/utils/time'
export default {
  name: 'element-list',
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
      // 搜索条件
      parameter: {
        pageNum: '',
        pageSize: '',
        insurance: '',
        createDate: '',
        name: '',
      },
      // 列表
      listAutoFetch: true,
      listPager: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [8, 10, 15],
        url: true,
        type: 'custom'
      },
      listLoading: false,
      listData: [],
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
          width: '50',
          type: 'selection',
        },
        {
          label: '照片',
          prop: 'img',
          component: {
            props: ['col', 'scope'],
            template:
              '<draggable-image :src="scope.row.img" height="58px" width="58px"></draggable-image>',
          },
          showOverflowTooltip: false,
          'min-width': '50%'
        },
        {
          prop: 'insurance',
          label: '险种类型',
          formatter: row => (row.insurance == 1 ? '医疗' : '生育')
        },
        {
          prop: 'sn',
          label: '身份证号',
          formatter: row => (row.sn.replace(/(\d{4})\d{10}(\w{4})/, "$1******$2"))
        },
        {
          prop: 'createDate',
          label: '建账年月',
          formatter: row => `${formatDateMonth(Number(row.createDate))}`
        },
         {
          prop: 'paymentBase',
          label: '原缴费基数',
        },
        {
          prop: 'paymentBaseNew',
          label: '新缴费基数',
          component: {
              props: ['col', 'scope'],
              template:
                '<el-input v-model.trim="scope.row.paymentBaseNew" @change="changeInput(scope.row)"></el-input>',
              methods: {
                changeInput(item) {
                  this.$emit('paymentBaseNew-change', item)
                }
              }
            },
        },
        {
          prop: 'collectionMethod',
          label: '征收方式',
          component: {
            props: ['col', 'scope'],
            template:
              '<el-link type="primary" @click.prevent="handleClick(scope)">{{scope.row.collectionMethod}}</el-link>',
            methods: {
              handleClick(item) {
                this.$emit('detail-click', item)
              }
            }
          },
          'min-width': '60%'
        },
      ],
    }
  },
  created () {
  },
  methods: {
    fetchList(pagerOptions) {
      console.log(pagerOptions)
      this.listData = []
      for(let i=0;i<10;i++){
        this.listData.push({
          img: 'http://himg.bdimg.com/sys/portrait/item/8176e79a86e983bde4b88de58f8ae4bda031d5.jpg',
          insurance: '2',
          sn: '158077212124752000',
          createDate: '1580774752000',
          paymentDate: '1580774752000',
          paymentBase: '1577.44',
          collectionMethod: '税务征收',
        })
      }
    },
    paymentBaseIuput (itemVal) {
      console.log(itemVal)
      // if(itemVal.paymentBaseNew){
      //   if(this.listChange<=0){
      //     this.listChange.push({
      //       id: itemVal.id,
      //       paymentBase: itemVal.paymentBaseNew,
      //     })
      //   } else {
      //     let a = this.listChange.filter(item=>{
      //       return  item.id==itemVal.id
      //     })
      //     if(a.length<=0){
      //       this.listChange.push({
      //         id: itemVal.id,
      //         paymentBase: itemVal.paymentBaseNew,
      //       })
      //     } else {
      //       this.listChange.forEach(item=>{
      //         if(item.id == a[0].id){
      //           item.paymentBase = itemVal.paymentBaseNew
      //         }
      //       })
      //     }
      //   }
      // }
    },
    deleteData(row, column, $index) {
      console.log(row, column, $index);
    },
    carOwnerView(item) {
      console.log(item)
    },
  }
}
</script>

<style scoped lang="less">
</style>
