<script setup>
  import SideBar from './components/Sidebar/index.vue'
  import NavBar from './components/Navbar.vue'
  import AppMain from './components/AppMain.vue'
  import TagsView from '@/components/TagsView'

  // import variable from '@/styles/variable.modules.scss'
</script>

<template>
  <div
    class="app-wrapper"
    :class="{'hideSidebar': $store.getters.sidebarOpened === false}"
  >
    <SideBar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVariable.menuBg }"
    />
    <div class="main-container">

      <div class="fixed-header">
        <NavBar />

        <TagsView id="guide-tags" />
      </div>

      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/styles/variable.modules.scss';
@import '~@/styles/mixins.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>