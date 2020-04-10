<template>
  <el-image
    :src="src"
    :style="{width:width,height:height}"
    @mousedown="onMouseDown(Array.from(arguments), src)"
    class="draggable-image"
    fit="cover"
  >
    <div class="image-slot" slot="error">
      <i class="el-icon-picture-outline"></i>
    </div>
  </el-image>
</template>

<script>
  import DragImageMixin from '@/global/mixins/drag-image'

  export default {
    name: 'DraggableImage',

    mixins: [DragImageMixin],

    props: {
      draggable: {
        type: Boolean,
        default: true
      },
      src: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '143px'
      },
      height: {
        type: String,
        default: '143px'
      }
    },

    methods: {
      onMouseDown([event], src) {
        // event.button: 0->左键, 1->滚轮, 2->右键
        if (this.draggable && event.button === 0) {
          // 左键点击才触发拖拽
          this.onDragging(src)
        }
      }
    }
  }
</script>

<style scoped>
  .draggable-image {
    vertical-align: top;
  }
</style>
