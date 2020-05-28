<template>
  <div class="audit-info">
    <el-row>
      <el-col :span="8">
        <span class="tips">审核时间</span>
        <span class="txt">{{checkDataOptions.time}}</span>
      </el-col>
      <el-col :span="8">
        <span class="tips">审核人</span>
        <span class="txt">{{checkDataOptions.name}}</span>
      </el-col>
      <el-col :span="8">
        <span class="tips">审核结果</span>
        <span class="txt" v-if="checkDataOptions.status == 1">待审核</span>
        <span class="txt" v-if="checkDataOptions.status == 2">审核通过</span>
        <span class="txt" v-if="checkDataOptions.status == 3">审核不通过</span>
        <span class="txt" v-if="checkDataOptions.status == 4">已回退</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <span class="tips">审核意见</span>
        <span class="txt">{{checkDataOptions.desc}}</span>
      </el-col>
    </el-row>    
  </div>
</template>

<script>
export default {
  name: 'auditInfo',
  inheritAttrs: false,
  props: {
    checkData: {
      type: Object,
      default: _ => ({}),
      required: false
    }
  },
  data() {
    return {
      innerCheckData: null,
      checkDataDefaults: {
        time: '-',
        name: '-',
        status: '-',
        desc: '-',
      },
    };
  },
  computed: {
    checkDataOptions: {
      get() {
        this.innerCheckData = {
          ...this.checkDataDefaults,
          ...(this.checkData || {})
        }
        for(let key  in this.innerCheckData){
          if(!this.innerCheckData[key]){
            this.innerCheckData[key] = '-'
          }
        }
        return this.innerCheckData
      },
      set(val) {
        this.innerCheckData = val
      }
    },
  }
}
</script>

<style scoped lang="less">
.audit-info{
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
  padding-top: 50px;
  background: #FFFFFF;
  box-shadow: 0 4px 18px 0 rgba(0,0,0,0.06);
  margin-bottom: 40px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  .el-row{
    margin-bottom: 30px;
  }
  .el-row:last-child{
    margin-bottom: 0px;
  }
  .el-col{
    display: flex;
    height: 40px;
  }
  .tips{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 105px;
    height: 100%;
    color: #999999;
  }
  .txt{
    flex: 1;
    padding-left: 25px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #333333;
  }
}
</style>


