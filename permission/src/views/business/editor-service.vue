<template>
  <div class="editor-service">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="145px"  label-position="left" class="form-wrap">
      <el-form-item label="站点名称" prop="name">
        <el-input class="max-input" v-model="ruleForm.name" placeholder="256以内的中文、大小写字母、数字、_、-、（）组成，且平台唯一"></el-input>
      </el-form-item>
      <el-form-item label="站点ID" prop="id">
        <el-input class="max-input" v-model="ruleForm.id" placeholder="256以内的小写字母、数字、_、-组成，平台唯一"></el-input>
      </el-form-item>
      <el-form-item label="服务描述" prop="describe">
        <el-input class="max-input" v-model="ruleForm.describe" placeholder="/支持256以内的非特殊字符"></el-input>
      </el-form-item>
      <el-form-item label="服务所属目录" prop="catalogue">
        <el-select v-model="ruleForm.catalogue" placeholder="请选择">
          <el-option label="目录一" value="shanghai"></el-option>
          <el-option label="目录二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务标签" prop="tag">
        <el-select v-model="ruleForm.tag" placeholder="请选择">
          <el-option label="标签一" value="shanghai"></el-option>
          <el-option label="标签二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公开路径" prop="path">
        <el-input v-model="ruleForm.path" placeholder="passid+"></el-input>
      </el-form-item>
      <el-form-item label="可见性" prop="visibility">
        <el-radio-group v-model="ruleForm.visibility">
          <el-radio label="公开服务"></el-radio>
          <el-radio label="内部服务"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="负载方式" prop="load">
        <el-radio-group v-model="ruleForm.load">
          <el-radio label="随机负载"></el-radio>
          <el-radio label="会话保持"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="接口说明地址" prop="connector">
        <el-input v-model="ruleForm.connector" placeholder="输入地址"></el-input>
        <div class="uploading" @click="uploading">上传接口文档</div>
      </el-form-item>
      <el-form-item label="原始地址" prop="address">
        <el-input v-model="ruleForm.address" placeholder="/"></el-input>
      </el-form-item>
      <div class="flex version">
        <p>version</p>
        <el-form-item label="值" prop="version"  label-width="45px">
          <el-input v-model="ruleForm.version" placeholder="128以内的非特殊字符"></el-input>
        </el-form-item>
        <el-form-item label="转发路径" prop="forward" label-width="80px" class="forward">
          <el-input v-model="ruleForm.forward" placeholder="支持256以内的非特殊字符"></el-input>
        </el-form-item>
        <div class="add-btn">+</div>
      </div>
      <el-form-item label="协议支持" prop="agreement">
        <el-radio-group v-model="ruleForm.agreement">
          <el-radio label="http"></el-radio>
          <el-radio label="https"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户访问" prop="visitToUser">
        <el-radio-group v-model="ruleForm.visitToUser">
          <el-radio label="不予许用户访问"></el-radio>
          <el-radio label="允许用户访问"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="使用频率" prop="frequency">
        <el-input-number v-model="ruleForm.frequency" controls-position="right" @change="handleChange" :min="1" label="描述文字"></el-input-number>
        次/秒
        <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
          <img class="explain" src="@/assets/svg/explain.svg" alt="">
        </el-tooltip>
      </el-form-item>
      <el-form-item label="超时时间" prop="time">
        <el-input-number v-model="ruleForm.time" controls-position="right" @change="handleChange" :min="1" label="描述文字"></el-input-number>
        秒
        <el-tooltip class="item" effect="dark" content="提示文字" placement="top-start">
          <img class="explain" src="@/assets/svg/explain.svg" alt="">
        </el-tooltip>
      </el-form-item>
      <el-form-item label="网络区域" prop="networkArea">
        <el-radio-group v-model="ruleForm.networkArea">
          <el-radio label="无需部署"></el-radio>
          <el-radio label="默认网络区域"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="原始域名" prop="domain">
        <el-input v-model="ruleForm.domain" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="preserve">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'editorService',
  data() {
    return {
      ruleForm: {
        name: '',
        id: '',
        describe: '',
        catalogue: '',
        tag: '',
        path: '',
        visibility: '公开服务',
        load: '随机负载',
        connector: '',
        address: '',
        version: '',
        forward: '',
        agreement: 'http',
        visitToUser: '不予许用户访问',
        frequency: '1800',
        time: '60',
        networkArea: '无需部署',
        domain: '119.29.0.69:9098',
      },
      rules: {
        name: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
        ],
        id: [
          { required: true, message: '请输入站点ID', trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '请输入服务描述', trigger: 'blur' },
        ],
        catalogue: [
          { required: true, message: '请选择服务所属目录', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请选择服务标签', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请输入公开路径', trigger: 'blur' },
        ],
        visibility: [
          { required: true, message: '请选择可见性', trigger: 'change' }
        ],
        load: [
          { required: true, message: '请选择负载方式', trigger: 'change' }
        ],
        connector: [
          { required: true, message: '请输入接口说明地址', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入原始地址', trigger: 'blur' },
        ],
        version: [
          { required: true, message: '请输入值', trigger: 'blur' },
        ],
        forward: [
          { required: true, message: '请输入转发路径', trigger: 'blur' },
        ],
        agreement: [
          { required: true, message: '请选择协议支持', trigger: 'change' }
        ],
        visitToUser: [
          { required: true, message: '请选择用户访问', trigger: 'change' }
        ],
        frequency: [
          { required: true, message: '请输入使用频率', trigger: 'blur' },
        ],
        time: [
          { required: true, message: '请输入超时时间', trigger: 'blur' },
        ],
        networkArea: [
          { required: true, message: '请选择网络区域', trigger: 'change' }
        ],
        domain: [
          { required: true, message: '请输入原始域名', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    uploading () {},
    handleChange(value) {
      console.log(value);
    },
    preserve() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="less" scoped>
.explain{
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-left: 10px;
}
.version{
  display: flex;
  align-items: center;
  margin: 10px 0px;
  p{
    width: 145px;
  }
  /deep/.el-form-item{
    margin-bottom: 0px;
  }
  .forward{
    margin-left: 30px;
    margin-right: 20px;
  }
}
.uploading{
  display: inline-block;
  width: 124px;
  height: 40px;
  border: 1px solid #A3C9FF;
  border-radius: 2px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #3085FF;
  text-align: center;
}
.el-input-number{
  margin-right: 15px;
}
.add-btn{
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px dashed #9EA2A9;
  font-size: 14px;
  color: #9EA2A9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
