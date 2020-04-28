<template>
  <div>
    <div class="loginBox">
      <h2 class="title">医保公共服务管理平台</h2>
      <el-form 
        :model="user"
        ref="formData"
        :rules="rules"
        label-position="left"
        class="login-container"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="user.username" placeholder="账号" class="inputPassword"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="user.password" placeholder="密码" class="inputPassword"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="success" class="login" style="width:100%;" @click="handleSubmit">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { setToken } from '@/utils/auth';
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
    };
  },
  methods: {
    handleSubmit () {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.$store.dispatch('login',this.user).then(res=>{
            console.log(res)
            this.$router.push('/home/index')
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    }
  },
};

</script>
<style lang="less" scoped>
.loginBox {
  width:440px;
  height: 300px;
  background-color: #fff;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;;
  margin-top: -150px;
  margin-left: -220px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.title {
  text-align: center;
  color: #505458;
  margin: 0 10px 20px 10px;
}
.login-container {
  margin: auto;
  width: 380px;
  .inputPassword {
    /deep/ .el-input__inner {
      height: 46px;
      border-color: #e7ecee;
    }
  }
}
</style>
