<script setup>
  import { useStore } from 'vuex'

  import Hamburger from '@/components/Hamburger/index.vue'
  import Breadcrumb from '@/components/Breadcrumb/index.vue'
  import LangSelect from '@/components/LangSelect/index.vue'
  import ThemePicker from '@/components/ThemeSelect/index'
  import Screenfull from '@/components/Screenfull'
  import HeaderSearch from '@/components/HeaderSearch'
  import Guide from '@/components/Guide'

  const store = useStore()
  const logout = () => {
    store.dispatch('user/logout')
  }
</script>

<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" />

    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />

    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />

      <HeaderSearch class="right-menu-item hover-effect"></HeaderSearch>

      <Screenfull class="right-menu-item hover-effect" />

      <ThemePicker class="right-menu-item hover-effect" />

      <LangSelect class="right-menu-item hover-effect" />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.4s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
        i {
          position: relative;
          top: -5px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>