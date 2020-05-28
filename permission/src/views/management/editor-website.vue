<template>
  <div class="editor-website">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="145px"  label-position="left" class="form-wrap">
      <el-form-item label="站点名称" prop="name">
        <el-input class="max-input" v-model="ruleForm.name" placeholder="256以内的中文、大小写字母、数字、_、-、（）组成，且平台唯一"></el-input>
      </el-form-item>
      <el-form-item label="站点ID" prop="id">
        <el-input class="max-input" v-model="ruleForm.id" placeholder="256以内的小写字母、数字、_、-组成，平台唯一"></el-input>
      </el-form-item>
      <el-form-item label="根路径" prop="rootPath">
        <el-input class="max-input" v-model="ruleForm.rootPath" placeholder="/支持256以内的非特殊字符"></el-input>
      </el-form-item>
      <el-form-item label="负载方式" prop="load">
        <el-radio-group v-model="ruleForm.load">
          <el-radio label="随机负载"></el-radio>
          <el-radio label="会话保持"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="协议支持" prop="agreement">
        <el-radio-group v-model="ruleForm.agreement">
          <el-radio label="http"></el-radio>
          <el-radio label="https"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否需要登录" prop="login">
        <el-radio-group v-model="ruleForm.login">
          <el-radio label="全部不需要要"></el-radio>
          <el-radio label="全部需要"></el-radio>
          <el-radio label="部分需要"></el-radio>
          <el-radio label="部分不需要"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="访问范围" prop="range">
        <el-select v-model="ruleForm.range" placeholder="请选择">
          <el-option label="访问范围一" value="shanghai"></el-option>
          <el-option label="访问范围二" value="beijing"></el-option>
        </el-select>
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
      <el-form-item label="登录方式" prop="loginType">
        <el-select v-model="ruleForm.loginType" placeholder="请选择">
          <el-option label="登录方式一" value="shanghai"></el-option>
          <el-option label="登录方式二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div class="flex information">
        <el-form-item label="访问信息" prop="information">
          <el-select v-model="ruleForm.information" placeholder="请选择">
            <el-option label="访问信息一" value="shanghai"></el-option>
            <el-option label="访问信息二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="url" label-width="0px">
          <el-input placeholder="请输入内容" v-model="ruleForm.url" class="max-input">
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="访问信息">
        echartsjs.com/examples/zh/ediit
        <span class="conflict">查看冲突</span>
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
  name: 'editorWebsite',
  data() {
    return {
      ruleForm: {
        name: '',
        id: '',
        rootPath: '',
        load: '随机负载',
        agreement: 'http',
        login: '全部不需要要',
        range: '',
        frequency: '1800',
        time: '60',
        networkArea: '无需部署',
        domain: '119.29.0.69:9098',
        loginType: '',
        information: '',
        url: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
        ],
        id: [
          { required: true, message: '请输入站点ID', trigger: 'blur' },
        ],
        rootPath: [
          { required: true, message: '请输入根路径', trigger: 'blur' },
        ],
        load: [
          { required: true, message: '请选择负载方式', trigger: 'change' }
        ],
        agreement: [
          { required: true, message: '请选择协议支持', trigger: 'change' }
        ],
        login: [
          { required: true, message: '请选择是否需要登录', trigger: 'change' }
        ],
        range: [
          { required: true, message: '请选择访问范围', trigger: 'change' }
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
        loginType: [
          { required: true, message: '请选择登录方式', trigger: 'change' }
        ],
        information: [
          { required: true, message: '请选择访问信息', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入访问信息', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
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
    },
  }
}
</script>
<style lang="less" scooe>
.editor-website {
  .explain{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .information{
    display: flex;
    align-items: center;
  }
  .conflict{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #3085FF;
    margin-left: 30px;
  }
}
</style>