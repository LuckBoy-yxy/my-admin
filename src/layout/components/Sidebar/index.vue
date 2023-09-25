<script setup>
  import SidebarMenu from './SidebarMenu.vue'
</script>

<template>
  <div class="">
    <div class="logo-contaioner">
      <el-avatar 
        shape="square" 
        :size="44"
        :src="$store.getters.userInfo?.avatar" 
      />
      <h1
        v-if="$store.getters.sidebarOpened"
        class="logo-text"
      >my-admin</h1>
    </div>
    
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.logo-contaioner {
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  padding: 10px 0 15px 0;

  .logo-text {
    font-size: 16px;
    font-weight: 600;
    margin-left: 10px;
    color: #fff;
    white-space: nowrap;
  }
}
</style>