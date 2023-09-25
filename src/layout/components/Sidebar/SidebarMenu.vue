<script setup>
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  import SidebarItem from './SidebarItem.vue'
  import { filterRouters, generateMenus } from '@/utils/routes.js'

  const router = useRouter()
  const routes = computed(() => {
    const filterRoutes = filterRouters(router.getRoutes())
    return generateMenus(filterRoutes)
  })

  const store = useStore()
  const cssVariable = computed(() => {
    return store.getters.cssVariable
  })

  const route = useRoute()
  const activeMenu = computed(() => {
    return route.path
  })
</script>

<template>
  <el-menu
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="cssVariable.menuBg"
    :text-color="cssVariable.menuText"
    :active-text-color="cssVariable.menuActiveText"
    router
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