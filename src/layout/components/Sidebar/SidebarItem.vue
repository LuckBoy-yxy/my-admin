<script setup>
  import { defineProps } from 'vue'
  import SidebarItem from './SidebarItem.vue'
  import MenuItem from './MenuItem.vue'

  const props = defineProps({
    route: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <el-submenu
    v-if="route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <MenuItem :icon="route.meta.icon" :title="route.meta.title" />
    </template>
    <SidebarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-submenu>

  <el-menu-item v-else :index="route.path">
    <MenuItem :icon="route.meta.icon" :title="route.meta.title" />
  </el-menu-item>
</template>
           
<style lang='scss' scoped>
 
</style>