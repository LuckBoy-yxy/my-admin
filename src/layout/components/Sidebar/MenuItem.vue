<script setup>
  import {  defineProps } from 'vue'

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  })
</script>
  
<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <SvgIcon v-else :icon="icon" />

  <span>{{ title }}</span>
</template>

<style lang="scss" scoped>

</style>