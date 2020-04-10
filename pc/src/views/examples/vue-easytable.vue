<template>
  <div class="vue-easytable">
    <div class="">
      <v-table ref="data_table" :is-loading="isLoding" @sort-change="sortChange" column-width-drag is-horizontal-resize style="width:100%" :columns="columns" :table-data="tableData" row-hover-color="#eee"
      row-click-color="#edf7ff" @on-custom-comp="customCompFunc" :select-all="selectALL" :select-change="selectChange" :select-group-change="selectGroupChange"></v-table>
    </div>
    <div class="">
      <v-pagination @page-change="pageChange" @page-size-change="pageSizeChange" :total="total" :page-index="parameter.pageIndex" :page-size="parameter.pageSize"
      :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
      </v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vue-easytable',
  data() {
    return {
      // 请求参数
      parameter: {
        pageIndex: 1,
        pageSize: 10,
      },
      isLoding: true,
      // 表格数据
      tableData: [],
      // 选择的记录
      selection: [],
      // 总数
      total: 0,
    }
  },
  computed: {
    columns() {
      let _self = this;
      let columns = [
        { width: 60, titleAlign: 'center', columnAlign: 'center', type: 'selection', isFrozen: true },
        {
          field: 'custome', title: '序号', width: 40, titleAlign: 'center', columnAlign: 'center',
          formatter: function (rowData, rowIndex, pagingIndex, field) {
            let index = (_self.parameter.pageIndex - 1) * _self.parameter.pageSize + rowIndex + 1;
            return index <= 3 ? '<span style="color:red;font-weight: bold;">' + index + '</span>' : index;
          }, isFrozen: true, isResize: true
        },
        { field: 'name', title: '姓名', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: 'age', title: '年龄', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true, orderBy: '' },
        { field: 'img', title: '头像', width: 100, titleAlign: 'center', columnAlign: 'center', isResize: true },
        { field: '', title: '操作', width: 300, titleAlign: 'center', columnAlign: 'center', componentName: 'tb-edit-detail-delete', isResize: true }
      ];
      for (let i = 0; i < columns.length; i++) {
        let item = columns[i];
        if (i < 2) {
          continue;
        }
        item.formatter = function (rowData, rowIndex, pagingIndex, field) {
          let value = rowData[field];
          if (value) {
            return value;
          } else {
            return '-';
          }
        };
        if (item.field === 'img') {
          let defaultImg = 'https://uploads.kangmei.com.cn/Files/20180627/fwkomaog.xzb.jpg';
          item.formatter = function (rowData, rowIndex, pagingIndex, field) {
            let value = rowData[field];
            if (value) {
              return `<a href="javascript:previewImg('${value}');"><img src="${value}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            } else {
              return `<a href="javascript:previewImg('${defaultImg}');"><img src="${defaultImg}" alt="" width="40px" height="40px" style="margin-top:5px;" /></a>`;
            }
          };
        }
      }
      return columns;
    },
  },
  // watch: {
  //   'sidebarStatus': function(value, oldValue) {
  //     this.$refs['data_table'].resize();
  //   }
  // },
  created () {
    this.getTableData(),
    // 查看大图
    window.previewImg = this.previewImg;
  },
  methods: {
    getTableData() {
      for(let i=0;i<10;i++){
        this.tableData.push({
          name: '赵伟',
          age: i+1,
          img: 'http://himg.bdimg.com/sys/portrait/item/8176e79a86e983bde4b88de58f8ae4bda031d5.jpg'
        })
      }
      this.total = 10
      this.isLoding = false;
    },
    // 首字母大写
    titleCase(str) {
      return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
    },
    // 排序
    sortChange(params) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let name = 'orderBy' + this.titleCase(key);
          this.$delete(this.parameter, name);
          let value = params[key];
          if (value) {
            this.$set(this.parameter, name, value);
          }
        }
      }
      console.log(this.parameter)
    },
    // 自定义组件操作
    customCompFunc(params) {
    //  console.log(params)
    },
    // 全选反选
    selectALL(selection) {
      this.selection = selection;
    },
    selectChange(selection, rowData) {
      this.selection = selection;
    },
    selectGroupChange(selection) {
      this.selection = selection;
    },
    // 分页
    pageChange(pageIndex) {
      this.parameter.pageIndex = pageIndex;
    },
    pageSizeChange(pageSize) {
      this.parameter.pageSize = pageSize;
    },
    // 查看大图
    previewImg(url) {
      this.$alert(`<img src="${url}" alt='' width="200px" height="200px"/>`, '', {
        dangerouslyUseHTMLString: true,
        customClass: 'reviewImg'
      });
    },
  }
}
</script>

<style scoped lang="less">
</style>
