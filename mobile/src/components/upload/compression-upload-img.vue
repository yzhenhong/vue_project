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
import { webPostObject } from './ossUpload/index.js';
export default {
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
    },
  },
  methods: {
    // 删除
    removePackage() {
      this.$emit('removeImg');
    },
    openLocals() {
      $(`input[type='file'][name='${this.fileName}']`).click();
    },
    fileChanged() {
      this.uploadImg();
    },
    uploadImg() {
      let fileElement = $(`input[type='file'][name='${this.fileName}']`);
      let fileLength = fileElement[0].files.length;
      if (fileLength > 1) {
        console.log('一次只能选择一张图片')
        return false;
      }
      let filename = fileElement.val();
      let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
        console.log('仅支持.jpg、.png、.gif、.jpeg、.bmp的图片格式')
        return false;
      }
      let file = fileElement[0].files[0];
      let imgSize = Math.ceil(file.size / 1024 / 1024);
      console.log(imgSize);
      if (imgSize > 20) {
        console.log('文件不能大于20MB,重新选择文件')
        return false;
      }
      this.uploadLoading = true;
      if (imgSize > 2) {
        // 使用canvas将file转为base64达到压缩效果
        let img = new Image();
        let reader = new FileReader();
        reader.onload = function(e) {
          img.src = e.target.result;
          img.onload = () => {
            let w = img.width;
            let h = img.height;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            // 设置 canvas 的宽度和高度
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            let base64 = null;
            // 将图片压缩在2MB之内
            if (imgSize > 2 && imgSize <= 3) {
              base64 = canvas.toDataURL('image/jpeg', 0.66);
            } else if (imgSize > 3 && imgSize <= 5) {
              base64 = canvas.toDataURL('image/jpeg', 0.4);
            } else if (imgSize > 5 && imgSize <= 6) {
              base64 = canvas.toDataURL('image/jpeg', 0.33);
            } else if (imgSize > 6 && imgSize <= 8) {
              base64 = canvas.toDataURL('image/jpeg', 0.25);
            } else if (imgSize > 8 && imgSize <= 10) {
              base64 = canvas.toDataURL('image/jpeg', 0.2);
            } else if (imgSize > 10 && imgSize <= 15) {
              base64 = canvas.toDataURL('image/jpeg', 0.13);
            } else if (imgSize > 15) {
              base64 = canvas.toDataURL('image/jpeg', 0.1);
            }
            // 将base64转为file
            let minFile = this.base64toFile(base64, file.name);
            console.log(minFile.size / 1024 / 1024);
            _self.uploadFile(minFile, minFile.name);
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.uploadFile(file, file.name);
      }
      // oss web直传
      console.log(file);
    },
    // 将base64转为file
    base64toFile(base64, filename) {
      let arr = base64.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bytes = window.atob(arr[1]); // 去掉url的头，并转换为byte
      let n = bytes.length;
      let u8arr = new Uint8Array(n);
      for (let i = 0; i < bytes.length; i++) {
        u8arr[i] = bytes.charCodeAt(i);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // file上传服务器
    uploadFile(file, filename) {
      // oss web直传
      webPostObject(file, file.name).then(res => {
        console.log(res);
        this.uploadLoading = false;
        this.$emit('uploadSuccess', res.url);
        $(`input[type='file'][name='${this.fileName}']`).val(''); // 清空上传控件内容
      }).catch((err) => {
        console.log(err);
        this.uploadLoading = false;
         $(`input[type='file'][name='${this.fileName}']`).val(''); // 清空上传控件内容
      });
    }
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
