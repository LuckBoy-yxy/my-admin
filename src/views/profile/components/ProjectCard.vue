<script setup>
  import PanThumb from '@/components/PanThumb/index.vue'
</script>

<template>
  <div>
    <PanThumb
      :image="$store.getters.userInfo.avatar"
      width="100px"
      height="100px"
      :hoverable="false"
    >
      <div>hello</div>
      {{ $store.getters.userInfo.title }}
    </PanThumb>
  </div>
</template>

<style lang="scss" scoped>

</style>
