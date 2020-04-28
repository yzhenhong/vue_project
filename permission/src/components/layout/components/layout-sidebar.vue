<template>
  <div class="layout-sidebar">
    layout-sidebar
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'layoutHeader',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'navs',
      'permissions',
      'menuList',
      'activeNavName',
    ]),
  },
  mounted () {},
  created () {
    // console.log('navs:',this.navs)
    // console.log('permissions:',this.permissions)
    // console.log('menuList:',this.menuList)
    // console.log('activeNavName:',this.activeNavName)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
.layout-sidebar{
  position: fixed;
  top: 80px;
  bottom: 0px;
  width: 200px;
  background: #ffffff;
  z-index: 1000;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
}
</style>

