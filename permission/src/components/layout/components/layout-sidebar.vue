<template>
  <div class="layout-sidebar">
    <transition name="el-fade-in">
      <el-menu
        background-color="#2D3441"
        text-color="#9EA2A9"
        active-text-color="#F2F7FE"
      >
        <template v-for="(item1, index1) in permissions">
          <!--首页 不需要子菜单 单独展示-->
          <template v-if="item1[0].children&&item1[0].children.length>0&&item1[0].meta&&item1[0].meta.show!==false&&item1[0].meta.title=='首页'">
            <el-menu-item
              :key="index1"
              v-if="item1[0].children[0].meta&&item1[0].children[0].meta.show!==false"
              :index="index1.toString()"
              @click="menuClick(item1[0].children[0])"
            >
              <i class="iconfont" :class="item1[0].icon?item1[0].icon:''"></i>
              <span slot="title">{{item1[0].children[0].meta.title}}</span>
            </el-menu-item>
          </template>
          <!--一级菜单 有子菜单-->
          <template v-else-if="item1[0].children&&item1[0].children.length>0&&item1[0].meta&&item1[0].meta.show!==false&&item1[0].meta.title!='首页'">
            <el-submenu
              :key="index1"
              :index="index1.toString()"
            >
              <template slot="title">
                <i class="iconfont" :class="item1[0].icon?item1[0].icon:''"></i>
                <span slot="title">{{item1[0].meta.title}}</span>
              </template>
              <template v-for="(item2,index2) in item1[0].children">
                <el-menu-item
                  :key="index2"
                  :index="index1.toString()+'-'+index2.toString()"
                  @click="menuClick(item2)"
                  v-if="item2.meta.show!==false"
                >
                  {{item2.meta.title}}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!--一级菜单 无子菜单-->
          <template v-else-if="item1[0]&&item1[0].meta&&item1[0].meta.show!==false&&item1[0].meta.title!='home'">
            <el-menu-item
              :key="index1"
              v-if="item1[0].meta&&item1[0].meta.show!==false"
              :index="index1.toString()"
            >
              <i class="iconfont" :class="item1[0].icon?item1[0].icon:''"></i>
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
    menuClick(res){
      // console.log(this.$route.path,res.path)
      if(this.$route.path != res.path)(
        this.$router.push(res.path)
      )
    },
  }
}
</script>

<style scoped lang="less">
.layout-sidebar{
  position: fixed;
  top: 70px;
  bottom: 0px;
  width: 199px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #2D3441;
  z-index: 1000;
  /deep/.el-menu,/deep/.menuitem{
    width: 200px;
    overflow-x: hidden;
  }
  /deep/.el-menu-item.is-active{
    background: #20262F!important;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #9EA2A9;
  }
}
.layout-sidebar::-webkit-scrollbar {
    display: none;
}
</style>

