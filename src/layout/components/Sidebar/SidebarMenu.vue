<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  import SidebarItem from './SidebarItem.vue'
  import { filterRouters, generateMenus } from '@/utils/routes.js'

  const router = useRouter()
  const routes = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateMenus(filterRoutes)
  })
</script>

<template>
  <el-menu
    :uniqueOpened="true"
    default-active="/profile"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    />
  </el-menu>
</template>

<style scoped>

</style>