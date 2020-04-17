<template>

  <div class="img-wrapper">
    <div class="img-item" v-for="(i,j) in base64ImgList" :key="j">
      <img :src="i" alt="">
      <span class="delete" @click="deleteImg(j)"></span>
    </div>
    <van-uploader :max-size="10485760" :after-read="afterRead" @oversize="oversize" v-if="base64ImgList.length < 3">
      <div class="add-img"></div>
    </van-uploader>
  </div>

</template>

<script>
import * as api from '@/api'
import {rotateImg} from '@/utils/compress-img.js'

export default {
  name: 'upload-img',
  props: ['imgList'],
  data () {
    return {
      base64ImgList: [],
      img_list: [],
      isLoading: false
    }
  },
  created () {
    if (this.imgList && this.imgList.length > 0) {
      this.base64ImgList.push(...this.imgList)
      this.img_list.push(...this.imgList)
    }
  },
  methods: {
    afterRead (file) {
      this.isLoading = true
      let _this = this
      if (this.img_list.length === 3) {
        return
      }
      rotateImg(file.file).then(result => {
        // api.upload(file.file.name, result.file).then(res => {
        //   if (res.code === 0) {
        //     _this.img_list.push(res.data.visit_url)
        //     _this.base64ImgList.push(result.content)
        //   } else {
        //     _this.$notify({
        //       className: 'errorNotify',
        //       message: '服务器错误。',
        //       background: '#FFF2F1',
        //       color: '#A8002D'
        //     })
        //   }
        //   _this.isLoading = false
        // })
        _this.base64ImgList.push(result.content)
        // _this.isLoading = false
        this.$emit('getImgList', this.img_list)
      })
    },
    deleteImg (index) {
      this.img_list.splice(index, 1)
      this.base64ImgList.splice(index, 1)
      // this.$emit('getImgList', this.img_list)
      setTimeout(()=> {
        this.$emit('getImgList', this.img_list)
      }, 1500);
    },
    oversize () {
      this.$notify({
        className: 'errorNotify',
        message: '图片大小超过10M~',
        background: '#FFF2F1',
        color: '#A8002D'
      })
    }
  }
}
</script>

<style scoped lang="less">
@width: 100px;
@height: 100px;

.img-wrapper {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: @width;
    height: @height;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .delete {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("../../assets/svg/icon_delet.svg") 0 0 no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
  .add-img {
    width: @width;
    height: @height;
    background: url("../../assets/svg/icon_add.svg");
    background-size: 100% 100%;
  }
}
</style>
