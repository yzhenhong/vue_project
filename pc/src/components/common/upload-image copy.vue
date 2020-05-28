<template>
  <div class="upload-wrapper">
    <div v-if="!disabled">
      <div v-if="!imgUrl" class="noneData">
        <div class="uploadImg" @click="openLocals">
          <i class="el-icon-plus"></i>
        </div>
        <form :id="fileName+'Form'" enctype="multipart/form-data" style="display:none;">
          <input type="file"  accept="image/*" :name="fileName" @change="fileChanged"/>
        </form>
      </div>
      <div v-else class="havaData">
        <el-image
          @click="previewImg"
          class="uploadimg-image"
          :src="imgUrl"
          fit="cover">
        </el-image>
        <img @click.stop="removeImg" src="@/assets/svg/uploadimg_removeImg.svg" alt="" class="uploadimg-removeImg">
      </div>
    </div>
    <div v-else>
      <el-image
        @click="previewImg"
        class="uploadimg-image"
        :src="imgUrl"
        fit="cover">
      </el-image>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios'
import * as api from '@/api'
import {rotateImg} from '@/utils/compress-img.js'
export default {
  name: 'UploadImage',

  inheritAttrs: false,

  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // file控件名称
    fileName: {
      type: String,
      default: '',
    },
    // 图片地址
    imgUrl: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      base64ImgList: [],
      img_list: [],
    };
  },


  methods: {
    previewImg () {
      console.log('previewImg')
    },
    removeImg () {
      console.log('removeImg')
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
      let _self = this;
      let fileElement = $(`input[type='file'][name='${_self.fileName}']`);
      let filename = fileElement.val();
      let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
        this.$message({
          showClose: true,
          message: '仅支持.jpg、.png、.gif、.jpeg、.bmp的图片格式',
          type: 'warning'
        });
        return false;
      }
      let file = fileElement[0].files[0];
      // console.log(file)

      rotateImg(file).then(result => {
        // console.log(result)
        api.upload(result.file).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.base64ImgList.push(result.content)
            this.img_list.push(res.data.visitUrl)
            this.$emit('uploadSuccess', res.data.visitUrl);
          } else {
            this.$message({
              showClose: true,
              message: '仅支持.jpg、.png、.gif、.jpeg、.bmp的图片格式',
              type: 'error'
            });
          }
        })
      })
    },
  }
}
</script>

<style scoped lang="less">
.upload-wrapper{
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0px;
  background-color: transparent;
  >div{
    width: 100%;
    height: 100%;
  }
  .noneData,.havaData{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .uploadImg,.uploadimg-image{
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .uploadimg-removeImg{
    position: absolute;
    cursor: pointer;
    top: -15px;
    right: -15px;
    width: 30px;
    height: 30px;
    z-index: 100;
  }
}
</style>


