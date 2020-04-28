<template>
  <div class="layout-sidebar">
    <transition name="el-fade-in">
      <el-menu
        :default-openeds="menu_default_opens"
        background-color="#3a3f51"
        text-color="#b4b6bd"
        active-text-color="#fff"
      >
        <template v-for="(item1, index1) in permissions">
          <template v-if="item1[0].children&&item1[0].children.length>0&&item1[0].meta&&item1[0].meta.show!==false">
            <!--一级菜单 有子菜单-->
            <el-submenu
              :key="index1"
              :index="index1.toString()"
            >
              <template slot="title">
                <i></i>
                <span slot="title">{{item1[0].meta.title}}</span>
              </template>
              <el-menu-item
                v-for="(item2,index2) in item1[0].children"
                :key="index2"
                :index="index1.toString()+'-'+index2.toString()"
                @click="menuClick(item2)"
              >
                {{item2.meta.title}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <!--一级菜单 无子菜单-->
            <el-menu-item
              :key="index1"
              v-if="item1[0].meta&&item1[0].meta.show!==false"
              :index="index1.toString()"
              @click="menuClick(item1)"
            >
              <span slot="title">{{item1[0].meta.title}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </transition>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'layoutSidebar',
  data () {
    return {
      menu_default_opens: ['0'],
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
    console.log('permissions:',this.permissions[2])
    // console.log('menuList:',this.menuList)
    // console.log('activeNavName:',this.activeNavName)
  },
  methods: {
    menuClick(res){
      console.log(res);
      this.$router.push(res.path)
    },
  }
}
</script>

<style scoped lang="less">
.layout-sidebar{
  position: fixed;
  top: 80px;
  bottom: 0px;
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #ffffff;
  z-index: 1000;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
  /deep/.el-menu,/deep/.menuitem{
    width: 200px;
    overflow-x: hidden;
  }
}
.layout-sidebar::-webkit-scrollbar {
    display: none;
}
</style>

