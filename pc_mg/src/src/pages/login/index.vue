<template>
  <div class="login-wrap">
    <div class="login-block">
      <div class="banner">
        <img
          src="@/assets/image/banner.png"
          alt="背景图片"
        >
      </div>
      <div class="login-form">
        <div class="title">
          登录
        </div>
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="userForm.username"
              placeholder="请输入手机号/邮箱"
            >
              <svgicon
                slot="prefix"
                name="icon_ren"
                width="12.3"
                height="12.3"
                :original="true"
              />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="userForm.password"
              placeholder="请输入密码"
              type="password"
            >
              <svgicon
                slot="prefix"
                name="icon_passwd"
                width="12.3"
                height="12.3"
                :original="true"
              />
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-button">
          <el-button
            type="primary"
            :loading="loading"
            @click="submitLogin"
          >
            登录
          </el-button>
        </div>
        <div class="forget-passwd">
          <el-button
            type="text"
            @click="forgetPasswordDialogVisible = true"
          >
            忘记密码
          </el-button>
        </div>
      </div>
    </div>
    <BaseDialog
      class="forget-password-dialog"
      :visible="forgetPasswordDialogVisible"
      footer-center
      title="忘记密码"
      @close="closeForgetPasswordDialog"
    >
      <el-form
        ref="forgetPassswordFormRef"
        class="forget-password-form"
        label-width="60px"
        label-position="left"
        :model="forgetPasswordForm"
        :rules="forgetPasswordFormRules"
        :hide-required-asterisk="true"
      >
        <el-form-item
          label="联系方式"
          prop="mobile"
        >
          <el-input v-model="forgetPasswordForm.mobile" />
        </el-form-item>
        <el-form-item
          label="验证码"
          class="verifycode-item"
          prop="verifyCode"
        >
          <el-input v-model="forgetPasswordForm.verifyCode" />
          <el-button @click.prevent="removeDomain(domain)">
            获取验证擦
          </el-button>
        </el-form-item>
        <el-form-item
          label="设置密码"
          prop="password"
        >
          <el-input v-model="forgetPasswordForm.password" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="passwordAgain"
        >
          <el-input v-model="forgetPasswordForm.passwordAgain" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button
          type="primary"
          @click="submitResetPassword"
        >
          提交
        </el-button>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import '@/assets/svg-icon/icon_ren'
import '@/assets/svg-icon/icon_passwd'
import BaseDialog from '@/components/base-dialog'
import { mapActions } from 'vuex'
import { login, forgetPassword } from '@/api'

export default {
  components: {
    BaseDialog
  },
  data () {
    function validateUserName (_, value, callback) {
      const phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/ 
      const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!value) {
        callback('请输入手机号或邮箱')
      } else if (!phoneReg.test(value) && !emailReg.test(value)) {
        callback('帐号格式错误')
      } else {
        callback()
      }
    }
    return {
      forgetPasswordDialogVisible: false,
      userForm: {
        username: '',
        password: ''
      },
      userFormRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUserName }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ]
      },
      forgetPasswordForm: {
        mobile: '',
        verifyCode: '',
        password: '',
        passwordAgain: ''
      },
      forgetPasswordFormRules: {
        mobile: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapActions('user', ['fetchUserInfo']),
    closeForgetPasswordDialog() {
      this.forgetPasswordDialogVisible = false
      const initForgetPasswordForm = {
        mobile: '', 
        verifyCode: '',
        password: '',
        passwordAgain: ''
      }
      this.forgetPasswordForm = initForgetPasswordForm
    },
    async submitLogin() {
      const { userFormRef } = this.$refs
      if ((await this.validateForm(userFormRef))) {
        this.loading = true
        try {
          await login(this.userForm)
          this.fetchUserInfo()
        } finally {
          this.loading = false
        }
      }
    },
    async submitResetPassword() {
      const { forgetPassswordFormRef } = this.$refs
      if ((await this.validateForm(forgetPassswordFormRef))) {
        try {
          this.loading = true
          await forgetPassword()
          this.forgetPasswordDialogVisible = false
        } finally {
          this.loading = false
        }
      }
    },
    async validateForm(form) {
      return new Promise((resolve) => {
        form.validate((pass) => {
          resolve(pass)
        })
      })
    }
  }
}
</script>
<style lang="less">
@import url('~@/style/variables.less');

.login-wrap {
    display: flex;
    height: 100vh;
    width: 100vw;
    background: @PageBackgroundColor;;
    justify-content: center;
    align-items: center;
    font-size: 0;
    .login-block {
        display: flex;
        background: @HeaderBackgroundColor;
        .login-form {
            padding-top: 50px;
            width: 460px;
            text-align: center;
            .el-form-item {
                margin-bottom: 26px;
                .el-form-item__error {
                  left: 95px;
                }
            }
            .el-input {
                width: 270px;
                height: 40px;
            }
            // .el-input__inne {
            //     background: #FFFFFF;
            //     border: 1px solid #E4E9F6;
            //     border-radius: 2px;
            //     border-radius: 2px;
            // }
        }
        .login-form .title {
            margin-bottom: 26px;
            font-weight: 600;
            font-size: 18px;
            color: #3B4351;
            letter-spacing: 0;
        }
        .login-button {
            .el-button {
                width: 270px;
                height: 40px;
                background: #3085FF;
                border-radius: 2px;
                border-radius: 2px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                text-align: center;
            }
        }
        .forget-passwd {
            margin-top: 16px;
            .el-button--text {
                padding: 0;
            }
        }
    }
    .forget-password-dialog {
      .content {
         display: flex;
        justify-content: center;
      }
      .el-input {
        width: 240px;
      }
      .el-form-item {
        margin-bottom: 26px;
      }
      .el-form-item__content {
        margin-left: 80px !important;
      }
      .el-form-item__label {
        padding: 0;
        margin-right: 20px;
      }
      .verifycode-item {
        .el-input {
          width: 166px;
          margin-right: 10px;
        }
        .el-button {
          width: 94px;
          height: 34px;
          padding: 0;
        }
      }
      .footer {
        padding-top: 0;
      }
    }
}
</style>
