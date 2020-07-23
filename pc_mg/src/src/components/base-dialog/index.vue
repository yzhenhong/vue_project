<template>
  <el-dialog
    custom-class="base-dialog"
    :visible.sync="visible"
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    @close="handleClose"
  >
    <template v-slot:title>
      <div class="header">
        <svgicon
          class="close"
          name="close"
          width="16"
          height="16"
          :original="true"
          @click="handleClose"
        />
        <svgicon
          v-if="error"
          class="error"
          name="error"
          width="22"
          height="22"
          :original="true"
          @click="handleClose"
        />
        <svgicon
          v-if="success"
          class="success"
          name="success"
          width="22"
          height="22"
          :original="true"
          @click="handleClose"
        />
        <div class="title">
          {{ title }}
          <slot name="title" />
        </div>
      </div>
    </template>
    <div class="content">
      <slot />
    </div>
    <template v-slot:footer>
      <div
        class="footer"
        :class="{ 'footer-center': footerCenter }"
      >
        <slot name="footer" />
      </div>
    </template>
  </el-dialog>
</template>

<script>
import '@/assets/svg-icon/close'
import '@/assets/svg-icon/error'
import '@/assets/svg-icon/success'

export default {
  props: {
    beforeClose: {
      type: Function,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    footerCenter: {
      type: Boolean,
      default: false
    },
    contentCenter: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '540px'
    }
  },
  data () {
    return {}
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.base-dialog {
  background: #FFFFFF;
  border-radius: 2px 2px 0 2px 2px;
  border-radius: 2px 2px 0px 2px 2px;
  .header {
    padding-top: 22px;
    padding-bottom: 26px;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .error, .success {
      margin-right: 8px;
    }
    .svg-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .footer {
    padding-top: 26px;
    padding-bottom: 30px;
    // element-ui
  .el-button {
    &:first-child {
      margin-right: 0;
    }
    margin-right: 26px;
    width: 94px;
    height: 40px;
    border-radius: 2px;
    border-radius: 2px;
  }
  .el-button--primary {
    background: #3085FF;
  }
  .el-button--primary.is-plain {
    background: #E3EFFF;
    border: 1px solid #A3C9FF;
    border-radius: 2px;
    border-radius: 2px;
  }
  }
  .el-dialog__header, .el-dialog__body, .el-dialog__footer {
    padding: 0;
  }
  .content-center {
    text-align: center;
  }
  .footer-center {
    text-align: center;
  }
}
</style>
