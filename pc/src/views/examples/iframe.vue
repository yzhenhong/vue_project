<template>
  <div class="">
    <div @click="openIframe">iframe</div>
    <el-dialog
      title="提示"
      :visible.sync="viewDialogVisible"
      :modal-append-to-body="false"
      width="70%"
      center
    >
      <iframe id="viewIframe" :src="iframeUrl" frameborder="0" style="width:100%;height:600px;background-color:#FFF;"></iframe>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      viewDialogVisible: false,
      iframeUrl: `${process.env.WEB_HOST}/examples/element-form`,
    }
  },
  methods: {
    openIframe () {
      // console.log('openIframe')
       let url = this.$router.resolve({
        path: '/examples/element-form',
      });
      this.iframeUrl = url.href;
      this.viewDialogVisible = true;
      let iframe = document.getElementById('viewIframe');
      if (iframe) {
        iframe.contentWindow.location.reload(true);
      }
    },
    closeDialog (data) {
      console.log(data)
      this.viewDialogVisible = false
    }
  },
  created () {
    window.closeDialog = this.closeDialog;
  }
}
</script>

<style lang="less" scoped>
</style>
