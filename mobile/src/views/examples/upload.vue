<template>
  <div class="upload">
    <upload-image :imgUrl="imgUrl" :fileName="'image'" @uploadSuccess="addImgUrl" @removeImg="removeImgUrl"></upload-image>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data() {
    return {
      imgUrl: '',
    }
  },
  created () {
  },
  methods: {
    // 上传图片
    addImgUrl(data) {
      this.imgUrl = data;
    },
    // 删除图片
    removeImgUrl() {
      this.imgUrl = '';
    },
  }
}
</script>

<style scoped lang="less">
</style>
