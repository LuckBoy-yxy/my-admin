<script setup>
  import {  defineProps } from 'vue'
  import { generateTitle } from '@/utils/i18n'

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
  <SvgIcon :icon="icon" />
  <span>{{ generateTitle(title) }}</span>
</template>

<style lang="scss" scoped>

</style>