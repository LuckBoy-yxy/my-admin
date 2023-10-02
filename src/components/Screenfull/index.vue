<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import screenfull from 'screenfull'

  const isFullscreen = ref(false)
  const change = () => {
    isFullscreen.value = screenfull.isFullscreen
  }
  const onToggle = () => {
    screenfull.toggle()
  }

  onMounted(() => {
    screenfull.on('change', change)
  })
  onUnmounted(() => {
    screenfull.off('change', change)
  })
</script>

<template>
  <div @click="onToggle">
    <SvgIcon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>