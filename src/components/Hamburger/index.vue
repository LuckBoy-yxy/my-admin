<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const isOpened = computed(() => {
    return store.getters.sidebarOpened
  })
  const svgIcon = computed(() => {
    return isOpened.value ? 'hamburger-opened' : 'hamburger-closed'
  })
  const handleClick = () => {
    store.commit('sidebar/triggerOpened')
  }
</script>

<template>
  <div class="hamburger-container" @click="handleClick">
    <SvgIcon class="hamburger" :icon="svgIcon" />
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>