<template>
  <el-menu
    :default-active="activeMenu"
    class="aside-menu"
    @open="handleOpen"
    @close="handleClose"
  >
    <div
      v-for="(item, index) in menus"
      :key="index"
    >
      <el-submenu
        v-if="item.submenu"
        :index="item.path || index+''"
      >
        <template slot="title">
          <img
            :src="item.icon"
            alt=""
            class="aside-menu-icon"
          >
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in item.submenu"
            :key="subIndex"
            :index="subItem.path || index+'-'+subIndex"
            @click="handleMenuChange(subItem)"
          >
            {{ subItem.name }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.path || index+''"
      >
        <img
          :src="item.icon"
          alt=""
          class="aside-menu-icon"
        >
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  props: {
    menus: {
      type: Array,
      required: true,
      default: () => {
        return [{ name: 'defalult', submenu: [{ name: 'defalult', path: '/' }] }]
      }
    }
  },
  computed: {
    activeMenu () {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleMenuChange (data) {
      if (data.path) {
        this.$router.push({ path: data.path })
      }
    }
  }
}

</script>

<style lang="less">
  @import '~@/style/variables';
  .aside-menu{
    width: 100%;
    .aside-menu-icon{
      height: 14px;
      vertical-align: middle;
      margin-right: 14px;
    }
    &.el-menu {
      border-right: none !important;
      color: @PageAsideMenutextColor;
      background: @PageAsideBackgroundColor !important;
    }
    .el-menu-item {
      user-select: none;
      color: @PageAsideMenutextColor;
      background: @PageAsideBackgroundColor;
      &:hover{
        background-color: @PageAsideHoverBackgroundColor !important;
      }
      &.is-active {
        position: relative;
        color: @PageAsideMenutextColor;
        background: @PageAsideActiveBackgroundColor !important;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 100%;
          background: @LinkTextColorActive;
        }
      }
      &-group__title{
        padding: 0;
      }
    }
    .el-submenu {
      user-select: none;
      &__title{
        color: @PageAsideMenutextColor;
        &:hover{
          background-color: @PageAsideHoverBackgroundColor;
        }
      }
      .el-menu-item {
        color: @PageAsideSubMenutextColor;
      }
    }
  }
</style>
