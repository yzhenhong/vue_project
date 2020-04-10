<template>
  <div class="inner-table">
    <el-table ref="multipleTable" border  :data="tableData" :header-cell-style="{background: '#F8F8F8', color: '#333333'}"
      style="min-width: 1064px" >
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="project" label="申请项目" align="center" min-width="18%">
        <template slot-scope="scope" v-if="!isDetail">
          <el-select v-model="scope.row.project" clearable placeholder="请选择" class="inner-ipt">
            <el-option
              v-for="item in useOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="胎儿数" align="center" min-width="16%">
        <template slot-scope="scope" v-if="!isDetail">
          <el-input class="inner-ipt" v-model="scope.row.num"  placeholder="请填写"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="days" label="计发天数" align="center" min-width="16%">
        <template slot-scope="scope" v-if="!isDetail">
          <el-input class="inner-ipt" v-model="scope.row.days"  placeholder="请填写"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="津贴金额" align="center" min-width="16%">
        <template slot-scope="scope" v-if="!isDetail">
          <el-input class="inner-ipt" v-model="scope.row.money"  placeholder="请填写"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="10%" v-if="!isDetail">
        <template slot-scope="scope">
          <el-button type="text" @click="onDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-module" v-if="!isDetail">
      <el-button type="text" class="add-btn" @click="onAddClick()">
        <div class="add-inner">
          <img class="add-icon" src="../../assets/svg/add_btn.svg">
          <span>新增生育津贴申请信息</span>
        </div>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'innerTable',
  props: ['tableData', 'isDetail'],
  data() {
    return {
      useOption: [
          {value: 1, label: '多胞胎顺产'},
          {value: 2, label: '单胎顺产'},
      ],
    }
  },
  methods: {
    onAddClick() {
      this.$emit('addClick')
    },
    onDeleteClick(row) {
      this.$emit('deleteClick', row)
    },
  }
}
</script>
<style lang="less" scope>
  .inner-table {
    /deep/.el-input__inner {
      border: none;
      width: 218px !important;
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
  }
</style>