export default {
  data: () => ({
    isDrag: false
  }),
  methods: {
    onDragging (picture) {
      this.isDrag = true
      const event = window.event
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }

      setTimeout(() => {
        // 处理拖拽事件
        if (this.isDrag) {
          if (picture) {
            // 拖拽中
            this.$store.commit('search/UPDATE_DRAGGING', {
              picture,
              event
            })
          }
          this.isDrag = false
        }
      }, 200) // 修复-点击时触发拖拽导致点击事件不生效

      document.onmouseup = () => {
        document.onmouseup = null
        this.isDrag = false
      }
    }
  }
}
