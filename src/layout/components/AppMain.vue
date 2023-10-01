<script setup>
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { watch } from 'vue'

  import { isTags } from '@/utils/tag'
  import { generateTitle } from '@/utils/i18n'

  const route = useRoute()
  const store = useStore()

  const getTitle = route => {
    const title = ''
    if (!route.meta) {
      const pathArr = route.path.split('/')
      title = pathArr[pathArr.length - 1]
    } else {
      title = generateTitle(route.meta.title)
    }

    return title
  }

  watch(route, (to, form) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query  } = to
    store.addTagsViewList('tagsView/mutations', {
      fullPath,
      meta,
      name,
      params,
      query,
      path,
      title: getTitle(to)
    })
  }, { immediate: true })
</script>

<template>
  <div class="app-main">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>