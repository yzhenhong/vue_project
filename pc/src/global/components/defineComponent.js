import Vue from 'vue';
// 自定义列组件
// 修改、查看、删除
Vue.component('tb-edit-detail-delete', {
  template: `<span class="table-operation-btns">
        <el-button type="primary" size="mini" plain icon="el-icon-edit" @click.stop.prevent="edit(rowData,index)">修改</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-search" @click.stop.prevent="detail(rowData,index)">查看</el-button>
        <el-button type="primary" size="mini" plain icon="el-icon-delete" @click.stop.prevent="remove(rowData,index)">删除</el-button>
        </span>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    edit() {
      let params = {
        type: 'edit',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    detail() {
      let params = {
        type: 'detail',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
    remove() {
      let params = {
        type: 'remove',
        index: this.index,
        rowData: this.rowData
      };
      this.$emit('on-custom-comp', params);
    },
  }
});