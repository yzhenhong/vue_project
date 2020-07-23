<template>
  <el-dropdown
    trigger="click"
    placement="top-start"
    @command="handleCommand"
  >
    <span class="el-dropdown-link">
      {{ userInfo.mobile }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">
        退出登录
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState } from "vuex";
import { logout } from "@/api";

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    handleCommand(command) {
      switch (command) {
      case 'logout':
        logout()
        break;
      default:
        break;
      }   
    }
  }
}
</script>