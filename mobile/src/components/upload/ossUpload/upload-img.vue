<template>
  <div class="upload-wrapper">
    <div class="uploadImg" @click="openLocals">
    </div>
    <form :id="fileName+'Form'" enctype="multipart/form-data" style="display:none;">
      <input type="file"  accept="image/*" :name="fileName" @change="fileChanged"/>
    </form>
  </div>
</template>
<script>
import $ from 'jquery';
import { webPostObject } from './index.js';
export default {
  name: 'upload-img',
  data() {
    return {
      uploadLoading: false,
    };
  },
  props: {
    // file控件名称
    fileName: {
      type: String,
      default: 'image',
      required: true
    },
    // 图片地址
    imgUrl: {
      type: String,
      default: '',
      required: true
    },
  },
  methods: {
    // 删除图片
    removePackage() {
      this.$emit('removeImg');
    },
    // 上传图片
    openLocals() {
      $(`input[type='file'][name='${this.fileName}']`).click();
    },
    fileChanged() {
      this.uploadImg();
    },
    uploadImg() {
      let fileElement = $(`input[type='file'][name='${this.fileName}']`);
      let filename = fileElement.val();
      let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
        console.log('仅支持.jpg、.png、.gif、.jpeg、.bmp的图片格式')
        return false;
      }
      this.uploadLoading = true;
      let file = fileElement[0].files[0];
      // 服务器上传
      // let formdata1 = new FormData();
      // formdata1.append('file', file, file.name);
      // let config = {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // };
      // axios.post(`${process.env.UPLOAD_HOST}`, formdata1, config).then((res) => {
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
      // oss web直传
      webPostObject(file, file.name).then(res => {
        console.log(res);
        this.uploadLoading = false;
        this.$emit('uploadSuccess', res.url);
      }).catch((err) => {
        console.log(err);
        this.uploadLoading = false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.upload-wrapper{
  position: relative;
  width: 102px;
  height: 102px;
  .uploadImg{
    width: 100%;
    height: 100%;
    background: url("../../assets/svg/icon_add.svg") 0 0 no-repeat;
    background-size: 100% 100%;
  }
}
</style>
