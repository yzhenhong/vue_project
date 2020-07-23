<template>
  <div class="page-header">
    <div class="page-header__front">
      <img
        v-if="!!logo"
        :src="logo"
        alt="logo"
      >
      <span>{{ title }}</span>
    </div>
    <div class="scale-seperator" />
    <div class="page-header__end">
      <router-link
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.link"
        class="link"
      >
        {{ menu.name }}
      </router-link>
    </div>
    <HeaderUserInfo />
  </div>
</template>

<script lang="javascript">
import HeaderUserInfo from "../header-user-info"

export default {
  name: 'PageHeader',
  components: {
    HeaderUserInfo
  },
  props: {
    logo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    menus: {
      type: Array,
      required: true,
      validator: (menus) => {
        let validated = true
        for (let i = 0; i < menus.length; i++) {
          validated = validated && !!menus[i].name && !!menus[i].link
        }
        return validated
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  @import "../../style/variables.less";

  .page-header {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: @HeaderHeight;
    background-color: transparent;
    line-height: @HeaderHeight;

    &__front {
      display: flex;
      align-items: center;

      img {
        width: @LogoWidth;
        height: @LogoHeight;
        margin-right: 12px;
      }
      span {
        font-size: @PageTitleSize;
        color: @PageTitleColor;
        letter-spacing: 0;
      }
    }

    .scale-seperator {
      flex-grow: 1;
    }

    &__end {
      .link {
        font-size: 14px;
        color: @LinkTextColor;
        letter-spacing: 0;
        text-align: right;
        padding: 0 15px;
        text-decoration: none;

        &:hover,
        &.router-link-active {
          color: @LinkTextColorActive;
        }
      }
    }
  }
</style>
