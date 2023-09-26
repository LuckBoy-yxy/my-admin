<script setup>
  import { watch, ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const breadcrumbData = ref([])
  watch(route, (newVal, oldVal) => {
    breadcrumbData.value = route.matched.filter(route => {
      return route.meta.icon && route.meta.title
    })
  }, { immediate: true })

  const handleClick = route => {
    router.push(route.path)
  }

  const store = useStore()
  const textColor = computed(() => {
    return store.getters.cssVariable.menuBg
  })
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(route, index) in breadcrumbData"
      :key="route.path"
    >
      <span
        v-if="index === breadcrumbData.length -1"
        class="no-redirect"
      >{{ route.meta.title }}</span>

      <a
        v-else
        class="redirect"
        @click="handleClick(route)"
      >{{ route.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  // display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: v-bind(textColor);
    font-weight: 600;
    &:hover {
      color: #666;
    }
  }

  ::v-deep .no-redirect {
    color: v-bind(textColor);
    cursor: text;
  }
}
</style>