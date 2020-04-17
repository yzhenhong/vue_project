<template>
  <div class="upload">
    <upload-image :imgList='imgList'></upload-image>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data() {
    return {
      imgList: [],
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
